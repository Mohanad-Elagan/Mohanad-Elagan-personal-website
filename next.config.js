/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: 'src/app',
  },
  images: {
    domains: ['picsum.photos'],
  },
}

module.exports = nextConfig;
