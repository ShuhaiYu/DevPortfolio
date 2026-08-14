import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      // Retired case study. It was linked from the home page grid, so send any
      // remaining inbound links to the index rather than serving a 404.
      {
        source: "/projects/red-bridge",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
