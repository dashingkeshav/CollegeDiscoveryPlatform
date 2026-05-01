import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Prevents Vercel build from failing on TS errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Prevents Vercel build from failing on ESLint warnings
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
