import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['recharts', 'lucide-react'],
  },
}

export default nextConfig
