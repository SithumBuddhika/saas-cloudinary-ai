// "use client";

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import VideoCard from "@/components/VideoCard";
// import ConfirmDialog from "@/components/ConfirmDialog";
// import type { Video } from "@/types";
// import Link from "next/link";
// import {
//   Upload,
//   RefreshCcw,
//   Video as VideoIcon,
//   AlertTriangle,
// } from "lucide-react";

// export default function Home() {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [deleteTarget, setDeleteTarget] = useState<Video | null>(null);
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

//   // ✅ auto compression trigger (a couple at a time)
//   useEffect(() => {
//     const notReady = videos.filter((v) => !v.compressedReady);
//     if (notReady.length === 0) return;

//     notReady.slice(0, 2).forEach(async (v) => {
//       try {
//         const res = await axios.post(`/api/videos/${v.id}/compress`);
//         const updated = res.data as Video;
//         setVideos((prev) =>
//           prev.map((x) => (x.id === updated.id ? updated : x))
//         );
//       } catch (e) {
//         console.error("Compression job failed for", v.id, e);
//       }
//     });
//   }, [videos]);

//   const handleDownload = useCallback((url: string, title: string) => {
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `${title}.mp4`);
//     link.setAttribute("target", "_blank");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }, []);

//   const openDelete = useCallback((video: Video) => {
//     setDeleteTarget(video);
//   }, []);

//   const confirmDelete = useCallback(async () => {
//     if (!deleteTarget) return;

//     try {
//       setDeletingId(deleteTarget.id);
//       await axios.delete(`/api/videos/${deleteTarget.id}`);
//       setVideos((prev) => prev.filter((v) => v.id !== deleteTarget.id));
//       setDeleteTarget(null);
//     } catch (e) {
//       console.error(e);
//       alert("Delete failed. Check server logs.");
//     } finally {
//       setDeletingId(null);
//     }
//   }, [deleteTarget]);

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
//       <ConfirmDialog
//         open={!!deleteTarget}
//         title="Delete video"
//         description={
//           deleteTarget
//             ? `This will permanently delete "${deleteTarget.title}" from Cloudinary and your database.`
//             : ""
//         }
//         confirmText="Delete"
//         cancelText="Cancel"
//         loading={!!deletingId}
//         onCancel={() => (deletingId ? null : setDeleteTarget(null))}
//         onConfirm={confirmDelete}
//       />

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
//           <div className="p-8 text-center sm:p-12">
//             <div className="flex flex-col items-center max-w-2xl mx-auto">
//               <div className="grid border h-14 w-14 place-items-center rounded-2xl border-white/10 bg-white/5">
//                 <VideoIcon className="w-6 h-6 text-white/80" />
//               </div>
//               <h2 className="mt-5 text-xl font-semibold">
//                 No videos uploaded yet
//               </h2>
//               <p className="mt-2 text-white/60">
//                 Upload your first video to see it here.
//               </p>
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
//               onRequestDelete={openDelete}
//               deleting={deletingId === video.id}
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
import ConfirmDialog from "@/components/ConfirmDialog";
import type { Video } from "@/types";
import Link from "next/link";
import {
  Upload,
  RefreshCcw,
  Video as VideoIcon,
  AlertTriangle,
} from "lucide-react";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Video | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ✅ prevents POST spam for the same video
  const compressingIdsRef = useRef<Set<string>>(new Set());

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

  // ✅ auto compression trigger (queue + 2 at a time, no duplicate jobs)
  useEffect(() => {
    const candidates = videos.filter(
      (v) => !v.compressedReady && !compressingIdsRef.current.has(v.id)
    );

    if (candidates.length === 0) return;

    const run = async (v: Video) => {
      compressingIdsRef.current.add(v.id);
      try {
        const res = await axios.post(`/api/videos/${v.id}/compress`);
        const updated = res.data as Video;

        setVideos((prev) =>
          prev.map((x) => (x.id === updated.id ? updated : x))
        );
      } catch (e) {
        console.error("Compression job failed for", v.id, e);
      } finally {
        // if still not ready, allow retry later; if ready, keep it blocked
        const latest = videos.find((x) => x.id === v.id);
        if (!latest?.compressedReady) {
          compressingIdsRef.current.delete(v.id);
        }
      }
    };

    candidates.slice(0, 2).forEach((v) => void run(v));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos]);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const openDelete = useCallback((video: Video) => {
    setDeleteTarget(video);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;

    try {
      setDeletingId(deleteTarget.id);
      await axios.delete(`/api/videos/${deleteTarget.id}`);

      setVideos((prev) => prev.filter((v) => v.id !== deleteTarget.id));
      compressingIdsRef.current.delete(deleteTarget.id);
      setDeleteTarget(null);
    } catch (e) {
      console.error(e);
      alert("Delete failed. Check server logs.");
    } finally {
      setDeletingId(null);
    }
  }, [deleteTarget]);

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
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete video"
        description={
          deleteTarget
            ? `This will permanently delete "${deleteTarget.title}" from Cloudinary and your database.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        loading={!!deletingId}
        onCancel={() => (deletingId ? null : setDeleteTarget(null))}
        onConfirm={confirmDelete}
      />

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

      {error && (
        <div className="p-4 text-sm text-red-100 border rounded-2xl border-red-500/20 bg-red-500/10">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl border border-red-500/20 bg-red-500/10 p-2">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Something went wrong</p>
              <p className="mt-1 text-red-100/80">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : !hasVideos ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.55)]">
          <div className="p-8 text-center sm:p-12">
            <div className="flex flex-col items-center max-w-2xl mx-auto">
              <div className="grid border h-14 w-14 place-items-center rounded-2xl border-white/10 bg-white/5">
                <VideoIcon className="w-6 h-6 text-white/80" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">
                No videos uploaded yet
              </h2>
              <p className="mt-2 text-white/60">
                Upload your first video to see it here.
              </p>
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
              onRequestDelete={openDelete}
              deleting={deletingId === video.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
