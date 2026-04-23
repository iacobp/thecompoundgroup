import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StarfieldHero } from "@/components/barque/StarfieldHero";
import { LiveForecasts } from "@/components/barque/LiveForecasts";
import { TrackRecord } from "@/components/barque/TrackRecord";
import { Methodology } from "@/components/barque/Methodology";
import { DawnBriefsPreview } from "@/components/barque/DawnBriefsPreview";
import { EmailCapture } from "@/components/barque/EmailCapture";

const title = "Barque — Cross-signal forecasting for The Compound";
const description =
  "Barque is the research engine behind every Compound decision. A cross-signal forecasting protocol that reads weak signals, fuses them across domains, and returns falsifiable, Brier-scored forecasts.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/barque" },
  openGraph: {
    type: "website",
    url: "https://thecompound.group/barque",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function BarquePage() {
  return (
    <main className="min-h-screen bg-ink">
      <Nav variant="dark" />
      {/* Hero — identity. */}
      <StarfieldHero />
      {/* Live state — what we're predicting right now. Freshest data. */}
      <LiveForecasts />
      {/* Today's thinking — most recent brief. Rewards engaged readers with the newest signal. */}
      <DawnBriefsPreview />
      {/* Credibility — calibration proof from historical + live resolutions. */}
      <TrackRecord />
      {/* Explanation — how the council operates. Answers "how do we trust this?" */}
      <Methodology />
      {/* CTA at the end. */}
      <EmailCapture />
      <Footer />
    </main>
  );
}
