import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resource.logitech.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
