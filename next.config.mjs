/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'teamsitestorage.blob.core.windows.net', pathname: '/assets/**' }],
  },
  async redirects() {
    return [
      { source: '/', destination: '/solutions', permanent: false },
    ];
  },
};

export default nextConfig;
