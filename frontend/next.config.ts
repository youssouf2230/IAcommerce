import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// url spring boot
export const API_BASE_URL = "http://localhost:8080";

const nextConfig: NextConfig = {
   experimental: {
    authInterrupts: true,
  },
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resource.logitech.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "*",
      }
    ],
    
  }
  
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
