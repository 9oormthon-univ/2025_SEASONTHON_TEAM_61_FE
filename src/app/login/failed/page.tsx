'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function LoginFailed() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRetryLogin = () => {
    // state 파라미터가 있으면 해당 페이지로, 없으면 메인으로 이동
    const state = searchParams.get('state');
    const redirectPath = state ? decodeURIComponent(state) : '/';
    router.push(redirectPath);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Image src="/img/logo.png" alt="logo" className="w-65 mb-8" width={260} height={84} />

      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">로그인 실패</h1>
        <p className="text-gray-600 mb-6">
          로그인 중 문제가 발생했습니다.
          <br />
          다시 시도해주세요.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/login')}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            다시 로그인하기
          </button>

          <button
            onClick={handleRetryLogin}
            className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
