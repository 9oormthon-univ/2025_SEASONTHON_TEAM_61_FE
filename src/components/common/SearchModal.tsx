'use client';

import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getSearch } from '../layout/api/search';
import { SearchPolicyCard } from '@/types/policy';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  keywords: string[];
}

export default function SearchModal({ isOpen, onClose, keywords }: SearchModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchPolicyCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 최근 검색어 로드
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // 검색 실행
  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) return;

      setIsLoading(true);
      setHasSearched(true);

      try {
        const results = await getSearch(query);
        // API 응답이 배열인지 확인하고 안전하게 설정
        const safeResults = Array.isArray(results) ? results : [];
        setSearchResults(safeResults);

        // 최근 검색어에 추가
        const newRecentSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5);
        setRecentSearches(newRecentSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      } catch {
        // 검색 오류 시 빈 결과로 설정
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [recentSearches]
  );

  // 검색어 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 검색 실행 (엔터키 또는 검색 버튼)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // 인기 검색어 클릭
  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    handleSearch(keyword);
  };

  // 최근 검색어 클릭
  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  // 최근 검색어 삭제
  const handleRemoveRecentSearch = (searchToRemove: string) => {
    const newRecentSearches = recentSearches.filter((s) => s !== searchToRemove);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
  };

  // 검색 결과 클릭
  const handleResultClick = (policy: SearchPolicyCard) => {
    router.push(`/youthyPolicy?id=${policy.policyNo}`);
    onClose();
  };

  // 검색어 초기화
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-5 flex items-start justify-center pt-20 pointer-events-none">
      {/* 검색창 */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl transform transition-all duration-300 ease-out animate-in slide-in-from-top-4 fade-in pointer-events-auto">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Search className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">정책 검색</h2>
            <button
              onClick={onClose}
              className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* 검색 입력창 */}
          <form onSubmit={handleSubmit} className="relative mb-6">
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading || !searchQuery.trim()}
                className="p-1 text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* 로딩 상태 */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-gray-600">검색 중...</span>
            </div>
          )}

          {/* 검색 결과 */}
          {hasSearched && !isLoading && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                {searchResults && searchResults.length > 0 ? (
                  <h3 className="text-lg font-semibold text-gray-900">
                    검색 결과 ({searchResults.length}개)
                  </h3>
                ) : (
                  <h3 className="text-lg font-semibold text-gray-900">검색 결과가 없습니다.</h3>
                )}
              </div>

              {searchResults && searchResults.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {searchResults.map((policy) => (
                    <div
                      key={policy.policyNo}
                      onClick={() => handleResultClick(policy)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                            {policy.policyName}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {policy.policySummary}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {policy.category}
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              {policy.dday}모집
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">검색 결과가 없습니다.</p>
                  <p className="text-sm text-gray-400 mt-1">다른 검색어로 시도해보세요.</p>
                </div>
              )}
            </div>
          )}

          {/* 최근 검색어 */}
          {!hasSearched && recentSearches.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                최근 검색어
              </h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <span className="text-sm text-gray-700 group-hover:text-primary">{search}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveRecentSearch(search);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 인기 검색어 */}
          {!hasSearched && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                인기 검색어
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywords.slice(0, 6).map((keyword, index) => (
                  <button
                    key={index}
                    onClick={() => handleKeywordClick(keyword)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-primary hover:text-white text-sm rounded-full transition-colors"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
