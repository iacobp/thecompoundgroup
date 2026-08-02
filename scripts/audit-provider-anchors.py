#!/usr/bin/env python3
"""
audit-provider-anchors.py, the anchor gate for the Compound mother site.

WHAT IT ENFORCES
----------------
`lib/generated/anchors.ts` is this repo's anchor. It is written by
barque/scripts/generate-portfolio-anchors.py from each product's own anchor
file, because the products live in private repos and this repo is public.

The rule in CLAUDE.md: no component, no metadata string, no JSON-LD block and
no line of public/llms.txt may state a number about a Compound product except
by reading a value out of that file.

This script fails when a scanned file states a product number that

  (a) DISAGREES with the anchored value, or
  (b) names a product subject the anchor carries NO value for, which includes
      every subject declared `unanchored` in the generated file, or
  (c) states a product number with no product attributable to it and the value
      matches no product carrying that fact.

WHAT COUNTS AS A "PRODUCT NUMBER"
---------------------------------
The SUBJECTS table below IS the definition. A number is in scope when it sits
next to one of those subject phrases, or when it is the value of an object
field whose sibling `label`/`name` matches one. Everything else on the site
(market statistics, studio operating figures, layout numbers) is out of scope
and is COUNTED AND REPORTED as out of scope rather than passed over in
silence, so the coverage boundary is visible in every run. Widening coverage
means adding a subject here, and that is the intended way to widen it.

THREE STATES
------------
The generated anchor distinguishes fetched-with-data, fetched-and-empty and
never-fetched. This script inherits that: if `lib/generated/anchors.ts` is
missing or unparseable it exits 2 and says the anchor was NEVER READ. It never
reports "no drift" against an anchor it could not load, because a green run on
a missing anchor is the exact failure this whole layer exists to stop.

BASELINE
--------
Known drift that predates the anchor is frozen in
`scripts/anchor-drift-baseline.json`, the same mechanism bestpeptideforthat
and glp1pets use. It MAY SHRINK AND NEVER GROW. Baselined findings are printed
in every run under DECLARED DEBT; they are not hidden. `--ratchet` rewrites the
baseline down to what is currently found and refuses to add or raise anything.

USAGE
    python3 scripts/audit-provider-anchors.py            # report, exit 0/1
    python3 scripts/audit-provider-anchors.py --strict   # ignore the baseline
    python3 scripts/audit-provider-anchors.py --json     # machine-readable
    python3 scripts/audit-provider-anchors.py --ratchet  # tighten the baseline

EXIT CODES
    0  no undeclared drift
    1  undeclared drift found
    2  the anchor could not be read. NOT a pass, NOT an empty result.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Iterator, NamedTuple

REPO = Path(__file__).resolve().parent.parent
ANCHOR_FILE = REPO / "lib" / "generated" / "anchors.ts"
BASELINE_FILE = REPO / "scripts" / "anchor-drift-baseline.json"

SCAN_ROOTS = ("app", "components", "lib", "public")
SCAN_SUFFIXES = {".ts", ".tsx", ".js", ".jsx", ".json", ".txt", ".md", ".mdx"}

EXCLUDE_DIRS = {
    "node_modules", ".next", ".git", ".vercel", ".claude", "out", "dist",
}
EXCLUDE_FILES = {
    "anchors.ts",              # the anchor itself
    "package-lock.json",
    "tsconfig.tsbuildinfo",
    "next-env.d.ts",
}

# Dated archive. The Barque log is a publication: each brief is a document
# stamped with the day it was written, and rewriting a past brief to match
# today's provider count would be falsifying the record. Findings here are
# WARN, never ERROR, and they are still printed.
ARCHIVE_PREFIXES = ("lib/barque-briefs.ts", "lib/barque-data.ts", "barque/", "app/barque/")

OVERRIDE = "anchor-override:"   # inline escape hatch, must carry a reason


# ---------------------------------------------------------------------------
# number words
# ---------------------------------------------------------------------------

ONES = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6,
    "seven": 7, "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve": 12,
    "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16,
    "seventeen": 17, "eighteen": 18, "nineteen": 19,
}
TENS = {
    "twenty": 20, "thirty": 30, "forty": 40, "fifty": 50, "sixty": 60,
    "seventy": 70, "eighty": 80, "ninety": 90,
}

WORD_NUM = (
    r"(?:(?:twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)"
    r"(?:[-‑\s](?:one|two|three|four|five|six|seven|eight|nine))?"
    r"|nineteen|eighteen|seventeen|sixteen|fifteen|fourteen|thirteen|twelve"
    r"|eleven|ten|nine|eight|seven|six|five|four|three|two|one)"
)
# The lookbehind matters more than it looks. Without it the "1" inside GLP-1,
# BPC-157, TB-500, AKS-562c and MEOW-1 reads as a count, and every sentence
# containing "GLP-1 telehealth providers" reports a phantom claim of 1 provider.
NUM = rf"(?<![\w\-‑.$])(?P<num>\d[\d,]*\+?|{WORD_NUM})"

# Separator between the number and its subject. Specific subject phrases may be
# hyphen-joined ("the fifty-three-program index"); bare nouns may not, because
# "the three-peptide ceiling" is a compound modifier about someone else's app,
# not a count of our index.
SEP_ANY = r"[\s\-‑]{1,3}"
SEP_SPACE = r"[ \n]{1,2}"


def parse_number(raw: str):
    """Return (int_value, had_plus) or (None, False) when unparseable."""
    s = raw.strip().lower()
    plus = s.endswith("+")
    s = s.rstrip("+").strip()
    if re.fullmatch(r"[\d,]+", s):
        return int(s.replace(",", "")), plus
    s = s.replace("‑", "-").replace(" ", "-")
    if s in ONES:
        return ONES[s], plus
    if s in TENS:
        return TENS[s], plus
    if "-" in s:
        a, _, b = s.partition("-")
        if a in TENS and b in ONES:
            return TENS[a] + ONES[b], plus
    return None, False


# ---------------------------------------------------------------------------
# the subject vocabulary. This table IS the definition of "product number".
# ---------------------------------------------------------------------------

class Subject(NamedTuple):
    id: str
    product: str | None   # None = attribution comes from surrounding context
    fact: str             # key inside products[<product>].facts or .unanchored
    prose: str            # regex matched AFTER a number, in running prose
    label: str            # regex matched against an object's label/name field
    sep: str = SEP_ANY    # allowed separator between the number and the subject


S = Subject
SUBJECTS: list[Subject] = [
    # ---- provider / program counts -------------------------------------
    S("glp1picks.programs", "glp1picks", "providerCount",
      r"GLP\W?1 telehealth (?:programs?|programmes?|providers?)"
      r"|(?:telehealth )?programs? in (?:the |our )?index"
      r"|program index",
      # Only a label that names GLP-1 is attributable to glp1picks. A bare
      # "Providers reviewed" is handled by any.providers, which refuses to
      # guess which product it belongs to.
      r"^glp\W?1 (?:telehealth )?(?:programs?|providers?)(?: reviewed| in the index)?$"),

    S("hrtpicks.providers", "hrtpicks", "providerCount",
      r"hormone telehealth providers?|HRT telehealth providers?", r"$^"),

    S("peptides.research", "bestpeptideforthat", "peptideCount",
      r"research peptides?", r"^peptides? (?:graded|indexed)$"),

    S("peptides.bare", "bestpeptideforthat", "peptideCount",
      r"peptides\b(?! for that)", r"$^", SEP_SPACE),

    S("titrate.compounds", "titrate", "compoundCount",
      r"preloaded compounds?|compounds? preloaded", r"^compounds?(?: preloaded)?$"),

    # ---- context-attributed counts (owner decided by proximity) ---------
    S("any.providers", None, "providerCount",
      r"providers\b(?! like)|telehealth (?:programs|providers)",
      r"^providers? reviewed$", SEP_SPACE),

    S("any.partners", None, "affiliatePartnerCount",
      r"affiliate partners?|partner (?:providers?|programs?)",
      r"^affiliate partners?$"),

    S("glp1picks.states", "glp1picks", "stateGuideCount",
      r"state[-\s](?:level\s)?(?:guides?|pages?)|state guides?",
      r"^state[-\s](?:level[-\s])?(?:guides?|pages?)$"),

    S("glp1picks.posts", "glp1picks", "blogPostCount",
      r"blog posts?|published articles?", r"^blog posts?$"),

    S("glp1picks.comparisons", "glp1picks", "comparisonPageCount",
      r"comparison pages?", r"^comparison pages?$"),

    # ---- subjects the anchor deliberately carries NO value for ----------
    # Product-agnostic on purpose: a page count is unanchored for every
    # property, so attributing one to a specific product would be a guess on
    # top of a number that already has no source.
    S("any.pages", None, "pagesPublished",
      r"pages? published|published pages?", r"^pages? published$"),

    S("any.indexed", None, "pagesIndexed",
      r"pages? indexed|indexed pages?", r"^pages? indexed$"),

    S("revolume.markers", "revolume", "facialMarkerCount",
      r"(?:(?:facial|skin|clinically[-\s]derived)[\s-]+)?markers\b",
      r"^(?:facial |skin )?markers?$"),
]


# Season/quarter readout windows, checked against a named programme fact.
#
# One entry per programme the anchor carries a window for, so a page naming
# AKS-562c is checked against AKS-562c's window instead of being read as a
# second claim about MEOW-1. Widening coverage this way, rather than shrinking
# the lookahead, is the rule in CLAUDE.md: a page that states the wrong window
# for the Akston trial should fail, and before this entry existed it could not.
DATE_SUBJECTS = [
    ("glp1pets.meow1", "glp1pets", "meow1ReadoutWindow",
     re.compile(r"MEOW\W?1", re.I)),
    ("glp1pets.aks562c", "glp1pets", ("readoutWindows", "aks-562c"),
     re.compile(r"AKS\W?562\W?c", re.I)),
    ("glp1pets.loy002", "glp1pets", ("readoutWindows", "loy-002"),
     re.compile(r"LOY\W?002", re.I)),
]

# A programme's lookahead stops at the next programme name, so one bullet
# mentioning two trials produces one claim per trial rather than two claims
# about whichever was named first.
DATE_BOUNDARY = re.compile(r"MEOW\W?1|AKS\W?562\W?c|LOY\W?002", re.I)
DATE_TOKEN = re.compile(
    r"\b(spring|summer|autumn|fall|winter|H1|H2|Q[1-4])\s+(20\d\d)\b", re.I
)

# Titrate price claims, restated on /numbers.
PRICE_TOKEN = re.compile(r"\$\s?(\d+(?:\.\d{1,2})?)\s*/\s*(yr|year|mo|month)", re.I)
TRIAL_TOKEN = re.compile(r"\b(\d+)[-\s]day trial\b", re.I)

# Product attribution markers, scanned backwards from a claim.
OWNER_MARKERS = [
    ("glp1picks", re.compile(r"glp1picks\.com|GLP-1 Picks|glp1-picks|glp1picks|GLP-1 Quarter", re.I)),
    ("hrtpicks", re.compile(r"hrtpicks\.com|HRT Picks|hrt-picks|hrtpicks", re.I)),
    ("bestpeptideforthat", re.compile(r"bestpeptideforthat\.com|Best Peptide For That|bestpeptideforthat", re.I)),
    ("glp1pets", re.compile(r"glp1pets\.com|GLP-1 Pets|glp1-pets|glp1pets", re.I)),
    ("titrate", re.compile(r"titrate\.health|\bTitrate\b", re.I)),
    ("revolume", re.compile(r"revolume\.app|\bRevolume\b", re.I)),
]
OWNER_LOOKBACK = 2200


class Finding(NamedTuple):
    key: str
    file: str
    line: int
    severity: str      # ERROR | WARN
    subject: str
    claimed: str
    expected: str
    detail: str


# ---------------------------------------------------------------------------
# load the anchor  (state 3 handling lives here)
# ---------------------------------------------------------------------------

def load_anchor() -> dict:
    if not ANCHOR_FILE.is_file():
        print(
            "ANCHOR NEVER READ: lib/generated/anchors.ts does not exist.\n"
            "  This is not an empty result and it is not a pass. Regenerate with\n"
            "    COMPOUND_ROOT=<parent-of-this-repo> \\\n"
            "      python3 ../barque/scripts/generate-portfolio-anchors.py",
            file=sys.stderr,
        )
        raise SystemExit(2)
    text = ANCHOR_FILE.read_text(encoding="utf-8")
    m = re.search(r"export const anchors = (\{.*?\}) as const;", text, re.S)
    if not m:
        print(
            "ANCHOR NEVER READ: lib/generated/anchors.ts exists but has no\n"
            "  `export const anchors = {...} as const;` block. Someone hand-edited a\n"
            "  generated file. Regenerate it; do not patch it.",
            file=sys.stderr,
        )
        raise SystemExit(2)
    try:
        data = json.loads(m.group(1))
    except json.JSONDecodeError as exc:
        print(f"ANCHOR NEVER READ: anchors.ts does not parse as JSON: {exc}", file=sys.stderr)
        raise SystemExit(2)
    if not data.get("products"):
        print("ANCHOR NEVER READ: anchors.ts carries zero products.", file=sys.stderr)
        raise SystemExit(2)
    return data


def lookup(anchor: dict, product: str, key: str):
    """Return ('fact', value) | ('no-anchor', reason) | ('absent', None)."""
    p = anchor["products"].get(product)
    if not p:
        return "absent", None
    if key in p.get("facts", {}):
        return "fact", p["facts"][key]["value"]
    if key in p.get("unanchored", {}):
        return "no-anchor", p["unanchored"][key]["reason"]
    return "absent", None


# ---------------------------------------------------------------------------
# scanning
# ---------------------------------------------------------------------------

def iter_files() -> Iterator[Path]:
    for root in SCAN_ROOTS:
        base = REPO / root
        if not base.exists():
            continue
        for path in sorted(base.rglob("*")):
            if not path.is_file():
                continue
            if any(part in EXCLUDE_DIRS for part in path.parts):
                continue
            if path.name in EXCLUDE_FILES:
                continue
            if path.suffix.lower() not in SCAN_SUFFIXES:
                continue
            yield path


def rel(path: Path) -> str:
    return str(path.relative_to(REPO))


def is_archive(relpath: str) -> bool:
    return any(relpath.startswith(p) for p in ARCHIVE_PREFIXES)


def line_of(text: str, idx: int) -> int:
    return text.count("\n", 0, idx) + 1


def owner_at(text: str, idx: int) -> str | None:
    """Nearest product named before `idx`. None when nothing is attributable."""
    window = text[max(0, idx - OWNER_LOOKBACK): idx]
    best, best_pos = None, -1
    for key, rx in OWNER_MARKERS:
        pos = -1
        for m in rx.finditer(window):
            pos = m.start()
        if pos > best_pos:
            best, best_pos = key, pos
    return best


def overridden(text: str, idx: int) -> bool:
    """`// anchor-override: reason` within two lines above the claim."""
    start = text.rfind("\n", 0, max(0, idx - 1))
    for _ in range(3):
        if start <= 0:
            return False
        prev = text.rfind("\n", 0, start)
        if OVERRIDE in text[prev + 1: start + 1]:
            return True
        start = prev
    return False


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.strip().lower()).strip("-")


# ---- pass 1: numbers next to a subject phrase, in running prose -----------

def scan_prose(anchor: dict, path: Path, text: str, in_scope: list) -> Iterator[Finding]:
    relpath = rel(path)
    sev = "WARN" if is_archive(relpath) else "ERROR"

    for sub in SUBJECTS:
        if sub.prose == r"$^":
            continue
        rx = re.compile(NUM + sub.sep + r"(?:" + sub.prose + r")", re.I)
        for m in rx.finditer(text):
            if overridden(text, m.start()):
                continue
            value, plus = parse_number(m.group("num"))
            if value is None:
                continue
            in_scope.append(sub.id)
            product = sub.product or owner_at(text, m.start())
            yield from judge(
                anchor, relpath, line_of(text, m.start()), sev, sub, product,
                value, plus, m.group(0).strip(),
            )


# ---- pass 2: object literals whose label names a subject ------------------

OBJ_RX = re.compile(r"\{[^{}]{0,400}\}", re.S)
LABEL_RX = re.compile(r"\b(?:label|name|title)\s*:\s*\"([^\"]{1,60})\"")
# Quoted first: `value: "1,800+"` must capture the comma, or 1,800 reads as 1.
VALUE_RX = re.compile(r"\b(?:value|to|count)\s*:\s*(?:\"([^\"]{1,40})\"|([^\s,}\n]{1,40}))")
SUFFIX_RX = re.compile(r"\bsuffix\s*:\s*\"([^\"]{0,4})\"")


def scan_labelled(anchor: dict, path: Path, text: str, in_scope: list) -> Iterator[Finding]:
    relpath = rel(path)
    sev = "WARN" if is_archive(relpath) else "ERROR"

    for om in OBJ_RX.finditer(text):
        block = om.group(0)
        lm = LABEL_RX.search(block)
        vm = VALUE_RX.search(block)
        if not lm or not vm:
            continue
        label = lm.group(1).strip().lower()
        raw = (vm.group(1) or vm.group(2) or "").strip()
        sfx = SUFFIX_RX.search(block)
        if sfx:
            raw += sfx.group(1)

        for sub in SUBJECTS:
            if sub.label == r"$^" or not re.search(sub.label, label, re.I):
                continue
            value, plus = parse_number(raw)
            if value is None:
                continue
            if overridden(text, om.start()):
                continue
            in_scope.append(sub.id)
            product = sub.product or owner_at(text, om.start())
            yield from judge(
                anchor, relpath, line_of(text, om.start()), sev, sub, product,
                value, plus, f'{lm.group(1)} = {raw}',
            )
            break


def judge(anchor, relpath, line, sev, sub, product, value, plus, snippet
          ) -> Iterator[Finding]:
    """Compare one claim to the anchor. Every branch produces a verdict."""
    if product is None:
        # Unattributed. Accept only if it matches some product carrying the fact.
        candidates = {}
        for pkey, p in anchor["products"].items():
            if sub.fact in p.get("facts", {}):
                candidates[pkey] = p["facts"][sub.fact]["value"]
        if candidates and any(v == value for v in candidates.values()):
            return
        if not candidates:
            # No product anchors this fact at all. Report the declared reason
            # rather than a bare "matched nothing", so the finding says what to
            # do about it.
            reasons = [
                p["unanchored"][sub.fact]["reason"]
                for p in anchor["products"].values()
                if sub.fact in p.get("unanchored", {})
            ]
            yield Finding(
                f"no-anchor|{relpath}|*.{sub.fact}|{value}", relpath, line, sev,
                f"*.{sub.fact}", str(value), "no anchored value exists",
                f"no product anchors {sub.fact}. "
                + (reasons[0] if reasons else
                   "It is not a fact in lib/generated/anchors.ts at all; either "
                   "add it to the generator or take the number off the page."),
            )
            return
        expected = ", ".join(f"{k} {v}" for k, v in candidates.items()) or "nothing"
        yield Finding(
            f"unattributed|{relpath}|{sub.id}|{value}", relpath, line, sev, sub.id,
            str(value), expected,
            "states a product number with no product named nearby, and the value "
            f"matches no anchored {sub.fact} ({expected})",
        )
        return

    state, payload = lookup(anchor, product, sub.fact)

    if state == "no-anchor":
        yield Finding(
            f"no-anchor|{relpath}|{product}.{sub.fact}|{value}", relpath, line, sev,
            f"{product}.{sub.fact}", str(value), "no anchored value exists",
            f"the anchor carries no {sub.fact} for {product}. {payload}",
        )
        return

    if state == "absent":
        yield Finding(
            f"absent|{relpath}|{product}.{sub.fact}|{value}", relpath, line, sev,
            f"{product}.{sub.fact}", str(value), "not present in the anchor",
            f"states a {sub.fact} for {product} and the generated anchor has no "
            "such key at all. Either the claim is about a product that has no "
            "anchor, or the generator needs the fact added.",
        )
        return

    if payload == value:
        if plus:
            yield Finding(
                f"plus|{relpath}|{product}.{sub.fact}", relpath, line, sev,
                f"{product}.{sub.fact}", f"{value}+", str(payload),
                "value matches but carries a plus sign, which turns an exact "
                "anchored count into an open-ended claim",
            )
        return

    yield Finding(
        f"drift|{relpath}|{product}.{sub.fact}|{value}", relpath, line, sev,
        f"{product}.{sub.fact}", f"{value}{'+' if plus else ''}", str(payload),
        f"anchor says {payload}, page says {value}",
    )


# ---- pass 3: readout windows ---------------------------------------------

def scan_dates(anchor: dict, path: Path, text: str, in_scope: list) -> Iterator[Finding]:
    relpath = rel(path)
    sev = "WARN" if is_archive(relpath) else "ERROR"
    for sid, product, factkey, marker in DATE_SUBJECTS:
        if isinstance(factkey, tuple):
            mapkey, subkey = factkey
            state, table = lookup(anchor, product, mapkey)
            if state == "fact" and isinstance(table, dict):
                if subkey in table:
                    expected = table[subkey]
                else:
                    state, expected = "absent", None
            else:
                state, expected = "absent", None
            factkey = f"{mapkey}[{subkey}]"
        else:
            state, expected = lookup(anchor, product, factkey)
        for m in marker.finditer(text):
            window = text[m.start(): m.start() + 420]
            nxt = DATE_BOUNDARY.search(window, m.end() - m.start())
            if nxt:
                window = window[: nxt.start()]
            for dm in DATE_TOKEN.finditer(window):
                in_scope.append(sid)
                claimed = f"{dm.group(1)} {dm.group(2)}"
                if state != "fact":
                    yield Finding(
                        f"date-no-anchor|{relpath}|{sid}|{claimed}", relpath,
                        line_of(text, m.start() + dm.start()), sev, sid, claimed,
                        "no anchored value", f"the anchor carries no {factkey}",
                    )
                    continue
                if claimed.lower() == str(expected).lower():
                    continue
                yield Finding(
                    f"date|{relpath}|{sid}|{claimed}", relpath,
                    line_of(text, m.start() + dm.start()), sev, sid, claimed,
                    str(expected),
                    f"anchor readout window is {expected}, page says {claimed}",
                )


# ---- pass 4: prices -------------------------------------------------------

def scan_prices(anchor: dict, path: Path, text: str, in_scope: list) -> Iterator[Finding]:
    """Two price families: glp1picks provider prices, and Titrate app pricing."""
    relpath = rel(path)
    sev = "WARN" if is_archive(relpath) else "ERROR"

    # --- glp1picks provider prices, plotted or quoted per named provider ---
    state, prices = lookup(anchor, "glp1picks", "providerPrices")
    _, names = lookup(anchor, "glp1picks", "providerNames")
    if state == "fact":
        by_slug = dict(prices)
        alias = {slugify(v): k for k, v in (names or {}).items()}
        for om in OBJ_RX.finditer(text):
            block = om.group(0)
            nm = re.search(r'\bname\s*:\s*"([^"]{1,40})"', block)
            if not nm:
                continue
            key = slugify(nm.group(1))
            slug = key if key in by_slug else alias.get(key)
            if slug is None:
                continue
            found = [
                int(x) for x in re.findall(
                    r"\b(?:advertised|actual|price|monthly|cost)\s*:\s*(\d+)", block
                )
            ]
            if not found:
                continue
            in_scope.append("glp1picks.prices")
            if overridden(text, om.start()):
                continue
            if by_slug[slug] in found:
                continue
            yield Finding(
                f"price|{relpath}|{slug}", relpath, line_of(text, om.start()), sev,
                f"glp1picks.providerPrices.{slug}",
                "/".join(str(f) for f in found), str(by_slug[slug]),
                f"anchor price for {nm.group(1)} is ${by_slug[slug]}; this record "
                f"plots {' and '.join('$' + str(f) for f in found)} and neither is it",
            )

    # --- Titrate app pricing ---
    for m in PRICE_TOKEN.finditer(text):
        if owner_at(text, m.start()) != "titrate":
            continue
        in_scope.append("titrate.price")
        amount = float(m.group(1))
        period = m.group(2).lower()
        factkey = "priceYearlyUsd" if period.startswith("y") else "priceMonthlyUsd"
        st, expected = lookup(anchor, "titrate", factkey)
        if st != "fact" or overridden(text, m.start()):
            continue
        if abs(float(expected) - amount) < 0.005:
            continue
        yield Finding(
            f"titrate-price|{relpath}|{factkey}|{amount}", relpath,
            line_of(text, m.start()), sev, f"titrate.{factkey}",
            f"${amount:g}/{period}", f"${float(expected):g}",
            f"anchor {factkey} is {expected}, page says {amount:g}",
        )

    for m in TRIAL_TOKEN.finditer(text):
        if owner_at(text, m.start()) != "titrate":
            continue
        in_scope.append("titrate.trial")
        st, expected = lookup(anchor, "titrate", "trialDays")
        if st != "fact" or overridden(text, m.start()):
            continue
        if int(m.group(1)) == int(expected):
            continue
        yield Finding(
            f"titrate-trial|{relpath}|{m.group(1)}", relpath, line_of(text, m.start()),
            sev, "titrate.trialDays", f"{m.group(1)} days", f"{expected} days",
            f"anchor trialDays is {expected}, page says {m.group(1)}",
        )


# ---------------------------------------------------------------------------
# baseline
# ---------------------------------------------------------------------------

def load_baseline() -> dict:
    if not BASELINE_FILE.is_file():
        return {}
    try:
        return json.loads(BASELINE_FILE.read_text(encoding="utf-8")).get("findings", {})
    except json.JSONDecodeError:
        print(f"baseline {BASELINE_FILE} does not parse; treating as empty", file=sys.stderr)
        return {}


def write_baseline(counts: dict, notes: dict) -> None:
    BASELINE_FILE.parent.mkdir(parents=True, exist_ok=True)
    BASELINE_FILE.write_text(
        json.dumps(
            {
                "_comment": (
                    "Declared anchor-drift debt for the Compound mother site. MAY SHRINK, "
                    "NEVER GROW. Each key forgives that many occurrences; occurrence N+1 "
                    "fails, and a key absent from this map fails on sight. Every entry "
                    "here is a number on the public site with no anchor behind it. "
                    "Run `python3 scripts/audit-provider-anchors.py --ratchet` after "
                    "fixing drift to tighten; --ratchet refuses to add or raise."
                ),
                "findings": {
                    k: {"occurrences": counts[k], "note": notes.get(k, "")}
                    for k in sorted(counts)
                },
            },
            indent=2,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )


def apply_baseline(findings: list, baseline: dict) -> tuple[list, list]:
    """Split into (undeclared, declared). Occurrence N+1 of a key is undeclared."""
    seen: dict[str, int] = {}
    undeclared, declared = [], []
    for f in findings:
        seen[f.key] = seen.get(f.key, 0) + 1
        allowed = (baseline.get(f.key) or {}).get("occurrences", 0)
        (declared if seen[f.key] <= allowed else undeclared).append(f)
    return undeclared, declared


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------

def collect(anchor: dict) -> tuple[list, list, int]:
    findings: list[Finding] = []
    in_scope: list[str] = []
    files = 0
    for path in iter_files():
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError as exc:
            print(f"could not read {rel(path)}: {exc}", file=sys.stderr)
            continue
        files += 1
        findings.extend(scan_prose(anchor, path, text, in_scope))
        findings.extend(scan_labelled(anchor, path, text, in_scope))
        findings.extend(scan_dates(anchor, path, text, in_scope))
        findings.extend(scan_prices(anchor, path, text, in_scope))

    # de-duplicate: prose and label passes can both see the same claim
    unique, seen = [], set()
    for f in findings:
        sig = (f.file, f.line, f.subject, f.claimed)
        if sig in seen:
            continue
        seen.add(sig)
        unique.append(f)
    unique.sort(key=lambda f: (f.severity != "ERROR", f.file, f.line))
    return unique, in_scope, files


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--strict", action="store_true", help="ignore the baseline")
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    ap.add_argument("--ratchet", action="store_true", help="tighten the baseline")
    args = ap.parse_args(argv)

    anchor = load_anchor()
    findings, in_scope, files = collect(anchor)
    baseline = {} if args.strict else load_baseline()
    undeclared, declared = apply_baseline(findings, baseline)

    errors = [f for f in undeclared if f.severity == "ERROR"]
    warns = [f for f in undeclared if f.severity == "WARN"]

    if args.ratchet:
        counts, notes = {}, {}
        for f in findings:
            counts[f.key] = counts.get(f.key, 0) + 1
            notes.setdefault(
                f.key,
                f"{f.file}:{f.line} page says {f.claimed}, anchor says "
                f"{f.expected}. {f.detail}",
            )
        for k, v in baseline.items():
            if k in counts and counts[k] > v.get("occurrences", 0):
                counts[k] = v["occurrences"]
        removed = [k for k in baseline if k not in counts]
        write_baseline(counts, notes)
        print(f"baseline rewritten: {len(counts)} keys, {len(removed)} removed")
        for k in sorted(removed):
            print(f"  cleared  {k}")
        return 0

    if args.json:
        print(json.dumps(
            {
                "anchorGeneratedAt": anchor.get("generatedAt"),
                "filesScanned": files,
                "claimsInScope": len(in_scope),
                "undeclared": [f._asdict() for f in undeclared],
                "declared": [f._asdict() for f in declared],
            },
            indent=2,
        ))
        return 1 if errors else 0

    print("=" * 74)
    print("  Anchor audit, The Compound mother site")
    print("=" * 74)
    print(f"  anchor       lib/generated/anchors.ts, generated {anchor.get('generatedAt')}")
    print(f"  products     {', '.join(anchor['products'])}")
    print(f"  scanned      {files} files under {', '.join(SCAN_ROOTS)}")
    print(f"  in scope     {len(in_scope)} product-number claims matched the subject")
    print( "               vocabulary. Numbers outside it (market statistics, studio")
    print( "               operating figures, layout constants) are NOT checked; widen")
    print( "               coverage by adding a Subject, not by loosening a matcher.")
    print()

    if declared:
        print(f"  DECLARED DEBT  {len(declared)} finding(s) frozen in "
              f"{BASELINE_FILE.name}. Still wrong, still published, not failing today.")
        for f in declared:
            print(f"    {f.file}:{f.line}  [{f.subject}] {f.claimed} vs {f.expected}")
        print()

    if warns:
        print(f"  WARN  {len(warns)} finding(s) in the dated Barque archive. A brief is a")
        print( "        document stamped with the day it was written; correcting one")
        print( "        retroactively falsifies the record. Reported, never failing.")
        for f in warns:
            print(f"    {f.file}:{f.line}  [{f.subject}] {f.claimed} vs {f.expected}")
        print()

    if errors:
        print(f"  ERROR  {len(errors)} undeclared finding(s)")
        for f in errors:
            print(f"    {f.file}:{f.line}")
            print(f"      subject   {f.subject}")
            print(f"      page says {f.claimed}")
            print(f"      anchor    {f.expected}")
            print(f"      {f.detail}")
        print()
        print("  FAIL. Fix by reading the value from lib/generated/anchors.ts, or")
        print("  freeze it with --ratchet if it is debt you are declaring on purpose.")
        return 1

    if declared:
        # Never print an unqualified pass while wrong numbers are live. A gate
        # that says "PASS" over 38 published contradictions is the phantom-green
        # failure this layer exists to end.
        print(f"  PASS WITH DEBT: no NEW drift. {len(declared)} number(s) on the live")
        print( "  site still contradict the anchor and are frozen, not fixed. Purge")
        print( "  them, then run --ratchet to shrink the baseline. Zero is the target.")
        return 0

    print("  PASS: every product number on this site traces to the anchor.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
