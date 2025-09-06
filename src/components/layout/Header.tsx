'use client';

import { Bookmark, ChevronDown, MapPin, Search, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { useModal } from '@/contexts/ModalContext';

export default function Header() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('통합검색');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('청년국가자격증 응시료 지원');
  const { selectedAddress, openAddressModal } = useModal();
  const categories = ['통합검색', '취업', '창업'];

  const keywords = [
    '청년국가자격증 응시료 지원',
    '으뜸관악 청년통장',
    '10월 일어나랑 증명사진 찍어드립니다',
    '청년이사차량 지원',
    '이사비 지원사업',
    '신혼부부 및 청년 전월세 대출이자 지원사업',
    '국가 자격증 및 어학시험 응시료 지원사업',
    '공직체험 인턴십',
    '해외 인턴십 채용',
    '서울청년문화패스',
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 backdrop:blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="flex flex-row items-center w-full gap-6 justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex flex-row items-center gap-4">
          <Image
            src="/img/logo.png"
            alt="logo"
            className="w-32 h-10 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => router.push('/')}
            width={136}
            height={42}
            priority
            quality={100}
          />
          <p className="text-sm text-gray-500">청년 정책, 지도에서 콕!</p>
        </div>

        <div className="flex flex-row items-center gap-6">
          {/* 지역 선택 */}
          <div
            className="flex flex-row items-center gap-2 px-4 h-10 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={openAddressModal}
          >
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">{selectedAddress}</span>
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
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsSearchDropdownOpen(false), 200)}
                  className="w-full px-3 py-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />

                {/* 실시간 인기 검색어 드롭다운 */}
                {isSearchDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[400px] bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">
                        실시간 인기 검색어
                      </h3>
                      <p className="text-xs text-gray-500">최근 1시간 단위로 갱신하고 있어요</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {keywords.map((keyword, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchValue(keyword);
                            setIsSearchDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                        >
                          <span className="text-gray-400 text-xs mr-3">{index + 1}</span>
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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
              // onClick={() => router.push('/login')}
            >
              <div className='relative'>
              <UserRound
                className="w-5 h-5 text-gray-600"
                onClick={() => setIsToggleOpen(!isToggleOpen)}
              />
              {isToggleOpen && (
                <>
                  <div className=" flex flex-col absolute top-8 right-0 mt-1 w-30 h-fit bg-white border border-[#d2d2d2] rounded-[8px] shadow-lg z-10">
                    <span
                      className="rounded-t-[8px] text-[14px] font-semibold text-[#5c5c5c] cursor-pointer tracking-[0%] hover:bg-gray-100 px-2 py-2 rounded transition-colors duration-200"
                      onClick={() => {
                        router.push('/mypage');
                        setIsToggleOpen(false);
                      }}
                    >
                      마이페이지
                    </span>
                  
                    <span className="rounded-b-[8px] text-[14px] font-semibold text-[#5c5c5c] cursor-pointer tracking-[0%] hover:bg-gray-100 px-2 py-2 rounded transition-colors duration-200">
                      로그아웃
                    </span>
                  </div>
                </>
              )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
