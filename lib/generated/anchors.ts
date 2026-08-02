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
  "generatedAt": "2026-08-02",
  "generatedBy": "barque/scripts/generate-portfolio-anchors.py",
  "products": {
    "glp1picks": {
      "name": "GLP-1 Picks",
      "domain": "glp1picks.com",
      "repo": "iacobp/glp1picks",
      "anchor": "src/data/providers.ts",
      "facts": {
        "providerCount": {
          "value": 53,
          "source": "src/data/providers.ts",
          "derivedBy": "count of top-level records in `export const providers`",
          "asOf": "2026-08-02"
        },
        "affiliatePartnerCount": {
          "value": 31,
          "source": "src/data/providers.ts",
          "derivedBy": "providers whose affiliateUrl carries a tracking domain, mirroring isAffiliatePartner() in the anchor",
          "asOf": "2026-08-02"
        },
        "comparisonPageCount": {
          "value": 1378,
          "source": "src/data/providers.ts",
          "derivedBy": "every unordered provider pair, n*(n-1)/2, the /compare route family",
          "asOf": "2026-08-02"
        },
        "stateGuideCount": {
          "value": 51,
          "source": "src/data/states.ts",
          "derivedBy": "count of top-level records in `export const states`",
          "asOf": "2026-08-02"
        },
        "blogPostCount": {
          "value": 37,
          "source": "src/data/posts.ts",
          "derivedBy": "count of top-level records in `export const posts`",
          "asOf": "2026-08-02"
        },
        "providerPrices": {
          "value": {
            "agelessrx": 199,
            "bmimd": 99,
            "bodybuilding-health": 179,
            "breeze-meds": 199,
            "calibrate": 199,
            "care-bare-rx": 199,
            "direct-meds": 297,
            "dudemeds": 149,
            "eden-health": 249,
            "elevate-health": 233,
            "embody": 69,
            "enhance-md": 212,
            "feelgood": 149,
            "fella-health": 299,
            "found": 129,
            "fridays": 249,
            "gala": 149,
            "gobymeds": 99,
            "goodrx-care": 119,
            "healthrx": 99,
            "henry-meds": 199,
            "hers": 199,
            "hims": 149,
            "hone-health": 309,
            "ivim-health": 150,
            "lemonaid-health": 49,
            "livbody": 179,
            "mangorx": 299,
            "maximus": 150,
            "medvi": 179,
            "mochi-health": 178,
            "mystart-health": 299,
            "noom-med": 79,
            "novi": 133,
            "oak": 119,
            "petermd": 165,
            "ro": 149,
            "sesame-care": 59,
            "shed": 199,
            "skinnyrx": 199,
            "sprout-health": 199,
            "strut-health": 99,
            "synergyrx": 199,
            "telos-rx": 249,
            "tmates": 158,
            "tonik-wellness": 149,
            "trimi": 175,
            "trimrx": 149,
            "weightwatchers": 74,
            "wellorithm": 147,
            "willow": 299,
            "yucca-health": 146,
            "zealthy": 286
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the headline `price` field per provider slug, in USD per month",
          "asOf": "2026-08-02"
        },
        "providerNames": {
          "value": {
            "agelessrx": "AgelessRx",
            "bmimd": "bmiMD",
            "bodybuilding-health": "Bodybuilding Health+",
            "breeze-meds": "Breeze Meds",
            "calibrate": "Calibrate",
            "care-bare-rx": "Care Bare Rx",
            "direct-meds": "Direct Meds GLP-1",
            "dudemeds": "DudeMeds",
            "eden-health": "Eden Health GLP-1",
            "elevate-health": "Elevate Health",
            "embody": "Embody",
            "enhance-md": "Enhance MD",
            "feelgood": "FeelGood",
            "fella-health": "Fella Health",
            "found": "Found",
            "fridays": "Fridays",
            "gala": "Gala",
            "gobymeds": "GobyMeds",
            "goodrx-care": "GoodRx Care",
            "healthrx": "HealthRX",
            "henry-meds": "Henry Meds",
            "hers": "Hers",
            "hims": "Hims",
            "hone-health": "Hone Health",
            "ivim-health": "Ivim Health",
            "lemonaid-health": "Lemonaid Health",
            "livbody": "LivBody",
            "mangorx": "MangoRx",
            "maximus": "Maximus",
            "medvi": "MEDVi",
            "mochi-health": "Mochi Health",
            "mystart-health": "MyStart Health",
            "noom-med": "Noom Med",
            "novi": "Novi",
            "oak": "Oak Longevity",
            "petermd": "PeterMD",
            "ro": "Ro",
            "sesame-care": "Sesame Care",
            "shed": "Shed",
            "skinnyrx": "SkinnyRx",
            "sprout-health": "Sprout Health",
            "strut-health": "Strut Health",
            "synergyrx": "SynergyRx",
            "telos-rx": "Telos RX",
            "tmates": "TMates",
            "tonik-wellness": "Tonik Wellness",
            "trimi": "Trimi Health",
            "trimrx": "TrimRx",
            "weightwatchers": "WeightWatchers (Sequence)",
            "wellorithm": "Wellorithm",
            "willow": "Willow",
            "yucca-health": "Yucca Health",
            "zealthy": "Zealthy"
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the display `name` field per provider slug, so a chart labelled by name can be matched back to the anchor",
          "asOf": "2026-08-02"
        }
      },
      "unanchored": {
        "pagesPublished": {
          "state": "no-anchor",
          "reason": "No anchor file states a total page count. The number is a property of the rendered sitemap, which needs a build, and no sitemap snapshot is committed anywhere the generator can read. Sum the route families instead (providerCount + comparisonPageCount + stateGuideCount + blogPostCount) and say which families you summed, or state no total.",
          "asOf": "2026-08-02"
        },
        "pagesIndexed": {
          "state": "no-anchor",
          "reason": "Indexed-page counts come from Search Console, not from an anchor. barque/data/gsc/glp1picks.json holds the pages report; it measures pages with impressions, which is a different quantity from pages published, and it is a dated reading rather than a canonical fact.",
          "asOf": "2026-08-02"
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
          "value": 16,
          "source": "src/data/providers.ts",
          "derivedBy": "count of top-level records in `export const providers`",
          "asOf": "2026-08-02"
        },
        "affiliatePartnerCount": {
          "value": 6,
          "source": "src/data/providers.ts",
          "derivedBy": "providers whose affiliateUrl carries a tracking domain, mirroring isAffiliatePartner() in the anchor",
          "asOf": "2026-08-02"
        },
        "womensWingCount": {
          "value": 13,
          "source": "src/data/providers.ts",
          "derivedBy": "providers with wing \"women\" or \"both\"",
          "asOf": "2026-08-02"
        },
        "mensWingCount": {
          "value": 5,
          "source": "src/data/providers.ts",
          "derivedBy": "providers with wing \"men\" or \"both\"",
          "asOf": "2026-08-02"
        },
        "transparencyGrades": {
          "value": {
            "A": 1,
            "B": 6,
            "C": 5,
            "D": 4
          },
          "source": "src/data/providers.ts",
          "derivedBy": "distribution of the transparencyGrade field",
          "asOf": "2026-08-02"
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
          "asOf": "2026-08-02"
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
          "asOf": "2026-08-02"
        },
        "pcacDocketCount": {
          "value": 7,
          "source": "src/data/peptides.ts",
          "derivedBy": "peptides carrying a pcacVote record",
          "asOf": "2026-08-02"
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
          "asOf": "2026-08-02"
        },
        "meow1ReadoutWindow": {
          "value": "Summer 2027",
          "source": "src/data/pipeline.ts",
          "derivedBy": "readoutWindow of the okv-119 programme, whose trialName is MEOW-1",
          "asOf": "2026-08-02"
        },
        "readoutWindows": {
          "value": {
            "aks-562c": "H2 2026",
            "loy-002": "Company-projected launch before end of 2026",
            "okv-119": "Summer 2027"
          },
          "source": "src/data/pipeline.ts",
          "derivedBy": "readoutWindow per programme slug",
          "asOf": "2026-08-02"
        },
        "trialNames": {
          "value": {
            "okv-119": "MEOW-1"
          },
          "source": "src/data/pipeline.ts",
          "derivedBy": "trialName per programme slug",
          "asOf": "2026-08-02"
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
          "asOf": "2026-08-02"
        },
        "priceMonthlyUsd": {
          "value": 9.99,
          "source": "lib/constants.ts",
          "derivedBy": "PRICE_MONTHLY_USD",
          "asOf": "2026-08-02"
        },
        "priceYearlyUsd": {
          "value": 49.99,
          "source": "lib/constants.ts",
          "derivedBy": "PRICE_YEARLY_USD",
          "asOf": "2026-08-02"
        },
        "trialDays": {
          "value": 7,
          "source": "lib/constants.ts",
          "derivedBy": "TRIAL_DAYS",
          "asOf": "2026-08-02"
        },
        "appStoreId": {
          "value": "6766338584",
          "source": "lib/constants.ts",
          "derivedBy": "APP_STORE_ID",
          "asOf": "2026-08-02"
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
          "asOf": "2026-08-02"
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
