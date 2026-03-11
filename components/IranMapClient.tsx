"use client";

import dynamic from "next/dynamic";

const IranMapReal = dynamic(() => import("./IranMapReal"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-full items-center justify-center text-sm text-zinc-500">
      Loading map...
    </div>
  ),
});

export default function IranMapClient() {
  return <IranMapReal />;
}