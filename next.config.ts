import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Super admin KYB uploads three files of up to 5 MB each in one request,
      // plus multipart metadata.
      bodySizeLimit: "16mb",
    },
  },
};

export default nextConfig;
