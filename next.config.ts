/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ THE key line!
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
