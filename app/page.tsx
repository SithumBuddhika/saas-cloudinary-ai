import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import OrbitingCircles from "@/components/OrbitingCircles";

export default async function Page() {
  const { userId } = await auth();
  const signedIn = !!userId;

  return (
    <div className="relative min-h-screen px-6 overflow-hidden">
      {/* ✅ Center content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_120px_rgba(0,0,0,0.6)]">
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
