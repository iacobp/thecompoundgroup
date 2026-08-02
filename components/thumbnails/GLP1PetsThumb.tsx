import { anchors } from "@/lib/generated/anchors";

// The readout window and the trial name both come from the glp1pets
// pipeline anchor. This card published a readout a full year earlier than the
// anchor carries, which was the most-repeated wrong fact on the site.
const pets = anchors.products.glp1pets.facts;
const readouts = pets.readoutWindows.value as Record<string, string>;
const trialNames = pets.trialNames.value as Record<string, string>;

/**
 * Editorial thumbnail for GLP-1 Pets — a stylized browser view of the
 * pet GLP-1 trial tracker hero. Designed to feel like the live site
 * without being a screenshot.
 */
export function GLP1PetsThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#FBF8EE]">
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 h-9 bg-[#F1ECE1] border-b border-[#E3DED1] flex items-center gap-1.5 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <div className="mx-auto -translate-x-4 flex items-center gap-1.5 text-[10px] text-ink/60 font-mono">
          <span>🔒</span>
          <span>glp1pets.com</span>
        </div>
      </div>

      {/* Page content */}
      <div className="absolute inset-x-0 top-9 bottom-0 px-6 pt-6 pb-4 flex flex-col items-center text-center">
        {/* Verification pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#3B5D4F]/30 bg-white/80 px-2.5 py-1 mb-3">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-[#3B5D4F] opacity-60 animate-ping" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#3B5D4F]" />
          </span>
          <span className="text-[7px] uppercase tracking-[0.18em] text-[#3B5D4F] font-semibold">
            Independently verified · April 2026
          </span>
        </div>

        {/* Tagline */}
        <div className="text-[7px] uppercase tracking-[0.22em] text-[#8B6F47] font-semibold mb-3">
          Cats first · Dogs next
        </div>

        {/* Headline */}
        <div className="font-display italic text-ink text-[15px] leading-[1.05] mb-1.5">
          Pet GLP-1 — what&apos;s real,
        </div>
        <div className="font-display italic text-ink text-[15px] leading-[1.05] mb-3">
          what&apos;s coming, what to do now.
        </div>

        {/* Subhead */}
        <div className="text-[8px] text-ink/55 leading-[1.5] max-w-[36ch] mb-3">
          The independent tracker for veterinary GLP-1 drugs. Okava&apos;s{" "}
          {trialNames["okv-119"]} cat trial reads out{" "}
          {readouts["okv-119"].toLowerCase()}.
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#8B6F47] text-white text-[8px] font-medium">
            Cats: Where the Science Is →
          </div>
          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-ink/10 text-ink/70 text-[8px] font-medium">
            Dogs: The Honest Status →
          </div>
        </div>

        {/* From-the-team byline */}
        <div className="mt-auto text-[7px] text-ink/40 italic">
          From the team behind GLP-1 Picks
        </div>
      </div>
    </div>
  );
}
