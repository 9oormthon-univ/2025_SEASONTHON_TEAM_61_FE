'use client';

import { useState } from 'react';
import { Heart, Filter, Search, Calendar } from 'lucide-react';
import PolicyCard from '@/components/common/PolicyCard';
import { PolicyCard as PolicyCardType } from '@/types/policy';
import { Button } from '@/components/ui/button';

// 더미 데이터
const scrapedPolicies: PolicyCardType[] = [
  {
    id: 1,
    title: '청년국가자격증 응시료 지원',
    category: '자격증',
    target: '만 19~34세',
    deadline: '2024.12.31',
    description: '국가자격증 응시료를 지원하여 청년들의 취업 역량 강화를 돕습니다.',
    district: '서울시',
    isHot: true,
    isRecruiting: true,
  },
  {
    id: 2,
    title: '으뜸관악 청년통장',
    category: '자산형성',
    target: '만 19~39세',
    deadline: '2024.11.30',
    description: '청년들의 자산형성을 위한 매칭형 적금 통장 지원 사업입니다.',
    district: '관악구',
    isRecruiting: true,
  },
  {
    id: 3,
    title: '청년이사차량 지원',
    category: '주거',
    target: '만 19~39세',
    deadline: '2024.12.15',
    description: '청년 1인 가구의 이사비용 부담을 덜어주는 차량 지원 서비스입니다.',
    district: '마포구',
    isHot: true,
  },
  {
    id: 4,
    title: '신혼부부 및 청년 전월세 대출이자 지원사업',
    category: '주거',
    target: '만 19~39세',
    deadline: '2024.12.31',
    description: '신혼부부와 청년들의 주거비 부담 완화를 위한 대출이자 지원',
    district: '강남구',
    isRecruiting: true,
  },
  {
    id: 5,
    title: '공직체험 인턴십',
    category: '취업',
    target: '대학생',
    deadline: '2024.11.20',
    description: '공공기관에서 실무 경험을 쌓을 수 있는 인턴십 프로그램',
    district: '서울시',
    isHot: true,
    isRecruiting: true,
  },
  {
    id: 6,
    title: '서울청년문화패스',
    category: '문화',
    target: '만 19~34세',
    deadline: '2024.12.31',
    description: '청년들의 문화생활 지원을 위한 문화패스 제공',
    district: '서울시',
  },
];

export default function Scrap() {
  const [filteredPolicies, setFilteredPolicies] = useState(scrapedPolicies);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['전체', '자격증', '자산형성', '주거', '취업', '문화'];

  // 카테고리 필터링
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    let filtered = scrapedPolicies;

    if (category !== '전체') {
      filtered = filtered.filter((policy) => policy.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (policy) =>
          policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          policy.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPolicies(filtered);
  };

  // 검색 필터링
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    let filtered = scrapedPolicies;

    if (selectedCategory !== '전체') {
      filtered = filtered.filter((policy) => policy.category === selectedCategory);
    }

    if (term) {
      filtered = filtered.filter(
        (policy) =>
          policy.title.toLowerCase().includes(term.toLowerCase()) ||
          policy.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredPolicies(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">스크랩한 정책</h1>
            <p className="text-gray-600 mt-1">관심있는 정책들을 모아보세요</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>총 {filteredPolicies.length}개의 정책</span>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* 카테고리 필터 */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryFilter(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* 검색 */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="정책명 또는 내용 검색..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* 정책 카드 리스트 */}
      {filteredPolicies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy) => (
            <div key={policy.id} className="relative">
              <PolicyCard policy={policy} />
            </div>
          ))}
        </div>
      ) : (
        /* 검색 결과가 없을 때 */
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-500 mb-4">다른 검색어나 필터를 시도해보세요</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('전체');
              setFilteredPolicies(scrapedPolicies);
            }}
          >
            전체 보기
          </Button>
        </div>
      )}

      {/* 하단 통계 */}
      {filteredPolicies.length > 0 && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{scrapedPolicies.length}</div>
              <div className="text-sm text-gray-600">총 스크랩</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {scrapedPolicies.filter((p) => p.isRecruiting).length}
              </div>
              <div className="text-sm text-gray-600">모집중</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
