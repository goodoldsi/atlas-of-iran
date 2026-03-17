export default function Candle({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`absolute top-1 ${
        side === "left" ? "-left-8 md:-left-21" : "-right-8 md:-right-21"
      } flex flex-col items-center`}
    >
      <div className="flame" />
      <div className="h-2 w-[2px] bg-zinc-700" />
      <div className="h-10 w-3 rounded-sm bg-zinc-200 shadow-md" />
    </div>
  );
}