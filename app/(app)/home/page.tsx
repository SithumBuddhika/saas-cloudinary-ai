// "use client";

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import VideoCard from "@/components/VideoCard";
// import type { Video } from "@/types";
// import Link from "next/link";
// import {
//   Upload,
//   RefreshCcw,
//   Video as VideoIcon,
//   AlertTriangle,
//   Trash2,
// } from "lucide-react";

// export default function Home() {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [deletingId, setDeletingId] = useState<string | null>(null);

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

//   const handleDelete = useCallback(
//     async (id: string) => {
//       if (!confirm("Delete this video? This cannot be undone.")) return;

//       try {
//         setDeletingId(id);

//         // optimistic remove
//         setVideos((prev) => prev.filter((v) => v.id !== id));

//         await axios.delete(`/api/videos/${id}`);
//       } catch (e) {
//         console.error(e);
//         alert("Delete failed. Please refresh and try again.");
//         // fallback: refetch to restore truth
//         setLoading(true);
//         fetchVideos();
//       } finally {
//         setDeletingId(null);
//       }
//     },
//     [fetchVideos]
//   );

//   const hasVideos = videos.length > 0;

//   const headerRight = useMemo(() => {
//     return (
//       <div className="flex items-center gap-2">
//         <button
//           type="button"
//           onClick={() => {
//             setLoading(true);
//             fetchVideos();
//           }}
//           className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10"
//           title="Refresh"
//         >
//           <RefreshCcw className="w-4 h-4" />
//           <span className="hidden sm:inline">Refresh</span>
//         </button>

//         <Link
//           href="/video-upload"
//           className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.25)] transition hover:brightness-110"
//         >
//           <Upload className="w-4 h-4" />
//           Upload Video
//         </Link>
//       </div>
//     );
//   }, [fetchVideos]);

//   return (
//     <section className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
//             Your Videos
//           </h1>
//           <p className="mt-2 text-white/70">
//             Preview, optimize and download your uploaded videos.
//           </p>
//         </div>

//         {headerRight}
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="p-4 text-sm text-red-100 border rounded-2xl border-red-500/20 bg-red-500/10">
//           <div className="flex items-start gap-3">
//             <div className="mt-0.5 rounded-xl border border-red-500/20 bg-red-500/10 p-2">
//               <AlertTriangle className="w-4 h-4" />
//             </div>
//             <div className="flex-1">
//               <p className="font-semibold">Something went wrong</p>
//               <p className="mt-1 text-red-100/80">{error}</p>

//               <div className="mt-3">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setLoading(true);
//                     fetchVideos();
//                   }}
//                   className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold transition border rounded-xl border-red-500/20 bg-white/5 text-white/90 hover:bg-white/10"
//                 >
//                   <RefreshCcw className="h-3.5 w-3.5" />
//                   Try again
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       {loading ? (
//         <div className="flex justify-center py-16">
//           <span className="loading loading-spinner loading-lg" />
//         </div>
//       ) : !hasVideos ? (
//         <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.55)]">
//           <div className="p-8 sm:p-12">
//             <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
//               <div className="grid border h-14 w-14 place-items-center rounded-2xl border-white/10 bg-white/5">
//                 <VideoIcon className="w-6 h-6 text-white/80" />
//               </div>

//               <h2 className="mt-5 text-xl font-semibold">
//                 No videos uploaded yet
//               </h2>
//               <p className="mt-2 text-white/60">
//                 Upload your first video to generate a preview, track size
//                 savings, and download the optimized version.
//               </p>

//               <div className="flex flex-col gap-3 mt-6 sm:flex-row">
//                 <Link
//                   href="/video-upload"
//                   className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:brightness-110"
//                 >
//                   <Upload className="w-4 h-4" />
//                   Upload your first video
//                 </Link>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setLoading(true);
//                     fetchVideos();
//                   }}
//                   className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold transition border rounded-2xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
//                 >
//                   <RefreshCcw className="w-4 h-4" />
//                   Refresh
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
//           {videos.map((video) => (
//             <VideoCard
//               key={video.id}
//               video={video}
//               onDownload={handleDownload}
//               onDelete={handleDelete}
//               isDeleting={deletingId === video.id}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import type { Video } from "@/types";
import Link from "next/link";
import {
  Upload,
  RefreshCcw,
  Video as VideoIcon,
  AlertTriangle,
  Trash2,
  Undo2,
  X,
} from "lucide-react";

type UndoToast = {
  id: string;
  title: string;
  expiresAt: number; // ms timestamp
};

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // pending deletes: id -> { video snapshot, timeout }
  const pendingRef = useRef<
    Record<string, { video: Video; timeoutId: ReturnType<typeof setTimeout> }>
  >({});

  const [undoToast, setUndoToast] = useState<UndoToast | null>(null);

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

  const startDeleteWithUndo = useCallback(
    (video: Video) => {
      // If already pending, ignore
      if (pendingRef.current[video.id]) return;

      // Optimistic remove
      setVideos((prev) => prev.filter((v) => v.id !== video.id));

      // Show toast with 5s expiry
      const expiresAt = Date.now() + 5000;
      setUndoToast({ id: video.id, title: video.title, expiresAt });

      const timeoutId = setTimeout(async () => {
        try {
          await axios.delete(`/api/videos/${video.id}`);
        } catch (err) {
          console.error("Delete failed:", err);

          // If backend delete fails, restore video
          setVideos((prev) => [video, ...prev]);

          setError("Delete failed. The video was restored.");
        } finally {
          delete pendingRef.current[video.id];

          // Clear toast only if it’s still the same one
          setUndoToast((t) => (t?.id === video.id ? null : t));
        }
      }, 5000);

      pendingRef.current[video.id] = { video, timeoutId };
    },
    [setVideos]
  );

  const undoDelete = useCallback(() => {
    const t = undoToast;
    if (!t) return;

    const pending = pendingRef.current[t.id];
    if (!pending) {
      setUndoToast(null);
      return;
    }

    clearTimeout(pending.timeoutId);
    delete pendingRef.current[t.id];

    // Restore video back to top
    setVideos((prev) => [pending.video, ...prev]);
    setUndoToast(null);
  }, [undoToast]);

  const dismissToast = useCallback(() => setUndoToast(null), []);

  const hasVideos = videos.length > 0;

  const headerRight = useMemo(() => {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            fetchVideos();
          }}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10"
          title="Refresh"
        >
          <RefreshCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Refresh</span>
        </button>

        <Link
          href="/video-upload"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.25)] transition hover:brightness-110"
        >
          <Upload className="w-4 h-4" />
          Upload Video
        </Link>
      </div>
    );
  }, [fetchVideos]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Videos
          </h1>
          <p className="mt-2 text-white/70">
            Preview, optimize and download your uploaded videos.
          </p>
        </div>

        {headerRight}
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 text-sm text-red-100 border rounded-2xl border-red-500/20 bg-red-500/10">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl border border-red-500/20 bg-red-500/10 p-2">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Something went wrong</p>
              <p className="mt-1 text-red-100/80">{error}</p>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    fetchVideos();
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold transition border rounded-xl border-red-500/20 bg-white/5 text-white/90 hover:bg-white/10"
                >
                  <RefreshCcw className="h-3.5 w-3.5" />
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : !hasVideos ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.55)]">
          <div className="p-8 sm:p-12">
            <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
              <div className="grid border h-14 w-14 place-items-center rounded-2xl border-white/10 bg-white/5">
                <VideoIcon className="w-6 h-6 text-white/80" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                No videos uploaded yet
              </h2>
              <p className="mt-2 text-white/60">
                Upload your first video to generate a preview, track size
                savings, and download the optimized version.
              </p>

              <div className="flex flex-col gap-3 mt-6 sm:flex-row">
                <Link
                  href="/video-upload"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:brightness-110"
                >
                  <Upload className="w-4 h-4" />
                  Upload your first video
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    fetchVideos();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold transition border rounded-2xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onDownload={handleDownload}
              onDelete={() => startDeleteWithUndo(video)}
            />
          ))}
        </div>
      )}

      {/* ✅ Undo Toast */}
      {undoToast && (
        <div className="fixed bottom-6 left-6 z-50 w-[min(420px,calc(100vw-48px))]">
          <div className="rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.65)]">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                <Trash2 className="w-5 h-5 text-white/80" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-white/90">
                  Video deleted
                </p>
                <p className="mt-1 text-xs text-white/60 line-clamp-1">
                  “{undoToast.title}”
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={undoDelete}
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white transition rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:brightness-110"
                  >
                    <Undo2 className="h-3.5 w-3.5" />
                    Undo
                  </button>

                  <button
                    type="button"
                    onClick={dismissToast}
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold transition border rounded-xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                  >
                    <X className="h-3.5 w-3.5" />
                    Dismiss
                  </button>

                  <span className="ml-auto text-[11px] text-white/45">5s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
