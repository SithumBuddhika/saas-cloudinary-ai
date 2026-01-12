"use client";

import Image from "next/image";
import { useMemo } from "react";

type OrbitItem = { src: string; alt: string };

function polarPositions(count: number, radius: number) {
  const step = (Math.PI * 2) / Math.max(count, 1);
  return new Array(count).fill(0).map((_, i) => {
    const angle = i * step - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  });
}

export default function OrbitingCircles({
  size = 360,
  outer,
  inner,
}: {
  size?: number;
  outer: OrbitItem[];
  inner: OrbitItem[];
}) {
  const outerRadius = Math.round(size * 0.42);
  const innerRadius = Math.round(size * 0.27);

  const outerPos = useMemo(
    () => polarPositions(outer.length, outerRadius),
    [outer.length, outerRadius]
  );
  const innerPos = useMemo(
    () => polarPositions(inner.length, innerRadius),
    [inner.length, innerRadius]
  );

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* rings */}
      <div
        className="absolute inset-0 grid place-items-center"
        aria-hidden="true"
      >
        <div
          className="border rounded-full border-white/10"
          style={{
            width: Math.round(size * 0.84),
            height: Math.round(size * 0.84),
          }}
        />
        <div
          className="absolute border rounded-full border-white/10"
          style={{
            width: Math.round(size * 0.54),
            height: Math.round(size * 0.54),
          }}
        />
      </div>

      {/* glow */}
      <div
        className="absolute inset-0 rounded-full bg-purple-500/10 blur-2xl"
        aria-hidden="true"
      />

      {/* center */}
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="grid place-items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur"
          style={{
            width: Math.round(size * 0.18),
            height: Math.round(size * 0.18),
          }}
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.8)]" />
        </div>
      </div>

      {/* OUTER orbit */}
      <div className="absolute inset-0 animate-orbitSpin">
        {outer.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) translate(${outerPos[i].x}px, ${outerPos[i].y}px)`,
            }}
          >
            <div className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.35)]">
              <Image src={item.src} alt={item.alt} width={26} height={26} />
            </div>
          </div>
        ))}
      </div>

      {/* INNER orbit */}
      <div className="absolute inset-0 animate-orbitSpinReverse">
        {inner.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) translate(${innerPos[i].x}px, ${innerPos[i].y}px)`,
            }}
          >
            <div className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.35)]">
              <Image src={item.src} alt={item.alt} width={24} height={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
