// "use client";

// import React from "react";
// import Image from "next/image";

// type OrbitItem = {
//   src: string;
//   alt: string;
//   size?: number; // px
// };

// type OrbitingCirclesProps = {
//   outer?: OrbitItem[];
//   inner?: OrbitItem[];
//   size?: number; // container px
// };

// function OrbitIcon({ src, alt, size = 42 }: OrbitItem) {
//   return (
//     <div
//       className="grid place-items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.35)]"
//       style={{ width: size, height: size }}
//     >
//       <Image
//         src={src}
//         alt={alt}
//         width={Math.round(size * 0.62)}
//         height={Math.round(size * 0.62)}
//         className="select-none"
//         draggable={false}
//       />
//     </div>
//   );
// }

// function Ring({
//   radius,
//   duration,
//   reverse,
//   children,
// }: {
//   radius: number;
//   duration: number;
//   reverse?: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <div
//       className="absolute inset-0 grid place-items-center"
//       style={{
//         animation: `orbit-rotate ${duration}s linear infinite`,
//         animationDirection: reverse ? "reverse" : "normal",
//       }}
//     >
//       <div
//         className="relative"
//         style={{
//           width: radius * 2,
//           height: radius * 2,
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }

// function AtAngle({
//   angleDeg,
//   radius,
//   children,
// }: {
//   angleDeg: number;
//   radius: number;
//   children: React.ReactNode;
// }) {
//   // Position icon on the ring at a fixed angle
//   const rad = (angleDeg * Math.PI) / 180;
//   const x = radius + radius * Math.cos(rad);
//   const y = radius + radius * Math.sin(rad);

//   return (
//     <div
//       className="absolute -translate-x-1/2 -translate-y-1/2"
//       style={{ left: x, top: y }}
//     >
//       {children}
//     </div>
//   );
// }

// export default function OrbitingCircles({
//   outer = [],
//   inner = [],
//   size = 360,
// }: OrbitingCirclesProps) {
//   const outerRadius = Math.round(size * 0.42);
//   const innerRadius = Math.round(size * 0.27);

//   // Spread icons evenly around each ring
//   const outerAngles = outer.map((_, i) => (360 / outer.length) * i);
//   const innerAngles = inner.map((_, i) => (360 / inner.length) * i + 30);

//   return (
//     <div className="relative mx-auto" style={{ width: size, height: size }}>
//       {/* rings */}
//       <div className="absolute inset-0 grid place-items-center">
//         <div
//           className="border rounded-full border-white/10"
//           style={{ width: outerRadius * 2, height: outerRadius * 2 }}
//         />
//         <div
//           className="absolute border rounded-full border-white/10"
//           style={{ width: innerRadius * 2, height: innerRadius * 2 }}
//         />
//       </div>

//       {/* subtle glow */}
//       <div className="absolute inset-0 rounded-full blur-2xl bg-purple-500/10" />

//       {/* center core */}
//       <div className="absolute inset-0 grid place-items-center">
//         <div className="grid place-items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.18)] w-16 h-16">
//           <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.6)]" />
//         </div>
//       </div>

//       {/* outer orbit */}
//       <Ring radius={outerRadius} duration={18}>
//         {outer.map((item, idx) => (
//           <AtAngle
//             key={item.alt + idx}
//             angleDeg={outerAngles[idx]}
//             radius={outerRadius}
//           >
//             <OrbitIcon {...item} />
//           </AtAngle>
//         ))}
//       </Ring>

//       {/* inner orbit */}
//       <Ring radius={innerRadius} duration={12} reverse>
//         {inner.map((item, idx) => (
//           <AtAngle
//             key={item.alt + idx}
//             angleDeg={innerAngles[idx]}
//             radius={innerRadius}
//           >
//             <OrbitIcon {...item} size={item.size ?? 38} />
//           </AtAngle>
//         ))}
//       </Ring>

//       {/* keyframes */}
//       <style jsx global>{`
//         @keyframes orbit-rotate {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import React from "react";
import Image from "next/image";

type OrbitItem = {
  src: string;
  alt: string;
  size?: number; // px
};

type OrbitingCirclesProps = {
  outer?: OrbitItem[];
  inner?: OrbitItem[];
  size?: number; // container px
};

function OrbitIcon({ src, alt, size = 42 }: OrbitItem) {
  return (
    <div
      className="grid place-items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.35)]"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={Math.round(size * 0.62)}
        height={Math.round(size * 0.62)}
        className="select-none"
        draggable={false}
      />
    </div>
  );
}

function Ring({
  radius,
  duration,
  reverse,
  children,
}: {
  radius: number;
  duration: number;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        animation: `orbit-rotate ${duration}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <div
        className="relative"
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function AtAngle({
  angleDeg,
  radius,
  children,
}: {
  angleDeg: number;
  radius: number;
  children: React.ReactNode;
}) {
  const rad = (angleDeg * Math.PI) / 180;
  const x = radius + radius * Math.cos(rad);
  const y = radius + radius * Math.sin(rad);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      {children}
    </div>
  );
}

export default function OrbitingCircles({
  outer = [],
  inner = [],
  size = 360,
}: OrbitingCirclesProps) {
  const outerRadius = Math.round(size * 0.42);
  const innerRadius = Math.round(size * 0.27);

  const outerAngles = outer.length
    ? outer.map((_, i) => (360 / outer.length) * i)
    : [];
  const innerAngles = inner.length
    ? inner.map((_, i) => (360 / inner.length) * i + 30)
    : [];

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* rings */}
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="border rounded-full border-white/10"
          style={{ width: outerRadius * 2, height: outerRadius * 2 }}
        />
        <div
          className="absolute border rounded-full border-white/10"
          style={{ width: innerRadius * 2, height: innerRadius * 2 }}
        />
      </div>

      {/* subtle glow */}
      <div className="absolute inset-0 rounded-full blur-2xl bg-purple-500/10" />

      {/* center core */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.18)]">
          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.6)]" />
        </div>
      </div>

      {/* outer orbit */}
      {outer.length > 0 && (
        <Ring radius={outerRadius} duration={18}>
          {outer.map((item, idx) => (
            <AtAngle
              key={item.alt + idx}
              angleDeg={outerAngles[idx]}
              radius={outerRadius}
            >
              <OrbitIcon {...item} />
            </AtAngle>
          ))}
        </Ring>
      )}

      {/* inner orbit */}
      {inner.length > 0 && (
        <Ring radius={innerRadius} duration={12} reverse>
          {inner.map((item, idx) => (
            <AtAngle
              key={item.alt + idx}
              angleDeg={innerAngles[idx]}
              radius={innerRadius}
            >
              <OrbitIcon {...item} size={item.size ?? 38} />
            </AtAngle>
          ))}
        </Ring>
      )}
    </div>
  );
}
