// "use client";

// import React from "react";
// import { cn } from "@/lib/utils";

// export default function Meteors({
//   number = 18,
//   className,
// }: {
//   number?: number;
//   className?: string;
// }) {
//   return (
//     <div className={cn("absolute inset-0 overflow-hidden", className)}>
//       {Array.from({ length: number }).map((_, i) => {
//         const top = Math.random() * 100;
//         const left = Math.random() * 100;
//         const delay = Math.random() * 5;
//         const duration = 3 + Math.random() * 4;

//         return (
//           <span
//             key={i}
//             className="absolute h-[1px] w-[220px] rotate-[215deg] bg-gradient-to-r from-white/0 via-white/60 to-white/0 opacity-60"
//             style={{
//               top: `${top}%`,
//               left: `${left}%`,
//               animationDelay: `${delay}s`,
//               animationDuration: `${duration}s`,
//               animationName: "meteor",
//               animationTimingFunction: "linear",
//               animationIterationCount: "infinite",
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }

"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

// Deterministic RNG (same output for same seed)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Meteors({
  number = 18,
  className,
  seed = 1337, // change this if you want a different "layout"
}: {
  number?: number;
  className?: string;
  seed?: number;
}) {
  const meteors = useMemo(() => {
    return Array.from({ length: number }).map((_, i) => {
      const rng = mulberry32(seed + i * 999);

      const top = rng() * 100; // 0..100
      const left = rng() * 100;
      const delay = rng() * 5; // 0..5s
      const duration = 3 + rng() * 4; // 3..7s

      return { top, left, delay, duration };
    });
  }, [number, seed]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteors.map((m, i) => (
        <span
          key={i}
          className="absolute h-[1px] w-[220px] rotate-[215deg] bg-gradient-to-r from-white/0 via-white/60 to-white/0 opacity-60"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
            animationName: "meteor",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}
