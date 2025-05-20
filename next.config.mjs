/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only ignore ESLint during production builds
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    // Only ignore TypeScript during production builds
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  basePath: '/pass-the-plate',
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
}

export default nextConfig
