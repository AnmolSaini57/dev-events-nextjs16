import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // port: "",
        // pathname: "/djgnvrjfu/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
