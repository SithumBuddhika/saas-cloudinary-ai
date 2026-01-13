// "use client";

// import React, { useMemo, useRef, useState } from "react";
// import axios from "axios";
// import {
//   CloudUpload,
//   FileVideo,
//   X,
//   CheckCircle2,
//   AlertTriangle,
// } from "lucide-react";

// export default function Page() {
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const [isUploading, setIsUploading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const [notice, setNotice] = useState<{
//     type: "success" | "error";
//     text: string;
//   } | null>(null);

//   const MAX_FILE_SIZE = 70 * 1024 * 1024;

//   const fileMeta = useMemo(() => {
//     if (!file) return null;
//     const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
//     return { name: file.name, sizeMB };
//   }, [file]);

//   const pickFile = () => inputRef.current?.click();

//   const resetFile = () => {
//     setFile(null);
//     setProgress(0);
//     if (inputRef.current) inputRef.current.value = "";
//   };

//   const handleFile = (f: File | null) => {
//     if (!f) return;

//     if (f.size > MAX_FILE_SIZE) {
//       setNotice({ type: "error", text: "File size too large (max 70MB)." });
//       return;
//     }

//     setNotice(null);
//     setFile(f);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const f = e.dataTransfer.files?.[0];
//     if (f) handleFile(f);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       setNotice({ type: "error", text: "Please select a video file." });
//       return;
//     }
//     if (!title.trim()) {
//       setNotice({ type: "error", text: "Please enter a title." });
//       return;
//     }

//     setIsUploading(true);
//     setProgress(0);
//     setNotice(null);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title.trim());
//     formData.append("description", description.trim());
//     formData.append("originalSize", file.size.toString());

//     try {
//       await axios.post("/api/video-upload", formData, {
//         // ✅ prevents axios timing out on slow uploads
//         timeout: 0,
//         onUploadProgress: (evt) => {
//           if (!evt.total) return;
//           const pct = Math.round((evt.loaded / evt.total) * 100);
//           setProgress(pct);
//         },
//       });

//       setNotice({ type: "success", text: "Video uploaded successfully." });
//       setTitle("");
//       setDescription("");
//       resetFile();
//     } catch (err: any) {
//       console.error(err);

//       // ✅ show backend message if provided
//       const msg =
//         err?.response?.data?.details ||
//         err?.response?.data?.error ||
//         "Upload failed. Please try again.";

//       setNotice({ type: "error", text: msg });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <section className="space-y-8">
//       <header className="flex items-start justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
//             Upload Video
//           </h1>
//           <p className="mt-2 text-white/70">
//             Upload a video and save metadata for previews + compression stats.
//           </p>
//         </div>
//       </header>

//       {notice && (
//         <div
//           className={[
//             "rounded-2xl border px-4 py-3 backdrop-blur-xl",
//             notice.type === "success"
//               ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
//               : "border-rose-400/20 bg-rose-500/10 text-rose-100",
//           ].join(" ")}
//         >
//           <div className="flex items-start gap-3">
//             {notice.type === "success" ? (
//               <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
//             ) : (
//               <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-300" />
//             )}
//             <p className="text-sm leading-6">{notice.text}</p>
//           </div>
//         </div>
//       )}

//       <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.55)]">
//         <div className="p-6 sm:p-10">
//           <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white/90">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 transition border outline-none rounded-xl border-white/10 bg-black/30 focus:border-white/20 focus:ring-2 focus:ring-white/10"
//                   placeholder="Eg: YouTube SAAS Demo"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-white/90">
//                     Description
//                   </label>
//                   <span className="text-xs text-white/45">Optional</span>
//                 </div>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 transition border outline-none rounded-xl border-white/10 bg-black/30 focus:border-white/20 focus:ring-2 focus:ring-white/10"
//                   placeholder="Short one-liner (optional)"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <label className="text-sm font-medium text-white/90">
//                   Video file
//                 </label>
//                 <span className="text-xs text-white/45">Max 70MB</span>
//               </div>

//               <div
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={handleDrop}
//                 className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
//               >
//                 <input
//                   ref={inputRef}
//                   type="file"
//                   accept="video/*"
//                   className="hidden"
//                   onChange={(e) => handleFile(e.target.files?.[0] || null)}
//                 />

//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                   <div className="flex items-start gap-4">
//                     <div className="grid border h-11 w-11 place-items-center rounded-xl border-white/10 bg-white/5">
//                       <FileVideo className="w-5 h-5 text-white/80" />
//                     </div>

//                     <div>
//                       <p className="text-sm font-semibold text-white/90">
//                         {fileMeta ? "Selected file" : "Upload a video"}
//                       </p>
//                       <p className="mt-1 text-sm text-white/55">
//                         {fileMeta
//                           ? `${fileMeta.name} • ${fileMeta.sizeMB} MB`
//                           : "Drag & drop here, or click Browse"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     {file && (
//                       <button
//                         type="button"
//                         onClick={resetFile}
//                         className="inline-flex items-center gap-2 px-4 py-2 text-sm transition border rounded-xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
//                       >
//                         <X className="w-4 h-4" />
//                         Remove
//                       </button>
//                     )}

//                     <button
//                       type="button"
//                       onClick={pickFile}
//                       className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
//                     >
//                       <CloudUpload className="w-4 h-4" />
//                       Browse
//                     </button>
//                   </div>
//                 </div>

//                 {isUploading && (
//                   <div className="mt-5">
//                     <div className="flex items-center justify-between text-xs text-white/55">
//                       <span>Uploading…</span>
//                       <span>{progress}%</span>
//                     </div>
//                     <div className="w-full h-2 mt-2 overflow-hidden rounded-full bg-white/10">
//                       <div
//                         className="h-full transition-all rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
//                         style={{ width: `${progress}%` }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
//               <button
//                 type="submit"
//                 disabled={isUploading || !file}
//                 className={[
//                   "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold",
//                   "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
//                   "shadow-[0_15px_60px_rgba(168,85,247,0.28)]",
//                   "transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60",
//                 ].join(" ")}
//               >
//                 {isUploading ? (
//                   <>
//                     <span className="loading loading-spinner" />
//                     Uploading…
//                   </>
//                 ) : (
//                   "Upload Video"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import React, { useMemo, useRef, useState } from "react";
// import axios from "axios";
// import {
//   CloudUpload,
//   FileVideo,
//   X,
//   CheckCircle2,
//   AlertTriangle,
// } from "lucide-react";

// export default function Page() {
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const [isUploading, setIsUploading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const [notice, setNotice] = useState<{
//     type: "success" | "error";
//     text: string;
//   } | null>(null);

//   const MAX_FILE_SIZE = 70 * 1024 * 1024;

//   const fileMeta = useMemo(() => {
//     if (!file) return null;
//     const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
//     return { name: file.name, sizeMB };
//   }, [file]);

//   const pickFile = () => inputRef.current?.click();

//   const resetFile = () => {
//     setFile(null);
//     setProgress(0);
//     if (inputRef.current) inputRef.current.value = "";
//   };

//   const handleFile = (f: File | null) => {
//     if (!f) return;

//     if (f.size > MAX_FILE_SIZE) {
//       setNotice({ type: "error", text: "File size too large (max 70MB)." });
//       return;
//     }

//     setNotice(null);
//     setFile(f);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const f = e.dataTransfer.files?.[0];
//     if (f) handleFile(f);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       setNotice({ type: "error", text: "Please select a video file." });
//       return;
//     }

//     if (!title.trim()) {
//       setNotice({ type: "error", text: "Please enter a title." });
//       return;
//     }

//     setIsUploading(true);
//     setProgress(0);
//     setNotice(null);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title.trim());
//     formData.append("description", description.trim());
//     formData.append("originalSize", file.size.toString());

//     try {
//       await axios.post("/api/video-upload", formData, {
//         timeout: 0, // ✅ don't timeout on slow upload
//         onUploadProgress: (evt) => {
//           if (!evt.total) return;
//           const pct = Math.round((evt.loaded / evt.total) * 100);
//           setProgress(pct);
//         },
//       });

//       setNotice({ type: "success", text: "Video uploaded successfully." });
//       setTitle("");
//       setDescription("");
//       resetFile();
//     } catch (err: any) {
//       console.error("Upload failed:", err);

//       const msg =
//         err?.response?.data?.error ||
//         err?.response?.data?.message ||
//         err?.message ||
//         "Upload failed";

//       setNotice({ type: "error", text: msg });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <section className="space-y-8">
//       <header className="flex items-start justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
//             Upload Video
//           </h1>
//           <p className="mt-2 text-white/70">
//             Upload a video and save metadata for previews + compression stats.
//           </p>
//         </div>
//       </header>

//       {notice && (
//         <div
//           className={[
//             "rounded-2xl border px-4 py-3 backdrop-blur-xl",
//             notice.type === "success"
//               ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
//               : "border-rose-400/20 bg-rose-500/10 text-rose-100",
//           ].join(" ")}
//         >
//           <div className="flex items-start gap-3">
//             {notice.type === "success" ? (
//               <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
//             ) : (
//               <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-300" />
//             )}
//             <p className="text-sm leading-6 whitespace-pre-wrap">
//               {notice.text}
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.55)]">
//         <div className="p-6 sm:p-10">
//           <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white/90">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 transition border outline-none rounded-xl border-white/10 bg-black/30 focus:border-white/20 focus:ring-2 focus:ring-white/10"
//                   placeholder="Eg: YouTube SAAS Demo"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-white/90">
//                     Description
//                   </label>
//                   <span className="text-xs text-white/45">Optional</span>
//                 </div>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 transition border outline-none rounded-xl border-white/10 bg-black/30 focus:border-white/20 focus:ring-2 focus:ring-white/10"
//                   placeholder="Short one-liner (optional)"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <label className="text-sm font-medium text-white/90">
//                   Video file
//                 </label>
//                 <span className="text-xs text-white/45">Max 70MB</span>
//               </div>

//               <div
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={handleDrop}
//                 className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6"
//               >
//                 <input
//                   ref={inputRef}
//                   type="file"
//                   accept="video/*"
//                   className="hidden"
//                   onChange={(e) => handleFile(e.target.files?.[0] || null)}
//                 />

//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                   <div className="flex items-start gap-4">
//                     <div className="grid border h-11 w-11 place-items-center rounded-xl border-white/10 bg-white/5">
//                       <FileVideo className="w-5 h-5 text-white/80" />
//                     </div>

//                     <div>
//                       <p className="text-sm font-semibold text-white/90">
//                         {fileMeta ? "Selected file" : "Upload a video"}
//                       </p>
//                       <p className="mt-1 text-sm text-white/55">
//                         {fileMeta
//                           ? `${fileMeta.name} • ${fileMeta.sizeMB} MB`
//                           : "Drag & drop here, or click Browse"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     {file && (
//                       <button
//                         type="button"
//                         onClick={resetFile}
//                         className="inline-flex items-center gap-2 px-4 py-2 text-sm transition border rounded-xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
//                       >
//                         <X className="w-4 h-4" />
//                         Remove
//                       </button>
//                     )}

//                     <button
//                       type="button"
//                       onClick={pickFile}
//                       className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
//                     >
//                       <CloudUpload className="w-4 h-4" />
//                       Browse
//                     </button>
//                   </div>
//                 </div>

//                 {isUploading && (
//                   <div className="mt-5">
//                     <div className="flex items-center justify-between text-xs text-white/55">
//                       <span>Uploading…</span>
//                       <span>{progress}%</span>
//                     </div>
//                     <div className="w-full h-2 mt-2 overflow-hidden rounded-full bg-white/10">
//                       <div
//                         className="h-full transition-all rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
//                         style={{ width: `${progress}%` }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isUploading || !file}
//                 className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-[0_15px_60px_rgba(168,85,247,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {isUploading ? (
//                   <>
//                     <span className="loading loading-spinner" />
//                     Uploading…
//                   </>
//                 ) : (
//                   "Upload Video"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

///////////////////////////////
// "use client";

// import React, { useMemo, useRef, useState } from "react";
// import axios from "axios";
// import {
//   CloudUpload,
//   FileVideo,
//   X,
//   CheckCircle2,
//   AlertTriangle,
// } from "lucide-react";

// export default function Page() {
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const [isUploading, setIsUploading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const [notice, setNotice] = useState<{
//     type: "success" | "error";
//     text: string;
//   } | null>(null);

//   const MAX_FILE_SIZE = 70 * 1024 * 1024;

//   const fileMeta = useMemo(() => {
//     if (!file) return null;
//     const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
//     return { name: file.name, sizeMB };
//   }, [file]);

//   const pickFile = () => inputRef.current?.click();

//   const resetFile = () => {
//     setFile(null);
//     setProgress(0);
//     if (inputRef.current) inputRef.current.value = "";
//   };

//   const handleFile = (f: File | null) => {
//     if (!f) return;

//     if (f.size > MAX_FILE_SIZE) {
//       setNotice({ type: "error", text: "File size too large (max 70MB)." });
//       return;
//     }

//     setNotice(null);
//     setFile(f);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const f = e.dataTransfer.files?.[0];
//     if (f) handleFile(f);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       setNotice({ type: "error", text: "Please select a video file." });
//       return;
//     }

//     if (!title.trim()) {
//       setNotice({ type: "error", text: "Please enter a title." });
//       return;
//     }

//     setIsUploading(true);
//     setProgress(0);
//     setNotice(null);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title.trim());
//     formData.append("description", description.trim());
//     formData.append("originalSize", file.size.toString());

//     try {
//       await axios.post("/api/video-upload", formData, {
//         timeout: 0, // ✅ don't timeout on slow upload
//         onUploadProgress: (evt) => {
//           if (!evt.total) return;
//           const pct = Math.round((evt.loaded / evt.total) * 100);
//           setProgress(pct);
//         },
//       });

//       setNotice({ type: "success", text: "Video uploaded successfully." });
//       setTitle("");
//       setDescription("");
//       resetFile();
//     } catch (err: any) {
//       console.error("Upload failed:", err);

//       const msg =
//         err?.response?.data?.error ||
//         err?.response?.data?.message ||
//         err?.message ||
//         "Upload failed";

//       setNotice({ type: "error", text: msg });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <section className="space-y-8">
//       <header className="flex items-start justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
//             Upload Video
//           </h1>
//           <p className="mt-2 text-white/70">
//             Upload a video and save metadata for previews + compression stats.
//           </p>
//         </div>
//       </header>

//       {notice && (
//         <div
//           className={[
//             "rounded-2xl border px-4 py-3 backdrop-blur-xl",
//             notice.type === "success"
//               ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
//               : "border-rose-400/20 bg-rose-500/10 text-rose-100",
//           ].join(" ")}
//         >
//           <div className="flex items-start gap-3">
//             {notice.type === "success" ? (
//               <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
//             ) : (
//               <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-300" />
//             )}
//             <p className="text-sm leading-6 whitespace-pre-wrap">
//               {notice.text}
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.55)]">
//         <div className="p-6 sm:p-10">
//           <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white/90">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 transition border outline-none rounded-xl border-white/10 bg-black/30 focus:border-white/20 focus:ring-2 focus:ring-white/10"
//                   placeholder="Eg: YouTube SAAS Demo"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-white/90">
//                     Description
//                   </label>
//                   <span className="text-xs text-white/45">Optional</span>
//                 </div>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 transition border outline-none rounded-xl border-white/10 bg-black/30 focus:border-white/20 focus:ring-2 focus:ring-white/10"
//                   placeholder="Short one-liner (optional)"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <label className="text-sm font-medium text-white/90">
//                   Video file
//                 </label>
//                 <span className="text-xs text-white/45">Max 70MB</span>
//               </div>

//               <div
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={handleDrop}
//                 className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6"
//               >
//                 <input
//                   ref={inputRef}
//                   type="file"
//                   accept="video/*"
//                   className="hidden"
//                   onChange={(e) => handleFile(e.target.files?.[0] || null)}
//                 />

//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                   <div className="flex items-start gap-4">
//                     <div className="grid border h-11 w-11 place-items-center rounded-xl border-white/10 bg-white/5">
//                       <FileVideo className="w-5 h-5 text-white/80" />
//                     </div>

//                     <div>
//                       <p className="text-sm font-semibold text-white/90">
//                         {fileMeta ? "Selected file" : "Upload a video"}
//                       </p>
//                       <p className="mt-1 text-sm text-white/55">
//                         {fileMeta
//                           ? `${fileMeta.name} • ${fileMeta.sizeMB} MB`
//                           : "Drag & drop here, or click Browse"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     {file && (
//                       <button
//                         type="button"
//                         onClick={resetFile}
//                         className="inline-flex items-center gap-2 px-4 py-2 text-sm transition border rounded-xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
//                       >
//                         <X className="w-4 h-4" />
//                         Remove
//                       </button>
//                     )}

//                     <button
//                       type="button"
//                       onClick={pickFile}
//                       className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
//                     >
//                       <CloudUpload className="w-4 h-4" />
//                       Browse
//                     </button>
//                   </div>
//                 </div>

//                 {isUploading && (
//                   <div className="mt-5">
//                     <div className="flex items-center justify-between text-xs text-white/55">
//                       <span>Uploading…</span>
//                       <span>{progress}%</span>
//                     </div>
//                     <div className="w-full h-2 mt-2 overflow-hidden rounded-full bg-white/10">
//                       <div
//                         className="h-full transition-all rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
//                         style={{ width: `${progress}%` }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isUploading || !file}
//                 className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-[0_15px_60px_rgba(168,85,247,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {isUploading ? (
//                   <>
//                     <span className="loading loading-spinner" />
//                     Uploading…
//                   </>
//                 ) : (
//                   "Upload Video"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

//////////////////////////////////
"use client";

import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  CloudUpload,
  FileVideo,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

type Notice = { type: "success" | "error"; text: string } | null;

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [notice, setNotice] = useState<Notice>(null);

  const MAX_FILE_SIZE = 70 * 1024 * 1024; // 70MB UI limit

  const fileMeta = useMemo(() => {
    if (!file) return null;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return { name: file.name, sizeMB };
  }, [file]);

  const pickFile = () => inputRef.current?.click();

  const resetFile = () => {
    setFile(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFile = (f: File | null) => {
    if (!f) return;

    if (f.size > MAX_FILE_SIZE) {
      setNotice({ type: "error", text: "File size too large (max 70MB)." });
      return;
    }

    setNotice(null);
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setNotice({ type: "error", text: "Please select a video file." });
      return;
    }
    if (!title.trim()) {
      setNotice({ type: "error", text: "Please enter a title." });
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setNotice({
        type: "error",
        text: "Missing env vars:\n- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME\n- NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
      });
      return;
    }

    setIsUploading(true);
    setProgress(0);
    setNotice(null);

    try {
      // ✅ 1) Upload DIRECTLY to Cloudinary (NO Vercel 413)
      const cloudForm = new FormData();
      cloudForm.append("file", file);
      cloudForm.append("upload_preset", uploadPreset);
      cloudForm.append("folder", "video-uploads");

      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        cloudForm,
        {
          timeout: 0,
          onUploadProgress: (evt) => {
            if (!evt.total) return;
            const pct = Math.round((evt.loaded / evt.total) * 100);
            setProgress(pct);
          },
        }
      );

      const publicId: string = cloudRes.data.public_id;
      const bytes: number = cloudRes.data.bytes;
      const duration: number = Number(cloudRes.data.duration ?? 0);

      // ✅ 2) Save metadata in DB via our API (tiny JSON request)
      await axios.post(
        "/api/video-upload",
        {
          title: title.trim(),
          description: description.trim() ? description.trim() : null,
          publicId,
          originalSize: String(file.size),
          uploadedSize: String(bytes),
          duration,
        },
        { timeout: 0 }
      );

      setNotice({ type: "success", text: "Video uploaded successfully." });
      setTitle("");
      setDescription("");
      resetFile();
    } catch (err: any) {
      console.error("Upload failed:", err);

      // ✅ avoid React error #31 by always converting to string
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Upload failed";

      setNotice({ type: "error", text: String(msg) });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="space-y-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Upload Video
          </h1>
          <p className="mt-2 text-white/70">
            Upload a video and save metadata for previews + compression stats.
          </p>
        </div>
      </header>

      {notice && (
        <div
          className={[
            "rounded-2xl border px-4 py-3 backdrop-blur-xl",
            notice.type === "success"
              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
              : "border-rose-400/20 bg-rose-500/10 text-rose-100",
          ].join(" ")}
        >
          <div className="flex items-start gap-3">
            {notice.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
            ) : (
              <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-300" />
            )}
            <p className="text-sm leading-6 whitespace-pre-wrap">
              {notice.text}
            </p>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.55)]">
        <div className="p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 transition border outline-none rounded-xl border-white/10 bg-black/30 focus:border-white/20 focus:ring-2 focus:ring-white/10"
                  placeholder="Eg: YouTube SAAS Demo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white/90">
                    Description
                  </label>
                  <span className="text-xs text-white/45">Optional</span>
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-3 transition border outline-none rounded-xl border-white/10 bg-black/30 focus:border-white/20 focus:ring-2 focus:ring-white/10"
                  placeholder="Short one-liner (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/90">
                  Video file
                </label>
                <span className="text-xs text-white/45">Max 70MB</span>
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6"
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] || null)}
                />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="grid border h-11 w-11 place-items-center rounded-xl border-white/10 bg-white/5">
                      <FileVideo className="w-5 h-5 text-white/80" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white/90">
                        {fileMeta ? "Selected file" : "Upload a video"}
                      </p>
                      <p className="mt-1 text-sm text-white/55">
                        {fileMeta
                          ? `${fileMeta.name} • ${fileMeta.sizeMB} MB`
                          : "Drag & drop here, or click Browse"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {file && (
                      <button
                        type="button"
                        onClick={resetFile}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm transition border rounded-xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={pickFile}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
                    >
                      <CloudUpload className="w-4 h-4" />
                      Browse
                    </button>
                  </div>
                </div>

                {isUploading && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-white/55">
                      <span>Uploading…</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-2 mt-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full transition-all rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading || !file}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-[0_15px_60px_rgba(168,85,247,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUploading ? (
                  <>
                    <span className="loading loading-spinner" />
                    Uploading…
                  </>
                ) : (
                  "Upload Video"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
