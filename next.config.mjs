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
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  output: 'export',
  distDir: 'out',
}

export default nextConfig
