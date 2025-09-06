'use client'

import { Map, MessageCircleMore, CalendarDays, Bookmark } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
      {/* 채팅 버튼 */}
      <button 
        className="flex flex-col w-20 h-20 bg-[#1082ff] hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group font-medium text-[14px]"
        onClick={() => console.log('정책지도 클릭')}
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
        onClick={() => console.log('챗봇 클릭')}
     
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
        onClick={() => console.log('캘린더 클릭')}
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
