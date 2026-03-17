"use client";

import { Eye, Heart, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import {
  registerView,
  getStats,
  registerLike,
  submitMemo,
  getApprovedMemos,
} from "@/lib/victimStats";

type ApprovedMemo = {
  id: string;
  memo_text: string;
  created_at: string;
};

export default function VictimStats({ victimId }: { victimId: string }) {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [memos, setMemos] = useState(0);
  const [liked, setLiked] = useState(false);
  const [memoOpen, setMemoOpen] = useState(false);
  const [memoText, setMemoText] = useState("");
  const [memoSent, setMemoSent] = useState(false);
  const [memoError, setMemoError] = useState("");
  const [approvedMemos, setApprovedMemos] = useState<ApprovedMemo[]>([]);

  useEffect(() => {
    async function load() {
      const viewedKey = `viewed-${victimId}`;
      const likedKey = `liked-${victimId}`;

      const memoList = await getApprovedMemos(victimId);
      setApprovedMemos(memoList);

      if (!localStorage.getItem(viewedKey)) {
        await registerView(victimId);
        localStorage.setItem(viewedKey, "true");
      }

      if (localStorage.getItem(likedKey)) {
        setLiked(true);
      }

      const stats = await getStats(victimId);
      setViews(stats.view_count);
      setLikes(stats.like_count);
      setMemos(stats.memo_count);
    }

    load();
  }, [victimId]);

  async function handleLike(e: React.MouseEvent) {
    e.stopPropagation();

    if (liked) return;

    const newLikes = await registerLike(victimId);
    setLikes(newLikes);
    setLiked(true);
    localStorage.setItem(`liked-${victimId}`, "true");
  }

  async function handleMemoSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMemoError("");
    setMemoSent(false);

    const memoKey = `memo-submitted-${victimId}`;

    if (localStorage.getItem(memoKey)) {
      setMemoError("You already submitted a memo for this record.");
      return;
    }

    const result = await submitMemo(victimId, memoText);

    if (!result.ok) {
      setMemoError(
        result.reason === "spam"
          ? "Memo blocked. Keep it short, respectful, and without links."
          : "Could not submit memo."
      );
      return;
    }

    localStorage.setItem(memoKey, "true");
    setMemoText("");
    setMemoSent(true);
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="mt-4 flex gap-5 text-sm items-center">

        <span className="flex items-center gap-1 text-zinc-400">
            <Eye size={16} className="text-zinc-500"/>
            {views}
        </span>

        <button
            type="button"
            onClick={handleLike}
            disabled={liked}
            className="flex items-center gap-1 text-zinc-400 transition hover:text-red-300"
        >
            <Heart 
            size={16} 
            className={liked ? "text-red-400" : "text-zinc-500"}
        />
        {likes}
        </button>

        <button
            type="button"
            onClick={() => setMemoOpen(true)}
            className="flex items-center gap-1 text-zinc-400 transition hover:text-cyan-300"

        >
            <Flame size={16} className="text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
            {memos}
        </button>

        </div>

      {memoOpen && (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4"
            onClick={() => setMemoOpen(false)}
        >
            <div
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#101010] p-5 shadow-[0_0_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
            >
            <div className="mb-4 flex items-center justify-between">
                <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Memorial notes
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white">
                    {approvedMemos.length} note{approvedMemos.length === 1 ? "" : "s"}
                </h3>
                </div>

                <button
                type="button"
                onClick={() => setMemoOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition hover:bg-white/10 hover:text-white"
                >
                Close
                </button>
            </div>

            <div className="max-h-[260px] space-y-2 overflow-y-auto rounded-2xl border border-white/8 bg-black/20 p-3">
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#101010] to-transparent" />
                {approvedMemos.length > 0 ? (
                approvedMemos.map((memo) => (
                    <div
                    key={memo.id}
                    className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2 text-sm leading-6 text-zinc-300"
                >
                    <div className="flex items-start justify-between gap-3">
                    <span>{memo.memo_text}</span>

                    <span className="shrink-0 text-[11px] text-cyan-400/80">
                        {new Date(memo.created_at).toLocaleDateString()}
                    </span>
                    </div>
                </div>
                ))
                ) : (
                <p className="text-sm text-zinc-500">
                    No approved memorial notes yet.
                </p>
                )}
            </div>

            <form
                onSubmit={handleMemoSubmit}
                className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-zinc-500">
                Write a short memorial sentence
                </label>

                <textarea
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
                maxLength={50}
                rows={3}
                placeholder="Write a short memorial sentence..."
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                />

                <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-zinc-500">{memoText.length}/50</span>

                <button
                    type="submit"
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/15"
                >
                    Send memo
                </button>
                </div>

                {memoError && (
                <p className="mt-3 text-xs text-rose-400">{memoError}</p>
                )}

                {memoSent && (
                <p className="mt-3 text-xs text-emerald-400">
                    Memo submitted for review.
                </p>
                )}
            </form>
            </div>
        </div>
        )}
    </div>
  );
}