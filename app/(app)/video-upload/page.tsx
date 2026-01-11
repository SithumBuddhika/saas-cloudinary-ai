// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// function VideoUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isUploading, setIsUploading] = useState(false);

//   const router = useRouter();
//   //max file size of 60mb

//   const MAX_FILE_SIZE = 70 * 1024 * 1024;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     if (file.size > MAX_FILE_SIZE) {
//       //TODO: add notifications
//       alert("File size too large");
//       return;
//     }

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("oridinalSize", file.size.toString());

//     try {
//       const response = await axios.post("/api/video-upload", formData);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="container p-4 mx-auto">
//       <h1 className="mb-4 text-2xl font-bold">Upload Video</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="label">
//             <span className="label-text">Title</span>
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full input input-bordered"
//             required
//           />
//         </div>
//         <div>
//           <label className="label">
//             <span className="label-text">Description</span>
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full textarea textarea-bordered"
//           />
//         </div>
//         <div>
//           <label className="label">
//             <span className="label-text">Video File</span>
//           </label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full file-input file-input-bordered"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           disabled={isUploading}
//         >
//           {isUploading ? "Uploading..." : "Upload Video"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default VideoUpload;

// "use client";

// import React, { useState } from "react";
// import axios from "axios";

// export default function VideoUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isUploading, setIsUploading] = useState(false);

//   const MAX_FILE_SIZE = 70 * 1024 * 1024;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     if (file.size > MAX_FILE_SIZE) {
//       alert("File size too large (max 70MB)");
//       return;
//     }

//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("originalSize", file.size.toString());

//     try {
//       await axios.post("/api/video-upload", formData);
//       setTitle("");
//       setDescription("");
//       setFile(null);
//       alert("Video uploaded successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Upload failed");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <section className="max-w-3xl mx-auto space-y-8">
//       {/* HEADER */}
//       <header>
//         <h1 className="text-3xl font-bold">Upload Video</h1>
//         <p className="mt-1 text-base-content/70">
//           Upload and automatically optimize your videos using Cloudinary.
//         </p>
//       </header>

//       {/* CARD */}
//       <div className="shadow-xl card bg-base-200">
//         <div className="space-y-6 card-body">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* TITLE */}
//             <div className="form-control">
//               <label className="font-medium label">Title</label>
//               <input
//                 type="text"
//                 className="input input-bordered"
//                 placeholder="Enter video title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="form-control">
//               <label className="font-medium label">Description</label>
//               <textarea
//                 className="textarea textarea-bordered"
//                 placeholder="Optional description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>

//             {/* FILE */}
//             <div className="form-control">
//               <label className="font-medium label">Video File</label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 className="file-input file-input-bordered"
//                 onChange={(e) => setFile(e.target.files?.[0] || null)}
//                 required
//               />
//               <span className="mt-1 text-xs opacity-60">Max size: 70MB</span>
//             </div>

//             {/* ACTION */}
//             <div className="flex justify-end pt-4">
//               <button
//                 type="submit"
//                 className="btn btn-primary min-w-[160px]"
//                 disabled={isUploading}
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

// import React, { useState } from "react";
// import axios from "axios";

// export default function VideoUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isUploading, setIsUploading] = useState(false);

//   const MAX_FILE_SIZE = 70 * 1024 * 1024;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     if (file.size > MAX_FILE_SIZE) {
//       alert("File size too large (max 70MB)");
//       return;
//     }

//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("originalSize", file.size.toString());

//     try {
//       await axios.post("/api/video-upload", formData);
//       setTitle("");
//       setDescription("");
//       setFile(null);
//       alert("Video uploaded successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Upload failed");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <section className="max-w-3xl mx-auto space-y-8">
//       <header>
//         <h1 className="text-3xl font-bold">Upload Video</h1>
//         <p className="mt-1 text-base-content/70">
//           Upload and automatically optimize your videos using Cloudinary.
//         </p>
//       </header>

//       <div className="shadow-xl card bg-base-200">
//         <div className="card-body">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="form-control">
//               <label className="label">
//                 <span className="font-medium label-text">Title</span>
//               </label>
//               <input
//                 type="text"
//                 className="w-full input input-bordered"
//                 placeholder="Enter video title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="font-medium label-text">Description</span>
//                 <span className="label-text-alt opacity-60">Optional</span>
//               </label>
//               <textarea
//                 className="w-full textarea textarea-bordered"
//                 placeholder="Write a short description (optional)"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="font-medium label-text">Video File</span>
//                 <span className="label-text-alt opacity-60">Max 70MB</span>
//               </label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 className="w-full file-input file-input-bordered"
//                 onChange={(e) => setFile(e.target.files?.[0] || null)}
//                 required
//               />
//             </div>

//             <div className="flex justify-end pt-2">
//               <button
//                 type="submit"
//                 className="btn btn-primary min-w-[170px]"
//                 disabled={isUploading}
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

"use client";

import React, { useState } from "react";
import axios from "axios";

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size too large (max 70MB)");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      await axios.post("/api/video-upload", formData);
      setTitle("");
      setDescription("");
      setFile(null);
      alert("Video uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Upload Video</h1>
        <p className="mt-1 text-base-content/70">
          Upload and automatically optimize your videos using Cloudinary.
        </p>
      </header>

      <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur shadow-[0_0_80px_rgba(0,0,0,0.45)]">
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text">Title</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered bg-white/5 border-white/10"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text">Description</span>
                <span className="label-text-alt opacity-60">Optional</span>
              </label>
              <textarea
                className="w-full textarea textarea-bordered bg-white/5 border-white/10"
                placeholder="Write a short description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="font-medium label-text">Video File</span>
                <span className="label-text-alt opacity-60">Max 70MB</span>
              </label>
              <input
                type="file"
                accept="video/*"
                className="w-full file-input file-input-bordered bg-white/5 border-white/10"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn btn-primary"
                disabled={isUploading}
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
