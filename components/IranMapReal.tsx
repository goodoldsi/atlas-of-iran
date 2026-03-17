"use client";

import victims from "@/data/victims.json";
import type { Victim } from "@/types/victim";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "@vnedyalk0v/react19-simple-maps";

type ProvinceDot = {
  name: string;
  slug: string;
  losses: number;
  coordinates: [number, number];
  isCapital?: boolean;
};

type GeographiesRenderProps = {
  geographies: Array<{
    rsmKey?: string;
    id?: string | number;
    [key: string]: unknown;
  }>;
};

const provinceBaseDots = [
  { name: "West Azerbaijan", slug: "west-azerbaijan", coordinates: [45.07, 37.55] as [number, number] },
  { name: "East Azerbaijan", slug: "east-azerbaijan", coordinates: [46.29, 38.08] as [number, number] },
  { name: "Ardabil", slug: "ardabil", coordinates: [48.3, 38.25] as [number, number] },
  { name: "Gilan", slug: "gilan", coordinates: [49.58, 37.28] as [number, number] },
  { name: "Zanjan", slug: "zanjan", coordinates: [48.48, 36.67] as [number, number] },
  { name: "Qazvin", slug: "qazvin", coordinates: [50.0, 36.27] as [number, number] },
  { name: "Alborz", slug: "alborz", coordinates: [50.98, 35.84] as [number, number] },
  { name: "Tehran", slug: "tehran", coordinates: [51.39, 35.69] as [number, number], isCapital: true },
  { name: "Qom", slug: "qom", coordinates: [50.88, 34.64] as [number, number] },
  { name: "Mazandaran", slug: "mazandaran", coordinates: [53.06, 36.56] as [number, number] },
  { name: "Golestan", slug: "golestan", coordinates: [54.44, 36.84] as [number, number] },
  { name: "North Khorasan", slug: "north-khorasan", coordinates: [57.33, 37.47] as [number, number] },
  { name: "Razavi Khorasan", slug: "razavi-khorasan", coordinates: [59.61, 36.29] as [number, number] },
  { name: "South Khorasan", slug: "south-khorasan", coordinates: [59.22, 32.87] as [number, number] },
  { name: "Semnan", slug: "semnan", coordinates: [53.39, 35.57] as [number, number] },
  { name: "Isfahan", slug: "isfahan", coordinates: [51.67, 32.65] as [number, number] },
  { name: "Yazd", slug: "yazd", coordinates: [54.37, 31.89] as [number, number] },
  { name: "Kerman", slug: "kerman", coordinates: [57.08, 30.29] as [number, number] },
  { name: "Sistan and Baluchestan", slug: "sistan-and-baluchestan", coordinates: [60.86, 29.5] as [number, number] },
  { name: "Fars", slug: "fars", coordinates: [52.53, 29.62] as [number, number] },
  { name: "Bushehr", slug: "bushehr", coordinates: [50.84, 28.92] as [number, number] },
  { name: "Hormozgan", slug: "hormozgan", coordinates: [56.27, 27.19] as [number, number] },
  { name: "Khuzestan", slug: "khuzestan", coordinates: [48.67, 31.32] as [number, number] },
  { name: "Chaharmahal and Bakhtiari", slug: "chaharmahal-and-bakhtiari", coordinates: [50.86, 32.33] as [number, number] },
  { name: "Kohgiluyeh and Boyer-Ahmad", slug: "kohgiluyeh-and-boyer-ahmad", coordinates: [51.59, 30.67] as [number, number] },
  { name: "Lorestan", slug: "lorestan", coordinates: [48.35, 33.49] as [number, number] },
  { name: "Ilam", slug: "ilam", coordinates: [46.42, 33.64] as [number, number] },
  { name: "Kermanshah", slug: "kermanshah", coordinates: [47.06, 34.31] as [number, number] },
  { name: "Kurdistan", slug: "kurdistan", coordinates: [47.0, 35.31] as [number, number] },
  { name: "Hamadan", slug: "hamadan", coordinates: [48.51, 34.8] as [number, number] },
  { name: "Markazi", slug: "markazi", coordinates: [49.69, 34.09] as [number, number] },
];

function normalizeProvinceToSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");
}

export default function IranMapReal() {
  const router = useRouter();
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<object | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/maps/iran-provinces.geojson")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load GeoJSON");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) setGeoData(data);
      })
      .catch((error) => {
        console.error("GeoJSON load error:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const allVictims = victims as Victim[];

  const provinceLossMap = useMemo(() => {
    const counts = new Map<string, number>();

    for (const person of allVictims) {
      if (!person.province) continue;
      const slug = normalizeProvinceToSlug(person.province);
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }

    return counts;
  }, [allVictims]);

  const provinceDots: ProvinceDot[] = useMemo(() => {
    return provinceBaseDots.map((dot) => ({
      ...dot,
      losses: provinceLossMap.get(dot.slug) ?? 0,
    }));
  }, [provinceLossMap]);

  const hoveredDot = useMemo(
    () => provinceDots.find((dot) => dot.slug === hoveredProvince) ?? null,
    [hoveredProvince]
  );

  if (!geoData) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center text-sm text-zinc-500">
        Loading map...
      </div>
    );
  }

  return (
    <div className="relative mx-auto aspect-[1.18/1] w-full max-w-[1080px]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_58%)] blur-3xl" />

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [54, 32] as any,
          scale: 2200,
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

          <filter id="waterGlow">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Geographies geography={geoData as any}>
          {(props: GeographiesRenderProps) =>
            props.geographies.map((geo: any, index: number) => (
              <Geography
                key={geo.rsmKey ?? geo.id ?? `geo-${index}`}
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

        {/* <Annotation
          subject={[51.2, 27.1] as any}
          dx={-30}
          dy={28}
          connectorProps={{ stroke: "rgba(255,255,255,0.18)", strokeWidth: 1 }}
        >
          <text
            x={4}
            textAnchor="start"
            alignmentBaseline="middle"
            style={{
              fill: "#22d3ee",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Persian Gulf
          </text>
        </Annotation>

        <Annotation
          subject={[51.8, 37.2] as any}
          dx={-8}
          dy={-24}
          connectorProps={{ stroke: "rgba(255,255,255,0.18)", strokeWidth: 1 }}
        >
          <text
            x={4}
            textAnchor="start"
            alignmentBaseline="middle"
            style={{
              fill: "#22d3ee",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Caspian Sea
          </text>
        </Annotation> */}

        {provinceDots.map((dot) => {
          const radius = dot.isCapital ? 6.5 : 5;
          const isHovered = hoveredProvince === dot.slug;
          const hasLosses = dot.losses > 0;

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
                {hasLosses && !isHovered && (
                  <circle
                    r={radius + 4}
                    fill="rgba(255,51,51,0.35)"
                    className="animate-marker-ring"
                    style={{
                      transformOrigin: "center",
                    }}
                  />
                )}

                <circle
                  r={isHovered ? radius + 1.5 : radius}
                  fill={hasLosses ? "#ff3333" : "white"}
                  className={hasLosses ? "animate-marker-core" : ""}
                  style={{
                    transition: "all 0.2s ease",
                    filter: "url(#dotGlow)",
                    transformOrigin: "center",
                  }}
                />

                <title>
                  {dot.name} — Total documented losses: {dot.losses}
                </title>
              </g>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* {hoveredDot && (
        <div className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/88 px-4 py-3 text-left text-xs text-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-xl">
          <span className="block font-semibold text-white">
            {hoveredDot.name}
          </span>
          <span className="mt-1 block text-zinc-400">
            Total documented losses: {hoveredDot.losses}
          </span>
        </div>
      )} */}
    </div>
  );
}