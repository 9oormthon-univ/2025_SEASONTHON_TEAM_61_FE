'use client';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface CardData {
  id: number;
  title: string;
  img?: string;
}

interface CardGridProps {
  cards?: CardData[];
  className?: string;
  selectedCards?: string[];
  onSelectionChange?: (selectedTitles: string[]) => void;
  onCardClick?: (title: string) => void; // 카드 클릭 핸들러 추가
}


// 기본 빈 배열을 상수로 정의하여 참조 안정성 확보
const DEFAULT_SELECTED_CARDS: string[] = [];

export default function CardGrid({
  cards,
  className = '',
  selectedCards = DEFAULT_SELECTED_CARDS,
  onSelectionChange,
  onCardClick,
}: CardGridProps) {
  const [internalSelectedCards, setInternalSelectedCards] = useState<string[]>(selectedCards);
  const router = useRouter();


  // 기본 카드 데이터 (8개)
  const defaultCards: CardData[] = [
    { id: 1, title: '취업', img: '/img/card/card1.png' },
    { id: 2, title: '창업', img: '/img/card/card2.png' },
    { id: 3, title: '주거', img: '/img/card/card4.png' },
    { id: 4, title: '교육', img: '/img/card/card6.png' },
    { id: 5, title: '복지', img: '/img/card/card7.png' },
    { id: 6, title: '신체건강', img: '/img/card/card8.png' },
    { id: 7, title: '생활지원', img: '/img/card/card9.png' },
    { id: 8, title: '문화/예술', img: '/img/card/card10.png' },
  ];

  const cardData = cards || defaultCards;

  // 카드를 4개씩 2줄로 나누기
  const firstRow = cardData.slice(0, 4);
  const secondRow = cardData.slice(4, 8);

  // 카드 클릭 핸들러 함수
  const handleCardClick = (title: string) => {
    // onCardClick이 있으면 (메인페이지에서) 해당 핸들러 실행
    if (onCardClick) {
      onCardClick(title);
      return;
    }

    // onCardClick이 없으면 기존 선택/해제 로직 실행
    const newSelection = internalSelectedCards.includes(title)
      ? internalSelectedCards.filter((card) => card !== title)
      : [...internalSelectedCards, title];

    setInternalSelectedCards(newSelection);
    onSelectionChange?.(newSelection);
  };

  // props로 받은 selectedCards가 변경되면 내부 상태도 업데이트
  // JSON.stringify를 사용하여 배열 내용 비교로 불필요한 업데이트 방지
  useEffect(() => {
    // 배열이 실제로 다른 경우에만 업데이트
    if (JSON.stringify(selectedCards) !== JSON.stringify(internalSelectedCards)) {
      setInternalSelectedCards(selectedCards);
    }
  }, [selectedCards, internalSelectedCards]);


  return (
    <div className={`flex flex-col gap-4 w-full items-center ${className}`}>
      {/* 첫 번째 줄 - 4개 카드 */}
      <div className="grid grid-cols-4 gap-4">
        {firstRow.map((card) => {
          const isSelected = selectedCards.includes(card.title);
          return (
            <Card
              key={card.id}
              className={`w-[150px] h-[160px] rounded-[10px] shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1082FF] text-white border-2 border-[#1082FF]'
                  : 'bg-white text-black border-2 border-transparent'
              }`}
              onClick={() => handleCardClick(card.title)}
            >
              <CardHeader className="pb-2">
                <CardTitle
                  className={`text-[20px] font-semibold truncate ${
                    isSelected ? 'text-white' : 'text-black'
                  }`}
                >
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex justify-end">
                {card.img && (
                  <div className="relative w-15 h-15">
                    <Image src={card.img} alt={card.title} fill className="object-contain" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 두 번째 줄 - 4개 카드 */}
      <div className="grid grid-cols-4 gap-4">
        {secondRow.map((card) => {
          const isSelected = selectedCards.includes(card.title);
          return (
            <Card
              key={card.id}
              className={`w-[150px] h-[160px] rounded-[10px] shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1082FF] text-white border-2 border-[#1082FF]'
                  : 'bg-white text-black border-2 border-transparent'
              }`}
              onClick={() => handleCardClick(card.title)}
            >
              <CardHeader className="pb-2">
                <CardTitle
                  className={`text-[20px] font-semibold truncate ${
                    isSelected ? 'text-white' : 'text-black'
                  }`}
                >
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex justify-end">
                {card.img && (
                  <div className="relative w-15 h-15">
                    <Image src={card.img} alt={card.title} fill className="object-contain" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
