import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // 경고: 타입 에러가 있어도 프로덕션 빌드를 허용
    ignoreBuildErrors: true,
  },
  // Cross origin 경고 해결
  experimental: {
    allowedDevOrigins: ['172.17.194.61'],
  },
};

export default nextConfig;
