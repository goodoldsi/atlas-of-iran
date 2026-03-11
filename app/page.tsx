import Link from "next/link";
import IranMapClient from "@/components/IranMapClient";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.38)_35%,rgba(0,0,0,0.72))]" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center justify-center px-6 py-12 md:py-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-[1120px]">
              <IranMapClient />
            </div>
          </div>

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-zinc-400 md:text-sm">
              Memorial Archive
            </p>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
              Atlas of Iran
            </h1>

            <p className="mb-4 max-w-3xl text-xl leading-relaxed text-zinc-200 md:text-2xl">
              A memorial to the children of Iran who lost their lives while
              demanding freedom, dignity, and basic rights.
            </p>

            <p className="max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
              This archive preserves the names, ages, hometowns, and occupations
              of those killed during protests against the Islamic Republic, so
              their sacrifice remains part of Iran’s historical memory.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/memorial"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Explore Memorial
              </Link>

              <a
                href="#about"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
              >
                About the Archive
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-6 px-6 pb-8 md:-mt-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
            <p className="text-3xl font-bold text-white">2,000+</p>
            <p className="mt-2 text-sm text-zinc-400">Documented individuals</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
            <p className="text-3xl font-bold text-white">Cities Across Iran</p>
            <p className="mt-2 text-sm text-zinc-400">Searchable by hometown</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
            <p className="text-3xl font-bold text-white">Historical Memory</p>
            <p className="mt-2 text-sm text-zinc-400">Names, stories, sacrifice</p>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-t border-white/10 bg-black px-6 py-24 text-center"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Why this archive exists
          </p>

          <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
            Preserving memory against erasure
          </h2>

          <p className="leading-8 text-zinc-400 md:text-lg">
            These were not abstractions. They were students, athletes, parents,
            workers, artists, and doctors. By documenting who they were and
            where they came from, we honor their lives and resist erasure.
          </p>
        </div>
      </section>
    </div>
  );
}