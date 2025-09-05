"use client"

import { Bookmark, ChevronDown, MapPin, Search, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Header() {
    const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("통합검색");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const categories = ["통합검색", "취업", "창업"];

  return (
   <div className="w-full">
    <div className="flex flex-row items-center w-full gap-4 justify-between px-20 py-4">
     <div className="flex flex-row items-center">
      <img src="/img/logo.png" alt="logo" className="w-52 mr-9" onClick={() => router.push('/')}/>
      <h1 className="font-bold text-[20px] mt-1">청년 정책, 지도에서 콕!</h1>
     </div>

     <div className="flex flex-row items-center gap-4">
      <div className="flex flex-row items-center gap-1 mr-15">
       <MapPin className="w-5 h-5 text-[#5c5c5c]"/>
       <p className="text-[18px] font-semibold text-[#5c5c5c] border-b border-[#5c5c5c]">서울시</p>
       <ChevronDown className="w-5 h-5" />
      </div>

      <div className="flex flex-row items-center gap-1 mr-10">
       <p className="text-[18px] font-bold text-[#1082ff] mr-2">1</p>
       <span className="text-[18px] font-semibold text-gray-700 mr-14">취업</span>
       <ChevronDown className="w-5 h-5" />
      </div>

      {/* 검색 입력 필드 with 내장 카테고리 드롭다운 */}
      <div className="relative mr-3">
       <div className="flex items-center border border-[#d2d2d2] rounded-[6px] bg-white w-[450px] h-10">
        {/* 카테고리 드롭다운 (input 내부 왼쪽) */}
        <div className="relative">
         <button 
           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
           className="flex items-center gap-1 px-3 py-2 hover:bg-gray-50 rounded-l-[6px] border-r border-gray-200"
         >
           <span className="text-[14px] font-semibold text-gray-700">{selectedCategory}</span>
           <ChevronDown className={`w-4 h-4 transition-transform text-gray-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
         </button>
         
         {isDropdownOpen && (
           <div className="absolute top-full left-0 mt-1 w-28 bg-white border border-[#d2d2d2] rounded-[6px] shadow-lg z-10">
             {categories.map((category) => (
               <button
                 key={category}
                 onClick={() => {
                   setSelectedCategory(category);
                   setIsDropdownOpen(false);
                 }}
                 className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-[6px] last:rounded-b-[6px] ${
                   selectedCategory === category ? 'bg-blue-50 text-[#1082ff] font-semibold' : ''
                 }`}
               >
                 {category}
               </button>
             ))}
           </div>
         )}
        </div>

        {/* 검색 입력 */}
        <input 
          type="text" 
          placeholder={`청년정책을 검색해보세요.`}
          className="flex-1 px-3 py-2 bg-transparent outline-none text-[14px] w-[419px]"
        />
        
        {/* 검색 아이콘 */}
        <Search className="w-5 h-5 text-gray-400 mr-3" />
       </div>
      </div>
      <Bookmark className="w-8 h-8 text-black mr-2"/>
      <UserRound className="w-8 h-8 text-black" onClick={() => router.push('/signup')}/>
     </div>
    </div>
    {/* 화면 전체 너비의 구분선 */}
    <div className="w-full border-b-[0.5px] border-[#d2d2d2]"></div>
   </div>
  )
}