'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationShopProps {
  currentPage: number; // 0-indexed from Spring Boot
  totalPages: number;
}

export const PaginationShop = ({ currentPage, totalPages }: PaginationShopProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper function to create the URL for each page link
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  // --- Logic to generate page numbers with ellipsis ---
  const getPageNumbers = () => {
    const pages = [];
    // Always show the first page
    pages.push(0); 

    // Show pages around the current page
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages - 2, currentPage + 1);

    if (currentPage <= 2) {
      endPage = Math.min(totalPages - 2, 3);
    }
    if (currentPage >= totalPages - 3) {
      startPage = Math.max(1, totalPages - 4);
    }

    if (startPage > 1) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 2) {
      pages.push('...');
    }
    
    // Always show the last page
    pages.push(totalPages - 1);
    
    // Remove duplicates that might occur with few pages
    return [...new Set(pages)];
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination >
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage === 0}
            className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Page Number Links */}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {typeof page === 'number' ? (
              <PaginationLink
                href={createPageURL(page)}
                isActive={currentPage === page}
              >
                {page + 1} {/* Display 1-based page number to the user */}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages - 1}
            className={currentPage >= totalPages - 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationShop;