import type { MetadataRoute } from "next";
import { briefs } from "@/lib/barque-briefs";
import { forecasts, raLog } from "@/lib/barque-data";
import { ledger } from "@/lib/generated/ledger";

/**
 * Sitemap. Every route the site actually serves.
 *
 * Brief and forecast permalinks are derived from the synced `barque/`
 * submodule at build time, so a new dawn brief enters the sitemap on the
 * same deploy that publishes it. Nothing here is hardcoded.
 *
 * `lastModified` is always a real date out of the underlying data (a
 * brief's own date, a forecast's latest Ra run, the date the ledger was
 * generated). Routes with no dated data source ship without a lastmod
 * rather than with a build-time timestamp, which is what made the one
 * URL in the old sitemap look freshly changed on every deploy.
 */

const BASE = "https://thecompoundgroup.com";

/** Ra writes run_date as "YYYY-MM-DD HH:MM UTC" or "YYYY-MM-DD OPERATOR". */
function runDay(runDate: string): string {
  return runDate.slice(0, 10);
}

function latestRunDay(forecastId: string): string | undefined {
  const days = raLog
    .filter((r) => r.forecastId === forecastId)
    .map((r) => runDay(r.runDate))
    .sort();
  return days.length > 0 ? days[days.length - 1] : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const briefDays = briefs.map((b) => b.date).sort();
  const latestBriefDay =
    briefDays.length > 0 ? briefDays[briefDays.length - 1] : undefined;

  const runDays = raLog.map((r) => runDay(r.runDate)).sort();
  const latestRunDayOverall =
    runDays.length > 0 ? runDays[runDays.length - 1] : undefined;

  const homeDays = [latestBriefDay, ledger.generatedAt]
    .filter((d): d is string => Boolean(d))
    .sort();
  const homeDay =
    homeDays.length > 0 ? homeDays[homeDays.length - 1] : undefined;

  return [
    {
      url: `${BASE}/`,
      lastModified: homeDay,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/numbers`,
      lastModified: ledger.generatedAt,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE}/acquisition`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/atlas`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/barque`,
      lastModified: latestBriefDay,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/barque/log`,
      lastModified: latestBriefDay,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE}/barque/forecasts`,
      lastModified: latestRunDayOverall,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...briefs.map((b) => ({
      url: `${BASE}/barque/log/${b.slug}`,
      lastModified: b.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...forecasts.map((f) => ({
      url: `${BASE}/barque/forecasts/${f.id}`,
      lastModified: latestRunDay(f.id) ?? f.dateMade,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
