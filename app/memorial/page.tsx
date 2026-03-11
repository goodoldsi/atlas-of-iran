import victims from "../../data/victims.json";

type Victim = {
  id: string;
  slug: string;
  full_name: string;
  age: number | null;
  city: string | null;
  province: string | null;
  occupation: string | null;
  family_role: string | null;
  date_of_death: string | null;
  protest_wave: string;
  short_bio: string;
  source_type: string;
  source_title: string;
  source_url: string;
  verification_status: string;
};

export default function MemorialPage() {
  const records = victims as Victim[];

  return (
    <div className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">
          Memorial Archive
        </p>

        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Memorial</h1>

        <p className="mb-10 max-w-3xl text-zinc-400">
          A growing archive of individuals killed during protests in Iran.
          These entries are preserved so their names and stories remain part of
          the historical memory of the nation.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {records.map((person) => (
            <article
              key={person.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                {person.verification_status}
              </p>

              <h2 className="mb-3 text-2xl font-semibold">
                {person.full_name}
              </h2>

              <div className="space-y-1 text-sm text-zinc-300">
                <p>
                  <span className="text-zinc-500">Age:</span>{" "}
                  {person.age ?? "Unknown"}
                </p>
                <p>
                  <span className="text-zinc-500">City:</span>{" "}
                  {person.city ?? "Unknown"}
                </p>
                <p>
                  <span className="text-zinc-500">Province:</span>{" "}
                  {person.province ?? "Unknown"}
                </p>
                <p>
                  <span className="text-zinc-500">Occupation:</span>{" "}
                  {person.occupation ?? "Unknown"}
                </p>
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-400">
                {person.short_bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}