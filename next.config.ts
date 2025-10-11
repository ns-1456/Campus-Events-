import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Campus-Events-' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Campus-Events-' : '',
};

export default nextConfig;
