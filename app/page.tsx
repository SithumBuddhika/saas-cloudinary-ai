// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex items-center justify-center min-h-screen font-sans bg-zinc-50 dark:bg-black">
//       <main className="flex flex-col items-center justify-between w-full max-w-3xl min-h-screen px-16 py-32 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

// import Link from "next/link";

// export default function Landing() {
//   return (
//     <div className="flex items-center justify-center min-h-screen px-6">
//       <div className="max-w-5xl w-full rounded-3xl border border-white/10 bg-black/30 backdrop-blur p-10 shadow-[0_0_120px_rgba(0,0,0,0.6)]">
//         <div className="grid items-center gap-10 lg:grid-cols-2">
//           <div>
//             <p className="text-xs tracking-wider uppercase opacity-70">
//               Next.js • Cloudinary • Prisma • Clerk
//             </p>

//             <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
//               Cloudinary Showcase
//               <span className="block mt-2 text-2xl font-semibold text-white/70 sm:text-3xl">
//                 A modern media optimization SaaS dashboard.
//               </span>
//             </h1>

//             <p className="mt-5 text-lg text-base-content/70">
//               Upload videos, generate previews, store metadata, and create
//               social-media-ready image formats — all powered by Cloudinary.
//             </p>

//             <div className="flex flex-col gap-3 mt-8 sm:flex-row">
//               <Link href="/sign-in" className="btn btn-primary">
//                 Get Started
//               </Link>
//               <Link href="/home" className="btn btn-outline">
//                 Open Dashboard
//               </Link>
//             </div>

//             <div className="grid grid-cols-2 gap-3 mt-8 text-sm">
//               <div className="p-4 border rounded-xl border-white/10 bg-white/5">
//                 <p className="font-semibold">Video Upload</p>
//                 <p className="opacity-70">Cloudinary upload + optimization.</p>
//               </div>
//               <div className="p-4 border rounded-xl border-white/10 bg-white/5">
//                 <p className="font-semibold">Social Formats</p>
//                 <p className="opacity-70">Instant image resizing presets.</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6 border rounded-2xl border-white/10 bg-white/5">
//             <p className="text-sm opacity-70">Highlights</p>
//             <ul className="mt-4 space-y-3 text-sm">
//               <li className="flex gap-2">
//                 <span className="opacity-60">✓</span> Secure authentication with
//                 Clerk
//               </li>
//               <li className="flex gap-2">
//                 <span className="opacity-60">✓</span> Prisma + PostgreSQL
//                 persistence
//               </li>
//               <li className="flex gap-2">
//                 <span className="opacity-60">✓</span> Video previews +
//                 compression metadata
//               </li>
//               <li className="flex gap-2">
//                 <span className="opacity-60">✓</span> Social share image
//                 transformations
//               </li>
//             </ul>

//             <div className="p-4 mt-6 border rounded-xl border-white/10 bg-black/30">
//               <p className="text-xs tracking-wider uppercase opacity-70">Tip</p>
//               <p className="mt-1 text-sm opacity-80">
//                 Sign in and head to the dashboard to start uploading and
//                 transforming media.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import Link from "next/link";

// export default function Landing() {
//   return (
//     <div className="flex items-center justify-center min-h-screen px-6">
//       <div className="max-w-6xl w-full rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_130px_rgba(0,0,0,0.6)] p-10 sm:p-14">
//         <div className="grid items-center gap-12 lg:grid-cols-2">
//           <div>
//             <div className="inline-flex items-center gap-2 px-4 py-2 text-xs border rounded-full border-white/10 bg-black/30 text-white/70">
//               <span className="w-2 h-2 rounded-full bg-emerald-400" />
//               Next.js • Cloudinary • Prisma • Clerk
//             </div>

//             <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
//               Cloudinary Showcase
//             </h1>

//             <p className="mt-4 text-lg text-white/70">
//               A modern media optimization dashboard. Upload videos, generate
//               previews, store metadata, and create social-media-ready image
//               formats.
//             </p>

//             <div className="flex flex-col gap-3 mt-8 sm:flex-row">
//               <Link href="/sign-in" className="btn btn-primary">
//                 Get Started
//               </Link>
//               <Link href="/home" className="btn btn-outline">
//                 Open Dashboard
//               </Link>
//             </div>

//             <div className="grid grid-cols-2 gap-3 mt-10 text-sm">
//               <div className="p-4 border rounded-2xl border-white/10 bg-black/25">
//                 <p className="font-semibold">Video Upload</p>
//                 <p className="mt-1 text-white/60">
//                   Cloudinary optimization + DB save.
//                 </p>
//               </div>
//               <div className="p-4 border rounded-2xl border-white/10 bg-black/25">
//                 <p className="font-semibold">Social Formats</p>
//                 <p className="mt-1 text-white/60">
//                   Instant resize presets & download.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6 border rounded-3xl border-white/10 bg-black/30">
//             <p className="text-sm text-white/70">What you get</p>
//             <ul className="mt-4 space-y-3 text-sm text-white/70">
//               <li>✅ Secure authentication with Clerk</li>
//               <li>✅ Prisma + PostgreSQL persistence</li>
//               <li>✅ Video previews + compression metadata</li>
//               <li>✅ Social-ready image transformations</li>
//             </ul>

//             <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
//               <p className="text-xs tracking-wider uppercase text-white/60">
//                 Tip
//               </p>
//               <p className="mt-1 text-sm text-white/70">
//                 Sign in, go to the dashboard, and start uploading.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-6xl w-full rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_130px_rgba(0,0,0,0.6)] p-10 sm:p-14">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 text-xs border rounded-full border-white/10 bg-black/30 text-white/70">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Next.js • Cloudinary • Prisma • Clerk
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Cloudinary Showcase
            </h1>

            <p className="mt-4 text-lg text-white/70">
              Upload videos, generate previews, store metadata, and create
              social-media-ready image formats.
            </p>

            <div className="flex flex-col gap-3 mt-8 sm:flex-row">
              <Link href="/sign-in" className="btn btn-primary">
                Sign In
              </Link>
              <Link href="/sign-up" className="btn btn-outline">
                Sign Up
              </Link>
              <Link href="/home" className="btn btn-ghost">
                Open Dashboard
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-10 text-sm">
              <div className="p-4 border rounded-2xl border-white/10 bg-black/25">
                <p className="font-semibold">Video Upload</p>
                <p className="mt-1 text-white/60">
                  Cloudinary optimization + DB save.
                </p>
              </div>
              <div className="p-4 border rounded-2xl border-white/10 bg-black/25">
                <p className="font-semibold">Social Formats</p>
                <p className="mt-1 text-white/60">
                  Instant resize presets & download.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-3xl border-white/10 bg-black/30">
            <p className="text-sm text-white/70">What you get</p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>✅ Secure authentication with Clerk</li>
              <li>✅ Prisma + PostgreSQL persistence</li>
              <li>✅ Video previews + compression metadata</li>
              <li>✅ Social-ready image transformations</li>
            </ul>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs tracking-wider uppercase text-white/60">
                Tip
              </p>
              <p className="mt-1 text-sm text-white/70">
                Sign in, then go to Dashboard and start uploading.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
