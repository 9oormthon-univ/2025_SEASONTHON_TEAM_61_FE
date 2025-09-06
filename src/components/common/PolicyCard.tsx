'use client';

import { Flame, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PolicyCard as PolicyCardType } from '@/types/policy';

interface PolicyCardProps {
  policy: PolicyCardType;
  className?: string;
}

export default function PolicyCard({ policy, className = '' }: PolicyCardProps) {
  return (
    <Card
      className={`group h-[260px] relative overflow-hidden bg-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border border-gray-200 hover:border-primary ${className}`}
    >
      {/* 콘텐츠 영역 */}
      <div className="px-5 py-4 h-full flex flex-col">
        {/* 헤더 영역 - 고정 높이 */}
        <div className="h-16 mb-3">
          <div className="flex items-start justify-between h-full">
            <CardTitle
              className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight flex-1 mr-2"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {policy.title}
            </CardTitle>
            {/* HOT 배지 */}
            {policy.isHot && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex-shrink-0">
                <Flame className="w-3 h-3" />
                HOT
              </div>
            )}
          </div>
        </div>

        {/* 카테고리 및 상태 정보 영역 - 고정 높이 */}
        <div className="h-12 mb-3">
          <div className="flex items-start justify-between h-full">
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-primary/10 text-gray-700 rounded-full text-xs font-medium">
                {policy.category}
              </span>
              <span className="px-2 py-1 bg-primary/10 text-gray-700 rounded-full text-xs font-medium">
                {policy.target}
              </span>
              <span className="flex items-center gap-1 text-gray-500 text-xs">
                <Calendar className="w-3 h-3" />
                <span>{policy.deadline}</span>
              </span>
            </div>
            {policy.isRecruiting && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">모집중</span>
              </div>
            )}
          </div>
        </div>

        {/* 설명 영역 - 확장 가능한 영역 */}
        <div className="flex-1 mb-4">
          <p
            className="text-sm text-gray-600 leading-relaxed mb-2"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            신청대상 : {policy.description}
          </p>
          <p
            className="text-sm text-gray-600 leading-relaxed"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            신청마감 : {policy.deadline}
          </p>
        </div>

        {/* 하단 액션 버튼 - 고정 위치 */}
        <div className="h-10 flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-sky-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-sky-500/5 group-hover:to-indigo-500/5 transition-all duration-300 rounded-sm"></div>
    </Card>
  );
}
