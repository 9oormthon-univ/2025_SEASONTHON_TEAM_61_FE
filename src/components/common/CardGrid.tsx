'use client';

// import { BriefcaseBusiness } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

interface CardData {
  id: number;
  title: string;
  img?: string;
}

interface CardGridProps {
  cards?: CardData[];
  className?: string;
}

export default function CardGrid({ cards, className = '' }: CardGridProps) {
  // 기본 카드 데이터 (10개)
  const defaultCards: CardData[] = [
    { id: 1, title: '취업', img: '/img/card/card1.png' },
    { id: 2, title: '창업', img: '/img/card/card2.png' },
    { id: 3, title: '진로', img: '/img/card/card3.png' },
    { id: 4, title: '주거', img: '/img/card/card4.png' },
    { id: 5, title: '금융', img: '/img/card/card5.png' },
    { id: 6, title: '교육', img: '/img/card/card6.png' },
    { id: 7, title: '정신건강', img: '/img/card/card7.png' },
    { id: 8, title: '신체건강', img: '/img/card/card8.png' },
    { id: 9, title: '생활지원', img: '/img/card/card9.png' },
    { id: 10, title: '문화/예술', img: '/img/card/card10.png' },
  ];

  const cardData = cards || defaultCards;

  // 카드를 5개씩 2줄로 나누기
  const firstRow = cardData.slice(0, 5);
  const secondRow = cardData.slice(5, 10);

  return (
    <div className={`flex flex-col gap-5 w-full items-center ${className}`}>
      {/* 첫 번째 줄 - 5개 카드 */}
      <div className="grid grid-cols-5 gap-5">
        {firstRow.map((card) => (
          <Card
            key={card.id}
            className="w-[150px] h-[160px] bg-white rounded-[10px] shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-[20px] font-semibold text-black truncate">
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
        ))}
      </div>

      {/* 두 번째 줄 - 5개 카드 */}
      <div className="grid grid-cols-5 gap-5">
        {secondRow.map((card) => (
          <Card
            key={card.id}
            className="w-[150px] h-[160px] bg-white rounded-[10px] shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-[20px] font-semibold text-black truncate">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 flex justify-end">
              {card.img && (
                <div className="relative w-15 h-15">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-contain w-15 h-15 "
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
