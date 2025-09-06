'use client';

import { Flame, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

interface CardData {
  id: number;
  title: string;
  content?: string;
  img?: string;
}

interface CardRowProps {
  cards?: CardData[];
  className?: string;
  cardWidth?: string;
  cardHeight?: string;
  gap?: string;
}

export default function CardRow({
  cards,
  className = '',
  cardWidth = 'w-[240px]',
  cardHeight = 'h-[300px]',
  gap = 'gap-5',
}: CardRowProps) {
  // 기본 카드 데이터 (4개)
  const defaultCards: CardData[] = [
    {
      id: 1,
      title: '청년 창업 지원',
      content: '창업 아이템 발굴부터 사업화까지 전 과정 지원',
      img: '/img/card/card2.png',
    },
    {
      id: 2,
      title: '청년 주거 지원',
      content: '청년 전용 임대주택 및 전세자금 대출 지원',
      img: '/img/card/card4.png',
    },
    {
      id: 3,
      title: '청년 취업 지원',
      content: '취업 준비부터 직장 적응까지 맞춤형 지원',
      img: '/img/card/card1.png',
    },
    {
      id: 4,
      title: '청년 문화 지원',
      content: '문화 활동 참여 기회 및 문화비 지원',
      img: '/img/card/card1.png',
    },
  ];

  const cardData = cards || defaultCards;

  // 4개로 제한
  const displayCards = cardData.slice(0, 4);

  return (
    <div className={`flex justify-center w-full ${className}`}>
      {/* 4개 카드를 한 줄에 배치 */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${gap} w-full max-w-7xl`}>
        {displayCards.map((card, index) => (
          <Card
            key={card.id}
            className={`group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border border-gray-100 ${cardWidth} ${cardHeight}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* 그라데이션 배경 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* 이미지 영역 - 고정 높이 */}
            <div className="relative w-full h-32 overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-40">
              {card.img ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <Image
                      src={card.img}
                      alt={card.title}
                      width={80}
                      height={80}
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                      priority={index < 2}
                      onError={(e) => {
                        console.log('Image load error:', card.img);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}

              {/* HOT 배지 */}
              <div className="absolute top-3 left-3">
                <div className="flex items-center gap-1 bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                  <Flame className="w-3 h-3" />
                  HOT
                </div>
              </div>

              {/* 즐겨찾기 버튼 */}
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm">
                <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400 transition-colors" />
              </button>
            </div>

            {/* 콘텐츠 영역 - 고정 높이 */}
            <div className="px-5 flex flex-col justify-between h-32">
              <div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle
                    className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {card.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 flex-1">
                  <p
                    className="text-sm text-gray-600 leading-relaxed"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {card.content}
                  </p>
                </CardContent>
              </div>

              {/* 하단 액션 영역 - 고정 위치 */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">진행중</span>
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
        ))}
      </div>
    </div>
  );
}
