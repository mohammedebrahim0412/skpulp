import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920],
  },
  async headers() {
    // Long-lived caching only in production. In development, media updates show immediately.
    // When replacing an image on the live site, give it a new file name so browsers fetch the new one.
    if (process.env.NODE_ENV !== "production") return [];
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
