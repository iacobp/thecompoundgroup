import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { PortfolioGraph } from "@/components/PortfolioGraph";
import { LedgerCallout } from "@/components/LedgerCallout";
import { PricingAudit } from "@/components/PricingAudit";
import { ResearchFramework } from "@/components/ResearchFramework";
import { BarqueSection } from "@/components/BarqueSection";
import { ThesisBreak } from "@/components/ThesisBreak";
import { Approach } from "@/components/Approach";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream grain">
      <Nav />
      <Hero />
      <Portfolio />
      <PortfolioGraph />
      <LedgerCallout />
      <PricingAudit />
      <ResearchFramework />
      <BarqueSection />
      <ThesisBreak />
      <Approach />
      <Footer />
    </main>
  );
}
