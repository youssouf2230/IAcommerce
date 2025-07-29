// next.config.js
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Spring Boot API URL
export const API_BASE_URL = "http://localhost:8080";

// --- START: DYNAMIC CSP LOGIC ---

// Base CSP directives
const ContentSecurityPolicy = {
  "default-src": "'self'",
  "script-src": [
    "'self'",
    "'unsafe-inline'", // Required for Next.js style hydration
  ],
  "object-src": "'none'",
  "style-src": "'self' 'unsafe-inline'", // 'unsafe-inline' is often needed for CSS-in-JS or component libraries
  "img-src": "'self' data: https:", // Allows self, data URIs, and any HTTPS source
  "font-src": "'self' https:",
  "connect-src": "'self' http://localhost:8080", // Allow connection to your API
  "frame-ancestors": "'none'",
};

// Add 'unsafe-eval' to script-src ONLY in development
if (process.env.NODE_ENV === 'development') {
  ContentSecurityPolicy['script-src'].push("'unsafe-eval'");
}

// Convert the policy object to a string
const cspValue = Object.entries(ContentSecurityPolicy)
  .map(([key, value]) => `${key} ${Array.isArray(value) ? value.join(' ') : value}`)
  .join('; ');

// --- END: DYNAMIC CSP LOGIC ---

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    // Use the dynamically generated CSP value
    value: cspValue,
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=(), microphone=(), camera=()',
  },
  // These COOP/COEP headers can cause issues with some third-party services (e.g., Google Auth).
  // Keep them if you need them, but be aware they can be restrictive.
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },

];

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // Optional: Enable source maps in production for easier debugging.
  // Be cautious with this if your app's source code is sensitive.
  productionBrowserSourceMaps: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'resource.logitech.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      // The wildcard hostname is very permissive. Consider restricting it if possible.
      { protocol: 'https', hostname: '*.google.com' }, // Example of a more specific wildcard
      { protocol: 'https', hostname: 'res.cloudinary.com' }, // Example
      { protocol: 'https', hostname: '*', },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*', // Apply to all routes
        headers: securityHeaders,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);