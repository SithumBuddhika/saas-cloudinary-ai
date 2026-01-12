"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { getCldImageUrl } from "next-cloudinary";
import {
  CloudUpload,
  Image as ImageIcon,
  ChevronDown,
  Check,
  Download,
  X,
  Loader2,
} from "lucide-react";

type Preset = {
  key: string;
  label: string;
  w: number;
  h: number;
  hint: string;
};

const PRESETS: Preset[] = [
  {
    key: "ig_square",
    label: "Instagram Square",
    w: 1080,
    h: 1080,
    hint: "1:1",
  },
  {
    key: "ig_portrait",
    label: "Instagram Portrait",
    w: 1080,
    h: 1350,
    hint: "4:5",
  },
  { key: "tw_post", label: "Twitter Post", w: 1600, h: 900, hint: "16:9" },
  { key: "tw_header", label: "Twitter Header", w: 1500, h: 500, hint: "3:1" },
  { key: "fb_cover", label: "Facebook Cover", w: 820, h: 312, hint: "205:78" },
];

export default function SocialSharePage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);

  const [presetKey, setPresetKey] = useState<string>(PRESETS[2].key); // default: Twitter Post
  const selectedPreset = useMemo(
    () => PRESETS.find((p) => p.key === presetKey) ?? PRESETS[0],
    [presetKey]
  );

  const [isUploading, setIsUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);

  const [isDownloading, setIsDownloading] = useState(false);

  const fileMeta = useMemo(() => {
    if (!file) return null;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return { name: file.name, sizeMB };
  }, [file]);

  // close dropdown on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const pickFile = () => inputRef.current?.click();

  const resetFile = () => {
    setFile(null);
    setPublicId(null);
    setUploadPct(0);
    setIsUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setPublicId(null); // new file means new upload
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const uploadImage = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadPct(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // ✅ expects your API to return: { publicId: string }
      const res = await axios.post("/api/image-upload", formData, {
        onUploadProgress: (evt) => {
          if (!evt.total) return;
          setUploadPct(Math.round((evt.loaded / evt.total) * 100));
        },
      });

      const pid =
        res.data?.publicId ||
        res.data?.result?.public_id ||
        res.data?.public_id;

      if (!pid) {
        throw new Error("Upload succeeded but publicId not returned.");
      }

      setPublicId(pid);
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Check /api/image-upload route.");
    } finally {
      setIsUploading(false);
    }
  };

  const previewUrl = useMemo(() => {
    if (!publicId) return null;
    return getCldImageUrl({
      src: publicId,
      width: 1200,
      crop: "limit",
      quality: "auto",
      format: "auto",
    });
  }, [publicId]);

  const transformedUrl = useMemo(() => {
    if (!publicId) return null;
    return getCldImageUrl({
      src: publicId,
      width: selectedPreset.w,
      height: selectedPreset.h,
      crop: "fill",
      gravity: "auto",
      quality: "auto",
      format: "png",
    });
  }, [publicId, selectedPreset]);

  const downloadImage = async () => {
    if (!transformedUrl) return;

    setIsDownloading(true);
    try {
      const res = await fetch(transformedUrl);
      const blob = await res.blob();
      const a = document.createElement("a");
      const url = URL.createObjectURL(blob);

      a.href = url;
      a.download = `${selectedPreset.label.replaceAll(" ", "_")}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Download failed.");
    } finally {
      setIsDownloading(false);
    }
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

      {/* Upload Card */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.55)]">
        <div className="p-6 sm:p-10">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="p-5 border rounded-2xl border-white/10 bg-black/25 sm:p-6"
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid border h-11 w-11 place-items-center rounded-xl border-white/10 bg-white/5">
                  <ImageIcon className="w-5 h-5 text-white/80" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white/90">
                    Upload an image
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

                <button
                  type="button"
                  onClick={uploadImage}
                  disabled={!file || isUploading}
                  className={[
                    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white",
                    "bg-gradient-to-r from-violet-500 to-fuchsia-500",
                    "transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60",
                  ].join(" ")}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Upload
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ✅ real progress bar under upload area */}
            {isUploading && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-white/55">
                  <span>Uploading…</span>
                  <span>{uploadPct}%</span>
                </div>
                <div className="w-full h-2 mt-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full transition-all rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    style={{ width: `${uploadPct}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="p-4 mt-6 border rounded-2xl border-white/10 bg-black/20">
            {!previewUrl ? (
              <p className="text-sm text-white/60">
                Upload an image to see preview + format options.
              </p>
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                className="object-contain w-full border rounded-xl border-white/10"
              />
            )}
          </div>
        </div>
      </div>

      {/* Format + Download */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_90px_rgba(0,0,0,0.55)]">
        <div className="p-6 sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            {/* Custom Dropdown */}
            <div className="w-full lg:max-w-3xl" ref={dropdownRef}>
              <label className="block mb-2 text-sm font-medium text-white/90">
                Format preset
              </label>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={[
                  "relative flex w-full items-center justify-between gap-3 rounded-2xl",
                  "border border-white/10 bg-black/30 px-4 py-3 text-left",
                  "outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10",
                ].join(" ")}
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate text-white/90">
                    {selectedPreset.label}
                    <span className="ml-2 text-white/50">
                      ({selectedPreset.hint})
                    </span>
                  </div>
                  <div className="text-xs truncate text-white/50">
                    {selectedPreset.w} × {selectedPreset.h}
                  </div>
                </div>

                <ChevronDown className="w-5 h-5 text-white/70" />
              </button>

              {open && (
                <div className="mt-2 overflow-hidden border rounded-2xl border-white/10 bg-black/70 backdrop-blur-xl">
                  <div className="p-2 overflow-auto max-h-64">
                    {PRESETS.map((p) => {
                      const active = p.key === presetKey;
                      return (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => {
                            setPresetKey(p.key);
                            setOpen(false);
                          }}
                          className={[
                            "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition",
                            active ? "bg-white/10" : "hover:bg-white/5",
                          ].join(" ")}
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold truncate text-white/90">
                              {p.label}
                              <span className="ml-2 text-white/50">
                                ({p.hint})
                              </span>
                            </div>
                            <div className="text-xs truncate text-white/50">
                              {p.w} × {p.h}
                            </div>
                          </div>

                          {active && (
                            <Check className="w-4 h-4 text-emerald-300" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={downloadImage}
              disabled={!transformedUrl || isDownloading}
              className={[
                "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold",
                "bg-white text-black transition hover:bg-white/90",
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Preparing…
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download
                </>
              )}
            </button>
          </div>

          {/* Result Preview (formatted) */}
          <div className="p-4 mt-6 border rounded-2xl border-white/10 bg-black/20">
            {!transformedUrl ? (
              <p className="text-sm text-white/60">
                Upload an image first, then choose a preset to generate output.
              </p>
            ) : (
              <img
                src={transformedUrl}
                alt="Formatted output"
                className="object-contain w-full border rounded-xl border-white/10"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
