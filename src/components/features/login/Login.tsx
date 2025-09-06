'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  const restAPIKey = process.env.NEXT_PUBLIC_REST_API_KEY;
  const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${restAPIKey}&redirect_uri=${redirectURI}&response_type=code`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 mt-[-50px]">
      <Image src="/img/logo.png" alt="logo" className="w-65 mb-21" width={260} height={84} />
      <h1 className="font-semibold text-[20px] leading-[28px] tracking-normal text-center align-middle mb-5">
        로그인하시고
        <br />
        유씨와 함께 청년 정책을
        <br />한 눈에 들어오게 모아보세요!
      </h1>
      <Link href={KAKAO_AUTH_URI}>
        <Image
          src="/img/kakao_login_large_wide.png"
          alt="login"
          className="w-80 cursor-pointer hover:opacity-90 transition-opacity"
          width={320}
          height={46}
        />
      </Link>
    </div>
  );
}
