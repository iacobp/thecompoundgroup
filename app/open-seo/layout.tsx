import Link from "next/link";

export default function OpenSeoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-[100dvh] bg-cream text-ink">
      <header className="border-b border-ink/15">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="font-display text-lg tracking-tight hover:text-sage">
            The Compound Group
          </Link>
          <span className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
            Private tools
          </span>
        </div>
      </header>
      {children}
      <footer className="mt-20 border-t border-ink/15">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>The Compound Group · OpenSEO Private</span>
          <nav aria-label="OpenSEO information" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/open-seo" className="hover:text-sage">About</Link>
            <Link href="/open-seo/privacy" className="hover:text-sage">Privacy</Link>
            <Link href="/open-seo/terms" className="hover:text-sage">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
