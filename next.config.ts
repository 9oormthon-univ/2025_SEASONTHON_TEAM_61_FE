import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // 경고: 타입 에러가 있어도 프로덕션 빌드를 허용
    ignoreBuildErrors: true,
  },
  
  // Cross origin 경고 해결
  experimental: {
    allowedDevOrigins: ['172.17.194.61', 'localhost'],
  },

  // 프록시 서버 설정
  rewrites: async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://cheer-up.net';
    
    return [
      {
        source: '/api/:path*',
        destination: `${API_BASE_URL}/api/:path*`,
      },
      // 인증 관련 API 경로들
      {
        source: '/auth/:path*',
        destination: `${API_BASE_URL}/auth/:path*`,
      },
      // 카카오 인증 API
      {
        source: '/kakao/:path*',
        destination: `${API_BASE_URL}/kakao/:path*`,
      },
      // 업로드 관련
      {
        source: '/upload/:path*',
        destination: `${API_BASE_URL}/upload/:path*`,
      },
    ];
  },

  // CORS 및 보안 헤더 설정
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
