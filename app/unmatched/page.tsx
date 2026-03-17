import victims from "../../data/victims.json";
import type { Victim } from "@/types/victim";
import Link from "next/link";
import UnmatchedSearch from "@/components/UnmatchedSearch";
import ArchiveSubmissionButton from "@/components/ArchiveSubmissionButton";

type VictimWithDebug = Victim & {
  _debug_location?: string | null;
  _debug_match_method?: string;
};

export default function UnmatchedPage() {
  const records = (victims as VictimWithDebug[]).filter(
    (person) => person._debug_match_method === "unmatched"
  );

  return (
    <div id="top" className="min-h-screen bg-[#050505] text-white">
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
            Archive Diagnostics
          </p>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
                Unmatched Province Cases
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">
                These records could not yet be matched to a known province in
                the archive pipeline and require manual review.
              </p>
            </div>

            <div className="w-full max-w-xs rounded-3xl border border-amber-400/15 bg-amber-400/10 p-6 shadow-[0_0_50px_rgba(251,191,36,0.06)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Needs review
              </p>
              <p className="mt-3 text-5xl font-bold tracking-tight text-amber-300">
                {records.length}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Search across all unmatched records.
              </p>
            </div>
          </div>
        </div>

        <UnmatchedSearch records={records} />

        <div className="mt-16 flex justify-center">
        <a
            href="#top"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
        >
            ↑ Back to top
        </a>
        </div>

        <section className="mt-20 border-t border-white/10 pt-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-zinc-500">
              Help Improve the Archive
            </p>

            <h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
              Have information about one of these cases?
            </h2>

            <p className="mx-auto max-w-xl leading-7 text-zinc-400">
              Some records could not yet be matched to a confirmed province.
              If you recognize a person listed here or know their correct
              hometown or province, please contact us so we can update the
              archive and preserve the record accurately.
            </p>

            <ArchiveSubmissionButton
              mode="correction"
              buttonLabel="Suggest a Correction"
              className="mt-8 inline-block rounded-full border border-amber-400/25 bg-amber-500/10 px-8 py-3 text-sm font-semibold text-amber-200 backdrop-blur-sm transition hover:border-amber-300/40 hover:bg-amber-500/15"
            />

            <p className="mt-4 text-xs text-zinc-500">
              Or email us directly: alo@atlasofiran.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}