import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { anchorValue } from "@/lib/generated/anchors";
import { developmentProjects } from "@/lib/portfolio-development";

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
  "A consumer health studio behind GLP-1 Picks, HRT Picks and Best Peptide For That. Evidence, provider prices and practical tools, with specialist comparison sites in development.";

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
  "@id": `${siteUrl}/#organization`,
  name: "The Compound Group",
  alternateName: "CG",
  url: siteUrl,
  description,
  foundingDate: "2026",
  founder: {
    "@type": "Person",
    "@id": `${siteUrl}/#iacob-pastina`,
    name: "Iacob Pastina",
    jobTitle: "Independent Researcher & Publisher",
    sameAs: [
      "https://www.linkedin.com/in/iacob-pa%C8%99tina-781743133/",
      "https://github.com/iacobp",
    ],
  },
  subOrganization: [
    {
      "@type": "Organization",
      name: "GLP-1 Picks",
      url: "https://glp1picks.com",
      description: "Independent reviews of approved GLP-1 telehealth partners, comparing costs, care and transparency.",
    },
    {
      "@type": "Organization",
      name: "HRT Picks",
      url: "https://hrtpicks.com",
      description:
        "Approved hormone telehealth affiliate partners compared through separate menopause HRT and men's TRT journeys, with treatment finders, cost and insurance guidance, provider reviews and transparency grades.",
    },
    {
      "@type": "Organization",
      name: "GLP-1 Pets",
      url: "https://www.glp1pets.com",
      description:
        "Independent pet GLP-1 trial tracker with dog and cat body-condition tools and a dog food portion and cost calculator.",
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
        `Goal-led comparison directory of ${anchorValue(
          "bestpeptideforthat",
          "peptideCount",
        )} compounds including GLP-1, with separate evidence and provider comparisons, sourced advertised prices, missing-term labels and a plan-cost calculator. Affiliate activation is pending.`,
    },
    ...developmentProjects.map((project) => ({
      "@type": "Organization",
      name: project.name,
      description: `${project.stage} stage, not publicly launched. Working project identity. ${project.description}`,
    })),
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
