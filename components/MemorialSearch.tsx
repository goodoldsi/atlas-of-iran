"use client";

import { useMemo, useState } from "react";
import type { Victim } from "@/types/victim";
import VictimStats from "@/components/VictimStats";
import VictimMemorialCard from "@/components/VictimMemorialCard";

type Props = {
  records: Victim[];
};

const PAGE_SIZE = 100;

export default function MemorialSearch({ records }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredRecords = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return records;

    return records.filter((person) => {
      return (
        person.full_name.toLowerCase().includes(q) ||
        String(person.city ?? "").toLowerCase().includes(q) ||
        String(person.province ?? "").toLowerCase().includes(q) ||
        String(person.age ?? "").includes(q) ||
        String(person.date_of_death ?? "").toLowerCase().includes(q) ||
        String(person.occupation ?? "").toLowerCase().includes(q)
      );
    });
  }, [records, query]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const startIndex = (safePage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by location, name, age, date, or profession..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-zinc-500 outline-none shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-xl transition focus:border-red-300/30 focus:bg-white/10"
        />
      </div>

      <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-red-300/20 to-transparent" />

      <div className="mb-6 text-sm text-zinc-400">
        Showing records {filteredRecords.length === 0 ? 0 : startIndex + 1}–
        {Math.min(endIndex, filteredRecords.length)} of {filteredRecords.length}.
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedRecords.map((person) => (
          <VictimMemorialCard key={person.id} person={person} />
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-3">
        {safePage > 1 ? (
          <button
            onClick={() => setPage(safePage - 1)}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Previous
          </button>
        ) : (
          <span className="rounded-full border border-white/5 bg-white/5 px-5 py-2 text-sm text-zinc-600">
            Previous
          </span>
        )}

        <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300">
          Page {safePage} of {totalPages}
        </span>

        {safePage < totalPages ? (
          <button
            onClick={() => setPage(safePage + 1)}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Next
          </button>
        ) : (
          <span className="rounded-full border border-white/5 bg-white/5 px-5 py-2 text-sm text-zinc-600">
            Next
          </span>
        )}
      </div>
    </>
  );
}