"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  route: string;
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export default function Pagination({
  route,
  currentPage,
  totalPages,
  totalCount,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`/${route}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="text-sm text-gray-600">
        Showing {(currentPage - 1) * 12 + 1} to{" "}
        {Math.min(currentPage * 12, totalCount)} of {totalCount} drivers
      </div>

      <div className="flex gap-2">
        {/* Previous Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>

        {/* First Page */}
        {currentPage > 3 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              1
            </button>
            {currentPage > 4 && <span className="px-2 py-2">...</span>}
          </>
        )}

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-2 border rounded ${
              currentPage === page
                ? "bg-blue-500 text-white border-blue-500"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last Page */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <span className="px-2 py-2">...</span>
            )}
            <button
              onClick={() => goToPage(totalPages)}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
