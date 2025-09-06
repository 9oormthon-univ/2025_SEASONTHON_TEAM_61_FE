'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/components/common/Loading';
import { kakaoAuthCode } from '@/api/kakao/KakaoAuthApi';
import { useLoginState } from '@/stores/login/useLoginState';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkAuthStatus } = useLoginState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKakaoCallback = async () => {
      try {
        // URL에서 인증 코드 추출
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const state = searchParams.get('state');

        if (error) {
          // 카카오 로그인 취소 또는 오류
          setError('카카오 로그인이 취소되었거나 오류가 발생했습니다.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          return;
        }

        if (!code) {
          setError('인증 코드를 받지 못했습니다.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          return;
        }

        // 서버에 인증 코드 전송
        await kakaoAuthCode(code);

        // 인증 상태 확인
        const isAuthenticated = await checkAuthStatus();
        
        if (isAuthenticated) {
          // 로그인 성공 - 원래 페이지로 리다이렉트 또는 메인으로
          const redirectPath = state ? decodeURIComponent(state) : '/';
          router.push(redirectPath);
        } else {
          setError('로그인 처리 중 오류가 발생했습니다.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      } catch (err) {
        console.error('카카오 로그인 처리 오류:', err);
        setError('서버와의 통신 중 오류가 발생했습니다.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    handleKakaoCallback();
  }, [searchParams, router, checkAuthStatus]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loading />
        <p className="mt-4 text-gray-600">카카오 로그인 처리 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">로그인 오류</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <p className="text-sm text-gray-500">잠시 후 로그인 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  return null;
}
