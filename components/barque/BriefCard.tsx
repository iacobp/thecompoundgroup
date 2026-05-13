import Link from "next/link";
import type { Brief } from "@/lib/barque-briefs";
import { renderInlineMarkdown } from "@/lib/barque-markdown";

/**
 * Compact card for the /barque/log index + the DawnBriefsPreview on
 * the main Barque page. Shows the date, kind, headline snippet, and
 * a couple of meta-cognition bullets.
 */
export function BriefCard({ brief }: { brief: Brief }) {
  const teaser = brief.plainEnglish[0] ?? brief.metaCognition[0] ?? "";
  const updateCount = brief.forecastUpdates.length;
  const flaggedCount = brief.forecastUpdates.filter((u) => u.flagged).length;
  const materialMoves = brief.forecastUpdates.filter(
    (u) => Math.abs(u.newProb - u.priorProb) >= 0.01,
  ).length;

  return (
    <Link
      href={`/barque/log/${brief.slug}`}
      className="group block py-8 md:py-10 border-t border-ink/10 transition-colors hover:border-ink/30"
    >
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <div className="col-span-12 md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.22em] text-ink/50 mb-2">
            {brief.kind === "weekly" ? "Weekly edition" : "Daily"} ·{" "}
            {brief.dayOfWeek}
          </div>
          <div className="font-display text-ink text-[22px] md:text-[26px] leading-tight tracking-snug">
            {new Date(brief.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="mt-3 text-[12px] text-ink/55 leading-[1.55]">
            {materialMoves} forecast update{materialMoves === 1 ? "" : "s"}
            {flaggedCount > 0 ? ` · ${flaggedCount} flagged` : ""}
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 md:col-start-4">
          {brief.subtitle ? (
            <div className="font-display italic text-sage-soft text-[15px] md:text-[16px] leading-[1.5] mb-3">
              {brief.subtitle}
            </div>
          ) : null}
          <p className="text-[15px] md:text-[17px] leading-[1.6] text-ink/80 max-w-[58ch]">
            {renderInlineMarkdown(teaser)}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.22em] text-ink/55 group-hover:text-sage-soft transition-colors">
            <span>Read the brief</span>
            <span aria-hidden>→</span>
          </div>
        </div>

        <div className="hidden md:flex col-span-12 md:col-span-1 md:justify-end">
          <div className="font-display italic text-sage-soft text-[18px]">
            {updateCount.toString().padStart(2, "0")}
          </div>
        </div>
      </div>
    </Link>
  );
}
