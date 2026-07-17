import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholder art in /public is authored as SVG for Slice 01. Real
    // photography (AVIF → WebP → JPEG per docs/05_QUALITY.md) replaces it
    // slice by slice; the SVG allowance is scoped to our own static assets.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
