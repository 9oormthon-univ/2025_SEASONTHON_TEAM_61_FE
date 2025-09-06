'use client';

import { X, Search, MapPin, Check } from 'lucide-react';
import { useState } from 'react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (address: string) => void;
}

export default function AddressModal({ isOpen, onClose, onApply }: AddressModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddress] = useState('서울시 강남구');

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(selectedAddress);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[480px] max-h-[600px] shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-xl font-bold text-gray-900">거주지 주소를 설정해주세요</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-sm transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 검색 입력 */}
        <div className="p-6">
          <div className="relative">
            <input
              type="text"
              placeholder="지번, 도로명, 건물명으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-secondary border-none rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-primary/70"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
          </div>

          {/* 선택된 주소 */}
          <div className="mt-4 p-4 bg-gray-50 rounded-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">우리 집</div>
                  <div className="text-sm text-gray-600">{selectedAddress}</div>
                </div>
              </div>
              <Check className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* 검색 결과 (예시) */}
          {searchQuery && (
            <div className="mt-4 space-y-2">
              <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="font-medium text-gray-900">{searchQuery} (강남구)</div>
                <div className="text-sm text-gray-500">서울특별시 강남구</div>
              </div>
              <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="font-medium text-gray-900">{searchQuery} (서초구)</div>
                <div className="text-sm text-gray-500">서울특별시 서초구</div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="p-6">
          <button
            onClick={handleApply}
            className="w-full py-3 bg-primary text-white font-semibold rounded-sm hover:bg-primary/90 transition-colors"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}
