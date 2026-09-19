import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpenSEO Private",
  description: "A private SEO workspace operated by The Compound Group.",
  alternates: { canonical: "/open-seo" },
};

export default function OpenSeoPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-16 pt-16 sm:px-8 md:pt-24">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)] md:gap-20">
        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-sage">
            Internal SEO workspace
          </p>
          <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            OpenSEO Private
          </h1>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-ink/70">
            The Compound Group uses this self-hosted OpenSEO workspace to review
            search performance, research keywords, inspect backlinks, and audit
            its websites. The workspace is available only to approved team
            members through Cloudflare Access.
          </p>
        </div>
        <div className="border-t border-sage/50 pt-5 md:mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage">
            Google Search Console and Analytics
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            With account consent, OpenSEO Private reads Search Console data for
            verified sites and Google Analytics 4 data for selected properties.
            This includes search performance, traffic, and engagement reports.
            Both connections request read-only access.
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-ink/15 pt-8 md:mt-24">
        <p className="max-w-[68ch] leading-relaxed text-ink/70">
          Learn how the workspace handles Google data in our{" "}
          <Link href="/open-seo/privacy" className="text-sage underline underline-offset-4">
            privacy policy
          </Link>{" "}
          and review the{" "}
          <Link href="/open-seo/terms" className="text-sage underline underline-offset-4">
            terms of use
          </Link>
          . For access or data questions, email{" "}
          <a href="mailto:iacobpastina@gmail.com" className="text-sage underline underline-offset-4">
            iacobpastina@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
