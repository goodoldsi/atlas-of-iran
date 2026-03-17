import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <h1 className="mb-4 text-4xl font-bold">No records found</h1>
      <p className="mb-8 max-w-xl text-zinc-400">
        This province does not yet have entries in the current archive dataset.
      </p>
      <Link
        href="/"
        className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
      >
        Return to map
      </Link>
    </div>
  );
}