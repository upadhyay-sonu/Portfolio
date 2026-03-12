import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: [],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.optimization.minimize = true;
    return config;
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
