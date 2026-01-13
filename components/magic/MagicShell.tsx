// "use client";

// import React from "react";
// import Particles from "@/components/magic/Particles";
// import Meteors from "@/components/magic/Meteors";

// export default function MagicShell({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen text-white">
//       {/* Fixed background that always covers the viewport */}
//       <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#05060a]">
//         {/* blobs */}
//         <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-500/25 blur-[120px]" />
//         <div className="absolute top-10 -right-40 h-[520px] w-[520px] rounded-full bg-pink-500/20 blur-[120px]" />
//         <div className="absolute -bottom-48 left-1/3 h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-[120px]" />

//         {/* effects */}
//         <Particles className="absolute inset-0" quantity={70} ease={55} />
//         <Meteors number={18} />

//         {/* vignette */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />
//       </div>

//       {children}
//     </div>
//   );
// }

//! Mobile Responsive Update

"use client";

import React, { useEffect, useState } from "react";
import Particles from "@/components/magic/Particles";
import Meteors from "@/components/magic/Meteors";

export default function MagicShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#05060a]">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-500/25 blur-[120px]" />
        <div className="absolute top-10 -right-40 h-[520px] w-[520px] rounded-full bg-pink-500/20 blur-[120px]" />
        <div className="absolute -bottom-48 left-1/3 h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-[120px]" />

        {mounted && (
          <>
            <Particles className="absolute inset-0" quantity={70} ease={55} />
            <Meteors number={18} />
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />
      </div>

      {children}
    </div>
  );
}
