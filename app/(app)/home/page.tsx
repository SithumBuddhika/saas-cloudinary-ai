// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import VideoCard from "@/components/VideoCard";
// import { Video } from "@/types";
// function Home() {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchVideos = useCallback(async () => {
//     try {
//       const response = await axios.get("/api/videos");
//       if (Array.isArray(response.data)) {
//         setVideos(response.data);
//       } else {
//         throw new Error(" Unexpected response format");
//       }
//     } catch (error) {
//       console.log(error);
//       setError("Failed to fetch videos");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchVideos();
//   }, [fetchVideos]);

//   const handleDownload = useCallback((url: string, title: string) => {
//     () => {
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `${title}.mp4`);
//       link.setAttribute("target", "_blank");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     };
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container p-4 mx-auto">
//       <h1 className="mb-4 text-2xl font-bold">Videos</h1>
//       {videos.length === 0 ? (
//         <div className="text-lg text-center text-gray-500">
//           No videos available
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {videos.map((video) => (
//             <VideoCard
//               key={video.id}
//               video={video}
//               onDownload={handleDownload}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import type { Video } from "@/types";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    try {
      const res = await axios.get("/api/videos");
      setVideos(Array.isArray(res.data) ? res.data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Your Videos</h1>
        <p className="text-base-content/70">
          Preview, optimize and download your uploaded videos.
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : videos.length === 0 ? (
        <div className="p-10 text-center card bg-base-200">
          <p className="text-lg opacity-70">No videos uploaded yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onDownload={() => {}} />
          ))}
        </div>
      )}
    </section>
  );
}
