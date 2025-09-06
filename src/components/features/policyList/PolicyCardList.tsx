import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface PolicyCardListProps {
    selectedCategory?: string;
}
    
export default function PolicyCardList({ selectedCategory }: PolicyCardListProps) {
   const router = useRouter();
   
    // 12개의 더미 정책 데이터
    const allPolicies = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        dday: `D-${index + 1}`,
        category: ['취업', '창업', '주거', '교육', '복지', '문화/예술'][index % 6],
        title: `청년 정책 ${index + 1}`,
        content: `정책 내용 설명 ${index + 1}`
    }));

    // 선택된 카테고리에 따라 정책 필터링
    const filteredPolicies = selectedCategory && selectedCategory !== '전체' 
        ? allPolicies.filter(policy => policy.category === selectedCategory)
        : allPolicies;

    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {filteredPolicies.map((policy) => (
                <Card key={policy.id} className="w-full max-w-[260px] h-[280px] mx-auto px-5 py-2 flex flex-col justify-between">
                    <p className="mt-2 text-sm font-medium text-red-500">{policy.dday}</p>
                    <p className="w-fit text-primary bg-[#f2f8ff] rounded-[2px] h-[20px] text-[12px] font-medium px-1 py-1">
                        {policy.category}
                    </p>
                    <CardHeader className="p-0 mt-2">
                        <CardTitle className="text-base">
                            <p className="text-[20px]">{policy.title}</p>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <p className="text-sm text-gray-600">{policy.content}</p>
                    </CardContent>
                    <Button className="mt-2 w-full" onClick={()=>router.push("/youthyPolicy")}>자세히 보기</Button>
                </Card>
            ))}
        </div>
    )
}