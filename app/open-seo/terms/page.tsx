import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenSEO Private terms of use",
  description: "Terms for The Compound Group's private SEO workspace.",
  alternates: { canonical: "/open-seo/terms" },
};

export default function OpenSeoTermsPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-16 pt-16 sm:px-8 md:pt-24">
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-sage">
        OpenSEO Private · Updated 19 September 2026
      </p>
      <h1 className="max-w-[16ch] font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
        Terms of use
      </h1>
      <div className="mt-12 max-w-[70ch] space-y-10 leading-relaxed text-ink/75">
        <section>
          <h2 className="mb-3 font-display text-2xl text-ink">Who may use it?</h2>
          <p>
            OpenSEO Private is an internal workspace operated by The Compound
            Group. Only people specifically approved through Cloudflare Access
            may use it. Access is not offered as a public service.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-2xl text-ink">Connected accounts</h2>
          <p>
            Authorized users should connect only Google Search Console sites
            and Google Analytics 4 properties they have permission to access.
            They may revoke either Google connection through their Google
            Account settings. The workspace uses read-only scopes to show
            reports and does not use those grants to modify the sites or
            Analytics properties.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-2xl text-ink">Reports and availability</h2>
          <p>
            Search and research data may be delayed, incomplete, or changed by
            its source. Reports are working material for internal review, not
            a promise of rankings or traffic. Access may be changed or ended
            by The Compound Group.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-2xl text-ink">Questions</h2>
          <p>
            Contact{" "}
            <a className="text-sage underline underline-offset-4" href="mailto:iacobpastina@gmail.com">
              iacobpastina@gmail.com
            </a>{" "}
            about access or these terms. Our{" "}
            <a className="text-sage underline underline-offset-4" href="/open-seo/privacy">
              privacy policy
            </a>{" "}
            explains how Google data is handled.
          </p>
        </section>
      </div>
    </main>
  );
}
