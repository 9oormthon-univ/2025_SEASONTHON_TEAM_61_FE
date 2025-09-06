import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import Pagination from "../../ui/pagination";

interface Policy {
    policyNo: string;
    policyName: string;
    policySummary: string;
    category: string;
    dday: string;
}

interface PolicyCardListProps {
    selectedCategory?: string;
    policyList: Policy[];
    loading?: boolean;
    totalPages: number;
    totalElements: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}
    
export default function PolicyCardList({ selectedCategory, policyList, loading, totalPages, totalElements, currentPage, setCurrentPage }: PolicyCardListProps) {
   const router = useRouter();

    // 카테고리가 변경되면 첫 페이지로 이동
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, setCurrentPage]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-600">정책 목록을 불러오는 중...</p>
            </div>
        );
    }

    if (policyList.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-600">
                    {selectedCategory && selectedCategory !== '전체' 
                        ? `${selectedCategory} 카테고리에 해당하는 정책이 없습니다.`
                        : '정책 목록이 없습니다.'
                    }
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {policyList.map((policy) => (
                    <Card key={policy.policyNo} className="w-full max-w-[260px] h-[280px] mx-auto px-5 py-2 flex flex-col justify-between gap-0">
                        <p className="mt-2 text-sm font-medium text-red-500">{policy.dday}</p>
                        <p className="w-fit text-primary bg-[#f2f8ff] rounded-[2px] h-[20px] text-[12px] font-medium px-1 py-1">
                            {policy.category}
                        </p>
                        <CardHeader className="p-0 mt-2">
                            <CardTitle className="text-base">
                                <p className="text-[20px]">{policy.policyName}</p>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 flex-1">
                            <p className="text-sm text-gray-600 line-clamp-2">{policy.policySummary}</p>
                        </CardContent>
                        <Button 
                            className="mt-2 w-full" 
                            onClick={()=>router.push(`/youthyPolicy?policyNo=${policy.policyNo}`)}
                        >
                            자세히 보기
                        </Button>
                    </Card>
                ))}
            </div>
            
            {/* 페이지네이션 */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mb-8"
            />
        </div>
    )
}