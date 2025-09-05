'use client';
import React from 'react';
import Image from 'next/image';

type SeoulMapProps = {
  onDistrictClick?: (districtId: string) => void;
};

export default function SeoulMap({ onDistrictClick }: SeoulMapProps) {
  return (
    <div className="flex flex-col justify-center items-center p-6 mt-20">
      <h1 className="text-3xl font-bold mb-4">관심있는 지역을 클릭해보세요</h1>
      <Image
        src="/map-seoul.svg"
        alt="서울 지도"
        // className="w-auto h-auto"
        width={900}
        height={900}
      />
    </div>
  );
}
