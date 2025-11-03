/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://127.0.0.1:8000/uploads/:path*',
      },
      {
        source: '/upload/:path*',
        destination: 'http://127.0.0.1:8000/upload/:path*',
      },
      {
        source: '/avatars/:path*',
        destination: 'http://127.0.0.1:8000/avatars/:path*',
      },
    ];
  },
};

export default nextConfig;
