const withFlowbiteReact = require('flowbite-react/plugin/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  reactStrictMode: true,
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = withFlowbiteReact(nextConfig);
