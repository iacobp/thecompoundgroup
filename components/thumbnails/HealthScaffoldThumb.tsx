import Image from "next/image";
import { comparisonScaffolds } from "@/lib/portfolio-development";

/** Actual rendered homepages, including the deployed typography and imagery. */
export function HealthScaffoldThumb({ edition }: { edition: "hair" | "desire" }) {
  const project = comparisonScaffolds.find(item => item.slug === (edition === "hair" ? "hair-index" : "desire-index"))!;
  return <figure>
    <Image src={`/images/health-previews/${edition}.webp`} width={1440} height={1000} sizes="(max-width: 640px) 90vw, 384px" alt={`${project.name} homepage preview with ${edition === "hair" ? "editorial serif typography, portraits and women’s and men’s care pathways" : "editorial typography, a sexual-health topic index and a care-cost tool"}`} className="h-auto w-full rounded-lg border border-border" />
    <figcaption className="mt-2 text-[11px] leading-relaxed text-muted">Homepage preview. Final name undecided.</figcaption>
  </figure>;
}
