import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 devIndicators: false,
 images: {
    domains: ["res.cloudinary.com"], // add any others you use
  },
};

export default nextConfig;
