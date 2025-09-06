'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Loading from '@/components/common/Loading';
import { useLoginState } from '@/stores/login/useLoginState';

export default function LoginSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUserInfo, checkAuthStatus } = useLoginState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const isAuthenticated = await checkAuthStatus();

        if (isAuthenticated) {
          // 인증 성공 - 스토어에 사용자 정보가 이미 저장됨
          setError(null);
        } else {
          setError('사용자 정보를 가져올 수 없습니다.');
        }
      } catch (err) {
        setError('서버와의 통신 중 오류가 발생했습니다.');
        // eslint-disable-next-line no-console
        console.error('사용자 정보 조회 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [checkAuthStatus]);

  const { userInfo } = useLoginState();

  const handleGoToMain = () => {
    // state 파라미터가 있으면 해당 페이지로, 없으면 메인으로 이동
    const state = searchParams.get('state');
    const redirectPath = state ? decodeURIComponent(state) : '/';
    router.push(redirectPath);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Image src="/img/logo.png" alt="logo" className="w-65 mb-8" width={260} height={84} />

      {error ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">로그인 오류</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            다시 로그인하기
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">로그인 성공!</h1>
          <p className="text-gray-600 mb-6">
            {userInfo ? `안녕하세요, ${userInfo.name || '사용자'}님!` : '로그인이 완료되었습니다.'}
          </p>
          <button
            onClick={handleGoToMain}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            메인으로 이동
          </button>
        </div>
      )}
    </div>
  );
}
