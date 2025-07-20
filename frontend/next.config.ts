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
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      'electrosalam.ma',
      'gtelstore.ma',
      'uno.ma',
      'm.media-amazon.com',
      'www.sony.com', 
      'mediazone.ma',
      'www.mediazone.ma',
      'ultrapc.ma',
      'www.ultrapc.ma',
      'pcgamer.ma',
      'www.pcgamer.ma',
      'www.pcgamer.ma',
      'mytechnology.lk',
      'cdsassets.apple.com',
  
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
