import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Next refuses to optimize images from local addresses. Only matters when
    // developing against a local Pharos (`API_BASE_URL=http://localhost:8080`).
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    // Invite photos (group covers) come through Pharos's invite media route,
    // `inviteMediaUrl` in src/lib/api.ts: the media bucket is not public, so
    // the S3 URLs in `MediaDTO.url` answer 403.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.showplaces.app",
        pathname: "/v1/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/v1/**",
      },
    ],
  },
};

export default nextConfig;
