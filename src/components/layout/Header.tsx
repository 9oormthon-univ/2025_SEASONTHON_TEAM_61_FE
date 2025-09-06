'use client';

import { Bookmark, ChevronDown, MapPin, Search, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('통합검색');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);  
  const categories = ["통합검색", "취업", "창업"];


  return (
    <div className="w-full bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 backdrop:blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="flex flex-row items-center w-full gap-6 justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex flex-row items-center gap-4">
          <Image
            src="/img/logo.png"
            alt="logo"
            className="w-30 h-8 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => router.push('/')}
            width={48}
            height={40}
          />
          <p className="text-sm text-gray-500">청년 정책, 지도에서 콕!</p>
        </div>

        <div className="flex flex-row items-center gap-6">
          {/* 지역 선택 */}
          <div className="flex flex-row items-center gap-2 px-4 h-10 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">서울시</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

          {/* 카테고리 선택 */}
          <div className="flex flex-row items-center gap-2 px-4 h-10 bg-primary/10 rounded-xl hover:bg-primary/30 transition-colors cursor-pointer">
            <span className="text-sm font-bold text-primary">1</span>
            <span className="text-sm font-semibold text-gray-700">취업</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

          {/* 검색 입력 필드 */}
          <div className="relative">
            <div className="flex items-center bg-gray-50 rounded-xl w-[400px] pl-0.5 pr-4 h-10 border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
              {/* 카테고리 드롭다운 */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-700">{selectedCategory}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform text-gray-500 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-gray-700'
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
                placeholder="청년정책을 검색해보세요"
                className="flex-1 px-3 py-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />

              {/* 검색 아이콘 */}
              <Search className="w-5 h-5 text-gray-400 hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex flex-row items-center gap-3">
            <button className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => router.push('/login')}
            >
              <UserRound className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <Bookmark className="w-8 h-8 text-black mr-2"/>
      <div className="relative">
      <UserRound className="w-8 h-8 text-black" onClick={() => setIsToggleOpen(!isToggleOpen)}/>
        {isToggleOpen&&(
          <>
          <div className=" flex flex-col absolute top-full right-3 mt-1 w-35 h-fit bg-white border border-[#d2d2d2] rounded-[8px] shadow-lg z-10">
            <span className="text-[14px] font-semibold text-[#5c5c5c] cursor-pointer tracking-[0%] hover:bg-gray-100 px-2 py-2 rounded transition-colors duration-200" onClick={() => {router.push('/mypage'); setIsToggleOpen(false)}}>마이페이지</span> 
            <span className="text-[14px] font-semibold text-[#5c5c5c] cursor-pointer tracking-[0%] hover:bg-gray-100 px-2 py-2 rounded transition-colors duration-200">고객센터</span>
            <span className="text-[14px] font-semibold text-[#5c5c5c] cursor-pointer tracking-[0%] hover:bg-gray-100 px-2 py-2 rounded transition-colors duration-200">로그아웃</span>
          </div>
          </>
        )}
        </div>
     </div>
    </div>
  );
}
