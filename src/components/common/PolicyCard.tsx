'use client';

import { Flame, ChevronRight, Star, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { PolicyCard as PolicyCardType } from '@/types/policy';

interface PolicyCardProps {
  policy: PolicyCardType;
  className?: string;
}

export default function PolicyCard({ policy, className = '' }: PolicyCardProps) {
  return (
    <Card
      className={`group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border border-gray-100 ${className}`}
    >
      {/* 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* 이미지 영역 */}
      <div className="relative w-full h-32 overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-40">
        {policy.image ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={policy.image}
              alt={policy.title}
              width={80}
              height={80}
              className="object-contain group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
          </div>
        )}

        {/* HOT 배지 */}
        {policy.isHot && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
              <Flame className="w-3 h-3" />
              HOT
            </div>
          </div>
        )}

        {/* 즐겨찾기 버튼 */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm">
          <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400 transition-colors" />
        </button>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="px-5 py-4">
        <CardHeader className="p-0 mb-3">
          <CardTitle
            className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-2"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {policy.title}
          </CardTitle>
        </CardHeader>

        {/* 카테고리 및 대상 정보 */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium`}>{policy.category}</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {policy.target}
          </span>
        </div>

        {/* 설명 */}
        <CardContent className="p-0 mb-4">
          <p
            className="text-sm text-gray-600 leading-relaxed"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {policy.description}
          </p>
        </CardContent>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{policy.deadline}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{policy.district}</span>
            </div>
          </div>

          {policy.isRecruiting && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">모집중</span>
            </div>
          )}
        </div>

        {/* 하단 액션 버튼 */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <button className="text-xs text-gray-500 hover:text-primary transition-colors">
              신청 가이드
            </button>
            <button className="text-xs text-gray-500 hover:text-primary transition-colors">
              스크랩
            </button>
          </div>

          <button className="flex items-center gap-1 text-primary hover:text-primary/75 transition-colors group/btn">
            <span className="text-sm font-medium">자세히 보기</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 호버 시 나타나는 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-sky-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-sky-500/5 group-hover:to-indigo-500/5 transition-all duration-300 rounded-2xl"></div>
    </Card>
  );
}
