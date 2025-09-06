import { ChevronRight } from "lucide-react";
import { Border } from "../../ui/border";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import Image from "next/image";

export default function MyPage() {
    return (
        <div className="flex flex-col w-[70%] mx-auto mt-[90px]">
            <h1 className="text-[32px] font-bold text-black mb-1 leading-[150%] tracking-[0%]">마이페이지</h1>
            <p className="text-[20px] font-light text-[#a1a1a1] mb-7">프로필정보수정, 마이정책 관리, 비밀번호를 변경할 수 있고, 회원 탈퇴를 할 수 있습니다.</p>
            <div className="w-full h-[0.5px] bg-[#d9d9d9] my-3"></div>
            <div className="flex flex-row items-center justify-between">
<div className="flex flex-col items-start gap-2">
    <span>프로필정보 수정</span>
    <span>마이정책 관리</span>
    <span>회원탈퇴</span>
</div>
<div>
    <h1 className="text-[30px] font-bold text-black mb-1 leading-[150%] tracking-[0%]">프로필 정보</h1>
    <p className="text-[18px] font-light text-[#a1a1a1]">유씨웹사이트에서 보이는 프로필 정보를 수정할 수 있습니다.</p>
<div className="w-full h-[0.5px] bg-[#d9d9d9] my-3"></div>
<div className="w-full flex flex-col">
    <span className="text-[18px] font-medium text-[#5c5c5c] mb-3">닉네임</span>
    <div className="w-full h-[40px] bg-[#ffffff] rounded-[5px] flex flex-row items-center border border-[#d2d2d2] px-4 py-2 text-[#7e7e7e] font-light">나우유씨미</div>

    <span className="text-[18px] font-medium text-[#5c5c5c] mb-3 mt-6">아바타</span>
<div className="w-full flex flex-row items-center">
    <Image src="/img/mypage/profile.png" alt="avatar" width={35} height={30} quality={100} className="bg-[#f2f8ff] rounded-full p-2"/>
    <div className="w-full h-[40px] bg-[#ffffff] rounded-[5px] flex flex-row items-center border border-[#d2d2d2] px-4 py-2 text-[#7e7e7e] font-light">
        <span>파일 선택</span>
        <div className="w-[1px] h-4 bg-[#d2d2d2] mx-3"></div>
        <span>선택된 파일 없음</span>
    </div>
    </div>
    <span className="text-[18px] font-medium text-[#5c5c5c] mb-3">자기소개</span>
    <div className="w-full h-[100px] bg-[#ffffff] rounded-[5px] flex flex-row border border-[#d2d2d2] px-4 py-2 text-[#7e7e7e] font-light">간단한 자기소개를 입력해주세요.</div>
</div>
</div>
            </div>
        </div>
    )
}