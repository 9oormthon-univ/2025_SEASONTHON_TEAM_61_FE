'use client'

import { Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

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
  className = "",
  cardWidth = "w-[240px]",
  cardHeight = "h-[242px]",
  gap = "gap-5"
}: CardRowProps) {
  // 기본 카드 데이터 (4개)
  const defaultCards: CardData[] = [
    { id: 1, title: "서울시", content:"서울 동아리 ON",  },
    { id: 2, title: "서울시",content:"서울 동아리 ON",  },
    { id: 3, title: "서울시",content:"서울 동아리 ON",  },
    { id: 4, title: "서울시",content:"서울 동아리 ON", },
  ];

  const cardData = cards || defaultCards;
  
  // 4개로 제한
  const displayCards = cardData.slice(0, 4);

  return (
    <div className={`flex justify-center w-full ${className}`}>
      {/* 4개 카드를 한 줄에 배치 */}
      <div className={`grid grid-cols-4 ${gap}`}>
        {displayCards.map((card) => (
          <Card 
            key={card.id} 
            className={`${cardWidth} ${cardHeight} bg-white rounded-[10px] shadow-lg hover:shadow-xl transition-shadow cursor-pointer p-0 gap-0`}
          >
             {card.img ?(
                <div className="relative w-full h-[150px] flex-shrink-0">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                  {/* 이미지 하단 좌측 버튼 */}
                  <button className="absolute bottom-2 left-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors shadow-md">
                    버튼
                  </button>
                </div>
              ):<div className="relative w-full h-[150px] bg-gray-200 flex-shrink-0">
                {/* 이미지가 없을 때도 버튼 표시 */}
                <button className="h-6 flex flex-row items-center absolute bottom-2 left-2 bg-[#d9d9d9] text-[#5c5c5c] px-1 py-1 rounded-[3px] text-xs font-medium">
                <Flame className="text-[#5c5c5c] w-4" fill="#5c5c5c" /> 실시간으로 HOT한 정책
                </button>
              </div>}
            <CardHeader className="px-4 mt-4">
              <CardTitle className="text-[20px] font-semibold text-black truncate">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-0 flex">
             {card.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
