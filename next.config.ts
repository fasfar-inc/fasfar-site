import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root so a lockfile in a parent folder is never mistaken for it.
  turbopack: { root: path.join(__dirname) },
  poweredByHeader: false,
};

export default nextConfig;
