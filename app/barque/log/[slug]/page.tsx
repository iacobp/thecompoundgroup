import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BriefRenderer } from "@/components/barque/BriefRenderer";
import { briefs, getBriefBySlug } from "@/lib/barque-briefs";

export function generateStaticParams() {
  return briefs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const brief = getBriefBySlug(slug);
  if (!brief) return { title: "Brief not found — Barque" };

  const dateLong = new Date(brief.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const title = `Dawn Brief · ${dateLong} — Barque`;
  const description =
    brief.plainEnglish[0]?.slice(0, 180) ??
    brief.metaCognition[0]?.slice(0, 180) ??
    `Ra's ${brief.kind} run for ${dateLong}.`;

  return {
    title,
    description,
    alternates: { canonical: `/barque/log/${brief.slug}` },
    openGraph: {
      type: "article",
      url: `https://thecompoundgroup.com/barque/log/${brief.slug}`,
      title,
      description,
      publishedTime: brief.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BarqueBriefPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const brief = getBriefBySlug(slug);
  if (!brief) notFound();

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Nav />
      <BriefRenderer brief={brief} />
      <Footer />
    </main>
  );
}
