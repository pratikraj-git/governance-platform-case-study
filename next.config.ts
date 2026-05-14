import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // next/image: prefer AVIF (better compression) → WebP fallback.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Devices: mobile, tablet, desktop, widescreen
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 64, 128, 256],
  },

  // Reduce bundle size by tree-shaking framer-motion to used exports only.
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  // HTTP headers applied to every route.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking — the case study is not embedded in iframes.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Opt out of MIME-type sniffing.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Forward only the origin as referrer (clean analytics, no full-URL leakage).
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Restrict browser features not needed by this site.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Long-lived cache for static assets (Next's _next/static hashes guarantee freshness).
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // SVG favicon — cache for a day; short enough to swap without a hard reset.
        source: '/favicon.svg',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ];
  },
};

export default nextConfig;
