import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // The `.next/types/validator.ts` generates incorrect paths for src/ dir apps
    // in Next.js 15.5.x. Skip build-time type checking; we use `tsc --noEmit` separately.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
