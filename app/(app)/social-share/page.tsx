"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { CldImage } from "next-cloudinary";
import {
  UploadCloud,
  Image as ImageIcon,
  Download,
  Sparkles,
} from "lucide-react";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormats = keyof typeof socialFormats;

function humanFileSize(bytes: number) {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let u = 0;
  while (size >= 1024 && u < units.length - 1) {
    size /= 1024;
    u++;
  }
  return `${size.toFixed(u === 0 ? 0 : 1)} ${units[u]}`;
}

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [selectedFormat, setSelectedFormat] = useState<SocialFormats>(
    "Instagram Square (1:1)"
  );

  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  const [pickedFile, setPickedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const current = useMemo(
    () => socialFormats[selectedFormat],
    [selectedFormat]
  );

  useEffect(() => {
    if (uploadedImage) setIsTransforming(true);
  }, [selectedFormat, uploadedImage]);

  const onPickFileClick = () => fileInputRef.current?.click();

  const uploadFile = async (file: File) => {
    setError(null);
    setIsUploading(true);
    setUploadedImage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to upload image");
      }

      const data = await res.json();
      setUploadedImage(data.publicId);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPickedFile(file);
    await uploadFile(file);

    // allow re-selecting same file
    event.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    setPickedFile(file);
    await uploadFile(file);
  };

  const handleDownload = async () => {
    if (!imageRef.current) return;

    const res = await fetch(imageRef.current.src);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Social Media Image Creator
        </h1>
        <p className="mt-2 text-white/70">
          Upload an image and instantly generate social-media-ready formats.
        </p>
      </header>

      {/* Error */}
      {error && (
        <div className="p-4 text-sm text-red-200 border rounded-2xl border-red-500/20 bg-red-500/10">
          {error}
        </div>
      )}

      {/* Upload card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="grid w-10 h-10 border rounded-xl bg-white/5 border-white/10 place-items-center">
            <UploadCloud className="w-5 h-5 text-white/80" />
          </div>
          <div>
            <p className="font-semibold">Upload an image</p>
            <p className="text-sm text-white/60">
              Drag & drop, or click to browse
            </p>
          </div>
        </div>

        <div
          onClick={onPickFileClick}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="cursor-pointer rounded-2xl border border-dashed border-white/15 bg-black/20 hover:bg-white/[0.05] transition p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="grid border h-11 w-11 rounded-xl bg-black/30 border-white/10 place-items-center">
              <ImageIcon className="w-5 h-5 text-white/70" />
            </div>

            <div>
              <p className="text-sm font-medium text-white/90">
                {pickedFile ? pickedFile.name : "Choose an image file"}
              </p>
              <p className="text-xs text-white/60">
                {pickedFile
                  ? humanFileSize(pickedFile.size)
                  : "PNG, JPG, WEBP • up to a few MB recommended"}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-xl bg-white text-black font-semibold px-5 py-2.5 hover:bg-white/90 transition"
          >
            Browse
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {isUploading && (
          <div className="flex items-center gap-3 mt-4 text-sm text-white/70">
            <span className="loading loading-spinner loading-sm" />
            Uploading to Cloudinary…
          </div>
        )}
      </div>

      {/* After upload */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        {!uploadedImage ? (
          <div className="p-6 border rounded-2xl border-white/10 bg-black/20 text-white/60">
            Upload an image to see preview + format options.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Format row */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <div className="flex-1">
                <label className="text-sm text-white/70">Format preset</label>
                <div className="mt-2">
                  <select
                    className="w-full px-4 py-3 text-white border outline-none rounded-xl border-white/12 bg-black/35 focus:border-white/25 focus:ring-2 focus:ring-white/10"
                    value={selectedFormat}
                    onChange={(e) =>
                      setSelectedFormat(e.target.value as SocialFormats)
                    }
                  >
                    {Object.keys(socialFormats).map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-black transition bg-white rounded-xl hover:bg-white/90"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* Preview */}
            <div className="relative p-4 border rounded-2xl border-white/10 bg-black/20">
              <div className="flex items-center gap-2 mb-3 text-sm text-white/70">
                <Sparkles className="w-4 h-4" />
                Preview • {current.width}×{current.height}
              </div>

              <div className="relative flex items-center justify-center overflow-hidden border rounded-xl border-white/10 bg-black/30">
                {isTransforming && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-black/40">
                    <span className="loading loading-spinner loading-lg" />
                  </div>
                )}

                <CldImage
                  width={current.width}
                  height={current.height}
                  src={uploadedImage}
                  sizes="100vw"
                  alt="Transformed image"
                  crop="fill"
                  aspectRatio={current.aspectRatio}
                  gravity="auto"
                  ref={imageRef}
                  onLoad={() => setIsTransforming(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
