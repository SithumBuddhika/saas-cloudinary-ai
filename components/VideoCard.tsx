// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
// import {
//   Download,
//   Clock,
//   FileDown,
//   FileUp,
//   Trash2,
//   Loader2,
// } from "lucide-react";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { filesize } from "filesize";
// import type { Video } from "@/types";

// dayjs.extend(relativeTime);

// interface VideoCardProps {
//   video: Video;
//   onDownload: (url: string, title: string) => void;
//   onDelete: (id: string) => void;
//   isCompressing?: boolean;
// }

// export default function VideoCard({
//   video,
//   onDownload,
//   onDelete,
//   isCompressing = false,
// }: VideoCardProps) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [previewError, setPreviewError] = useState(false);
//   const [thumbError, setThumbError] = useState(false);

//   // Use original publicId for preview + thumbnail (more reliable)
//   const thumbnailUrl = useMemo(() => {
//     return getCldImageUrl({
//       src: video.publicId,
//       assetType: "video",
//       width: 640,
//       height: 360,
//       crop: "fill",
//       gravity: "auto",
//       format: "jpg",
//       quality: "auto",
//       rawTransformations: ["so_0", "f_jpg", "q_auto"],
//     });
//   }, [video.publicId]);

//   const previewUrl = useMemo(() => {
//     return getCldVideoUrl({
//       src: video.publicId,
//       width: 640,
//       height: 360,
//       crop: "fill",
//       gravity: "auto",
//       rawTransformations: ["so_0", "du_6", "q_auto", "f_mp4"],
//     });
//   }, [video.publicId]);

//   // Download should prefer compressedPublicId if you store it
//   const downloadUrl = useMemo(() => {
//     const src = video.compressedPublicId || video.publicId;
//     return getCldVideoUrl({
//       src,
//       rawTransformations: ["q_auto", "f_mp4"],
//     });
//   }, [video.publicId, video.compressedPublicId]);

//   const original = Number(video.originalSize) || 0;
//   const compressed = Number(video.compressedSize) || 0;

//   const compressionPercentage = useMemo(() => {
//     if (!video.compressedReady) return null;
//     if (!original || !compressed) return 0;
//     const pct = Math.round((1 - compressed / original) * 100);
//     return Math.max(0, Math.min(99, pct));
//   }, [original, compressed, video.compressedReady]);

//   const durationLabel = useMemo(() => {
//     const s = Number(video.duration) || 0;
//     const m = Math.floor(s / 60);
//     const r = Math.round(s % 60);
//     return `${m}:${String(r).padStart(2, "0")}`;
//   }, [video.duration]);

//   useEffect(() => {
//     if (isHovered) setPreviewError(false);
//   }, [isHovered]);

//   return (
//     <div
//       className={[
//         "group overflow-hidden rounded-3xl",
//         "border border-white/10 bg-white/[0.04] backdrop-blur-xl",
//         "shadow-[0_0_70px_rgba(0,0,0,0.55)]",
//         "transition hover:border-white/15 hover:bg-white/[0.06]",
//       ].join(" ")}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Media */}
//       <div className="relative aspect-video">
//         <div className="absolute inset-0 transition opacity-0 pointer-events-none bg-gradient-to-t from-black/35 via-transparent to-transparent group-hover:opacity-100" />

//         {/* Top-right actions */}
//         <div className="absolute z-10 flex items-center gap-2 top-3 right-3">
//           {!video.compressedReady && (
//             <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/35 px-2.5 py-1 text-xs font-semibold text-white/90 backdrop-blur">
//               {isCompressing ? (
//                 <Loader2 className="h-3.5 w-3.5 animate-spin" />
//               ) : null}
//               {isCompressing ? "Compressing…" : "Queued…"}
//             </span>
//           )}

//           <button
//             type="button"
//             onClick={() => onDelete(video.id)}
//             className="inline-flex items-center justify-center p-2 transition border rounded-xl border-white/10 bg-black/35 text-white/85 backdrop-blur hover:bg-black/50"
//             title="Delete"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>

//         {isHovered ? (
//           previewError ? (
//             <div className="grid w-full h-full place-items-center bg-black/30">
//               <div className="text-center">
//                 <p className="text-sm font-semibold text-white/80">
//                   Preview unavailable
//                 </p>
//                 <p className="mt-1 text-xs text-white/50">
//                   Try again or download the video.
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <video
//               src={previewUrl}
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="object-cover w-full h-full"
//               onError={() => setPreviewError(true)}
//             />
//           )
//         ) : thumbError ? (
//           <div className="grid w-full h-full place-items-center bg-black/30">
//             <p className="text-sm text-white/70">Thumbnail unavailable</p>
//           </div>
//         ) : (
//           <img
//             src={thumbnailUrl}
//             alt={video.title}
//             className="object-cover w-full h-full"
//             onError={() => setThumbError(true)}
//           />
//         )}

//         {/* Duration */}
//         <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/35 px-2.5 py-1 text-xs font-semibold text-white/90 backdrop-blur">
//           <Clock className="h-3.5 w-3.5" />
//           {durationLabel}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         <h3 className="text-lg font-bold text-white/95 line-clamp-1">
//           {video.title}
//         </h3>

//         {video.description ? (
//           <p className="mt-1 text-sm text-white/60 line-clamp-2">
//             {video.description}
//           </p>
//         ) : (
//           <p className="mt-1 text-sm text-white/40">No description</p>
//         )}

//         <p className="mt-3 text-xs text-white/50">
//           Uploaded {dayjs(video.createdAt).fromNow()}
//         </p>

//         {/* Sizes */}
//         <div className="grid grid-cols-2 gap-3 mt-4">
//           <div className="flex items-center gap-3 px-3 py-3 border rounded-2xl border-white/10 bg-white/5">
//             <div className="grid border h-9 w-9 place-items-center rounded-xl border-white/10 bg-white/5">
//               <FileUp className="w-4 h-4 text-white/75" />
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-white/80">Original</p>
//               <p className="text-sm font-bold text-white/90">
//                 {filesize(original || 0)}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 px-3 py-3 border rounded-2xl border-white/10 bg-white/5">
//             <div className="grid border h-9 w-9 place-items-center rounded-xl border-white/10 bg-white/5">
//               <FileDown className="w-4 h-4 text-white/75" />
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-white/80">Compressed</p>
//               <p className="text-sm font-bold text-white/90">
//                 {video.compressedReady ? filesize(compressed || 0) : "—"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between gap-3 mt-4">
//           <div className="text-sm font-semibold text-white/80">
//             Compression:{" "}
//             <span className="text-white/95">
//               {compressionPercentage === null
//                 ? "…"
//                 : `${compressionPercentage}%`}
//             </span>
//           </div>

//           <button
//             type="button"
//             onClick={() => onDownload(downloadUrl, video.title)}
//             className={[
//               "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold",
//               "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
//               "shadow-[0_0_30px_rgba(168,85,247,0.25)]",
//               "transition hover:brightness-110",
//             ].join(" ")}
//             title="Download optimized MP4"
//           >
//             <Download className="w-4 h-4" />
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

/////////////////////

// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
// import {
//   Download,
//   Clock,
//   FileDown,
//   FileUp,
//   Trash2,
//   Loader2,
// } from "lucide-react";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { filesize } from "filesize";
// import type { Video } from "@/types";

// dayjs.extend(relativeTime);

// interface VideoCardProps {
//   video: Video;
//   onDownload: (url: string, title: string) => void;
//   onDelete: () => void;
//   isCompressing?: boolean;
// }

// export default function VideoCard({
//   video,
//   onDownload,
//   onDelete,
//   isCompressing = false,
// }: VideoCardProps) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [previewError, setPreviewError] = useState(false);
//   const [thumbError, setThumbError] = useState(false);

//   const thumbnailUrl = useMemo(() => {
//     return getCldImageUrl({
//       src: video.publicId,
//       assetType: "video",
//       width: 640,
//       height: 360,
//       crop: "fill",
//       gravity: "auto",
//       format: "jpg",
//       quality: "auto",
//       rawTransformations: ["so_0", "f_jpg", "q_auto"],
//     });
//   }, [video.publicId]);

//   const previewUrl = useMemo(() => {
//     return getCldVideoUrl({
//       src: video.publicId,
//       width: 640,
//       height: 360,
//       crop: "fill",
//       gravity: "auto",
//       rawTransformations: ["so_0", "du_6", "q_auto", "f_mp4"],
//     });
//   }, [video.publicId]);

//   const downloadUrl = useMemo(() => {
//     const src = video.compressedPublicId || video.publicId;
//     return getCldVideoUrl({
//       src,
//       rawTransformations: ["q_auto", "f_mp4"],
//     });
//   }, [video.publicId, video.compressedPublicId]);

//   const original = Number(video.originalSize) || 0;
//   const compressed = Number(video.compressedSize) || 0;

//   const compressionPercentage = useMemo(() => {
//     if (!video.compressedReady) return null;
//     if (!original || !compressed) return 0;
//     const pct = Math.round((1 - compressed / original) * 100);
//     return Math.max(0, Math.min(99, pct));
//   }, [original, compressed, video.compressedReady]);

//   const durationLabel = useMemo(() => {
//     const s = Number(video.duration) || 0;
//     const m = Math.floor(s / 60);
//     const r = Math.round(s % 60);
//     return `${m}:${String(r).padStart(2, "0")}`;
//   }, [video.duration]);

//   useEffect(() => {
//     if (isHovered) setPreviewError(false);
//   }, [isHovered]);

//   return (
//     <div
//       className={[
//         "group overflow-hidden rounded-3xl",
//         "border border-white/10 bg-white/[0.04] backdrop-blur-xl",
//         "shadow-[0_0_70px_rgba(0,0,0,0.55)]",
//         "transition hover:border-white/15 hover:bg-white/[0.06]",
//       ].join(" ")}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="relative aspect-video">
//         <div className="absolute inset-0 transition opacity-0 pointer-events-none bg-gradient-to-t from-black/35 via-transparent to-transparent group-hover:opacity-100" />

//         {/* Actions */}
//         <div className="absolute z-10 flex items-center gap-2 top-3 right-3">
//           {!video.compressedReady && (
//             <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/35 px-2.5 py-1 text-xs font-semibold text-white/90 backdrop-blur">
//               {isCompressing ? (
//                 <Loader2 className="h-3.5 w-3.5 animate-spin" />
//               ) : null}
//               {isCompressing ? "Compressing…" : "Queued…"}
//             </span>
//           )}

//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete();
//             }}
//             className="inline-flex items-center justify-center p-2 transition border rounded-xl border-white/10 bg-black/35 text-white/85 backdrop-blur hover:bg-black/50"
//             title="Delete"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>

//         {isHovered ? (
//           previewError ? (
//             <div className="grid w-full h-full place-items-center bg-black/30">
//               <div className="text-center">
//                 <p className="text-sm font-semibold text-white/80">
//                   Preview unavailable
//                 </p>
//                 <p className="mt-1 text-xs text-white/50">
//                   Try again or download the video.
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <video
//               src={previewUrl}
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="object-cover w-full h-full"
//               onError={() => setPreviewError(true)}
//             />
//           )
//         ) : thumbError ? (
//           <div className="grid w-full h-full place-items-center bg-black/30">
//             <p className="text-sm text-white/70">Thumbnail unavailable</p>
//           </div>
//         ) : (
//           <img
//             src={thumbnailUrl}
//             alt={video.title}
//             className="object-cover w-full h-full"
//             onError={() => setThumbError(true)}
//           />
//         )}

//         <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/35 px-2.5 py-1 text-xs font-semibold text-white/90 backdrop-blur">
//           <Clock className="h-3.5 w-3.5" />
//           {durationLabel}
//         </div>
//       </div>

//       <div className="p-5">
//         <h3 className="text-lg font-bold text-white/95 line-clamp-1">
//           {video.title}
//         </h3>

//         {video.description ? (
//           <p className="mt-1 text-sm text-white/60 line-clamp-2">
//             {video.description}
//           </p>
//         ) : (
//           <p className="mt-1 text-sm text-white/40">No description</p>
//         )}

//         <p className="mt-3 text-xs text-white/50">
//           Uploaded {dayjs(video.createdAt).fromNow()}
//         </p>

//         <div className="grid grid-cols-2 gap-3 mt-4">
//           <div className="flex items-center gap-3 px-3 py-3 border rounded-2xl border-white/10 bg-white/5">
//             <div className="grid border h-9 w-9 place-items-center rounded-xl border-white/10 bg-white/5">
//               <FileUp className="w-4 h-4 text-white/75" />
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-white/80">Original</p>
//               <p className="text-sm font-bold text-white/90">
//                 {filesize(original || 0)}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 px-3 py-3 border rounded-2xl border-white/10 bg-white/5">
//             <div className="grid border h-9 w-9 place-items-center rounded-xl border-white/10 bg-white/5">
//               <FileDown className="w-4 h-4 text-white/75" />
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-white/80">Compressed</p>
//               <p className="text-sm font-bold text-white/90">
//                 {video.compressedReady ? filesize(compressed || 0) : "—"}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between gap-3 mt-4">
//           <div className="text-sm font-semibold text-white/80">
//             Compression:{" "}
//             <span className="text-white/95">
//               {compressionPercentage === null
//                 ? "…"
//                 : `${compressionPercentage}%`}
//             </span>
//           </div>

//           <button
//             type="button"
//             onClick={() => onDownload(downloadUrl, video.title)}
//             className={[
//               "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold",
//               "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
//               "shadow-[0_0_30px_rgba(168,85,247,0.25)]",
//               "transition hover:brightness-110",
//             ].join(" ")}
//             title="Download optimized MP4"
//           >
//             <Download className="w-4 h-4" />
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import {
  Download,
  Clock,
  FileDown,
  FileUp,
  Trash2,
  Loader2,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import type { Video } from "@/types";

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
  onRequestDelete: (video: Video) => void;
  deleting?: boolean;
}

export default function VideoCard({
  video,
  onDownload,
  onRequestDelete,
  deleting = false,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  const thumbnailUrl = useMemo(() => {
    return getCldImageUrl({
      src: video.publicId,
      assetType: "video",
      width: 640,
      height: 360,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      rawTransformations: ["so_0", "f_jpg", "q_auto"],
    });
  }, [video.publicId]);

  const previewUrl = useMemo(() => {
    return getCldVideoUrl({
      src: video.publicId,
      width: 640,
      height: 360,
      crop: "fill",
      gravity: "auto",
      rawTransformations: ["so_0", "du_6", "q_auto", "f_mp4"],
    });
  }, [video.publicId]);

  const fullVideoUrl = useMemo(() => {
    // If you store compressedPublicId later, you can prefer it here.
    return getCldVideoUrl({
      src: video.publicId,
      rawTransformations: ["q_auto", "f_mp4"],
    });
  }, [video.publicId]);

  const original = Number(video.originalSize) || 0;
  const compressed = Number(video.compressedSize) || 0;

  const compressionPercentage = useMemo(() => {
    if (!original || !compressed) return 0;
    const pct = Math.round((1 - compressed / original) * 100);
    return Math.max(0, Math.min(99, pct));
  }, [original, compressed]);

  const durationLabel = useMemo(() => {
    const s = Number(video.duration) || 0;
    const m = Math.floor(s / 60);
    const r = Math.round(s % 60);
    return `${m}:${String(r).padStart(2, "0")}`;
  }, [video.duration]);

  useEffect(() => {
    if (isHovered) setPreviewError(false);
  }, [isHovered]);

  return (
    <div
      className={[
        "group overflow-hidden rounded-3xl",
        "border border-white/10 bg-white/[0.04] backdrop-blur-xl",
        "shadow-[0_0_70px_rgba(0,0,0,0.55)]",
        "transition hover:border-white/15 hover:bg-white/[0.06]",
      ].join(" ")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media */}
      <div className="relative aspect-video">
        <div className="absolute inset-0 transition opacity-0 pointer-events-none bg-gradient-to-t from-black/35 via-transparent to-transparent group-hover:opacity-100" />

        {/* Delete button */}
        <button
          type="button"
          onClick={() => onRequestDelete(video)}
          disabled={deleting}
          className="absolute z-10 inline-flex items-center justify-center transition border right-3 top-3 h-9 w-9 rounded-xl border-white/10 bg-black/35 text-white/90 backdrop-blur hover:bg-black/45 disabled:opacity-60"
          title="Delete video"
        >
          {deleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>

        {isHovered ? (
          previewError ? (
            <div className="grid w-full h-full place-items-center bg-black/30">
              <div className="text-center">
                <p className="text-sm font-semibold text-white/80">
                  Preview unavailable
                </p>
                <p className="mt-1 text-xs text-white/50">
                  Try again or download the video.
                </p>
              </div>
            </div>
          ) : (
            <video
              src={previewUrl}
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
              onError={() => setPreviewError(true)}
            />
          )
        ) : thumbError ? (
          <div className="grid w-full h-full place-items-center bg-black/30">
            <p className="text-sm text-white/70">Thumbnail unavailable</p>
          </div>
        ) : (
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="object-cover w-full h-full"
            onError={() => setThumbError(true)}
          />
        )}

        {/* Duration */}
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/35 px-2.5 py-1 text-xs font-semibold text-white/90 backdrop-blur">
          <Clock className="h-3.5 w-3.5" />
          {durationLabel}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold line-clamp-1 text-white/95">
          {video.title}
        </h3>

        {video.description ? (
          <p className="mt-1 text-sm line-clamp-2 text-white/60">
            {video.description}
          </p>
        ) : (
          <p className="mt-1 text-sm text-white/40">No description</p>
        )}

        <p className="mt-3 text-xs text-white/50">
          Uploaded {dayjs(video.createdAt).fromNow()}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center gap-3 px-3 py-3 border rounded-2xl border-white/10 bg-white/5">
            <div className="grid border h-9 w-9 place-items-center rounded-xl border-white/10 bg-white/5">
              <FileUp className="w-4 h-4 text-white/75" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white/80">Original</p>
              <p className="text-sm font-bold text-white/90">
                {filesize(original || 0)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-3 border rounded-2xl border-white/10 bg-white/5">
            <div className="grid border h-9 w-9 place-items-center rounded-xl border-white/10 bg-white/5">
              <FileDown className="w-4 h-4 text-white/75" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white/80">Compressed</p>
              <p className="text-sm font-bold text-white/90">
                {filesize(compressed || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-4">
          <div className="text-sm font-semibold text-white/80">
            Compression:{" "}
            <span className="text-white/95">{compressionPercentage}%</span>
          </div>

          <button
            type="button"
            onClick={() => onDownload(fullVideoUrl, video.title)}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.25)] transition hover:brightness-110"
            title="Download optimized MP4"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
