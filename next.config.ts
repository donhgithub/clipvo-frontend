// @ts-ignore - next-pwa has no types
import withPWA from 'next-pwa'
import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default withPWA({
  dest: 'public',
  disable: !isProd,
})(nextConfig)
