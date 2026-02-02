import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  // Avoid lockfile warning when building in monorepo or nested folders
  turbopack: { root: process.cwd() },
};

export default nextConfig;
