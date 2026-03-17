import Link from "next/link";
import MemorialSearch from "@/components/MemorialSearch";
import type { Victim } from "@/types/victim";
import victims from "../../data/victims.json";

export default function MemorialPage() {
  const records = victims as Victim[];

  return (
    <div id="top" className="min-h-screen bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_24%)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <span>←</span>
            <span>Back to map</span>
          </Link>
        </div>

        <div className="mb-12 border-b border-white/8 pb-10">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-zinc-500">
            Memorial Archive
          </p>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
                Memorial
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">
                A growing archive of individuals killed during protests in Iran.
                These entries are preserved so their names and stories remain
                part of the historical memory of the nation.
              </p>
            </div>

            <div className="w-full max-w-xs rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_50px_rgba(255,255,255,0.03)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Total documented
              </p>
              <p className="mt-3 text-5xl font-bold tracking-tight text-red-300 drop-shadow-[0_0_20px_rgba(252,165,165,0.18)]">
                {records.length}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Search across the full archive.
              </p>
            </div>
          </div>
        </div>

        <MemorialSearch records={records} />
        <div className="mt-16 flex justify-center">
          <a
            href="#top"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </div>
  );
}