import { Border } from "../ui/border";

export default function MyPage() {
    return (
        <div className="flex flex-col w-[90%] mx-auto mt-[90px]">
            <h1 className="text-[32px] font-bold text-black">신청한 정책 보기</h1>
            <Border variant="default" rounded="md" thickness="normal"></Border>
        </div>
    )
}
