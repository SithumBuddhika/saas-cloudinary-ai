// "use client";

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import VideoCard from "@/components/VideoCard";
// import type { Video } from "@/types";

// export default function Home() {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchVideos = useCallback(async () => {
//     try {
//       setError(null);
//       const res = await axios.get("/api/videos");
//       setVideos(Array.isArray(res.data) ? res.data : []);
//     } catch (e) {
//       console.error(e);
//       setError("Failed to fetch videos.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchVideos();
//   }, [fetchVideos]);

//   const handleDownload = useCallback((url: string, title: string) => {
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `${title}.mp4`);
//     link.setAttribute("target", "_blank");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }, []);

//   const stats = useMemo(() => {
//     const total = videos.length;

//     const originalBytes = videos.reduce(
//       (sum, v) => sum + (Number(v.originalSize) || 0),
//       0
//     );
//     const compressedBytes = videos.reduce(
//       (sum, v) => sum + (Number(v.compressedSize) || 0),
//       0
//     );

//     const savedBytes = Math.max(originalBytes - compressedBytes, 0);
//     const savedPct =
//       originalBytes > 0 ? Math.round((savedBytes / originalBytes) * 100) : 0;

//     const latest = videos[0]?.createdAt
//       ? new Date(videos[0].createdAt).toLocaleString()
//       : "—";

//     const formatBytes = (b: number) => {
//       if (!b) return "0 B";
//       const units = ["B", "KB", "MB", "GB"];
//       let i = 0;
//       let n = b;
//       while (n >= 1024 && i < units.length - 1) {
//         n /= 1024;
//         i++;
//       }
//       return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
//     };

//     return {
//       total,
//       original: formatBytes(originalBytes),
//       saved: formatBytes(savedBytes),
//       savedPct,
//       latest,
//     };
//   }, [videos]);

//   return (
//     <section className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col gap-2">
//         <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
//           Your Videos
//         </h1>
//         <p className="text-white/70">
//           Preview, optimize and download your uploaded videos.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">
//           <p className="text-xs tracking-wider uppercase text-white/60">
//             Total Videos
//           </p>
//           <p className="mt-2 text-2xl font-bold">{stats.total}</p>
//         </div>

//         <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">
//           <p className="text-xs tracking-wider uppercase text-white/60">
//             Original Size
//           </p>
//           <p className="mt-2 text-2xl font-bold">{stats.original}</p>
//         </div>

//         <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">
//           <p className="text-xs tracking-wider uppercase text-white/60">
//             Saved Space
//           </p>
//           <p className="mt-2 text-2xl font-bold">
//             {stats.saved}{" "}
//             <span className="text-sm text-white/60">({stats.savedPct}%)</span>
//           </p>
//         </div>

//         <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">
//           <p className="text-xs tracking-wider uppercase text-white/60">
//             Latest Upload
//           </p>
//           <p className="mt-2 text-sm text-white/80">{stats.latest}</p>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="p-4 text-sm text-red-200 border rounded-2xl border-red-500/20 bg-red-500/10">
//           {error}
//         </div>
//       )}

//       {/* Content */}
//       {loading ? (
//         <div className="flex justify-center py-16">
//           <span className="loading loading-spinner loading-lg" />
//         </div>
//       ) : videos.length === 0 ? (
//         <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 text-center">
//           <p className="text-lg font-semibold">No videos uploaded yet.</p>
//           <p className="mt-2 text-white/60">
//             Go to <span className="font-medium">Upload Video</span> to add your
//             first video.
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
//           {videos.map((video) => (
//             <VideoCard
//               key={video.id}
//               video={video}
//               onDownload={handleDownload}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import type { Video } from "@/types";
import Link from "next/link";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setError(null);
      const res = await axios.get("/api/videos");
      setVideos(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch videos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Videos
          </h1>
          <p className="mt-2 text-white/70">
            Preview, optimize and download your uploaded videos.
          </p>
        </div>

        <Link
          href="/video-upload"
          className="hidden btn btn-primary sm:inline-flex"
        >
          Upload Video
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 text-sm text-red-200 border rounded-2xl border-red-500/20 bg-red-500/10">
          {error}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 text-center">
          <p className="text-lg font-semibold">No videos uploaded yet.</p>
          <p className="mt-2 text-white/60">
            Upload your first video to see it here.
          </p>

          <div className="mt-6">
            <Link href="/video-upload" className="btn btn-primary">
              Upload Video
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}
    </section>
  );
}
