'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import CardGrid from "../common/CardGrid";
import { ChevronRight } from "lucide-react";
import CardRow from "../common/CardRow";

export default function Main() {
    return (
        <div className="flex flex-col items-center justify-center w-full">
           <div className='flex flex-col min-h-[527px] w-full bg-[#d9d9d9] justify-center items-center p-8'>
                <p className="text-[20px] font-semibold text-[#5c5c5c] mb-8">
                    유씨에서 나에게 필요했던 청년 정책을 편리하게 찾아보세요
                </p>
                <div className="w-full max-w-6xl">
                    <CardGrid />
                </div>
           </div>
           <div className="flex flex-col items-center justify-center w-[80%] mx-auto mt-[90px]">
            <h1 className="text-[32px] font-bold">맞춤형 청년 정책 모음.zip</h1>
            <p className="text-[20px] font-medium text-[#5c5c5c] mb-8">유씨가 추천해주는 맞춤형 정보를 만나보세요</p>
           
           <p className="text-[24px] font-medium text-[#1082FF] border-b border-[#1082FF]">지도 바로가기</p>
          <div>
          <div className="flex flex-row items-center gap-2 w-full justify-end">
            <p className="text-[16px] text-right text-[#1082FF]">더보기</p>
            <ChevronRight className="w-5 h-5 text-[#1082FF]" />
            </div>
            <CardRow />
         
          </div>
           </div>
        </div>
    )
}