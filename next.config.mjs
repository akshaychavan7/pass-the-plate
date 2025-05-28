/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only ignore ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Only ignore TypeScript during production builds
    ignoreBuildErrors: true,
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
  // Only use basePath and output: 'export' in production
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/pass-the-plate',
    output: 'export',
    distDir: 'out',
    trailingSlash: true,
  } : {})
}

export default nextConfig
