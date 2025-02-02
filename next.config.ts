// next.config.ts
import { NextConfig } from 'next'

const config: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1tvaw2qn8888b.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'se-images.campuslabs.com',
      },
    ],
  },
}

export default config
