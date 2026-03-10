import Link from "next/link";

type ProvinceDot = {
  name: string;
  slug: string;
  deaths: number;
  x: number;
  y: number;
};

const provinceDots: ProvinceDot[] = [
  { name: "West Azerbaijan", slug: "west-azerbaijan", deaths: 0, x: 205, y: 180 },
  { name: "East Azerbaijan", slug: "east-azerbaijan", deaths: 0, x: 295, y: 145 },
  { name: "Ardabil", slug: "ardabil", deaths: 0, x: 340, y: 120 },
  { name: "Gilan", slug: "gilan", deaths: 0, x: 360, y: 165 },
  { name: "Zanjan", slug: "zanjan", deaths: 0, x: 315, y: 195 },
  { name: "Kurdistan", slug: "kurdistan", deaths: 0, x: 225, y: 250 },
  { name: "Kermanshah", slug: "kermanshah", deaths: 0, x: 205, y: 300 },
  { name: "Hamadan", slug: "hamadan", deaths: 0, x: 280, y: 285 },
  { name: "Qazvin", slug: "qazvin", deaths: 0, x: 365, y: 220 },
  { name: "Alborz", slug: "alborz", deaths: 0, x: 410, y: 230 },
  { name: "Tehran", slug: "tehran", deaths: 0, x: 445, y: 235 },
  { name: "Qom", slug: "qom", deaths: 0, x: 425, y: 285 },
  { name: "Markazi", slug: "markazi", deaths: 0, x: 340, y: 295 },
  { name: "Lorestan", slug: "lorestan", deaths: 0, x: 270, y: 355 },
  { name: "Khuzestan", slug: "khuzestan", deaths: 0, x: 210, y: 455 },
  { name: "Chaharmahal and Bakhtiari", slug: "chaharmahal-and-bakhtiari", deaths: 0, x: 325, y: 405 },
  { name: "Kohgiluyeh and Boyer-Ahmad", slug: "kohgiluyeh-and-boyer-ahmad", deaths: 0, x: 300, y: 455 },
  { name: "Bushehr", slug: "bushehr", deaths: 0, x: 265, y: 545 },
  { name: "Fars", slug: "fars", deaths: 0, x: 380, y: 520 },
  { name: "Hormozgan", slug: "hormozgan", deaths: 0, x: 420, y: 650 },
  { name: "Isfahan", slug: "isfahan", deaths: 0, x: 395, y: 380 },
  { name: "Yazd", slug: "yazd", deaths: 0, x: 490, y: 450 },
  { name: "Kerman", slug: "kerman", deaths: 0, x: 560, y: 560 },
  { name: "Sistan and Baluchestan", slug: "sistan-and-baluchestan", deaths: 0, x: 710, y: 675 },
  { name: "Semnan", slug: "semnan", deaths: 0, x: 545, y: 265 },
  { name: "Golestan", slug: "golestan", deaths: 0, x: 590, y: 175 },
  { name: "Mazandaran", slug: "mazandaran", deaths: 0, x: 500, y: 185 },
  { name: "North Khorasan", slug: "north-khorasan", deaths: 0, x: 665, y: 210 },
  { name: "Razavi Khorasan", slug: "razavi-khorasan", deaths: 0, x: 735, y: 325 },
  { name: "South Khorasan", slug: "south-khorasan", deaths: 0, x: 700, y: 470 },
  { name: "Ilam", slug: "ilam", deaths: 0, x: 180, y: 350 },
];

export default function IranMapHero() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="relative w-[92vw] max-w-[980px] opacity-95">
        <svg
          viewBox="0 0 920 820"
          className="h-auto w-full drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          aria-label="Map of Iran"
        >
          <defs>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="dotGlow">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer silhouette placeholder - replace later with real Iran SVG */}
          <path
            d="M145 235
               L220 150
               L315 105
               L410 120
               L525 95
               L635 135
               L770 230
               L805 330
               L790 455
               L730 560
               L700 700
               L615 760
               L520 740
               L425 685
               L345 675
               L260 620
               L205 525
               L165 420
               L120 330
               Z"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="2.3"
            filter="url(#softGlow)"
          />

          {/* Stylized internal province-like border scaffold - replace later with real province paths */}
          <g
            stroke="rgba(255,255,255,0.32)"
            strokeWidth="1.2"
            fill="none"
            filter="url(#softGlow)"
          >
            <path d="M230 165 L260 270 L245 390 L230 530" />
            <path d="M305 120 L320 220 L310 330 L305 470 L320 610" />
            <path d="M395 118 L400 240 L395 360 L410 520 L430 690" />
            <path d="M490 105 L500 220 L500 360 L515 500 L540 735" />
            <path d="M585 118 L600 250 L610 420 L615 620" />
            <path d="M680 170 L700 290 L705 420 L690 600" />

            <path d="M180 250 L320 220 L470 225 L640 210 L760 250" />
            <path d="M150 335 L300 320 L455 315 L650 330 L805 350" />
            <path d="M170 430 L300 420 L470 430 L645 450 L780 470" />
            <path d="M205 525 L340 520 L505 535 L650 560 L735 575" />
            <path d="M270 620 L375 625 L510 645 L620 660 L700 700" />
          </g>
        </svg>

        {/* Clickable capital dots */}
        <div className="pointer-events-none absolute inset-0">
          {provinceDots.map((dot, index) => (
            <Link
              key={dot.slug}
              href={`/province/${dot.slug}`}
              className="pointer-events-auto absolute group"
              style={{
                left: `${(dot.x / 920) * 100}%`,
                top: `${(dot.y / 820) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className={`block rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.85)] transition duration-300 group-hover:scale-125 group-hover:shadow-[0_0_24px_rgba(255,255,255,1)] ${
                  dot.slug === "tehran" ? "h-4 w-4" : "h-3 w-3"
                }`}
              />

              <span className="pointer-events-none absolute left-1/2 top-[-14px] z-20 hidden w-max min-w-[160px] -translate-x-1/2 -translate-y-full rounded-2xl border border-white/10 bg-black/85 px-4 py-3 text-left text-xs text-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.06)] backdrop-blur-xl group-hover:block">
                <span className="block font-semibold text-white">{dot.name}</span>
                <span className="mt-1 block text-zinc-400">
                  Total documented losses: {dot.deaths}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}