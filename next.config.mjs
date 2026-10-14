/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/', destination: '/solutions/ai-powered-software-engineering', permanent: false },
    ];
  },
};

export default nextConfig;
