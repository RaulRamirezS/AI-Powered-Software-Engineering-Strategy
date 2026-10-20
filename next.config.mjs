/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'teamsitestorage.blob.core.windows.net', pathname: '/assets/**' }],
  },
  async redirects() {
    return [
      { source: '/', destination: '/solutions', permanent: false },
      // Some browsers cached an old locale redirect to /en on localhost; send it to the real pages.
      { source: '/en', destination: '/solutions', permanent: false },
      { source: '/en/:path*', destination: '/:path*', permanent: false },
    ];
  },
};

export default nextConfig;
