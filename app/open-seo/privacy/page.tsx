import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenSEO Private privacy policy",
  description: "How The Compound Group's private SEO workspace handles Google Search Console data.",
  alternates: { canonical: "/open-seo/privacy" },
};

export default function OpenSeoPrivacyPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-16 pt-16 sm:px-8 md:pt-24">
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-sage">
        OpenSEO Private · Updated 19 September 2026
      </p>
      <h1 className="max-w-[16ch] font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
        Privacy policy
      </h1>
      <div className="mt-12 max-w-[70ch] space-y-10 leading-relaxed text-ink/75">
        <section>
          <h2 className="mb-3 font-display text-2xl text-ink">Who operates this workspace?</h2>
          <p>
            The Compound Group operates OpenSEO Private for its own SEO work.
            Access to the dashboard is limited to approved users through
            Cloudflare Access. Questions or deletion requests can be sent to{" "}
            <a className="text-sage underline underline-offset-4" href="mailto:iacobpastina@gmail.com">
              iacobpastina@gmail.com
            </a>.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-2xl text-ink">What Google data do we access?</h2>
          <p>
            If an authorized user connects Google Search Console, the workspace
            requests read-only access to verified properties. It reads property
            details and search performance information such as queries, pages,
            clicks, impressions, click-through rate, and average position. It
            also receives the Google account identity needed to associate the
            connection with the authorized user.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-2xl text-ink">How do we use and protect it?</h2>
          <p>
            We use Google data to display reports in the private dashboard and
            answer requests from authorized agents connected to this workspace.
            OpenSEO stores the Google access and refresh tokens encrypted at
            rest. The application and its database run in our Cloudflare
            account. We do not sell Google data or use it for advertising.
          </p>
          <p className="mt-4">
            When an authorized user asks an AI agent to work with Search Console
            data, the selected information may be provided to the AI service
            used for that request. Separate keyword and backlink research may
            send entered domains or search terms to DataForSEO; this does not
            grant DataForSEO access to the Google account.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-2xl text-ink">How long is it kept?</h2>
          <p>
            We keep the Search Console connection while it is needed for the
            private workspace. An authorized user can revoke access in their
            Google Account settings or ask us to remove the connection and
            associated stored data. Revoking access stops future collection;
            email us if stored data should also be deleted.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-2xl text-ink">Changes</h2>
          <p>
            We will update this page if the workspace changes how it accesses
            or uses Google data. The date above shows the latest revision.
          </p>
        </section>
      </div>
    </main>
  );
}
