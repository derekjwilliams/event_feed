// next.config.ts
import { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1tvaw2qn8888b.cloudfront.net',
      },
    ],
  },
}

export default config
