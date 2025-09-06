'use client'

import { Map, MessageCircleMore, CalendarDays, Bookmark } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation';

export default function FloatingButtons() {
  const router = useRouter();
  const pathname = usePathname();

  // 정책지도 클릭 핸들러
  const handleMapClick = () => {
    if (pathname === '/') {
      // 현재 메인 페이지인 경우 지도로 스크롤
      const mapSection = document.querySelector('[data-map-section]');
      if (mapSection) {
        const elementTop = mapSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementTop - 100; // 100px 위쪽 여백 추가
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // 다른 페이지인 경우 메인 페이지로 이동 후 지도로 스크롤
      router.push('/?scrollToMap=true');
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
      {/* 정책지도 버튼 */}
      <button 
        className="flex flex-col w-20 h-20 bg-[#1082ff] hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group font-medium text-[14px]"
        onClick={handleMapClick}
      >
       <Map className="w-8 h-8" />
       정책지도
        <span className="absolute right-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
         정책지도
        </span>
      </button>

      {/* 전화 버튼 */}
      <button 
        className="flex flex-col w-20 h-20 bg-[#1082ff] hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group font-medium text-[14px]"
        onClick={() => window.open('https://3000-ie8kwy33uts4uea5lzj2o-6532622b.e2b.dev/', '_blank')}
     
      >
       <MessageCircleMore className="w-8 h-8" />
       AI챗봇
        <span className="absolute right-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI챗봇
        </span>
      </button>

      {/* 좋아요 버튼 */}
      <button 
        className="flex flex-col w-20 h-20 bg-white hover:bg-gray-200 text-[#1082ff] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group font-medium text-[14px]"
        onClick={() => router.push('/mypage/scrap')}
      >
       <Bookmark className="w-8 h-8 text-[#1082ff]" />
       스크랩
        <span className="absolute right-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          스크랩
        </span>
      </button>
    </div>
  );
}
