export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted mb-4">
              <span className="inline-block h-px w-8 bg-ink/40" />
              <span>Contact</span>
            </div>
            <h2 className="font-display text-ink text-[36px] md:text-[48px] leading-[1.05] tracking-snug mb-6">
              Press, partnerships,{" "}
              <em className="italic text-sage">and acquisitions.</em>
            </h2>
            <p className="text-[16px] leading-[1.6] text-ink/70 max-w-[44ch] mb-6">
              Operated by Arsenal Productions SRL (Romania). Single operator
              with AI-assisted teams across engineering, content, and growth.
            </p>
            <a
              href="mailto:hello@thecompound.group"
              className="font-display italic text-ink text-[24px] md:text-[28px] link-line"
            >
              hello@thecompound.group
            </a>
          </div>

          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-4">
              Portfolio
            </div>
            <ul className="space-y-3 text-[15px] text-ink/75">
              <li>
                <a
                  href="https://glp1picks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line hover:text-ink"
                >
                  GLP-1 Picks ↗
                </a>
              </li>
              <li>
                <a href="/tracker" className="link-line hover:text-ink">
                  GLP-1 Tracker
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-muted">
          <div>© {year} The Compound Group · Arsenal Productions SRL</div>
          <div className="font-display italic">
            Consumer health, built honestly.
          </div>
        </div>
      </div>
    </footer>
  );
}
