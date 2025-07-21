import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// url spring boot
export const API_BASE_URL = "http://localhost:8080";

const nextConfig: NextConfig = {
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
        protocol: 'https',
        hostname: 'electrosalam.ma',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gtelstore.ma',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uno.ma',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.sony.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mediazone.ma',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mediazone.ma',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ultrapc.ma',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.ultrapc.ma',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pcgamer.ma',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pcgamer.ma',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mytechnology.lk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdsassets.apple.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.hp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'laptopmedia.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
    ]
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
