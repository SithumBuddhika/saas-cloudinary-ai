// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { CldImage } from "next-cloudinary";

// const socialFormats = {
//   "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
//   "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
//   "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
//   "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
//   "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
// };

// type SocialFormats = keyof typeof socialFormats;

// export default function SocialShare() {
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [selectedFormat, setSelectedFormat] = useState<SocialFormats>(
//     "Instagram Square (1:1)"
//   );
//   const [isUploading, setIsUploading] = useState(false);
//   const [isTransforming, setIsTransforming] = useState(false);
//   const imageRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     if (uploadedImage) {
//       setIsTransforming(true);
//     }
//   }, [selectedFormat, uploadedImage]);

//   const handleFileUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("/api/image-upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Failed to upload image");

//       const data = await response.json();
//       setUploadedImage(data.publicId);
//     } catch (error) {
//       console.log(error);
//       alert("Failed to upload image");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDownload = () => {
//     if (!imageRef.current) return;

//     fetch(imageRef.current.src)
//       .then((response) => response.blob())
//       .then((blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = `${selectedFormat
//           .replace(/\s+/g, "_")
//           .toLowerCase()}.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(link);
//       });
//   };

//   return (
//     <div className="container max-w-4xl p-4 mx-auto">
//       <h1 className="mb-6 text-3xl font-bold text-center">
//         Social Media Image Creator
//       </h1>

//       <div className="card">
//         <div className="card-body">
//           <h2 className="mb-4 card-title">Upload an Image</h2>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Choose an image file</span>
//             </label>
//             <input
//               type="file"
//               onChange={handleFileUpload}
//               className="w-full file-input file-input-bordered file-input-primary"
//             />
//           </div>

//           {isUploading && (
//             <div className="mt-4">
//               <progress className="w-full progress progress-primary"></progress>
//             </div>
//           )}

//           {uploadedImage && (
//             <div className="mt-6">
//               <h2 className="mb-4 card-title">Select Social Media Format</h2>
//               <div className="form-control">
//                 <select
//                   className="w-full select select-bordered"
//                   value={selectedFormat}
//                   onChange={(e) =>
//                     setSelectedFormat(e.target.value as SocialFormats)
//                   }
//                 >
//                   {Object.keys(socialFormats).map((format) => (
//                     <option key={format} value={format}>
//                       {format}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="relative mt-6">
//                 <h3 className="mb-2 text-lg font-semibold">Preview:</h3>
//                 <div className="flex justify-center">
//                   {isTransforming && (
//                     <div className="absolute inset-0 z-10 flex items-center justify-center bg-opacity-50 bg-base-100">
//                       <span className="loading loading-spinner loading-lg"></span>
//                     </div>
//                   )}
//                   <CldImage
//                     width={socialFormats[selectedFormat].width}
//                     height={socialFormats[selectedFormat].height}
//                     src={uploadedImage}
//                     sizes="100vw"
//                     alt="transformed image"
//                     crop="fill"
//                     aspectRatio={socialFormats[selectedFormat].aspectRatio}
//                     gravity="auto"
//                     ref={imageRef}
//                     onLoad={() => setIsTransforming(false)}
//                   />
//                 </div>
//               </div>

//               <div className="justify-end mt-6 card-actions">
//                 <button className="btn btn-primary" onClick={handleDownload}>
//                   Download for {selectedFormat}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { CldImage } from "next-cloudinary";

// const socialFormats = {
//   "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
//   "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
//   "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
//   "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
//   "Facebook Cover": { width: 820, height: 312, aspectRatio: "205:78" },
// };

// type SocialFormat = keyof typeof socialFormats;

// export default function SocialShare() {
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
//     "Instagram Square (1:1)"
//   );
//   const [isUploading, setIsUploading] = useState(false);
//   const [isTransforming, setIsTransforming] = useState(false);

//   const imageRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     if (uploadedImage) setIsTransforming(true);
//   }, [selectedFormat, uploadedImage]);

//   const handleFileUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("/api/image-upload", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       setUploadedImage(data.publicId);
//     } catch (err) {
//       alert("Image upload failed");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDownload = async () => {
//     if (!imageRef.current) return;

//     const res = await fetch(imageRef.current.src);
//     const blob = await res.blob();

//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <section className="max-w-4xl mx-auto space-y-8">
//       {/* HEADER */}
//       <header>
//         <h1 className="text-3xl font-bold">Social Media Image Creator</h1>
//         <p className="mt-1 text-base-content/70">
//           Upload an image and instantly generate social-media-ready formats.
//         </p>
//       </header>

//       {/* CARD */}
//       <div className="shadow-xl card bg-base-200">
//         <div className="space-y-6 card-body">
//           {/* UPLOAD */}
//           <div className="form-control">
//             <label className="font-medium label">Upload Image</label>
//             <input
//               type="file"
//               className="file-input file-input-bordered"
//               onChange={handleFileUpload}
//             />
//           </div>

//           {isUploading && (
//             <progress className="w-full progress progress-primary" />
//           )}

//           {/* OPTIONS */}
//           {uploadedImage && (
//             <>
//               <div className="form-control">
//                 <label className="font-medium label">
//                   Select Platform Format
//                 </label>
//                 <select
//                   className="select select-bordered"
//                   value={selectedFormat}
//                   onChange={(e) =>
//                     setSelectedFormat(e.target.value as SocialFormat)
//                   }
//                 >
//                   {Object.keys(socialFormats).map((format) => (
//                     <option key={format}>{format}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* PREVIEW */}
//               <div className="relative flex justify-center p-4 bg-base-300 rounded-xl">
//                 {isTransforming && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-base-200/60 rounded-xl">
//                     <span className="loading loading-spinner loading-lg" />
//                   </div>
//                 )}

//                 <CldImage
//                   ref={imageRef}
//                   src={uploadedImage}
//                   width={socialFormats[selectedFormat].width}
//                   height={socialFormats[selectedFormat].height}
//                   crop="fill"
//                   gravity="auto"
//                   aspectRatio={socialFormats[selectedFormat].aspectRatio}
//                   alt="Preview"
//                   onLoad={() => setIsTransforming(false)}
//                 />
//               </div>

//               {/* DOWNLOAD */}
//               <div className="flex justify-end">
//                 <button className="btn btn-primary" onClick={handleDownload}>
//                   Download Image
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { CldImage } from "next-cloudinary";

// const socialFormats = {
//   "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
//   "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
//   "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
//   "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
//   "Facebook Cover": { width: 820, height: 312, aspectRatio: "205:78" },
// };

// type SocialFormat = keyof typeof socialFormats;

// export default function SocialShare() {
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
//     "Instagram Square (1:1)"
//   );
//   const [isUploading, setIsUploading] = useState(false);
//   const [isTransforming, setIsTransforming] = useState(false);

//   const imageRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     if (uploadedImage) setIsTransforming(true);
//   }, [selectedFormat, uploadedImage]);

//   const handleFileUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("/api/image-upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Upload failed");
//       const data = await res.json();
//       setUploadedImage(data.publicId);
//     } catch (err) {
//       console.error(err);
//       alert("Image upload failed");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDownload = async () => {
//     if (!imageRef.current) return;

//     const res = await fetch(imageRef.current.src);
//     const blob = await res.blob();

//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <section className="max-w-4xl mx-auto space-y-8">
//       <header>
//         <h1 className="text-3xl font-bold">Social Media Image Creator</h1>
//         <p className="mt-1 text-base-content/70">
//           Upload an image and instantly generate social-media-ready formats.
//         </p>
//       </header>

//       <div className="shadow-xl card bg-base-200">
//         <div className="space-y-6 card-body">
//           <div className="form-control">
//             <label className="label">
//               <span className="font-medium label-text">Upload Image</span>
//             </label>
//             <input
//               type="file"
//               className="w-full file-input file-input-bordered"
//               onChange={handleFileUpload}
//             />
//           </div>

//           {isUploading && (
//             <progress className="w-full progress progress-primary" />
//           )}

//           {uploadedImage && (
//             <>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="font-medium label-text">Select Format</span>
//                 </label>
//                 <select
//                   className="w-full select select-bordered"
//                   value={selectedFormat}
//                   onChange={(e) =>
//                     setSelectedFormat(e.target.value as SocialFormat)
//                   }
//                 >
//                   {Object.keys(socialFormats).map((format) => (
//                     <option key={format} value={format}>
//                       {format}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="relative flex justify-center p-4 overflow-hidden rounded-xl bg-base-300">
//                 {isTransforming && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-base-200/60">
//                     <span className="loading loading-spinner loading-lg" />
//                   </div>
//                 )}

//                 <CldImage
//                   ref={imageRef}
//                   src={uploadedImage}
//                   width={socialFormats[selectedFormat].width}
//                   height={socialFormats[selectedFormat].height}
//                   crop="fill"
//                   gravity="auto"
//                   aspectRatio={socialFormats[selectedFormat].aspectRatio}
//                   alt="Preview"
//                   onLoad={() => setIsTransforming(false)}
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <button className="btn btn-primary" onClick={handleDownload}>
//                   Download Image
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CldImage, getCldImageUrl } from "next-cloudinary";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (uploadedImage) setIsTransforming(true);
  }, [selectedFormat, uploadedImage]);

  const transformedUrl = useMemo(() => {
    if (!uploadedImage) return "";
    const f = socialFormats[selectedFormat];

    return getCldImageUrl({
      src: uploadedImage,
      width: f.width,
      height: f.height,
      crop: "fill",
      gravity: "auto",
      format: "png",
      quality: "auto",
    });
  }, [uploadedImage, selectedFormat]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setUploadedImage(data.publicId);
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!transformedUrl) return;

    const res = await fetch(transformedUrl);
    const blob = await res.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Social Media Image Creator
        </h1>
        <p className="mt-2 text-white/70">
          Upload an image and instantly generate social-media-ready formats.
        </p>
      </header>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.55)]">
        <div className="p-6 space-y-8 sm:p-10">
          {/* Upload */}
          <div className="max-w-2xl space-y-2">
            <label className="text-sm font-medium">Upload image</label>
            <input
              type="file"
              className="w-full file-input file-input-bordered bg-black/30 border-white/10"
              onChange={handleFileUpload}
            />
            {isUploading && (
              <div className="mt-3">
                <progress className="w-full progress progress-primary" />
              </div>
            )}
          </div>

          {/* Config */}
          {uploadedImage && (
            <div className="grid gap-6 lg:grid-cols-[360px_1fr] items-start">
              {/* Controls */}
              <div className="p-5 space-y-4 border rounded-2xl border-white/10 bg-black/25">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <select
                    className="w-full select select-bordered bg-black/30 border-white/10"
                    value={selectedFormat}
                    onChange={(e) =>
                      setSelectedFormat(e.target.value as SocialFormat)
                    }
                  >
                    {Object.keys(socialFormats).map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="w-full btn btn-primary"
                  onClick={handleDownload}
                >
                  Download PNG
                </button>

                <p className="text-xs text-white/60">
                  Cloudinary will automatically crop and resize for the selected
                  social platform format.
                </p>
              </div>

              {/* Preview */}
              <div className="relative p-5 overflow-hidden border rounded-2xl border-white/10 bg-black/25">
                {isTransforming && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                    <span className="loading loading-spinner loading-lg" />
                  </div>
                )}

                <div className="flex justify-center">
                  <CldImage
                    src={uploadedImage}
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    crop="fill"
                    gravity="auto"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    alt="Preview"
                    onLoad={() => setIsTransforming(false)}
                  />
                </div>

                <p className="mt-4 text-xs text-white/60">
                  Preview updates automatically when you change the format.
                </p>
              </div>
            </div>
          )}

          {!uploadedImage && (
            <div className="p-6 border rounded-2xl border-white/10 bg-black/25 text-white/70">
              Upload an image to see preview + format options.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
