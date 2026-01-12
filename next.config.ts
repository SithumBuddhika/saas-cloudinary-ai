import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    // ✅ IMPORTANT: fixes 10MB limit for Route Handlers in dev/turbopack
    proxyClientMaxBodySize: "100mb",

    // Optional (keep it; doesn’t hurt)
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
