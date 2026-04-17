import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Metrics } from "@/components/Metrics";
import { PricingAudit } from "@/components/PricingAudit";
import { ResearchFramework } from "@/components/ResearchFramework";
import { ThesisBreak } from "@/components/ThesisBreak";
import { Approach } from "@/components/Approach";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream grain">
      <Nav />
      <Hero />
      <Portfolio />
      <Metrics />
      <PricingAudit />
      <ResearchFramework />
      <ThesisBreak />
      <Approach />
      <Footer />
    </main>
  );
}
