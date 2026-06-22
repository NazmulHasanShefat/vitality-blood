"use client";
import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  // যদি মোট পেজ ১ বা তার কম হয়, তাহলে প্যাগিনেশন দেখানোর প্রয়োজন নেই
  if (totalPages <= 1) return null;

  // পেজ নাম্বারের অ্যারে তৈরি করার লজিক (এলিপসিসসহ)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // একবারে সর্বোচ্চ কয়টি পেজ নাম্বার দেখাবে

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // শুরুর দিকের পেজগুলোর জন্য
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      }
      // শেষের দিকের পেজগুলোর জন্য
      else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      }
      // মাঝখানের পেজগুলোর জন্য
      else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111827]">
      {/* বাম পাশের টেক্সট ইনফরমেশন */}
      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        Showing Page{" "}
        <span className="text-gray-900 dark:text-slate-200 font-semibold">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="text-gray-900 dark:text-slate-200 font-semibold">
          {totalPages}
        </span>
      </div>

      {/* প্যাগিনেশন বাটন কন্ট্রোল */}
      <div className="flex items-center gap-1.5">
        {/* প্রথম পেজে যাওয়ার বাটন */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-[#1e293b] transition duration-150"
          title="First Page"
        >
          <FiChevronsLeft className="text-base" />
        </button>

        {/* প্রিভিয়াস বাটন */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-[#1e293b] transition duration-150"
          title="Previous Page"
        >
          <FiChevronLeft className="text-base" />
        </button>

        {/* ডায়নামিক পেজ নাম্বার বাটনসমূহ */}
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 select-none"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`min-w-[34px] h-[34px] px-2 rounded-lg text-xs font-bold transition duration-150 ${
                isActive
                  ? "bg-red-600 text-white shadow-md shadow-red-500/20"
                  : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* নেক্সট বাটন */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-[#1e293b] transition duration-150"
          title="Next Page"
        >
          <FiChevronRight className="text-base" />
        </button>

        {/* সর্বশেষ পেজে যাওয়ার বাটন */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-[#1e293b] transition duration-150"
          title="Last Page"
        >
          <FiChevronsRight className="text-base" />
        </button>
      </div>
    </div>
  );
}
