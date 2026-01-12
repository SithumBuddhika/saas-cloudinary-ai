// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import axios from "axios";
// import VideoCard from "@/components/VideoCard";
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

//   // Track which IDs are currently being compressed (UI)
//   const [compressingIds, setCompressingIds] = useState<Set<string>>(new Set());

//   // Hard guard: never compress the same ID twice in this session
//   const startedCompressionRef = useRef<Set<string>>(new Set());

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

//   // ✅ Auto compression (ONLY ONCE per video, sequential)
//   useEffect(() => {
//     if (loading) return;

//     const pending = videos.filter(
//       (v) => !v.compressedReady && !startedCompressionRef.current.has(v.id)
//     );

//     if (pending.length === 0) return;

//     let cancelled = false;

//     (async () => {
//       // Run one-by-one to avoid Cloudinary throttling + keeps UI stable
//       for (const v of pending) {
//         if (cancelled) return;

//         startedCompressionRef.current.add(v.id);
//         setCompressingIds((prev) => new Set(prev).add(v.id));

//         try {
//           const res = await axios.post(`/api/videos/${v.id}/compress`);
//           const updated = res.data as Video;

//           if (cancelled) return;

//           // update only that item in state
//           setVideos((prev) =>
//             prev.map((x) => (x.id === updated.id ? updated : x))
//           );
//         } catch (err) {
//           console.error(`Compression job failed for "${v.id}"`, err);
//           // allow retry if you want: comment next line to permanently lock retries
//           // startedCompressionRef.current.delete(v.id);
//         } finally {
//           if (cancelled) return;
//           setCompressingIds((prev) => {
//             const next = new Set(prev);
//             next.delete(v.id);
//             return next;
//           });
//         }
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [videos, loading]);

//   const handleDownload = useCallback((url: string, title: string) => {
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `${title}.mp4`);
//     link.setAttribute("target", "_blank");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }, []);

//   const handleDelete = useCallback(async (id: string) => {
//     if (!confirm("Delete this video?")) return;

//     try {
//       await axios.delete(`/api/videos/${id}`);
//       setVideos((prev) => prev.filter((v) => v.id !== id));

//       // cleanup states
//       startedCompressionRef.current.delete(id);
//       setCompressingIds((prev) => {
//         const next = new Set(prev);
//         next.delete(id);
//         return next;
//       });
//     } catch (e) {
//       console.error(e);
//       alert("Delete failed");
//     }
//   }, []);

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
//               onDelete={handleDelete}
//               isCompressing={compressingIds.has(video.id)}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

///////////////////////////

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
} from "lucide-react";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track which IDs are currently being compressed (UI)
  const [compressingIds, setCompressingIds] = useState<Set<string>>(new Set());
  const startedCompressionRef = useRef<Set<string>>(new Set());

  // ✅ Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Video | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  // ✅ Auto compression (ONLY ONCE per video, sequential)
  useEffect(() => {
    if (loading) return;

    const pending = videos.filter(
      (v) => !v.compressedReady && !startedCompressionRef.current.has(v.id)
    );

    if (pending.length === 0) return;

    let cancelled = false;

    (async () => {
      for (const v of pending) {
        if (cancelled) return;

        startedCompressionRef.current.add(v.id);
        setCompressingIds((prev) => new Set(prev).add(v.id));

        try {
          const res = await axios.post(`/api/videos/${v.id}/compress`);
          const updated = res.data as Video;
          if (cancelled) return;

          setVideos((prev) =>
            prev.map((x) => (x.id === updated.id ? updated : x))
          );
        } catch (err) {
          console.error(`Compression job failed for "${v.id}"`, err);
        } finally {
          if (cancelled) return;
          setCompressingIds((prev) => {
            const next = new Set(prev);
            next.delete(v.id);
            return next;
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [videos, loading]);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // ✅ open modal (instead of confirm())
  const requestDelete = useCallback((video: Video) => {
    setDeleteTarget(video);
  }, []);

  const closeDeleteModal = useCallback(() => {
    if (isDeleting) return;
    setDeleteTarget(null);
  }, [isDeleting]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      await axios.delete(`/api/videos/${deleteTarget.id}`);

      setVideos((prev) => prev.filter((v) => v.id !== deleteTarget.id));

      // cleanup states
      startedCompressionRef.current.delete(deleteTarget.id);
      setCompressingIds((prev) => {
        const next = new Set(prev);
        next.delete(deleteTarget.id);
        return next;
      });

      setDeleteTarget(null);
    } catch (e) {
      console.error(e);
      alert("Delete failed"); // (optional: can replace with your toast/notice later)
    } finally {
      setIsDeleting(false);
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
    <>
      <section className="space-y-6">
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
                onDelete={() => requestDelete(video)}
                isCompressing={compressingIds.has(video.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ✅ Custom Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/70"
            onClick={closeDeleteModal}
            aria-label="Close delete dialog"
          />

          {/* Dialog */}
          <div className="absolute left-1/2 top-1/2 w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.65)]">
              <div className="p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="grid border h-11 w-11 place-items-center rounded-2xl border-white/10 bg-white/5">
                    <Trash2 className="w-5 h-5 text-rose-300" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">
                      Delete video?
                    </h3>
                    <p className="mt-1 text-sm text-white/65">
                      This will remove the video from your dashboard and delete
                      it from Cloudinary.
                    </p>

                    <div className="p-4 mt-4 border rounded-2xl border-white/10 bg-white/5">
                      <p className="text-sm font-semibold text-white/90 line-clamp-1">
                        {deleteTarget.title}
                      </p>
                      {deleteTarget.description ? (
                        <p className="mt-1 text-xs text-white/60 line-clamp-2">
                          {deleteTarget.description}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-white/40">
                          No description
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={closeDeleteModal}
                        disabled={isDeleting}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 disabled:opacity-60"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={confirmDelete}
                        disabled={isDeleting}
                        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(244,63,94,0.25)] transition hover:brightness-110 disabled:opacity-60"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
