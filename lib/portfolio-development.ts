// Public development inventory. These are working identities, not live domains
// or evidence of an activated affiliate business.
export const comparisonScaffolds = [
  { slug: "hair-index", name: "Hair loss", focus: "Women & men", description: "Hair-loss care comparisons with separate pathways for women and men, provider research and a recurring-cost calculator. Final name undecided." },
  { slug: "desire-index", name: "Sexual health", focus: "ED & sexual health", description: "Sexual-health comparisons starting with ED, with separate research paths for premature ejaculation and women's low desire. Final name undecided." },
  { slug: "skin-index", name: "Skin Index", focus: "Skin & copper peptides", description: "Topical peptide skincare comparisons organized around product labels, bottle size, delivered cost and cosmetic claims." },
  { slug: "recovery-index", name: "Recovery Index", focus: "Recovery & muscle", description: "Recovery-related care and product comparisons, with research evidence separated from verified commercial options." },
  { slug: "neuroscience-index", name: "Neuroscience Index", focus: "Cognitive products", description: "Cognitive product labels, evidence and recurring costs, keeping supplements and investigational compounds distinct." },
  { slug: "sleep-index", name: "Sleep Index", focus: "Sleep products & care", description: "Sleep-related product and service comparisons, covering purchase terms, evidence and trial or return conditions." },
  { slug: "supplement-index", name: "Supplement Index", focus: "Nutritional products", description: "Supplement comparisons based on disclosed ingredients, container sizes, testing information and purchase terms." },
] as const;

export const developmentProjects = [
  ...comparisonScaffolds.map((project) => ({ ...project, stage: "Scaffold" as const })),
  {
    slug: "neuroplasticity-lab",
    name: "Neuroplasticity Lab",
    focus: "Training & tools",
    description: "A separate planned comparison project for cognitive apps, devices and training tools. It complements Neuroscience Index rather than duplicating its supplement scope.",
    stage: "Planned" as const,
  },
];

export const developmentNames = comparisonScaffolds.map((project) => project.name).join(", ");
