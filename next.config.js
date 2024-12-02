/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io', 'localhost'],
    formats: ['image/webp']
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000'
  },
  webpack: (config) => {
    config.resolve.alias['quill$'] = 'quill/dist/quill.js';
    return config;
  }
};

module.exports = nextConfig;
