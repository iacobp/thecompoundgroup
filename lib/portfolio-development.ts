// Public development inventory. These are working identities, not live domains
// or evidence of an activated affiliate business.
export const comparisonScaffolds = [
  { slug: "nad-index", name: "NAD Index", focus: "NAD & longevity", description: "NAD product and provider comparisons, with formulation differences, payment terms and evidence kept distinct." },
  { slug: "hair-index", name: "Hair Index", focus: "Hair care", description: "Hair-care plan and product comparisons, separating prescription care from cosmetic scalp products and their refill costs." },
  { slug: "desire-index", name: "Desire Index", focus: "Sexual health", description: "The existing sexual-health project, extended with product-specific care, access and cost comparisons for distinct concerns." },
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
