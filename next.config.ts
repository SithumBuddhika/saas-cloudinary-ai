import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    // ✅ Server Actions (keep this if you use server actions anywhere)
    serverActions: {
      bodySizeLimit: "100mb",
    },

    // ✅ Fixes the 10MB body limit for Route Handlers in dev/turbopack
    // (replaces deprecated middlewareClientMaxBodySize)
    proxyClientMaxBodySize: "100mb",
  },
};

export default nextConfig;
