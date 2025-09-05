'use client';

import Image from 'next/image';

export default function Login() {
  const kakaoLoginHandler = () => {
    // 현재 경로를 state로 전달하여 로그인 후 원래 페이지로 돌아갈 수 있도록 함
    const currentPath = window.location.pathname;
    const backendLoginUrl = `http://15.164.252.60:8080/kakao/auth/login?state=${encodeURIComponent(currentPath)}`;

    // 백엔드 로그인 URL로 페이지 이동
    window.location.href = backendLoginUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 mt-[-50px]">
      <Image src="/img/logo.png" alt="logo" className="w-65 mb-21" width={260} height={84} />
      <h1 className="font-semibold text-[20px] leading-[28px] tracking-normal text-center align-middle mb-5">
        로그인하시고
        <br />
        유씨와 함께 청년 정책을
        <br />한 눈에 들어오게 모아보세요!
      </h1>
      {/* <Link href={KAKAO_AUTH_URI}> */}
      <Image
        src="/img/kakao_login_large_wide.png"
        alt="login"
        className="w-80 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={kakaoLoginHandler}
        width={320}
        height={46}
      />
      {/* </Link> */}
    </div>
  );
}
