import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only: build to out/
  output: "export",
  trailingSlash: true,
  images: {
    // No image server on GitHub Pages; covers are already resized by scripts/import-archive.mjs
    unoptimized: true,
    qualities: [75],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
