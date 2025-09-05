'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import ProgressBar from "../ui/progress-bar";
import CardGrid from "../common/CardGrid";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GetUserInfo() {
    const [step, setStep] = useState<1 | 2>(1);
    const [age, setAge] = useState<string>("");
    const [interest, setInterest] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-[660px] mx-auto">
        {/* Progress Bar */}
        <div className="w-full max-w-2xl mb-5">
            <ProgressBar step={step} />
        </div>
        
        {step === 1 && (
            <>
            <div className="w-full flex flex-row items-center justify-end gap-2 text-[#1082FF] cursor-pointer" onClick={() => setStep(2)}>건너뛰기 <ChevronRight className="w-5 h-5 text-[#1082FF]" /></div>
            <div className="w-full mt-5">
      <h1 className="text-[48px] font-bold">현재 나이가 어떻게 되시나요?</h1>
      <p className="text-[20px] font-medium">유씨가 여러분에게 필요한 정책을 쉽게 추천드릴 수 있도록 알려주세요!</p>
      <div className="flex flex-col items-center gap-2 mt-6">
       <Button 
         variant="outline" 
         className="w-[544px] h-[66px] rounded-[5px] text-[20px] font-semibold" 
         onClick={() => {setStep(2); setAge("20대");}}
       >
         20대
       </Button>
       <Button 
         variant="outline" 
         className="w-[544px] h-[66px] rounded-[5px] text-[20px] font-semibold" 
         onClick={() => {setStep(2); setAge("30대");}}
       >
         30대
       </Button>
       <Button 
         variant="outline" 
         className="w-[544px] h-[66px] rounded-[5px] text-[20px] font-semibold" 
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
       <div className="w-full mt-5">
        <h1 className="text-[48px] font-bold">관심있는 정책분야를 택하세요</h1>
        <p className="text-[20px] font-medium mb-10">유씨가 여러분에게 필요한 정책을 쉽게 추천드릴 수 있도록 알려주세요!</p>
        
        <CardGrid 
          selectedCards={interest}
          onSelectionChange={setInterest}
        />
        
        {/* 선택된 관심사 표시 (디버깅용) */}
        {interest.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">선택된 관심사:</p>
            <p>{interest.join(", ")}</p>
          </div>
        )}
        </div>
        </>
      )}
    </div>
  );
}