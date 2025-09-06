'use client';

import Loading from '@/components/common/Loading';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { useLoginState } from '@/stores/login/useLoginState';

export default function KakaoRedirection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const redirectURI = 'http://localhost:3000/kakao/callback';
  const { setTokens, setIsLoggedIn } = useLoginState();

  useEffect(() => {
    if (code) {
      // 환경 변수 확인
      console.log('환경 변수 확인:', {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        redirectURI: process.env.NEXT_PUBLIC_REDIRECT_URI,
      });

      // 요청 데이터 로깅
      const requestData = {
        code: code,
        redirectUri: redirectURI,
      };
      console.log('카카오 로그인 요청 데이터:', requestData);

      apiClient
        .post('/kakao/auth/code', requestData)
        .then((res) => {
          console.log('카카오 로그인 응답:', res);

          const { access } = res.data;

          if (access) {
            // 토큰 로컬 스토리지에 저장
            setTokens(access, null);
            setIsLoggedIn(true);
            // 회원가입 페이지로 리다이렉트
            router.push('/signup');
          } else {
            console.error('로그인 응답에 필요한 데이터가 없습니다:', res.data);
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
            router.push('/');
          }
        })
        .catch((error) => {
          console.error('카카오 로그인 오류:', error);
          console.error('오류 상세:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: error.config,
          });
          alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
          router.push('/');
        });
    }
  }, [code, setTokens, router, redirectURI]);

  if (!code) {
    return <Loading />;
  }

  return <Loading />;
}
