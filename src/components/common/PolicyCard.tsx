'use client';

import { Flame, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PolicyCard as PolicyCardType } from '@/types/policy';

interface PolicyCardProps {
  policy: PolicyCardType;
  className?: string;
}

export default function PolicyCard({ policy, className = '' }: PolicyCardProps) {
  console.log(policy.metadata.applicationUrl);
  return (
    <Card
      className={`group relative overflow-hidden bg-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-primary ${className}`}
    >
      {/* 콘텐츠 영역 */}
      <div className="px-5 py-0">
        <CardHeader className="p-0 mb-2">
          <div className="flex items-center justify-between">
            <CardTitle
              className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight"
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
              <div className="flex items-center gap-1 bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                <Flame className="w-3 h-3" />
                HOT
              </div>
            )}
          </div>
        </CardHeader>

        {/* 카테고리 및 대상 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`px-2 py-1 bg-primary/10 text-gray-700 rounded-full text-xs font-medium`}
            >
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
            <div className="flex items-center gap-1 mb-3 pr-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">모집중</span>
            </div>
          )}
        </div>

        {/* 설명 */}
        <CardContent className="p-0 mb-1">
          <p
            className="text-sm text-gray-600 leading-relaxed"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            신청내용 : {policy.description}
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
        </CardContent>

        {/* 하단 액션 버튼 */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <button className="text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer">
              신청 가이드
            </button>
            <button className="text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer">
              스크랩
            </button>
          </div>
          <button
            onClick={() => {
              console.log('Button clicked!');
              window.open(policy.metadata.applicationUrl, '_blank');
            }}
            className="flex items-center gap-1 text-primary hover:text-primary/75 transition-colors group/btn cursor-pointer"
          >
            <span className="text-sm font-medium">자세히 보기</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 호버 시 나타나는 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-sky-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-sky-500/5 group-hover:to-indigo-500/5 transition-all duration-300 rounded-sm pointer-events-none"></div>
    </Card>
  );
}
