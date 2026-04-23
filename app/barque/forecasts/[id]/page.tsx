import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ForecastArc } from "@/components/barque/ForecastArc";
import { forecasts, getForecastArc } from "@/lib/barque-data";

export function generateStaticParams() {
  return forecasts.map((f) => ({ id: f.id }));
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const arc = getForecastArc(id);
  if (!arc) return { title: "Forecast not found — Barque" };

  const { forecast } = arc;
  const dateLong = new Date(forecast.resolutionDate).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );
  const title = `${forecast.entity} · resolves ${dateLong} — Barque`;
  const description = forecast.prediction.slice(0, 180);

  return {
    title,
    description,
    alternates: { canonical: `/barque/forecasts/${forecast.id}` },
    openGraph: {
      type: "article",
      url: `https://thecompound.group/barque/forecasts/${forecast.id}`,
      title,
      description,
      publishedTime: forecast.dateMade,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BarqueForecastArcPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const arc = getForecastArc(id);
  if (!arc) notFound();

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Nav />
      <ForecastArc arc={arc} />
      <Footer />
    </main>
  );
}
