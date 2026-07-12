import DeskScene from "./DeskScene";

// ============================================================
//  DESK PAGE
// ============================================================
//  Mobile (< md): a plain vertical card list of destinations.
//  Desktop (md+): the interactive 2D desk scene (DeskScene).
//  The desk's day/night state is local to the scene and does NOT
//  affect the rest of the site.
// ============================================================

const MOBILE_LINKS: { href: string; label: string }[] = [
  { href: "/whiteboard", label: "Whiteboard" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
  { href: "/reading", label: "Books" },
  { href: "/projects", label: "Projects" },
  { href: "/media/games_v2", label: "Games" },
  { href: "/media/movies_v2", label: "Movies" },
  { href: "/media/series_v2", label: "Series" },
];

export default function DeskPage() {
  return (
    <>
      {/* ── MOBILE — vertical card list (< md) ── */}
      <main className="flex min-h-screen flex-col justify-between bg-white p-6 font-inter text-black md:hidden">
        <header className="pt-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Portfolio Navigator
          </h1>
          <p className="mt-1 text-sm text-black/50">
            Pick a destination to explore!
          </p>
        </header>

        <nav className="flex flex-col gap-3 py-8">
          {MOBILE_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="w-full rounded-xl border border-black/15 px-5 py-4 text-lg font-medium transition-colors hover:bg-black/5 active:bg-black/5"
            >
              {label}
            </a>
          ))}
        </nav>

        <footer className="pb-4 text-center">
          <p className="font-patrick text-base text-black/60">
            Tip: open the website on desktop for the full experience!
          </p>
        </footer>
      </main>

      {/* ── DESKTOP — interactive desk scene (md+) ── */}
      <DeskScene />
    </>
  );
}
