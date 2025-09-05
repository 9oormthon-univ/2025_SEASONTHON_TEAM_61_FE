'use client'

export default function Login() {

    const kakaoLoginHandler = ()=>{
        const state = '/';
        window.location.href = `http://localhost:8080/api/kakao/auth/login?state=${state}`;
    }
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 mt-[-50px]">

            <img src="/img/logo.png" alt="logo" className="w-65 mb-21" />
            <h1 className="font-semibold text-[20px] leading-[28px] tracking-normal text-center align-middle mb-5">
                로그인하시고<br/>
                유씨와 함께 청년 정책을<br/>
                한 눈에 들어오게 모아보세요!
            </h1>
           
            <img src="/img/kakao_login_large_wide.png" alt="login" className="w-80 cursor-pointer hover:opacity-90 transition-opacity" onClick={kakaoLoginHandler} />
          
        </div>

    )
}