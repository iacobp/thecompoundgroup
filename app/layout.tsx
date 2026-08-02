import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { anchorValue } from "@/lib/generated/anchors";

/**
 * Display: Fraunces — variable editorial serif (optical size + SOFT axis).
 *   The free-but-premium alternative to Tiempos / Canela used by Function
 *   Health, Redesign Health, Hone Health, Forerunner Ventures.
 * Body: Inter — restrained grotesque, sits quietly under the display.
 */
const display = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://thecompoundgroup.com";
const siteName = "The Compound Group";
const description =
  "A consumer biotech media studio building honest comparison tools, trackers, and editorial across GLP-1, HRT, peptides, supplements, neuroscience, and pet health. Portfolio includes GLP-1 Picks, HRT Picks, GLP-1 Pets, Titrate, Revolume, and Best Peptide For That.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Search Console ownership. DNS for this domain is at Namecheap, not Vercel,
  // so the TXT route needs the registrar; this meta tag verifies the
  // URL-prefix property without touching DNS. The other five properties are
  // sc-domain, verified by TXT. Do not remove: losing verification silently
  // cuts the mother site off from the only search data the ledger can publish.
  verification: { google: "u84Fhczettf5mDUQTYTICbP1VZYBqJ83NiQ-DxSUIas" },
  title: {
    default: `${siteName} — Consumer biotech, built honestly`,
    template: `%s — ${siteName}`,
  },
  description,
  keywords: [
    "consumer biotech",
    "consumer biotech media",
    "consumer biotech studio",
    "consumer biotech infrastructure",
    "consumer health",
    "health studio",
    "health holding company",
    "GLP-1",
    "GLP-1 comparison",
    "GLP-1 telehealth",
    "HRT comparison",
    "HRT telehealth",
    "menopause telehealth",
    "peptide tracker",
    "health venture studio",
  ],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${siteName} — Consumer biotech, built honestly`,
    description,
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Consumer biotech, built honestly`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Compound Group",
  alternateName: "CG",
  url: siteUrl,
  description,
  foundingDate: "2026",
  subOrganization: [
    {
      "@type": "Organization",
      name: "GLP-1 Picks",
      url: "https://glp1picks.com",
      description: "Independent GLP-1 telehealth provider comparison.",
    },
    {
      "@type": "Organization",
      name: "HRT Picks",
      url: "https://hrtpicks.com",
      description:
        `Independent comparison of HRT and TRT telehealth providers. ${anchorValue(
          "hrtpicks",
          "providerCount",
        )} providers scored on a five-dimension methodology, with a Price Transparency Grade (A to F) and verified prices on every page.`,
    },
    {
      "@type": "Organization",
      name: "GLP-1 Pets",
      url: "https://glp1pets.com",
      description:
        "Independent tracker for veterinary GLP-1 weight loss drugs — Okava MEOW-1 cat trial, Akston AKS-562c at Cornell, the canine pipeline.",
    },
    {
      "@type": "Organization",
      name: "Titrate",
      url: "https://titrate.health",
      description:
        "Peptide and GLP-1 multi-compound tracker for iOS with reconstitution calculator and decision support. Live on the App Store since May 2026.",
    },
    {
      "@type": "Organization",
      name: "Revolume",
      url: "https://revolume.app",
      description:
        "Private on-device skin scan for GLP-1 users, reading the markers specific to post-rapid-weight-loss facial change.",
    },
    {
      "@type": "Organization",
      name: "Best Peptide For That",
      url: "https://bestpeptideforthat.com",
      description:
        `Evidence-graded index of ${anchorValue(
          "bestpeptideforthat",
          "peptideCount",
        )} research peptides, scored A to F by human proof, with each compound's legal status and the July 2026 FDA vote tracked. Cited to primary sources.`,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
