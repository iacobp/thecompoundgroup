/**
 * GENERATED FILE. DO NOT EDIT BY HAND. Your edit will be overwritten and,
 * worse, it will pass the audit while being wrong.
 *
 * Written by barque/scripts/generate-portfolio-anchors.py, which runs where
 * the private product repos are visible and reads each product's declared
 * anchor. This repo is PUBLIC and cannot import from those repos, so this
 * committed file is the only bridge.
 *
 * THE RULE (website/CLAUDE.md): no component, no metadata string, no JSON-LD
 * block and no line of public/llms.txt may state a number about a Compound
 * product except by reading a value below. Enforced by
 * `python3 scripts/audit-provider-anchors.py`.
 *
 * To change a number here, change it in the product's anchor and re-run the
 * generator. Editing this file changes nothing about the product and breaks
 * the only guarantee it offers.
 *
 * `unanchored` records facts the site has historically stated that NO anchor
 * can supply. They carry a reason, never a number. Stating one of them on a
 * page fails the audit. That is deliberate: a fact with no source should not
 * be on a page that claims every number has one.
 */

export type AnchorFact = {
  /** The derived value. Never hand-entered. */
  readonly value: string | number | Readonly<Record<string, string | number>>;
  /** Path inside the product repo the value was read from. */
  readonly source: string;
  /** How it was derived, in one sentence, so the derivation is auditable. */
  readonly derivedBy: string;
  /** ISO date the generator last read the source. */
  readonly asOf: string;
};

export type UnanchoredFact = {
  readonly state: "no-anchor";
  /** Why no anchor can supply this, and what to do instead. */
  readonly reason: string;
  readonly asOf: string;
};

export const anchors = {
  "generatedAt": "2026-09-10",
  "generatedBy": "barque/scripts/generate-portfolio-anchors.py",
  "products": {
    "glp1picks": {
      "name": "GLP-1 Picks",
      "domain": "glp1picks.com",
      "repo": "iacobp/glp1picks",
      "anchor": "src/data/providers.ts",
      "facts": {
        "providerCount": {
          "value": 34,
          "source": "src/data/providers.ts",
          "derivedBy": "count of top-level records in `export const providers`",
          "asOf": "2026-09-10"
        },
        "affiliatePartnerCount": {
          "value": 34,
          "source": "src/data/providers.ts",
          "derivedBy": "providers whose affiliateUrl carries a tracking domain, mirroring isAffiliatePartner() in the anchor",
          "asOf": "2026-09-10"
        },
        "comparisonPageCount": {
          "value": 561,
          "source": "src/data/providers.ts",
          "derivedBy": "every unordered provider pair, n*(n-1)/2, the /compare route family",
          "asOf": "2026-09-10"
        },
        "stateGuideCount": {
          "value": 51,
          "source": "src/data/states.ts",
          "derivedBy": "count of top-level records in `export const states`",
          "asOf": "2026-09-10"
        },
        "blogPostCount": {
          "value": 30,
          "source": "src/data/posts.ts",
          "derivedBy": "count of top-level records in `export const posts`",
          "asOf": "2026-09-10"
        },
        "providerPrices": {
          "value": {
            "agelessrx": 199,
            "bmimd": 159,
            "bodybuilding-health": 179,
            "breeze-meds": 199,
            "direct-meds": 297,
            "dudemeds": 149,
            "eden-health": 99,
            "embody": 69,
            "enhance-md": 212,
            "found": 148,
            "fridays": 117,
            "gala": 149,
            "healthrx": 99,
            "hers": 188,
            "luvo-health": 249,
            "mangorx": 299,
            "maximus": 79,
            "medgm": 179,
            "medvi": 179,
            "oak": 167,
            "petermd": 149,
            "ro": 149,
            "sesame-care": 99,
            "shed": 159,
            "skinnyrx": 99,
            "snagrx": 99,
            "sprout-health": 110,
            "strut-health": 99,
            "synergyrx": 199,
            "tmates": 158,
            "trimi": 175,
            "trimrx": 149,
            "wellorithm": 147,
            "willow": 299
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the headline `price` field per provider slug, in USD per month",
          "asOf": "2026-09-10"
        },
        "providerScores": {
          "value": {
            "agelessrx": 7.0,
            "bmimd": 8.0,
            "bodybuilding-health": 7.2,
            "breeze-meds": 7.3,
            "direct-meds": 7.9,
            "dudemeds": 7.8,
            "eden-health": 6.9,
            "embody": 7.3,
            "enhance-md": 7.8,
            "found": 7.3,
            "fridays": 8.7,
            "gala": 7.2,
            "healthrx": 5.2,
            "hers": 5.3,
            "luvo-health": 2.4,
            "mangorx": 7.5,
            "maximus": 5.1,
            "medgm": 2.7,
            "medvi": 5.7,
            "oak": 7.5,
            "petermd": 7.3,
            "ro": 7.2,
            "sesame-care": 7.9,
            "shed": 7.8,
            "skinnyrx": 5.3,
            "snagrx": 4.5,
            "sprout-health": 5.8,
            "strut-health": 6.2,
            "synergyrx": 7.6,
            "tmates": 7.8,
            "trimi": 4.2,
            "trimrx": 5.3,
            "wellorithm": 7.4,
            "willow": 7.5
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the methodology `score` field per provider slug, out of 10",
          "asOf": "2026-09-10"
        },
        "providerRanks": {
          "value": {
            "agelessrx": 21,
            "bmimd": 2,
            "bodybuilding-health": 19,
            "breeze-meds": 15,
            "direct-meds": 4,
            "dudemeds": 5,
            "eden-health": 22,
            "embody": 17,
            "enhance-md": 8,
            "found": 16,
            "fridays": 1,
            "gala": 18,
            "healthrx": 29,
            "hers": 26,
            "luvo-health": 34,
            "mangorx": 12,
            "maximus": 30,
            "medgm": 33,
            "medvi": 25,
            "oak": 11,
            "petermd": 14,
            "ro": 20,
            "sesame-care": 3,
            "shed": 7,
            "skinnyrx": 28,
            "snagrx": 31,
            "sprout-health": 24,
            "strut-health": 23,
            "synergyrx": 9,
            "tmates": 6,
            "trimi": 32,
            "trimrx": 27,
            "wellorithm": 13,
            "willow": 10
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the `rank` field per provider slug, so a leaderboard replica orders itself the way the product does instead of freezing a past order",
          "asOf": "2026-09-10"
        },
        "providerPriceCeiling": {
          "value": {
            "agelessrx": 349,
            "bmimd": 249,
            "bodybuilding-health": 209,
            "breeze-meds": 399,
            "direct-meds": 399,
            "dudemeds": 1585,
            "eden-health": 1695,
            "embody": 129,
            "enhance-md": 322,
            "found": 650,
            "fridays": 1828,
            "gala": 1299,
            "healthrx": 239,
            "hers": 299,
            "luvo-health": 1399,
            "mangorx": 299,
            "maximus": 1249,
            "medgm": 249,
            "medvi": 299,
            "oak": 250,
            "petermd": 249,
            "ro": 349,
            "sesame-care": 299,
            "shed": 349,
            "skinnyrx": 199,
            "snagrx": 149,
            "sprout-health": 375,
            "strut-health": 199,
            "synergyrx": 947,
            "tmates": 297,
            "trimi": 235,
            "trimrx": 1249,
            "wellorithm": 1399,
            "willow": 399
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the highest `price` inside the provider's own `pricingTiers` array, the top of the monthly range that program publishes for itself. Providers declaring no pricingTiers are absent, not defaulted",
          "asOf": "2026-09-10"
        },
        "providerNames": {
          "value": {
            "agelessrx": "AgelessRx",
            "bmimd": "bmiMD",
            "bodybuilding-health": "Bodybuilding Health+",
            "breeze-meds": "Breeze Meds",
            "direct-meds": "Direct Meds GLP-1",
            "dudemeds": "DudeMeds",
            "eden-health": "Eden Health GLP-1",
            "embody": "Embody",
            "enhance-md": "Enhance MD",
            "found": "Found",
            "fridays": "Fridays",
            "gala": "Gala",
            "healthrx": "HealthRX",
            "hers": "Hers",
            "luvo-health": "Luvo Health",
            "mangorx": "MangoRx",
            "maximus": "Maximus",
            "medgm": "MEDGm",
            "medvi": "MEDVi",
            "oak": "Oak Longevity",
            "petermd": "PeterMD",
            "ro": "Ro",
            "sesame-care": "Sesame Care",
            "shed": "Shed",
            "skinnyrx": "SkinnyRx",
            "snagrx": "SnagRx",
            "sprout-health": "Sprout Health",
            "strut-health": "Strut Health",
            "synergyrx": "SynergyRx",
            "tmates": "TMates",
            "trimi": "Trimi Health",
            "trimrx": "TrimRx",
            "wellorithm": "Wellorithm",
            "willow": "Willow"
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the display `name` field per provider slug, so a chart labelled by name can be matched back to the anchor",
          "asOf": "2026-09-10"
        }
      },
      "unanchored": {
        "pagesPublished": {
          "state": "no-anchor",
          "reason": "No anchor file states a total page count. The number is a property of the rendered sitemap, which needs a build, and no sitemap snapshot is committed anywhere the generator can read. Sum the route families instead (providerCount + comparisonPageCount + stateGuideCount + blogPostCount) and say which families you summed, or state no total.",
          "asOf": "2026-09-10"
        },
        "pagesIndexed": {
          "state": "no-anchor",
          "reason": "Indexed-page counts come from Search Console, not from an anchor. barque/data/gsc/glp1picks.json holds the pages report; it measures pages with impressions, which is a different quantity from pages published, and it is a dated reading rather than a canonical fact.",
          "asOf": "2026-09-10"
        }
      }
    },
    "hrtpicks": {
      "name": "HRT Picks",
      "domain": "hrtpicks.com",
      "repo": "iacobp/hrtpicks",
      "anchor": "src/data/providers.ts",
      "facts": {
        "providerCount": {
          "value": 17,
          "source": "src/data/providers.ts",
          "derivedBy": "count of top-level records in `export const providers`",
          "asOf": "2026-08-28"
        },
        "affiliatePartnerCount": {
          "value": 6,
          "source": "src/data/providers.ts",
          "derivedBy": "providers whose affiliateUrl carries a tracking domain, mirroring isAffiliatePartner() in the anchor",
          "asOf": "2026-08-28"
        },
        "womensWingCount": {
          "value": 13,
          "source": "src/data/providers.ts",
          "derivedBy": "providers with wing \"women\" or \"both\"",
          "asOf": "2026-08-28"
        },
        "mensWingCount": {
          "value": 6,
          "source": "src/data/providers.ts",
          "derivedBy": "providers with wing \"men\" or \"both\"",
          "asOf": "2026-08-28"
        },
        "transparencyGrades": {
          "value": {
            "A": 1,
            "B": 6,
            "C": 6,
            "D": 4
          },
          "source": "src/data/providers.ts",
          "derivedBy": "distribution of the transparencyGrade field",
          "asOf": "2026-08-28"
        },
        "providerNames": {
          "value": {
            "alloy": "Alloy",
            "defy-medical": "Defy Medical",
            "elektra-health": "Elektra Health",
            "fella-health": "Fella Health",
            "gala-health": "Gala Health",
            "gennev": "Gennev",
            "hers-menopause": "Hers Menopause",
            "hone-health": "Hone Health",
            "inner-balance": "Inner Balance",
            "mango-rx": "MangoRx",
            "maximus": "Maximus",
            "midi-health": "Midi Health",
            "peter-md": "PeterMD",
            "sesame-care": "Sesame Care",
            "telos-rx": "Telos RX",
            "winona": "Winona",
            "wisp": "Wisp"
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the display `name` field per provider slug",
          "asOf": "2026-08-28"
        },
        "providerScores": {
          "value": {
            "alloy": 8.9,
            "defy-medical": 7.6,
            "elektra-health": 7.0,
            "fella-health": 6.4,
            "gala-health": 7.2,
            "gennev": 7.1,
            "hers-menopause": 7.4,
            "hone-health": 7.5,
            "inner-balance": 7.0,
            "mango-rx": 7.0,
            "maximus": 6.5,
            "midi-health": 7.7,
            "peter-md": 7.0,
            "sesame-care": 7.6,
            "telos-rx": 6.9,
            "winona": 8.4,
            "wisp": 7.3
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the methodology `score` field per provider slug, out of 10",
          "asOf": "2026-08-28"
        },
        "providerGrades": {
          "value": {
            "alloy": "A",
            "defy-medical": "C",
            "elektra-health": "B",
            "fella-health": "C",
            "gala-health": "C",
            "gennev": "B",
            "hers-menopause": "D",
            "hone-health": "C",
            "inner-balance": "D",
            "mango-rx": "C",
            "maximus": "D",
            "midi-health": "B",
            "peter-md": "C",
            "sesame-care": "B",
            "telos-rx": "D",
            "winona": "B",
            "wisp": "B"
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the transparencyGrade field per provider slug, A to F",
          "asOf": "2026-08-28"
        }
      },
      "unanchored": {}
    },
    "bestpeptideforthat": {
      "name": "Best Peptide For That",
      "domain": "bestpeptideforthat.com",
      "repo": "iacobp/bestpeptideforthat",
      "anchor": "src/data/peptides.ts",
      "facts": {
        "peptideCount": {
          "value": 46,
          "source": "src/data/peptides.ts",
          "derivedBy": "count of top-level records in `export const peptides`",
          "asOf": "2026-08-28"
        },
        "evidenceGrades": {
          "value": {
            "A": 9,
            "B": 6,
            "C": 14,
            "D": 16,
            "F": 1
          },
          "source": "src/data/peptides.ts",
          "derivedBy": "distribution of the evidenceGrade field",
          "asOf": "2026-08-28"
        },
        "peptideGrades": {
          "value": {
            "AOD-9604": "F",
            "ARA-290 (Cibinetide)": "C",
            "Argireline (Acetyl Hexapeptide-8)": "C",
            "BPC-157": "D",
            "CJC-1295": "C",
            "CJC-1295 / Ipamorelin": "C",
            "Cagrilintide": "B",
            "Cerebrolysin": "C",
            "DSIP (Delta Sleep-Inducing Peptide)": "D",
            "Dihexa": "D",
            "Dulaglutide": "A",
            "Epitalon": "D",
            "Follistatin (FST-344 / FS344)": "D",
            "GHK-Cu": "B",
            "GHRP-2": "D",
            "GHRP-6": "D",
            "Gonadorelin (GnRH)": "A",
            "Hexarelin": "D",
            "Humanin": "D",
            "IGF-1 LR3": "D",
            "Ipamorelin": "C",
            "KPV": "D",
            "Kisspeptin (Kisspeptin-54 / Kisspeptin-10)": "C",
            "LL-37 (Cathelicidin)": "C",
            "Liraglutide": "A",
            "MGF (Mechano Growth Factor)": "D",
            "MK-677 (Ibutamoren)": "C",
            "MOTS-c": "D",
            "Matrixyl (Palmitoyl Pentapeptide-4)": "C",
            "Melanotan-1 (Afamelanotide / Scenesse)": "A",
            "Melanotan-2 (MT-2)": "D",
            "Oxytocin": "A",
            "PEG-MGF (Pegylated Mechano Growth Factor)": "D",
            "PT-141": "A",
            "Retatrutide": "B",
            "SS-31 (Elamipretide)": "C",
            "Selank": "C",
            "Semaglutide": "A",
            "Semax": "C",
            "Sermorelin": "B",
            "TB-500": "D",
            "Tesamorelin": "A",
            "Thymosin Alpha-1": "B",
            "Thymosin Beta-4": "B",
            "Tirzepatide": "A",
            "VIP (Vasoactive Intestinal Peptide / Aviptadil)": "C"
          },
          "source": "src/data/peptides.ts",
          "derivedBy": "the evidenceGrade field per peptide display name, so a page naming a peptide reads its grade instead of remembering one",
          "asOf": "2026-08-28"
        },
        "pcacDocketCount": {
          "value": 7,
          "source": "src/data/peptides.ts",
          "derivedBy": "peptides carrying a pcacVote record",
          "asOf": "2026-08-28"
        }
      },
      "unanchored": {}
    },
    "glp1pets": {
      "name": "GLP-1 Pets",
      "domain": "glp1pets.com",
      "repo": "iacobp/glp1pets",
      "anchor": "src/data/pipeline.ts",
      "facts": {
        "programmeCount": {
          "value": 4,
          "source": "src/data/pipeline.ts",
          "derivedBy": "count of top-level records in `export const programmes`",
          "asOf": "2026-08-28"
        },
        "meow1ReadoutWindow": {
          "value": "Summer 2027",
          "source": "src/data/pipeline.ts",
          "derivedBy": "readoutWindow of the okv-119 programme, whose trialName is MEOW-1",
          "asOf": "2026-08-28"
        },
        "readoutWindows": {
          "value": {
            "aks-562c": "H2 2026",
            "loy-002": "Company-projected launch before end of 2026",
            "okv-119": "Summer 2027"
          },
          "source": "src/data/pipeline.ts",
          "derivedBy": "readoutWindow per programme slug",
          "asOf": "2026-08-28"
        },
        "trialNames": {
          "value": {
            "okv-119": "MEOW-1"
          },
          "source": "src/data/pipeline.ts",
          "derivedBy": "trialName per programme slug",
          "asOf": "2026-08-28"
        }
      },
      "unanchored": {}
    },
    "titrate": {
      "name": "Titrate",
      "domain": "titrate.health",
      "repo": "iacobp/titrate-landing",
      "anchor": "lib/constants.ts",
      "facts": {
        "compoundCount": {
          "value": 32,
          "source": "lib/constants.ts",
          "derivedBy": "COMPOUND_COUNT, the preloaded library size, which takes no plus sign",
          "asOf": "2026-08-28"
        },
        "priceMonthlyUsd": {
          "value": 9.99,
          "source": "lib/constants.ts",
          "derivedBy": "PRICE_MONTHLY_USD",
          "asOf": "2026-08-28"
        },
        "priceYearlyUsd": {
          "value": 49.99,
          "source": "lib/constants.ts",
          "derivedBy": "PRICE_YEARLY_USD",
          "asOf": "2026-08-28"
        },
        "trialDays": {
          "value": 7,
          "source": "lib/constants.ts",
          "derivedBy": "TRIAL_DAYS",
          "asOf": "2026-08-28"
        },
        "appStoreId": {
          "value": "6766338584",
          "source": "lib/constants.ts",
          "derivedBy": "APP_STORE_ID",
          "asOf": "2026-08-28"
        }
      },
      "unanchored": {}
    },
    "revolume": {
      "name": "Revolume",
      "domain": "revolume.app",
      "repo": "iacobp/revolume",
      "anchor": null,
      "facts": {},
      "unanchored": {
        "facialMarkerCount": {
          "state": "no-anchor",
          "reason": "Revolume declares no anchor: it is absent from barque/registry.yml, has no CLAUDE.md and no audit script. Its own copy states both fifteen and sixteen markers on different pages, so there is no value here that could be promoted to a fact without picking one arbitrarily. Observed: components/sample/data.ts holds 15 demo markers. Give Revolume an anchor before the mother site states a marker count.",
          "asOf": "2026-08-28"
        }
      }
    }
  }
} as const;

/** Every product key the mother site may state a number about. */
export type ProductKey = keyof typeof anchors.products;

/**
 * Read a fact. Throws when the key is absent, which is the point: a build
 * that asks for a number the anchor does not carry must fail at build time
 * rather than render a blank or a stale literal.
 */
export function anchorFact(product: ProductKey, key: string): AnchorFact {
  const entry = (anchors.products[product].facts as Record<string, AnchorFact | undefined>)[key];
  if (!entry) {
    throw new Error(
      `No anchored fact "${key}" for ${product}. Add it to ` +
        `barque/scripts/generate-portfolio-anchors.py and regenerate; do not ` +
        `type the number into the component.`,
    );
  }
  return entry;
}

/** The value alone, for the common case of interpolating it into copy. */
export function anchorValue(product: ProductKey, key: string): string | number {
  const v = anchorFact(product, key).value;
  if (typeof v === "object") {
    throw new Error(
      `Fact "${key}" for ${product} is a map, not a scalar. Read anchorFact().value ` +
        `and index it.`,
    );
  }
  return v;
}
