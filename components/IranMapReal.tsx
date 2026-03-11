"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "@vnedyalk0v/react19-simple-maps";

type ProvinceDot = {
  name: string;
  slug: string;
  losses: number;
  coordinates: [number, number];
  isCapital?: boolean;
};

const geoUrl = "/maps/iran-provinces.geojson";

const provinceDots: ProvinceDot[] = [
  { name: "West Azerbaijan", slug: "west-azerbaijan", losses: 0, coordinates: [45.07, 37.55] },
  { name: "East Azerbaijan", slug: "east-azerbaijan", losses: 0, coordinates: [46.29, 38.08] },
  { name: "Ardabil", slug: "ardabil", losses: 0, coordinates: [48.3, 38.25] },
  { name: "Gilan", slug: "gilan", losses: 0, coordinates: [49.58, 37.28] },
  { name: "Zanjan", slug: "zanjan", losses: 0, coordinates: [48.48, 36.67] },
  { name: "Qazvin", slug: "qazvin", losses: 0, coordinates: [50.0, 36.27] },
  { name: "Alborz", slug: "alborz", losses: 0, coordinates: [50.98, 35.84] },
  { name: "Tehran", slug: "tehran", losses: 0, coordinates: [51.39, 35.69], isCapital: true },
  { name: "Qom", slug: "qom", losses: 0, coordinates: [50.88, 34.64] },
  { name: "Mazandaran", slug: "mazandaran", losses: 0, coordinates: [53.06, 36.56] },
  { name: "Golestan", slug: "golestan", losses: 0, coordinates: [54.44, 36.84] },
  { name: "North Khorasan", slug: "north-khorasan", losses: 0, coordinates: [57.33, 37.47] },
  { name: "Razavi Khorasan", slug: "razavi-khorasan", losses: 0, coordinates: [59.61, 36.29] },
  { name: "South Khorasan", slug: "south-khorasan", losses: 0, coordinates: [59.22, 32.87] },
  { name: "Semnan", slug: "semnan", losses: 0, coordinates: [53.39, 35.57] },
  { name: "Isfahan", slug: "isfahan", losses: 0, coordinates: [51.67, 32.65] },
  { name: "Yazd", slug: "yazd", losses: 0, coordinates: [54.37, 31.89] },
  { name: "Kerman", slug: "kerman", losses: 0, coordinates: [57.08, 30.29] },
  { name: "Sistan and Baluchestan", slug: "sistan-and-baluchestan", losses: 0, coordinates: [60.86, 29.5] },
  { name: "Fars", slug: "fars", losses: 0, coordinates: [52.53, 29.62] },
  { name: "Bushehr", slug: "bushehr", losses: 0, coordinates: [50.84, 28.92] },
  { name: "Hormozgan", slug: "hormozgan", losses: 0, coordinates: [56.27, 27.19] },
  { name: "Khuzestan", slug: "khuzestan", losses: 0, coordinates: [48.67, 31.32] },
  { name: "Chaharmahal and Bakhtiari", slug: "chaharmahal-and-bakhtiari", losses: 0, coordinates: [50.86, 32.33] },
  { name: "Kohgiluyeh and Boyer-Ahmad", slug: "kohgiluyeh-and-boyer-ahmad", losses: 0, coordinates: [51.59, 30.67] },
  { name: "Lorestan", slug: "lorestan", losses: 0, coordinates: [48.35, 33.49] },
  { name: "Ilam", slug: "ilam", losses: 0, coordinates: [46.42, 33.64] },
  { name: "Kermanshah", slug: "kermanshah", losses: 0, coordinates: [47.06, 34.31] },
  { name: "Kurdistan", slug: "kurdistan", losses: 0, coordinates: [47.0, 35.31] },
  { name: "Hamadan", slug: "hamadan", losses: 0, coordinates: [48.51, 34.8] },
  { name: "Markazi", slug: "markazi", losses: 0, coordinates: [49.69, 34.09] },
];

type GeographiesRenderProps = {
  geographies: Array<{
    rsmKey: string;
    [key: string]: unknown;
  }>;
};

export default function IranMapReal() {
  const router = useRouter();
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const hoveredDot = useMemo(
    () => provinceDots.find((dot) => dot.slug === hoveredProvince) ?? null,
    [hoveredProvince]
  );

  return (
  <div className="relative mx-auto aspect-[1.18/1] w-full">
    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_58%)] blur-3xl" />

    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: [54, 32] as any,
        scale: 2500,
      }}
      width={980}
      height={820}
      className="relative z-10 h-auto w-full"
    >
      <defs>
        <filter id="provinceGlow">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="2.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ZoomableGroup center={[54, 32] as any} zoom={1}>
        <Geographies geography={geoUrl}>
          {(props: GeographiesRenderProps) =>
            props.geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                stroke="rgba(255,255,255,0.72)"
                strokeWidth={0.9}
                fill="rgba(255,255,255,0.02)"
                style={{
                  default: {
                    outline: "none",
                    filter: "url(#provinceGlow)",
                  },
                  hover: {
                    outline: "none",
                    fill: "rgba(255,255,255,0.055)",
                    stroke: "rgba(255,255,255,0.9)",
                    filter: "url(#provinceGlow)",
                  },
                  pressed: {
                    outline: "none",
                    fill: "rgba(255,255,255,0.06)",
                    stroke: "rgba(255,255,255,0.95)",
                    filter: "url(#provinceGlow)",
                  },
                }}
              />
            ))
          }
        </Geographies>

        {provinceDots.map((dot) => {
          const radius = dot.isCapital ? 6.5 : 5;
          const isHovered = hoveredProvince === dot.slug;

          return (
            <Marker key={dot.slug} coordinates={dot.coordinates as any}>
              <g
                role="button"
                tabIndex={0}
                className="cursor-pointer"
                onClick={() => router.push(`/province/${dot.slug}`)}
                onMouseEnter={() => setHoveredProvince(dot.slug)}
                onMouseLeave={() => setHoveredProvince(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/province/${dot.slug}`);
                  }
                }}
              >
                <circle
                  r={radius + 6}
                  fill="rgba(255,255,255,0.10)"
                  filter="url(#dotGlow)"
                />
                <circle
                  r={isHovered ? radius + 1.5 : radius}
                  fill="white"
                  style={{
                    transition: "all 0.2s ease",
                    filter: "url(#dotGlow)",
                  }}
                />
                <title>
                  {dot.name} — Total documented losses: {dot.losses}
                </title>
              </g>
            </Marker>
          );
        })}
      </ZoomableGroup>
    </ComposableMap>

    {hoveredDot && (
      <div className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/88 px-4 py-3 text-left text-xs text-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <span className="block font-semibold text-white">
          {hoveredDot.name}
        </span>
        <span className="mt-1 block text-zinc-400">
          Total documented losses: {hoveredDot.losses}
        </span>
      </div>
    )}
  </div>
);
}