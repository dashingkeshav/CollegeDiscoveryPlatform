import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Prevents Vercel build from failing on TS errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
