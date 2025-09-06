'use client';

import { ChevronDown, MapPin, Search, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useModal } from '@/contexts/ModalContext';
import { useLoginState } from '@/stores/login/useLoginState';
import SearchModal from '../common/SearchModal';
// import { getPopular } from './api/popular';

export default function Header() {
  const router = useRouter();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { selectedAddress, openAddressModal } = useModal();
  
  // 토글 외부 클릭 감지를 위한 ref
  const toggleRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn } = useLoginState();

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

  // 3초 간격으로 검색어 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentSearchIndex((prevIndex) => (prevIndex + 1) % keywords.length);
      }, 200); // 애니메이션 중간에 인덱스 변경

      setTimeout(() => {
        setIsAnimating(false);
      }, 400); // 애니메이션 완료 후 상태 리셋
    }, 3000);

    return () => clearInterval(interval);
  }, [keywords.length]);

  // 외부 클릭 시 토글 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 유저 토글 외부 클릭 감지
      if (toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
        setIsToggleOpen(false);
      }
      
      // 검색 드롭다운 외부 클릭 감지
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setIsSearchDropdownOpen(false);
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-100 backdrop:blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="flex flex-row items-center w-full gap-6 justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex flex-row items-center gap-4">
          <Image
            src="/img/logo.png"
            alt="logo"
            className="w-54 h-10 cursor-pointer hover:scale-103 transition-transform duration-200"
            onClick={() => router.push('/')}
            width={200}
            height={42}
            priority
            quality={100}
          />
          <p className="text-sm text-gray-500">청년 정책, 지도에서 콕!</p>
        </div>

        <div className="flex flex-row items-center gap-6">
          {/* 지역 선택 */}
          <div
            className="flex flex-row items-center gap-2 px-3 h-10 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={openAddressModal}
          >
            <MapPin className="size-4 text-primary" strokeWidth={3} />
            <span className="text-sm font-semibold text-gray-700 border-b-2 border-gray-400">
              {selectedAddress}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

          {/* 실시간 인기 검색어 */}
          <div 
            ref={searchDropdownRef}
            className="w-100 flex flex-row items-center gap-2 px-4 h-10 transition-all duration-300 cursor-pointer relative"
          >
            <span className="text-lg font-bold text-primary">{currentSearchIndex + 1}</span>
            <div className="w-80 h-10 relative overflow-hidden">
              <span
                className={`absolute inset-0 flex items-center text-base font-semibold text-gray-700 transition-all duration-500 ease-in-out ${
                  isAnimating
                    ? 'transform translate-y-full opacity-0'
                    : 'transform translate-y-0 opacity-100'
                }`}
                style={{
                  transform: isAnimating ? 'translateY(100%)' : 'translateY(0%)',
                  opacity: isAnimating ? 0 : 1,
                }}
              >
                {keywords[currentSearchIndex]}
              </span>
            </div>
            <ChevronDown
              onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)}
              className={`w-4 h-4 transition-transform text-gray-500 ${isSearchDropdownOpen ? 'rotate-180' : ''}`}
            />
          </div>

          {/* 실시간 인기 검색어 드롭다운 */}
          {isSearchDropdownOpen && (
            <div className="absolute top-12 right-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-sm shadow-lg z-20 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">실시간 인기 검색어</h3>
                <p className="text-xs text-gray-500">최근 1시간 단위로 갱신하고 있어요</p>
              </div>
              <div className="max-h-120 overflow-y-auto pb-2">
                {keywords.map((keyword, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSearchIndex(index);
                      setIsSearchDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 ${
                      index === currentSearchIndex ? 'bg-blue-50' : ''
                    }`}
                  >
                    <span className="text-primary font-semibold text-xs mr-3">{index + 1}</span>
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 검색 */}
          <Search
            className="w-5 h-5 text-primary hover:font-bold transition-colors cursor-pointer"
            onClick={() => setIsSearchModalOpen(!isSearchModalOpen)}
          />
          {/* 검색 모달 */}
          {isSearchModalOpen && (
            <SearchModal
              isOpen={isSearchModalOpen}
              onClose={() => setIsSearchModalOpen(false)}
              keywords={keywords}
            />
          )}

          {/* 유저 */}
          <div className="flex flex-row items-center gap-3">
            <button
              className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
              // onClick={() => router.push('/login')}
            >
              <div className="relative" ref={toggleRef}>
                <UserRound
                  className="w-5 h-5 text-gray-600"
                  onClick={() => {
                    if (isLoggedIn) {
                      setIsToggleOpen(!isToggleOpen);
                    } else {
                      router.push('/login');
                    }
                  }}
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
