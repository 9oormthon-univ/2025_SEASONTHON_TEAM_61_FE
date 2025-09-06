import { Border } from "@/components/ui/border";
import { ChevronDown, House, Printer, Share2, UserRound } from "lucide-react";

export default function DetailPolicy(){

    return(
        <div className="flex flex-col w-[60%] mx-auto">
            <div className="mt-20">
                <div className="flex flex-row w-full justify-end items-center">
            <House width={"20px"} height={"20px"} className="mr-2"/> <span className="mr-2 font-light text-[#5c5c5c]">청년정책</span> <ChevronDown strokeWidth={3} width={15} height={15} className="text-[#d2d2d2] mr-2"/>  <span className="mr-2 font-light text-[#5c5c5c]">청년정책검색</span> <ChevronDown strokeWidth={3} width={15} height={15} className="text-[#d2d2d2] mr-2"/>  <span className="text-[#5c5c5c] font-semibold border-b border-[#5c5c5c] text-[16px]">청년지원정보</span> 
            </div>
            <div className="flex flex-row items-center gap-2 justify-between">
            <h1 className="text-[32px] font-bold">청년 지원 정보</h1>
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
                    <h1 className="font-bold text-[32px]">세종시 청년정책 제안창구 운영</h1>
                    <a href="https://4242.or.kr/policy_suggestion" target="_blank" rel="noopener noreferrer" 
                       className="bg-[#1082ff] hover:bg-[#0d6efd] text-white px-6 py-3 rounded-lg font-semibold text-[16px] transition-colors duration-200 flex items-center gap-2 whitespace-nowrap">
                        바로 신청하기
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            <p className="text-[#a1a1a1] text-[16px] font-medium mb-3 ml-3">사업 운영 기간: 2025년 3월 1일 ~ 2025년 12월 31일</p>
            <p className="text-[#a1a1a1] text-[16px] font-medium mb-3 ml-3">사업 신청기간: 2025년 3월 1일 ~ 2025년 12월 31일</p>
            <p className="text-[#a1a1a1] text-[16px] font-medium mb-3 ml-3">신청대상: 만 19세~만 39세 세종시 거주 또는 활동 청년</p>
            <p className="text-[#a1a1a1] text-[16px] font-medium mb-3 ml-3">지원 규모: 제한없음</p>
            
            <div className="w-full h-[0.5px] bg-[#d9d9d9] my-3"></div>
            {/* 정책 요약 */}
            <div className="mt-8">
                <h2 className="text-[24px] font-bold mb-4">한 눈에 보는 정책 요약</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="mb-4">
                        <h3 className="font-semibold text-[18px] mb-2">정책번호</h3>
                        <p className="text-[16px]">20250904005400211649</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold text-[18px] mb-2">정책분야</h3>
                        <p className="text-[16px]">참여권리</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold text-[18px] mb-2">지원내용</h3>
                        <div className="text-[16px] space-y-2">
                            <p><strong>○ 온라인 청년정책 제안창구 운영</strong></p>
                            <p>- (대상) 세종시 거주 또는 활동하는 청년</p>
                            <p>- (내용) 세종청년플랫폼 내 온라인 청년정책 제안 창구 운영</p>
                            <p><strong>○ 청년친화정책 토론회 운영</strong></p>
                            <p>- (대상) 온라인 정책 공감 표시 100개 이상 득표 정책 제안자, 전문가 등</p>
                            <p>- (내용) 투표를 통해 상정된 정책 발제, 숙의토론 등</p>
                            <p><strong>○ 기타사항:</strong> 숙의토론 후 청년자율편성예산제 연계</p>
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
                            <p className="text-[14px]">만 19세~만 39세</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">거주지역</h3>
                            <p className="text-[14px]">세종특별자치시</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">소득</h3>
                            <p className="text-[14px]">무관</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">학력</h3>
                            <p className="text-[14px]">제한없음</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">전공</h3>
                            <p className="text-[14px]">제한없음</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[16px] mb-1">취업상태</h3>
                            <p className="text-[14px]">제한없음</p>
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
                        <p className="text-[16px] mb-2">(온라인) 세종청년센터 누리집</p>
                        <p className="text-[16px]">- 세종청년플랫폼 회원가입 후 온라인 청년정책 제안창구 클릭</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold text-[18px] mb-2">심사 및 발표</h3>
                        <p className="text-[16px]">(심사) 공감 표시 100개 이상 득표 시 안건 상정</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-semibold text-[18px] mb-2">신청 사이트</h3>
                        <a href="https://4242.or.kr/policy_suggestion" target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 underline hover:text-blue-800">
                            https://4242.or.kr/policy_suggestion
                        </a>
                    </div>
                    <div className="flex justify-center">
                        <a href="https://4242.or.kr/policy_suggestion" target="_blank" rel="noopener noreferrer" 
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