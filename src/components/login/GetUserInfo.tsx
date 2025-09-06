'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import ProgressBar from "../ui/progress-bar";
import CardGrid from "../common/CardGrid";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PostProfileAPi } from "./api/getUserInfoApi";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";

export default function GetUserInfo() {
    const [step, setStep] = useState<1 | 2>(1);
    const [age, setAge] = useState<string>("");
    const [interest, setInterest] = useState<string[]>([]);
    const router = useRouter();
    const { openAlertModal, openConfirmModal } = useModal();


    const handlePostProfile = async () => {
        // Ensure ageGroup is not empty - set default if user skipped
        const finalAge = age || "20대"; // Default to "20대" if empty
        
        if (finalAge && interest.length > 0) {
            try {
                const response = await PostProfileAPi({
                    ageGroup: finalAge, 
                    categories: interest, 
                    memberId: 1
                });
                console.log(response);
                
                // 성공 모달 표시
                openAlertModal(
                    "프로필 설정 완료", 
                    "유씨가 맞춤형 정책을 추천해드릴 준비가 완료되었습니다!"
                );
                
                // 잠시 후 홈으로 이동
                setTimeout(() => {
                    router.push('/');
                }, 2000);
                
            } catch (error) {
                console.error('Profile creation failed:', error);
                openAlertModal(
                    "오류 발생", 
                    "프로필 설정 중 오류가 발생했습니다. 다시 시도해주세요."
                );
            }
        } else {
            openAlertModal(
                "필수 정보 누락", 
                "관심 분야를 최소 1개 이상 선택해주세요."
            );
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-[660px] mx-auto">
        {/* Progress Bar */}
        <div className="w-full max-w-2xl mb-5">
            <ProgressBar step={step} />
        </div>
        
        {step === 1 && (
            <>
            <div className="w-full flex flex-row items-center justify-end gap-2 text-[#1082FF] cursor-pointer" onClick={() => setStep(2)}>건너뛰기 <ChevronRight className="w-5 h-5 text-[#1082FF]" /></div>
            <div className="w-full mt-5 mb-10 justify-center items-center">
      <h1 className="text-[40px] font-bold text-center">현재 나이가 어떻게 되시나요?</h1>
      <p className="text-[16px] font-medium text-center">유씨가 여러분에게 필요한 정책을 쉽게 추천드릴 수 있도록 알려주세요!</p>
      <div className="flex flex-col items-center gap-2 mt-6">
       <Button 
         variant="outline" 
         className="w-[500px] h-[60px] rounded-[5px] text-[20px] font-semibold" 
         onClick={() => {setStep(2); setAge("20대");}}
       >
         20대
       </Button>
       <Button 
         variant="outline" 
         className="w-[500px] h-[60px] rounded-[5px] text-[20px] font-semibold" 
         onClick={() => {setStep(2); setAge("30대");}}
       >
         30대
       </Button>
       <Button 
         variant="outline" 
         className="w-[500px] h-[60px] rounded-[5px] text-[20px] font-semibold" 
         onClick={() => {setStep(2); setAge("40대 이상");}}
       >
         40대 이상
       </Button>
      </div>
      </div>
      </>
      )}

      {step === 2 && (
        <>
        <div className="w-full flex flex-row justify-start gap-2 text-[#1082FF] cursor-pointer items-center" onClick={() => setStep(1)}> <ChevronLeft className="w-5 h-5 text-[#1082FF]" /> 뒤로</div>
       <div className="w-full mt-5 mb-5 justify-center items-center">
        <h1 className="text-[40px] font-bold text-center">관심있는 정책분야를 택하세요</h1>
        <p className="text-[16px] font-medium mb-10 text-center">유씨가 여러분에게 필요한 정책을 쉽게 추천드릴 수 있도록 알려주세요!</p>
        
        <CardGrid 
          selectedCards={interest}
          onSelectionChange={setInterest}
        />

        <Button onClick={handlePostProfile} className="w-full h-[60px] rounded-[16px] text-[25px] font-semibold mt-10">유씨 시작하기</Button>
        
        </div>
        </>
      )}
    </div>
  );
}