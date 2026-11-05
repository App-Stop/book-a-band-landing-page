import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Current media CDN (production API).
      { protocol: "https", hostname: "d1m60aipcvwlw9.cloudfront.net" },
      // Older posts, and the staging API, still point at the S3 bucket directly.
      {
        protocol: "https",
        hostname: "bookaband-prod-bucket.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
