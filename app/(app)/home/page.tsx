"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
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
            />
          ))}
        </div>
      )}
    </section>
  );
}
