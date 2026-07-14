import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Birthday-wish",
  images: {
    unoptimized: true,
  },
  // Ensure that trailing slashes are added for better routing in static environments
  trailingSlash: true,
};

export default nextConfig;
