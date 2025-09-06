import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function Pagination({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    className = "" 
}: PaginationProps) {
    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            // 총 페이지가 5개 이하면 모든 페이지 표시
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // 현재 페이지 주변의 페이지들을 표시
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);
            
            // 시작이나 끝 부분에서 페이지 수 조정
            if (currentPage <= 3) {
                endPage = Math.min(totalPages, 5);
            } else if (currentPage >= totalPages - 2) {
                startPage = Math.max(1, totalPages - 4);
            }
            
            // 첫 페이지 추가
            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                    pages.push('...');
                }
            }
            
            // 중간 페이지들 추가
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            // 마지막 페이지 추가
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className={`flex items-center justify-center gap-1 mt-8 ${className}`}>
            {/* 이전 페이지 버튼 */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* 페이지 번호들 */}
            {generatePageNumbers().map((page, index) => (
                <div key={index}>
                    {page === '...' ? (
                        <span className="px-3 py-2 text-sm text-gray-500">...</span>
                    ) : (
                        <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(page as number)}
                            className="h-9 w-9 p-0"
                        >
                            {page}
                        </Button>
                    )}
                </div>
            ))}

            {/* 다음 페이지 버튼 */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-9 w-9 p-0"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
