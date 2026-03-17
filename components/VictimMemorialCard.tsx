"use client";

import { useState } from "react";
import type { Victim } from "@/types/victim";
import VictimStats from "@/components/VictimStats";

type Props = {
  person: Victim;
};

export default function VictimMemorialCard({ person }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="perspective-[1200px]">
      <div
        className={`relative min-h-[420px] rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <article className="absolute inset-0 rounded-3xl border border-white/10 bg-white/5 px-5 py-5 text-white shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-xl [backface-visibility:hidden]">
          <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            {person.verification_status}
          </p>

          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
            {person.full_name}
          </h2>

          <div className="mt-5 border-t border-white/8 pt-4 text-sm leading-7 text-zinc-400">
            <p>
              <span className="text-zinc-500">Age:</span> {person.age ?? "Unknown"}
            </p>
            <p>
              <span className="text-zinc-500">City:</span> {person.city ?? "Unknown"}
            </p>
            <p>
              <span className="text-zinc-500">Province:</span> {person.province ?? "Unknown"}
            </p>
            <p>
              <span className="text-zinc-500">Occupation:</span> {person.occupation ?? "Unknown"}
            </p>
            <p>
              <span className="text-zinc-500">Date:</span> {person.date_of_death ?? "Unknown"}
            </p>
          </div>

          <p className="mt-5 border-t border-white/8 pt-4 text-sm leading-7 text-zinc-400">
            {person.short_bio}
          </p>

          <button
            type="button"
            onClick={() => setFlipped(true)}
            className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
            Turn
            </button>
        </article>

        <article className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-5 text-white shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
              Memorial Interaction
            </p>

            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
              {person.full_name}
            </h2>

            <p className="text-sm leading-7 text-zinc-400">
              A digital place of remembrance.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4">
            <VictimStats victimId={person.id} />
          </div>

          <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-600">
            <span>Memorial card</span>

            <button
                type="button"
                onClick={() => setFlipped(false)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
                Return
            </button>
            </div>
        </article>
      </div>
    </div>
  );
}