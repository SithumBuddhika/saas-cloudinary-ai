"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Landing() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-5xl rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_130px_rgba(0,0,0,0.6)] p-10 sm:p-14">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-xs border rounded-full border-white/10 bg-black/30 text-white/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Next.js • Cloudinary • Prisma • Clerk
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Cloudinary Showcase
          </h1>

          <p className="mt-4 text-lg text-white/70">
            Upload videos, generate previews, store metadata, and create
            social-media-ready image formats — all in one clean dashboard.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <SignedOut>
              <Link
                href="/sign-in"
                className="px-6 py-3 font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="px-6 py-3 font-semibold text-white transition border rounded-xl border-white/15 bg-white/5 hover:bg-white/10"
              >
                Sign Up
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/home"
                className="px-6 py-3 font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
              >
                Open Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
