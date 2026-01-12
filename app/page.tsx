// "use client";

// import Link from "next/link";
// import { SignedIn, SignedOut } from "@clerk/nextjs";

// export default function Landing() {
//   return (
//     <div className="flex items-center justify-center min-h-screen px-6">
//       <div className="w-full max-w-5xl rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_130px_rgba(0,0,0,0.6)] p-10 sm:p-14">
//         <div className="max-w-2xl">
//           <div className="inline-flex items-center gap-2 px-4 py-2 text-xs border rounded-full border-white/10 bg-black/30 text-white/70">
//             <span className="w-2 h-2 rounded-full bg-emerald-400" />
//             Next.js • Cloudinary • Prisma • Clerk
//           </div>

//           <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
//             Cloudinary Showcase
//           </h1>

//           <p className="mt-4 text-lg text-white/70">
//             Upload videos, generate previews, store metadata, and create
//             social-media-ready image formats — all in one clean dashboard.
//           </p>

//           <div className="flex flex-wrap gap-3 mt-8">
//             <SignedOut>
//               <Link
//                 href="/sign-in"
//                 className="px-6 py-3 font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
//               >
//                 Sign In
//               </Link>

//               <Link
//                 href="/sign-up"
//                 className="px-6 py-3 font-semibold text-white transition border rounded-xl border-white/15 bg-white/5 hover:bg-white/10"
//               >
//                 Sign Up
//               </Link>
//             </SignedOut>

//             <SignedIn>
//               <Link
//                 href="/home"
//                 className="px-6 py-3 font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
//               >
//                 Open Dashboard
//               </Link>
//             </SignedIn>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import Link from "next/link";
// import OrbitingCircles from "@/components/magicui/OrbitingCircles";
// import { currentUser } from "@clerk/nextjs/server";

// export default async function Page() {
//   const user = await currentUser();

//   return (
//     <div className="relative min-h-screen">
//       <main className="relative z-10 flex items-center max-w-6xl min-h-screen px-6 py-16 mx-auto">
//         <div className="w-full rounded-[34px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-[0_0_120px_rgba(0,0,0,0.55)] sm:p-12">
//           <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
//             {/* LEFT */}
//             <div>
//               <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
//                 Cloudinary Showcase
//               </h1>

//               <p className="max-w-xl mt-4 text-white/70">
//                 Upload videos, generate previews, store metadata, and create
//                 social-media-ready image formats — all in one clean dashboard.
//               </p>

//               <div className="flex flex-wrap gap-3 mt-8">
//                 {!user ? (
//                   <>
//                     <Link
//                       href="/sign-in"
//                       className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-black transition bg-white rounded-2xl hover:bg-white/90"
//                     >
//                       Sign In
//                     </Link>
//                     <Link
//                       href="/sign-up"
//                       className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.10]"
//                     >
//                       Sign Up
//                     </Link>
//                   </>
//                 ) : (
//                   <Link
//                     href="/home"
//                     className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.25)] transition hover:opacity-95"
//                   >
//                     Open Dashboard
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* RIGHT (Orbiting Circles) */}
//             <div className="hidden lg:block">
//               <OrbitingCircles
//                 size={360}
//                 outer={[
//                   { src: "/orbit/video.svg", alt: "Video" },
//                   { src: "/orbit/image.svg", alt: "Image" },
//                   { src: "/orbit/cloud.svg", alt: "Cloud" },
//                   { src: "/orbit/share.svg", alt: "Share" },
//                 ]}
//                 inner={[
//                   { src: "/orbit/play.svg", alt: "Play", size: 38 },
//                   { src: "/orbit/download.svg", alt: "Download", size: 38 },
//                 ]}
//               />
//             </div>

//             {/* Mobile fallback */}
//             <div className="lg:hidden">
//               <div className="mt-10">
//                 <OrbitingCircles
//                   size={280}
//                   outer={[
//                     { src: "/orbit/video.svg", alt: "Video" },
//                     { src: "/orbit/image.svg", alt: "Image" },
//                     { src: "/orbit/cloud.svg", alt: "Cloud" },
//                     { src: "/orbit/share.svg", alt: "Share" },
//                   ]}
//                   inner={[
//                     { src: "/orbit/play.svg", alt: "Play", size: 34 },
//                     { src: "/orbit/download.svg", alt: "Download", size: 34 },
//                   ]}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// import Link from "next/link";
// import { auth } from "@clerk/nextjs/server";
// import OrbitingCircles from "@/components/OrbitingCircles";

// export default function Page() {
//   const { userId } = auth();
//   const signedIn = !!userId;

//   return (
//     <div className="relative min-h-screen px-6 py-14">
//       <main className="relative z-10 max-w-6xl mx-auto">
//         <div className="w-full rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_120px_rgba(0,0,0,0.6)]">
//           <div className="grid items-center gap-10 px-10 py-12 lg:grid-cols-2 lg:px-14">
//             {/* LEFT */}
//             <div>
//               <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
//                 Cloudinary Showcase
//               </h1>

//               <p className="max-w-xl mt-4 text-white/70">
//                 Upload videos, generate previews, store metadata, and create
//                 social-media-ready image formats — all in one clean dashboard.
//               </p>

//               <div className="flex flex-wrap gap-3 mt-8">
//                 {signedIn ? (
//                   <Link
//                     href="/home"
//                     className="inline-flex items-center justify-center px-6 py-3 font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
//                   >
//                     Open Dashboard
//                   </Link>
//                 ) : (
//                   <>
//                     <Link
//                       href="/sign-in"
//                       className="inline-flex items-center justify-center px-6 py-3 font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
//                     >
//                       Sign In
//                     </Link>
//                     <Link
//                       href="/sign-up"
//                       className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3 font-semibold text-white transition hover:bg-white/[0.10]"
//                     >
//                       Sign Up
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* RIGHT */}
//             <div className="hidden lg:block">
//               <OrbitingCircles
//                 size={360}
//                 outer={[
//                   { src: "/orbit/video.png", alt: "Video" },
//                   { src: "/orbit/play.png", alt: "Play" },
//                   { src: "/orbit/image.png", alt: "Image" },
//                   { src: "/orbit/download.png", alt: "Download" },
//                 ]}
//                 inner={[
//                   { src: "/orbit/cloud.png", alt: "Cloud" },
//                   { src: "/orbit/share.png", alt: "Share" },
//                 ]}
//               />
//             </div>

//             {/* mobile orbit */}
//             <div className="lg:hidden">
//               <div className="mt-10">
//                 <OrbitingCircles
//                   size={280}
//                   outer={[
//                     { src: "/orbit/video.png", alt: "Video" },
//                     { src: "/orbit/play.png", alt: "Play" },
//                     { src: "/orbit/image.png", alt: "Image" },
//                     { src: "/orbit/download.png", alt: "Download" },
//                   ]}
//                   inner={[
//                     { src: "/orbit/cloud.png", alt: "Cloud" },
//                     { src: "/orbit/share.png", alt: "Share" },
//                   ]}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import OrbitingCircles from "@/components/OrbitingCircles";

export default async function Page() {
  const { userId } = await auth();
  const signedIn = !!userId;

  return (
    <div className="relative min-h-screen px-6 py-14">
      <main className="relative z-10 max-w-6xl mx-auto">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_120px_rgba(0,0,0,0.6)]">
          <div className="grid items-center gap-10 px-8 py-12 lg:grid-cols-2 lg:px-14">
            {/* LEFT */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Cloudinary Showcase
              </h1>
              <p className="max-w-xl mt-4 text-base leading-7 text-white/70">
                Upload videos, generate previews, store metadata, and create
                social-media-ready image formats — all in one clean dashboard.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {signedIn ? (
                  <Link
                    href="/home"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
                  >
                    Open Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition border rounded-xl border-white/15 bg-white/5 hover:bg-white/10"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT (Orbiting circles) */}
            <div className="hidden lg:block">
              <OrbitingCircles
                size={360}
                outer={[
                  { src: "/orbit/cloud.png", alt: "Cloud" },
                  { src: "/orbit/video.png", alt: "Video" },
                  { src: "/orbit/share.png", alt: "Share" },
                ]}
                inner={[
                  { src: "/orbit/play.png", alt: "Play" },
                  { src: "/orbit/image.png", alt: "Image" },
                  { src: "/orbit/download.png", alt: "Download" },
                ]}
              />
            </div>

            {/* Mobile orbit */}
            <div className="lg:hidden">
              <div className="mt-10">
                <OrbitingCircles
                  size={280}
                  outer={[
                    { src: "/orbit/cloud.png", alt: "Cloud" },
                    { src: "/orbit/video.png", alt: "Video" },
                    { src: "/orbit/share.png", alt: "Share" },
                  ]}
                  inner={[
                    { src: "/orbit/play.png", alt: "Play" },
                    { src: "/orbit/image.png", alt: "Image" },
                    { src: "/orbit/download.png", alt: "Download" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
