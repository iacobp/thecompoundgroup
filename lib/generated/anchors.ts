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
  "generatedAt": "2026-08-10",
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
          "asOf": "2026-08-10"
        },
        "affiliatePartnerCount": {
          "value": 30,
          "source": "src/data/providers.ts",
          "derivedBy": "providers whose affiliateUrl carries a tracking domain, mirroring isAffiliatePartner() in the anchor",
          "asOf": "2026-08-10"
        },
        "comparisonPageCount": {
          "value": 1378,
          "source": "src/data/providers.ts",
          "derivedBy": "every unordered provider pair, n*(n-1)/2, the /compare route family",
          "asOf": "2026-08-10"
        },
        "stateGuideCount": {
          "value": 51,
          "source": "src/data/states.ts",
          "derivedBy": "count of top-level records in `export const states`",
          "asOf": "2026-08-10"
        },
        "blogPostCount": {
          "value": 44,
          "source": "src/data/posts.ts",
          "derivedBy": "count of top-level records in `export const posts`",
          "asOf": "2026-08-10"
        },
        "providerPrices": {
          "value": {
            "agelessrx": 199,
            "bmimd": 289,
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
          "asOf": "2026-08-10"
        },
        "providerScores": {
          "value": {
            "agelessrx": 7.0,
            "bmimd": 8.0,
            "bodybuilding-health": 7.2,
            "breeze-meds": 7.3,
            "calibrate": 7.7,
            "care-bare-rx": 7.4,
            "direct-meds": 7.9,
            "dudemeds": 7.8,
            "eden-health": 6.9,
            "elevate-health": 7.2,
            "embody": 7.3,
            "enhance-md": 7.8,
            "feelgood": 7.0,
            "fella-health": 7.4,
            "found": 7.3,
            "fridays": 8.7,
            "gala": 7.2,
            "gobymeds": 8.4,
            "goodrx-care": 6.2,
            "healthrx": 5.2,
            "henry-meds": 8.4,
            "hers": 7.3,
            "hims": 7.9,
            "hone-health": 7.3,
            "ivim-health": 7.9,
            "lemonaid-health": 7.2,
            "livbody": 2.9,
            "mangorx": 7.5,
            "maximus": 5.1,
            "medvi": 7.7,
            "mochi-health": 7.7,
            "mystart-health": 7.7,
            "noom-med": 7.4,
            "novi": 7.8,
            "oak": 7.5,
            "petermd": 7.3,
            "ro": 7.2,
            "sesame-care": 7.9,
            "shed": 7.8,
            "skinnyrx": 5.3,
            "sprout-health": 5.8,
            "strut-health": 6.2,
            "synergyrx": 7.6,
            "telos-rx": 4.0,
            "tmates": 7.8,
            "tonik-wellness": 7.6,
            "trimi": 4.2,
            "trimrx": 7.8,
            "weightwatchers": 7.4,
            "wellorithm": 7.4,
            "willow": 7.5,
            "yucca-health": 7.7,
            "zealthy": 7.2
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the methodology `score` field per provider slug, out of 10",
          "asOf": "2026-08-10"
        },
        "providerRanks": {
          "value": {
            "agelessrx": 42,
            "bmimd": 4,
            "bodybuilding-health": 37,
            "breeze-meds": 31,
            "calibrate": 17,
            "care-bare-rx": 28,
            "direct-meds": 8,
            "dudemeds": 11,
            "eden-health": 44,
            "elevate-health": 41,
            "embody": 34,
            "enhance-md": 14,
            "feelgood": 43,
            "fella-health": 29,
            "found": 33,
            "fridays": 1,
            "gala": 36,
            "gobymeds": 2,
            "goodrx-care": 46,
            "healthrx": 49,
            "henry-meds": 3,
            "hers": 32,
            "hims": 7,
            "hone-health": 35,
            "ivim-health": 6,
            "lemonaid-health": 39,
            "livbody": 53,
            "mangorx": 24,
            "maximus": 50,
            "medvi": 18,
            "mochi-health": 16,
            "mystart-health": 19,
            "noom-med": 25,
            "novi": 10,
            "oak": 23,
            "petermd": 30,
            "ro": 40,
            "sesame-care": 5,
            "shed": 13,
            "skinnyrx": 48,
            "sprout-health": 47,
            "strut-health": 45,
            "synergyrx": 20,
            "telos-rx": 52,
            "tmates": 12,
            "tonik-wellness": 21,
            "trimi": 51,
            "trimrx": 9,
            "weightwatchers": 26,
            "wellorithm": 27,
            "willow": 22,
            "yucca-health": 15,
            "zealthy": 38
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the `rank` field per provider slug, so a leaderboard replica orders itself the way the product does instead of freezing a past order",
          "asOf": "2026-08-10"
        },
        "providerPriceCeiling": {
          "value": {
            "bmimd": 399,
            "bodybuilding-health": 209,
            "calibrate": 199,
            "direct-meds": 399,
            "dudemeds": 199,
            "eden-health": 1695,
            "elevate-health": 349,
            "embody": 329,
            "enhance-md": 322,
            "feelgood": 1999,
            "found": 650,
            "fridays": 359,
            "gala": 1299,
            "gobymeds": 1695,
            "goodrx-care": 349,
            "healthrx": 209,
            "henry-meds": 397,
            "hers": 1899,
            "hims": 1899,
            "hone-health": 349,
            "ivim-health": 183,
            "lemonaid-health": 299,
            "livbody": 279,
            "maximus": 349,
            "medvi": 1999,
            "mystart-health": 299,
            "noom-med": 299,
            "novi": 283,
            "oak": 1500,
            "ro": 349,
            "sesame-care": 299,
            "shed": 299,
            "skinnyrx": 299,
            "sprout-health": 375,
            "strut-health": 199,
            "telos-rx": 449,
            "tmates": 249,
            "tonik-wellness": 349,
            "trimi": 235,
            "trimrx": 249,
            "weightwatchers": 349,
            "wellorithm": 249,
            "willow": 524,
            "yucca-health": 325,
            "zealthy": 216
          },
          "source": "src/data/providers.ts",
          "derivedBy": "the highest `price` inside the provider's own `pricingTiers` array, the top of the monthly range that program publishes for itself. Providers declaring no pricingTiers are absent, not defaulted",
          "asOf": "2026-08-10"
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
          "asOf": "2026-08-10"
        }
      },
      "unanchored": {
        "pagesPublished": {
          "state": "no-anchor",
          "reason": "No anchor file states a total page count. The number is a property of the rendered sitemap, which needs a build, and no sitemap snapshot is committed anywhere the generator can read. Sum the route families instead (providerCount + comparisonPageCount + stateGuideCount + blogPostCount) and say which families you summed, or state no total.",
          "asOf": "2026-08-10"
        },
        "pagesIndexed": {
          "state": "no-anchor",
          "reason": "Indexed-page counts come from Search Console, not from an anchor. barque/data/gsc/glp1picks.json holds the pages report; it measures pages with impressions, which is a different quantity from pages published, and it is a dated reading rather than a canonical fact.",
          "asOf": "2026-08-10"
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
          "asOf": "2026-08-10"
        },
        "affiliatePartnerCount": {
          "value": 6,
          "source": "src/data/providers.ts",
          "derivedBy": "providers whose affiliateUrl carries a tracking domain, mirroring isAffiliatePartner() in the anchor",
          "asOf": "2026-08-10"
        },
        "womensWingCount": {
          "value": 13,
          "source": "src/data/providers.ts",
          "derivedBy": "providers with wing \"women\" or \"both\"",
          "asOf": "2026-08-10"
        },
        "mensWingCount": {
          "value": 5,
          "source": "src/data/providers.ts",
          "derivedBy": "providers with wing \"men\" or \"both\"",
          "asOf": "2026-08-10"
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
          "asOf": "2026-08-10"
        },
        "providerNames": {
          "value": {
            "alloy": "Alloy",
            "defy-medical": "Defy Medical",
            "elektra-health": "Elektra Health",
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
          "asOf": "2026-08-10"
        },
        "providerScores": {
          "value": {
            "alloy": 8.9,
            "defy-medical": 7.6,
            "elektra-health": 7.0,
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
          "asOf": "2026-08-10"
        },
        "providerGrades": {
          "value": {
            "alloy": "A",
            "defy-medical": "C",
            "elektra-health": "B",
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
          "asOf": "2026-08-10"
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
          "asOf": "2026-08-10"
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
          "asOf": "2026-08-10"
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
          "asOf": "2026-08-10"
        },
        "pcacDocketCount": {
          "value": 7,
          "source": "src/data/peptides.ts",
          "derivedBy": "peptides carrying a pcacVote record",
          "asOf": "2026-08-10"
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
          "asOf": "2026-08-10"
        },
        "meow1ReadoutWindow": {
          "value": "Summer 2027",
          "source": "src/data/pipeline.ts",
          "derivedBy": "readoutWindow of the okv-119 programme, whose trialName is MEOW-1",
          "asOf": "2026-08-10"
        },
        "readoutWindows": {
          "value": {
            "aks-562c": "H2 2026",
            "loy-002": "Company-projected launch before end of 2026",
            "okv-119": "Summer 2027"
          },
          "source": "src/data/pipeline.ts",
          "derivedBy": "readoutWindow per programme slug",
          "asOf": "2026-08-10"
        },
        "trialNames": {
          "value": {
            "okv-119": "MEOW-1"
          },
          "source": "src/data/pipeline.ts",
          "derivedBy": "trialName per programme slug",
          "asOf": "2026-08-10"
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
          "asOf": "2026-08-10"
        },
        "priceMonthlyUsd": {
          "value": 9.99,
          "source": "lib/constants.ts",
          "derivedBy": "PRICE_MONTHLY_USD",
          "asOf": "2026-08-10"
        },
        "priceYearlyUsd": {
          "value": 49.99,
          "source": "lib/constants.ts",
          "derivedBy": "PRICE_YEARLY_USD",
          "asOf": "2026-08-10"
        },
        "trialDays": {
          "value": 7,
          "source": "lib/constants.ts",
          "derivedBy": "TRIAL_DAYS",
          "asOf": "2026-08-10"
        },
        "appStoreId": {
          "value": "6766338584",
          "source": "lib/constants.ts",
          "derivedBy": "APP_STORE_ID",
          "asOf": "2026-08-10"
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
          "asOf": "2026-08-10"
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
