import type { Metadata } from "next";
import { Atlas } from "@/components/Atlas";

export const metadata: Metadata = {
  title: "The Atlas",
  description:
    "An illustrated walkable map of The Compound — the studio, its live products, in-development properties, planned frontier, and the public methodology and editorial standards every district inherits.",
  openGraph: {
    title: "The Atlas — The Compound Group",
    description:
      "Walk the studio's universe — districts for GLP-1 Picks, Titrate, Revolume, the methodology library, the editorial hall, and the planned frontier.",
  },
};

export default function AtlasPage() {
  return <Atlas />;
}
