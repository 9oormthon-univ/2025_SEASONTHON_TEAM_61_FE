'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import CardGrid from '../../common/CardGrid';
import { ChevronRight, Search, RefreshCw, ChevronDown, ChevronUp, Check } from 'lucide-react';
import CardRow from '../../common/CardRow';
import SeoulMap from './SeoulMap';
import PolicyCard from '../../common/PolicyCard';
import { DistrictName, PolicyCard as PolicyCardType } from '@/types/policy';
// import { districtPolicies } from '@/data/districtPolicies';
import { getDistrictPolicies } from '@/components/features/main/api/districtPolicies';
import Loading from '@/components/common/Loading';
interface DistrictPolicies {
  [key: string]: PolicyCardType[];
}

export default function Main() {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictName | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const [districtPolicies, setDistrictPolicies] = useState<DistrictPolicies>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 지도 스크롤을 위한 ref
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();


  // 필터 상태 관리
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isDetailRegionDropdownOpen, setIsDetailRegionDropdownOpen] = useState(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
  const [isInstitutionDropdownOpen, setIsInstitutionDropdownOpen] = useState(false);
  const [isRecruitmentDropdownOpen, setIsRecruitmentDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('latest');
  // 선택된 필터 값들
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedDetailRegions, setSelectedDetailRegions] = useState<string[]>([]);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([]);
  const [selectedRecruitmentStatus, setSelectedRecruitmentStatus] = useState<string[]>([]);

  const categories = [
    '전체',
    '취업',
    '창업',
    '주거',
    '교육',
    '복지',
    '문화/예술',
    '참여권리',
    '기타',
  ];

  // 필터 옵션 데이터
  const regionOptions = [
    '서울 전체',
    '도봉구',
    '강북구',
    '성북구',
    '노원구',
    '동대문구',
    '중랑구',
    '성동구',
    '광진구',
    '강동구',
    '송파구',
    '서초구',
    '강남구',
    '동작구',
    '관악구',
    '금천구',
    '강서구',
    '양천구',
  ];

  const detailRegionOptions = [
    '전체',
    '역삼동',
    '개포동',
    '청담동',
    '삼성동',
    '대치동',
    '신사동',
    '압구정동',
  ];

  const targetOptions = [
    '전체',
    '20-39세',
    '30세 이하',
    '40세 이하',
    '모든 성인',
    '청년',
    '신혼부부',
    '취업준비생',
  ];

  const institutionOptions = [
    '전체',
    '강남구청',
    '강남구립열린도서관',
    '서울시청',
    '구청',
    '도서관',
    '문화센터',
  ];

  const recruitmentStatusOptions = ['전체', '모집중', '마감임박', '마감', '상시모집', '예정'];

  useEffect(() => {
    const fetchDistrictPolicies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getDistrictPolicies();
        setDistrictPolicies(data);
      } catch {
        setError('정책 데이터를 불러오는데 실패했습니다.');
        setDistrictPolicies({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistrictPolicies();
  }, []);

  // 지역명 매핑 (영문 -> 한글)
  const districtNameMap: Record<DistrictName, string> = {
    'Gangbuk-gu': '강북구',
    'Seongbuk-gu': '성북구',
    'Nowon-gu': '노원구',
    'Dongdaemun-gu': '동대문구',
    'Jungnang-gu': '중랑구',
    'Seongdong-gu': '성동구',
    'Gwangjin-gu': '광진구',
    'Gangdong-gu': '강동구',
    'Songpa-gu': '송파구',
    'Seocho-gu': '서초구',
    'Gangnam-gu': '강남구',
    'Dongjak-gu': '동작구',
    'Gwanak-gu': '관악구',
    'Geumcheon-gu': '금천구',
    'Gangseo-gu': '강서구',
    'Yangcheon-gu': '양천구',
    'Yeongdeungpo-gu': '영등포구',
    'Yongsan-gu': '용산구',
    'Eunpyeong-gu': '은평구',
    'Guro-gu': '구로구',
    'Jongno-gu': '종로구',
    'Jung-gu': '중구',
    'Mapo-gu': '마포구',
    'Seodaemun-gu': '서대문구',
    'Dobong-gu': '도봉구',
  };

  const handleDistrictClick = (district: DistrictName) => {
    setSelectedDistrict(district);
    setSearchTerm(districtNameMap[district] || district.replace('-gu', '구'));
  };

  // 필터 토글 핸들러
  const toggleDropdown = (type: string) => {
    switch (type) {
      case 'region':
        setIsRegionDropdownOpen(!isRegionDropdownOpen);
        setIsDetailRegionDropdownOpen(false);
        setIsTargetDropdownOpen(false);
        setIsInstitutionDropdownOpen(false);
        setIsRecruitmentDropdownOpen(false);
        break;
      case 'detailRegion':
        setIsDetailRegionDropdownOpen(!isDetailRegionDropdownOpen);
        setIsRegionDropdownOpen(false);
        setIsTargetDropdownOpen(false);
        setIsInstitutionDropdownOpen(false);
        setIsRecruitmentDropdownOpen(false);
        break;
      case 'target':
        setIsTargetDropdownOpen(!isTargetDropdownOpen);
        setIsRegionDropdownOpen(false);
        setIsDetailRegionDropdownOpen(false);
        setIsInstitutionDropdownOpen(false);
        setIsRecruitmentDropdownOpen(false);
        break;
      case 'institution':
        setIsInstitutionDropdownOpen(!isInstitutionDropdownOpen);
        setIsRegionDropdownOpen(false);
        setIsDetailRegionDropdownOpen(false);
        setIsTargetDropdownOpen(false);
        setIsRecruitmentDropdownOpen(false);
        break;
      case 'recruitment':
        setIsRecruitmentDropdownOpen(!isRecruitmentDropdownOpen);
        setIsRegionDropdownOpen(false);
        setIsDetailRegionDropdownOpen(false);
        setIsTargetDropdownOpen(false);
        setIsInstitutionDropdownOpen(false);
        break;
    }
  };

  // 필터 선택 핸들러
  const handleFilterSelect = (type: string, value: string) => {
    switch (type) {
      case 'region':
        setSelectedRegions((prev) =>
          prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
        break;
      case 'detailRegion':
        setSelectedDetailRegions((prev) =>
          prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
        break;
      case 'target':
        setSelectedTargets((prev) =>
          prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
        break;
      case 'institution':
        setSelectedInstitutions((prev) =>
          prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
        break;
      case 'recruitment':
        setSelectedRecruitmentStatus((prev) =>
          prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
        break;
    }
  };

  // 개별 필터 제거 핸들러
  const handleRemoveFilter = (type: string, value: string) => {
    switch (type) {
      case 'category':
        setSelectedCategory('전체');
        break;
      case 'search':
        setSearchTerm('');
        break;
      case 'region':
        setSelectedRegions((prev) => prev.filter((item) => item !== value));
        break;
      case 'detailRegion':
        setSelectedDetailRegions((prev) => prev.filter((item) => item !== value));
        break;
      case 'target':
        setSelectedTargets((prev) => prev.filter((item) => item !== value));
        break;
      case 'institution':
        setSelectedInstitutions((prev) => prev.filter((item) => item !== value));
        break;
      case 'recruitment':
        setSelectedRecruitmentStatus((prev) => prev.filter((item) => item !== value));
        break;
    }
  };

  // 초기화 핸들러
  const handleReset = () => {
    setSelectedDistrict(null);
    setSearchTerm('');
    setSelectedCategory('전체');
    setSelectedRegions([]);
    setSelectedDetailRegions([]);
    setSelectedTargets([]);
    setSelectedInstitutions([]);
    setSelectedRecruitmentStatus([]);
    setIsRegionDropdownOpen(false);
    setIsDetailRegionDropdownOpen(false);
    setIsTargetDropdownOpen(false);
    setIsInstitutionDropdownOpen(false);
    setIsRecruitmentDropdownOpen(false);
  };

  const getFilteredPolicies = (): PolicyCardType[] => {
    if (!selectedDistrict) return [];

    const policies = districtPolicies[selectedDistrict] || [];

    let filtered = policies;

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      filtered = filtered.filter((policy) => policy.category === selectedCategory);
    }

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(
        (policy) =>
          policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          policy.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 지역 필터링
    if (selectedRegions.length > 0) {
      filtered = filtered.filter((policy) =>
        selectedRegions.some((region) => policy.title.includes(region))
      );
    }

    // 세부지역 필터링
    if (selectedDetailRegions.length > 0) {
      filtered = filtered.filter((policy) =>
        selectedDetailRegions.some((detailRegion) => policy.title.includes(detailRegion))
      );
    }

    // 대상 필터링
    if (selectedTargets.length > 0) {
      filtered = filtered.filter((policy) =>
        selectedTargets.some((target) => policy.title.includes(target))
      );
    }

    // 담당기관 필터링
    if (selectedInstitutions.length > 0) {
      filtered = filtered.filter((policy) =>
        selectedInstitutions.some((institution) => policy.title.includes(institution))
      );
    }

    // 모집현황 필터링
    if (selectedRecruitmentStatus.length > 0) {
      filtered = filtered.filter((policy) =>
        selectedRecruitmentStatus.some((status) => policy.title.includes(status))
      );
    }

    return filtered;
  };

  const filteredPolicies = getFilteredPolicies();

  const router = useRouter();

  // URL 파라미터 확인하여 지도로 스크롤
  useEffect(() => {
    const scrollToMap = searchParams.get('scrollToMap');
    if (scrollToMap === 'true') {
      // 페이지 로딩 후 잠시 대기한 다음 스크롤
      setTimeout(() => {
        handleScrollToMap();
      }, 100);
    }
  }, [searchParams]);

  // 카드 클릭 시 PolicyList 페이지로 이동하는 핸들러
  const handleCardClick = (category: string) => {
    router.push(`/policyList?category=${encodeURIComponent(category)}`);
  };

  // 지도 바로가기 클릭 핸들러
  const handleScrollToMap = () => {
    if (mapSectionRef.current) {
      const elementTop = mapSectionRef.current.offsetTop;
      const offsetPosition = elementTop - 100; // 100px 위쪽 여백 추가
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pb-50">
      <div className="flex flex-col min-h-[527px] w-full bg-secondary justify-center items-center p-8">
        <p className="text-[20px] font-semibold text-[#5c5c5c] mb-8">
          유씨에서 나에게 필요했던 청년 정책을 편리하게 찾아보세요
        </p>
        <div className="w-full max-w-6xl">
          <CardGrid onCardClick={handleCardClick} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-[80%] mx-auto mt-[90px]">
        <h1 className="text-[32px] font-bold">맞춤형 청년 정책 모음.zip</h1>
        <p className="text-[20px] font-medium text-[#5c5c5c] mb-8">
          유씨가 추천해주는 맞춤형 정보를 만나보세요
        </p>

        <button 
          onClick={handleScrollToMap}
          className="text-[20px] font-bold text-primary border-b border-primary hover:text-primary/80 transition-colors cursor-pointer"
        >
          지도 바로가기
        </button>
        <div>
          <div className="flex flex-row items-center gap-1 w-full justify-end mb-4 cursor-pointer text-primary hover:text-primary/75 transition-colors">
            <p className="text-[16px] text-right font-semibold">더보기</p>
            <ChevronRight className="w-5 h-5" />
          </div>
        
          <CardRow />
          <div ref={mapSectionRef} data-map-section className="mt-30 flex flex-col items-center justify-center">
          <h1 className="text-[28px] font-bold">관심있는 지역을 클릭해보세요</h1>
          <SeoulMap onDistrictClick={handleDistrictClick}  />
          </div>
        </div>

        {/* 선택된 구의 정책 카드 섹션 */}
        {selectedDistrict && (
          <div className="w-180 mx-auto">
            {/* 로딩 상태 */}
            {isLoading && <Loading />}

            {/* 에러 상태 */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            )}

            {/* 정책 데이터가 있을 때만 필터와 카드 표시 */}
            {!isLoading && !error && (
              <>
                {/* 검색 및 필터 섹션 */}
                <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 mb-8">
                  {/* 카테고리 필터 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-sm text-base font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* 검색 및 필터 옵션 */}
                  <div className="flex flex-col gap-4">
                    {/* 검색바 */}
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="지역명으로 검색"
                          className="w-full px-4 py-2 border border-primary rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary size-5" />
                      </div>

                      <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-sm hover:bg-red-200 transition-colors"
                      >
                        <RefreshCw className="size-4" />
                        초기화
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-between w-full">
                      {/* 5가지 필터 버튼 */}
                      <div className="flex flex-wrap gap-2">
                        {/* 지역 필터 */}
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown('region')}
                            className={`flex items-center gap-1 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                              isRegionDropdownOpen || selectedRegions.length > 0
                                ? 'text-primary border border-primary'
                                : 'text-gray-700 hover:bg-gray-200 border border-[#A1A1A1]'
                            }`}
                          >
                            지역{' '}
                            {isRegionDropdownOpen ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </button>

                          {isRegionDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-sm shadow-lg z-10 max-h-60 overflow-y-auto">
                              {regionOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedRegions.includes(option)}
                                    onChange={() => handleFilterSelect('region', option)}
                                    className="rounded"
                                  />
                                  <span className="text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 세부지역 필터 */}
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown('detailRegion')}
                            className={`flex items-center gap-1 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                              isDetailRegionDropdownOpen || selectedDetailRegions.length > 0
                                ? 'text-primary border border-primary'
                                : 'text-gray-700 hover:bg-gray-200 border border-[#A1A1A1]'
                            }`}
                          >
                            세부지역{' '}
                            {isDetailRegionDropdownOpen ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </button>

                          {isDetailRegionDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-sm shadow-lg z-10 max-h-60 overflow-y-auto">
                              {detailRegionOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedDetailRegions.includes(option)}
                                    onChange={() => handleFilterSelect('detailRegion', option)}
                                    className="rounded"
                                  />
                                  <span className="text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 대상 필터 */}
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown('target')}
                            className={`flex items-center gap-1 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                              isTargetDropdownOpen || selectedTargets.length > 0
                                ? 'text-primary border border-primary'
                                : 'text-gray-700 hover:bg-gray-200 border border-[#A1A1A1]'
                            }`}
                          >
                            대상{' '}
                            {isTargetDropdownOpen ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </button>

                          {isTargetDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-sm shadow-lg z-10 max-h-60 overflow-y-auto">
                              {targetOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedTargets.includes(option)}
                                    onChange={() => handleFilterSelect('target', option)}
                                    className="rounded"
                                  />
                                  <span className="text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 담당기관 필터 */}
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown('institution')}
                            className={`flex items-center gap-1 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                              isInstitutionDropdownOpen || selectedInstitutions.length > 0
                                ? 'text-primary border border-primary'
                                : 'text-gray-700 hover:bg-gray-200 border border-[#A1A1A1]'
                            }`}
                          >
                            담당기관{' '}
                            {isInstitutionDropdownOpen ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </button>

                          {isInstitutionDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-sm shadow-lg z-10 max-h-60 overflow-y-auto">
                              {institutionOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedInstitutions.includes(option)}
                                    onChange={() => handleFilterSelect('institution', option)}
                                    className="rounded"
                                  />
                                  <span className="text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* 모집현황 필터 */}
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown('recruitment')}
                            className={`flex items-center gap-1 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                              isRecruitmentDropdownOpen || selectedRecruitmentStatus.length > 0
                                ? 'text-primary border border-primary'
                                : 'text-gray-700 hover:bg-gray-200 border border-[#A1A1A1]'
                            }`}
                          >
                            모집현황{' '}
                            {isRecruitmentDropdownOpen ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </button>

                          {isRecruitmentDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-sm shadow-lg z-10 max-h-60 overflow-y-auto">
                              {recruitmentStatusOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedRecruitmentStatus.includes(option)}
                                    onChange={() => handleFilterSelect('recruitment', option)}
                                    className="rounded"
                                  />
                                  <span className="text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <span
                          className={`${selectedSort === 'latest' ? 'text-primary font-semibold' : 'text-gray-700'} cursor-pointer flex items-center gap-0.5 transition-all`}
                          onClick={() => setSelectedSort('latest')}
                        >
                          {selectedSort === 'latest' && <Check className="size-4" />}
                          최신순
                        </span>
                        <span
                          className={`${selectedSort === 'deadline' ? 'text-primary font-semibold' : 'text-gray-700'} cursor-pointer flex items-center gap-0.5 transition-all`}
                          onClick={() => setSelectedSort('deadline')}
                        >
                          {selectedSort === 'deadline' && <Check className="size-4" />}
                          마감순
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 활성 필터 표시 */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedCategory !== '전체' && (
                      <span className="px-3 py-1 bg-primary/10 rounded-full text-sm flex items-center gap-1">
                        {selectedCategory}
                        <button
                          onClick={() => handleRemoveFilter('category', selectedCategory)}
                          className="ml-1 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {searchTerm && (
                      <span className="px-3 py-1 bg-primary/10 rounded-full text-sm flex items-center gap-1">
                        {searchTerm}
                        <button
                          onClick={() => handleRemoveFilter('search', searchTerm)}
                          className="ml-1 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedRegions.map((region) => (
                      <span
                        key={region}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm flex items-center gap-1"
                      >
                        {region}
                        <button
                          onClick={() => handleRemoveFilter('region', region)}
                          className="ml-1 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {selectedDetailRegions.map((detailRegion) => (
                      <span
                        key={detailRegion}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm flex items-center gap-1"
                      >
                        {detailRegion}
                        <button
                          onClick={() => handleRemoveFilter('detailRegion', detailRegion)}
                          className="ml-1 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {selectedTargets.map((target) => (
                      <span
                        key={target}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm flex items-center gap-1"
                      >
                        {target}
                        <button
                          onClick={() => handleRemoveFilter('target', target)}
                          className="ml-1 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {selectedInstitutions.map((institution) => (
                      <span
                        key={institution}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm flex items-center gap-1"
                      >
                        {institution}
                        <button
                          onClick={() => handleRemoveFilter('institution', institution)}
                          className="ml-1 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {selectedRecruitmentStatus.map((status) => (
                      <span
                        key={status}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm flex items-center gap-1"
                      >
                        {status}
                        <button
                          onClick={() => handleRemoveFilter('recruitment', status)}
                          className="ml-1 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 정책 카드 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPolicies.map((policy) => (
                    <PolicyCard key={policy.id} policy={policy} />
                  ))}
                </div>

                {filteredPolicies.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">해당 조건에 맞는 정책이 없습니다.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
