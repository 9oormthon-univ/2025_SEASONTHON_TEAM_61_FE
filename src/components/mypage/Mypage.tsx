import { ChevronRight } from "lucide-react";
import { Border } from "../ui/border";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function MyPage() {
    return (
        <div className="flex flex-col w-[70%] mx-auto mt-[90px]">
            <h1 className="text-[32px] font-bold text-black mb-7">신청한 정책 보기</h1>
            <Border variant="default" thickness="thin" />
<div className="flex flex-row gap-0 w-full mt-[66px]">
            <Card className="w-full h-[224px] px-7 pt-3">
                <div className="w-full h-full flex flex-col ">
                <p className="text-[20px] font-semibold text-[#5c5c5c]">
                전체
                </p>
                <p className="font-bold text-[44px] text-[#5c5c5c] text-center mt-[36px]">2</p>
                </div>
                </Card>
                <Card className="w-full h-[224px] px-7 pt-3">
                <div>
                <p className="text-[20px] font-semibold text-[#5c5c5c]">
                신청접수 완료
                </p>
                <p className="font-bold text-[44px] text-[#5c5c5c] text-center mt-[36px]">2</p>
                </div>
                </Card>
                <Card className="w-full h-[224px] px-7 pt-3">
                <div>
                <p className="text-[20px] font-semibold text-[#5c5c5c]">
            서류심사
                </p>
                <p className="font-bold text-[44px] text-[#5c5c5c] text-center mt-[36px]">2</p>
                </div>
                </Card>
                <Card className="w-full h-[224px] px-7 pt-3">
                <div>
                <p className="text-[20px] font-semibold text-[#5c5c5c]">
                서류보완
                </p>
                <p className="font-bold text-[44px] text-[#5c5c5c] text-center mt-[36px]">2</p>
                </div>
                </Card>
                <Card className="w-full h-[224px] px-7 pt-3">
                <div>
                <p className="text-[20px] font-semibold text-[#5c5c5c]">
                비선정
                </p>
                <p className="font-bold text-[44px] text-[#5c5c5c] text-center mt-[36px]">2</p>
                </div>
                </Card>
                <Card className="w-full h-[224px] px-7 pt-3">
                <div>
                <p className="text-[20px] font-semibold text-[#5c5c5c]">
                선정
                </p>
                <p className="font-bold text-[44px] text-[#5c5c5c] text-center mt-[36px]">2</p>

                </div>
                </Card>
                </div>

                <div className="flex flex-col mt-[66px]">
                    <div className="flex flex-row items-center mb-[23px]">
                    <Button variant={"secondary"} size={'xl'} className="text-[16px] font-semibold">비선정</Button>
                    <span className="text-[18px] font-semibold text-[#5c5c5c] ml-5">청년문화패스</span> <ChevronRight />
                    </div>
                    <div className="flex flex-row items-center">
                    <Button variant={"default"} size={'xl'} className="text-[16px] font-semibold">선정</Button>
                    <span className="text-[18px] font-semibold text-[#5c5c5c] ml-5">청년문화패스</span>
                    <ChevronRight />
                    </div>
                </div>
        </div>
    )
}