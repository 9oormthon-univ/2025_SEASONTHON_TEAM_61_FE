'use client'

import { Border } from "@/components/ui/border";
import { ChevronDown, House, Printer, Share2, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { GetDetailPolicy } from "./api/DetailPolicyApi";
import { DetailPolicyProps } from "@/types/policy";

export default function DetailPolicy({ policyNo }: { policyNo?: string }){
const [detailPolicy, setDetailPolicy] = useState<DetailPolicyProps | null>(null);

useEffect(() => {
    console.log("id",policyNo);
    if (!policyNo) {
        console.error("policyNo is undefined");
        return;
    }
  
    fetchDetailPolicy();
}, [policyNo]);

const fetchDetailPolicy = async () => {
    try {
        if(policyNo){
        const response = await GetDetailPolicy(policyNo);
        setDetailPolicy(response);}
    } catch (error) {
        console.error("Failed to fetch policy details:", error);
    }
};


    if (!policyNo) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500 mb-4">정책 번호가 없습니다</h1>
                <p className="text-gray-600">올바른 정책 링크를 통해 접근해주세요.</p>
            </div>
        );
    }

    return(
        <div className="flex flex-col w-[60%] mx-auto">
            <div className="mt-20">
                <div className="flex flex-row w-full justify-end items-center">
            <House width={"20px"} height={"20px"} className="mr-2"/> <span className="mr-2 font-light text-[#5c5c5c]">청년정책</span> <ChevronDown strokeWidth={3} width={15} height={15} className="text-[#d2d2d2] mr-2"/>  <span className="mr-2 font-light text-[#5c5c5c]">청년정책검색</span> <ChevronDown strokeWidth={3} width={15} height={15} className="text-[#d2d2d2] mr-2"/>  <span className="text-[#5c5c5c] font-semibold border-b border-[#5c5c5c] text-[16px]">청년지원정보</span> 
            </div>
            <div className="flex flex-row items-center gap-2 justify-between">
            <h1 className="text-[32px] font-bold">{detailPolicy?.policyName}</h1>
            <div className="flex flex-row items-center gap-2">
            <Share2 className="text-[#5c5c5c] mr-4"/>
            <Printer className="text-[#5c5c5c]"/>
            </div>
            </div>
            <div className="w-full h-[0.5px] bg-[#d9d9d9] my-3"></div>
            <div>
                <div className="flex flex-row items-center gap-2">
                <div className="rounded-xl bg-[#ddedff] text-[#1082ff] px-2 py-1 text-[14px] font-semibold w-fit">참여권리</div>
                <div className="rounded-xl bg-[#ddedff] text-[#1082ff] px-2 py-1 text-[14px] font-semibold w-fit flex flex-row items-center"> <UserRound className="text-[#ddedff]" fill="#1082ff" width={20} height={20}/>19~39세</div>
                </div>
                <div className="flex flex-row items-center justify-between mb-7 mt-4">
                    <h1 className="font-bold text-[32px]">{detailPolicy?.policyName}</h1>
                    <a href={detailPolicy?.applicationSite} target="_blank" rel="noopener noreferrer" 
                       className="bg-[#1082ff] hover:bg-[#0d6efd] text-white px-6 py-3 rounded-lg font-semibold text-[16px] transition-colors duration-200 flex items-center gap-2 whitespace-nowrap">
                        바로 신청하기
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            <p className="text-[#a1a1a1] text-[16px] font-medium mb-3 ml-3">사업 운영 기간: {detailPolicy?.operationPeriod}</p>
            <p className="text-[#a1a1a1] text-[16px] font-medium mb-3 ml-3">사업 신청기간: {detailPolicy?.applicationPeriod}</p>
             <p className="text-[#a1a1a1] text-[16px] font-medium mb-3 ml-3">신청대상: {detailPolicy?.minAge === 0 && detailPolicy?.maxAge === 0 ? "무관" : `${detailPolicy?.minAge}세 ~ ${detailPolicy?.maxAge}세`} 청년</p>
            <p className="text-[#a1a1a1] text-[16px] font-medium mb-3 ml-3">지원 규모: 제한없음</p>
            
            <div className="w-full h-[0.5px] bg-[#d9d9d9] my-3"></div>
            {/* 정책 요약 */}
            <div className="mt-8">
                <h2 className="text-[24px] font-bold mb-4">한 눈에 보는 정책 요약</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="mb-4">
                        <h3 className="font-semibold text-[18px] mb-2">정책번호</h3>
                        <p className="text-[16px]">{detailPolicy?.policyNo}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold text-[18px] mb-2">정책분야</h3>
                        <p className="text-[16px]">{detailPolicy?.policyField}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold text-[18px] mb-2">지원내용</h3>
                        <div className="text-[16px] space-y-2">
                            <p>{detailPolicy?.supportContent}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 신청자격 */}
            <div className="mt-8">
                <h2 className="text-[24px] font-bold mb-4">신청자격</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">연령</h3>
                            <p className="text-[14px]">{detailPolicy?.minAge === 0 && detailPolicy?.maxAge === 0 ? "무관" : `${detailPolicy?.minAge}세 ~ ${detailPolicy?.maxAge}세`}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">거주지역</h3>
                            <p className="text-[14px]">서울</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">소득</h3>
                            <p className="text-[14px]">{detailPolicy?.incomeCondition?.replace("소득범위:", "")}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">학력</h3>
                            <p className="text-[14px]">{detailPolicy?.educationRequirement}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">전공</h3>
                            <p className="text-[14px]">{detailPolicy?.majorRequirement}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">취업상태</h3>
                            <p className="text-[14px]">{detailPolicy?.employmentStatus}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 신청방법 */}
            <div className="mt-8">
                <h2 className="text-[24px] font-bold mb-4">신청방법</h2>
                <div className="bg-green-50 p-6 rounded-lg">
                    <div className="mb-4">
                        <h3 className="font-semibold text-[18px] mb-2">신청절차</h3>
                        <p className="text-[16px] mb-2">{detailPolicy?.applicationProcess}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold text-[18px] mb-2">심사 및 발표</h3>
                        <p className="text-[16px]">{detailPolicy?.evaluationAndAnnouncement}</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-semibold text-[18px] mb-2">신청 사이트</h3>
                        <a href={detailPolicy?.applicationSite} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 underline hover:text-blue-800">
                            {detailPolicy? detailPolicy.applicationSite:"없음"}
                        </a>
                    </div>
                    <div className="flex justify-center">
                        <a href={detailPolicy?.applicationSite} target="_blank" rel="noopener noreferrer" 
                           className="bg-[#1082ff] hover:bg-[#0d6efd] text-white px-8 py-4 rounded-lg font-bold text-[18px] transition-colors duration-200 flex items-center gap-3">
                            지금 바로 신청하기
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            </div>
            <div className="w-full h-[0.5px] bg-[#d9d9d9] my-3"></div>
            </div>
        </div>
    )
}