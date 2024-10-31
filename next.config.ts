import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:7272/v2/:path*',
      },
    ]
  }
}


export default nextConfig;
