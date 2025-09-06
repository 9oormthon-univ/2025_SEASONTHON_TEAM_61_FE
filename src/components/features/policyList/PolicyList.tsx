'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import PolicyCardList from "./PolicyCardList";
import { GetPolicyList } from "./api/PolicyLisyApi";

interface PolicyListProps {
    category?: string;
}

export default function PolicyList({ category }: PolicyListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(category);
    
    // category prop이 변경될 때마다 selectedCategory 상태 업데이트
    useEffect(() => {
        setSelectedCategory(category);
        policyList();
    }, [category]);

    const policyList = async () => {
        const response = await GetPolicyList();
        console.log(response);
    }

    // 카테고리 변경 시 URL 파라미터 업데이트하는 함수
    const handleCategoryChange = (newCategory: string) => {
        setSelectedCategory(newCategory);
        
        // 현재 URL의 search params를 가져와서 업데이트
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        
        if (newCategory && newCategory !== '전체') {
            current.set('category', newCategory);
        } else {
            current.delete('category');
        }
        
        // URL 업데이트 (페이지 새로고침 없이)
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${window.location.pathname}${query}`);
    };
    return (
        <div className="w-full">
            <div className="w-full mx-auto flex flex-col items-center justify-center mt-22">
                <h1 className="text-3xl font-bold mb-4">청년 정책 목록</h1>
                {category && (
                    <div className="mb-6">
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            선택된 카테고리: {selectedCategory}
                        </span>
                    </div>
                )}
                 <div className="w-full h-[0.5px] bg-[#d9d9d9] my-3"></div>
                <div className="w-full flex flex-row gap-2 items-center justify-center">
                   
                   <Button className={`${selectedCategory === '전체' ? 'bg-[#1082ff] text-[#ffffff]' : 'bg-[#f5f5f5] text-[#5c5c5c]'} w-[70px] h-[48px] text-[16px] font-semibold`} onClick={() => handleCategoryChange('전체')}>전체</Button>
                   <Button className={`${selectedCategory === '취업' ? 'bg-[#1082ff] text-[#ffffff]' : 'bg-[#f5f5f5] text-[#5c5c5c]'} w-[70px] h-[48px] text-[16px] font-semibold`} onClick={() => handleCategoryChange('취업')}>취업</Button>
                   <Button className={`${selectedCategory === '창업' ? 'bg-[#1082ff] text-[#ffffff]' : 'bg-[#f5f5f5] text-[#5c5c5c]'} w-[70px] h-[48px] text-[16px] font-semibold`} onClick={() => handleCategoryChange('창업')}>창업</Button>
                   <Button className={`${selectedCategory === '주거' ? 'bg-[#1082ff] text-[#ffffff]' : 'bg-[#f5f5f5] text-[#5c5c5c]'} w-[70px] h-[48px] text-[16px] font-semibold`} onClick={() => handleCategoryChange('주거')}>주거</Button>
                   <Button className={`${selectedCategory === '교육' ? 'bg-[#1082ff] text-[#ffffff]' : 'bg-[#f5f5f5] text-[#5c5c5c]'} w-[70px] h-[48px] text-[16px] font-semibold`} onClick={() => handleCategoryChange('교육')}>교육</Button>
                   <Button className={`${selectedCategory === '복지' ? 'bg-[#1082ff] text-[#ffffff]' : 'bg-[#f5f5f5] text-[#5c5c5c]'} w-[70px] h-[48px] text-[16px] font-semibold`} onClick={() => handleCategoryChange('복지')}>복지</Button>
                   <Button className={`${selectedCategory === '문화/예술' ? 'bg-[#1082ff] text-[#ffffff]' : 'bg-[#f5f5f5] text-[#5c5c5c]'} w-[70px] h-[48px] text-[16px] font-semibold`} onClick={() => handleCategoryChange('문화/예술')}>문화/예술</Button>
                   <Button className={`${selectedCategory === '참여권리' ? 'bg-[#1082ff] text-[#ffffff]' : 'bg-[#f5f5f5] text-[#5c5c5c]'} w-[70px] h-[48px] text-[16px] font-semibold`} onClick={() => handleCategoryChange('참여권리')}>참여권리</Button>
                   <Button className={`${selectedCategory === '기타' ? 'bg-[#1082ff] text-[#ffffff]' : 'bg-[#f5f5f5] text-[#5c5c5c]'} w-[70px] h-[48px] text-[16px] font-semibold`} onClick={() => handleCategoryChange('기타')}>기타</Button>
                   
                </div>
               
                <div className="mt-10 w-full">
                    <PolicyCardList selectedCategory={selectedCategory}/>
                </div>
            </div>
        </div>
    )
}