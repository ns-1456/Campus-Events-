import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Campus-Events-' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Campus-Events-' : '',
};

export default nextConfig;
