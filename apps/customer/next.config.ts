import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@naturefoods/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
