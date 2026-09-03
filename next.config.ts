import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Group cover images are served straight from the media bucket. Pharos
    // builds these URLs in `Constants.mediaURL(forKey:)` as
    // https://{bucket}.s3.{region}.amazonaws.com/{key}
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
