export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-400">
          Memorial Archive
        </p>

        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
          Atlas of Iran
        </h1>

        <p className="mb-4 max-w-3xl text-xl text-zinc-300 md:text-2xl">
          A memorial to the children of Iran who lost their lives while demanding
          freedom, dignity, and basic rights.
        </p>

        <p className="max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
          This archive preserves the names, ages, hometowns, and occupations of
          those killed during protests against the Islamic Republic, so their
          sacrifice remains part of Iran’s historical memory.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#memorial"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Explore Memorial
          </a>
          <a
            href="#about"
            className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            About the Archive
          </a>
        </div>

        <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-3xl font-bold">2,000+</p>
            <p className="mt-2 text-sm text-zinc-400">Documented individuals</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-3xl font-bold">Cities Across Iran</p>
            <p className="mt-2 text-sm text-zinc-400">Searchable by hometown</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-3xl font-bold">Historical Memory</p>
            <p className="mt-2 text-sm text-zinc-400">Names, stories, sacrifice</p>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-t border-zinc-800 bg-black px-6 py-20 text-center"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-semibold">Why this archive exists</h2>
          <p className="leading-8 text-zinc-400">
            These were not abstractions. They were students, athletes, parents,
            workers, artists, and doctors. By documenting who they were and where
            they came from, we honor their lives and resist erasure.
          </p>
        </div>
      </section>
    </main>
  );
}