import Link from "next/link";
import IranMapClient from "@/components/IranMapClient";
import type { Victim } from "@/types/victim";
import victims from "../data/victims.json";
import ArchiveSubmissionButton from "@/components/ArchiveSubmissionButton";
import HeroStars from "@/components/HeroStars";
import Candle from "@/components/Candle";

export default function Home() {
  const allVictims = victims as Victim[];
  const totalVictims = allVictims.length;

  const uniqueCities = new Set(
    allVictims.map((v) => v.city).filter(Boolean)
  ).size;

  const uniqueProvinces = new Set(
    allVictims.map((v) => v.province).filter(Boolean)
  ).size;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_20%,transparent_80%,rgba(239,68,68,0.02))]" />

      <section className="relative overflow-hidden border-b border-white/8 px-44 pt-16 pb-10 md:pt-3">
        <HeroStars />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-2 max-w-5xl text-center">
            <div className="relative inline-block">
              <img
                src="/candle-left.gif"
                alt=""
                className="pointer-events-none absolute -left-18 -top-2 w-22 drop-shadow-[0_0_14px_rgba(255,200,120,0.6)]"
              />

              <img
                src="/candle-right.gif"
                alt=""
                className="pointer-events-none absolute -right-18 -top-2 w-22 drop-shadow-[0_0_14px_rgba(255,200,120,0.6)]"
              />
              <p
                className="nastaliq mb-1 text-xl text-zinc-300 md:text-2xl"
                dir="rtl"
                style={{
                  textShadow:
                    "0 0 10px rgba(255,215,0,0.35), 0 0 10px rgba(255,215,0,0.18)",
                }}
              >
                آرامــــگاه مجازی
              </p>
            </div>

              <p className="mb-2 text-xs uppercase tracking-[0.35em] text-zinc-500 md:text-sm">
                Memorial Archive
              </p>

            <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl">
              Atlas of Iran
            </h1>
            <p
              className="nastaliq mt-3 text-3xl text-red-500 md:text-6xl
              drop-shadow-[0_0_12px_rgba(255,215,0,0.75)]"
              dir="rtl"
            >
              فرزند ایران و جان فدای میهن
            </p>
          </div>

          <div className="mx-auto flex justify-center">
            <div className="w-full max-w-[1220px]">
              <IranMapClient />
            </div>
          </div>

          <div className="-mt-12 flex justify-center">
            <div className="rounded-3xl border border-red-400/15 bg-red-500/10 px-8 py-3 shadow-[0_0_40px_rgba(239,68,68,0.12)] backdrop-blur-xl">
              <p className="text-center text-xs uppercase tracking-[0.35em] text-zinc-400">
                Current documented victims
              </p>
              <p className="mt-2 text-center text-5xl font-bold tracking-tight text-red-300 drop-shadow-[0_0_20px_rgba(252,165,165,0.18)] md:text-6xl">
                {totalVictims}
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-8xl text-center">
            <p className="mb-4 text-xl leading-relaxed text-zinc-200 md:text-2xl">
              A memorial to the children of Iran who lost their lives while
              demanding freedom, dignity, and basic rights.
            </p>

            <p className="mx-auto max-w-4xl text-base leading-8 text-zinc-400 md:text-lg">
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

              <ArchiveSubmissionButton
                mode="missing"
                buttonLabel="Submit Missing Record"
                className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
              />

              <Link
                href="/unmatched"
                className="rounded-full border border-amber-400/20 bg-amber-500/10 px-6 py-3 text-sm font-semibold text-amber-200 backdrop-blur-sm transition hover:border-amber-300/35 hover:bg-amber-500/15"
              >
                Unmatched Province
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
              >
                More About this Archive
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          {/* <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-red-700/20 to-transparent" />
 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.03)] backdrop-blur-xl">
              <p className="text-4xl font-bold tracking-tight text-red-300">
                {totalVictims}
              </p>
              <p className="mt-2 text-sm text-zinc-400">Documented individuals</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.03)] backdrop-blur-xl">
              <p className="text-4xl font-bold tracking-tight text-white">
                {uniqueCities}
              </p>
              <p className="mt-2 text-sm text-zinc-400">Cities represented</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.03)] backdrop-blur-xl">
              <p className="text-4xl font-bold tracking-tight text-white">
                {uniqueProvinces}
              </p>
              <p className="mt-2 text-sm text-zinc-400">Provinces represented</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative border-t border-white/8 px-6 py-24 text-center"
      >
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-zinc-500">
            Why this archive exists
          </p>

          <h2 className="mb-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Preserving memory against erasure
          </h2>

          <div className="mx-auto rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_rgba(255,255,255,0.03)] backdrop-blur-xl">
            <p className="leading-8 text-zinc-400 md:text-lg">
              These were not abstractions. They were students, athletes,
              parents, workers, artists, and doctors. <br/> By documenting who they
              were and where they came from, we honor their lives and resist
              erasure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}