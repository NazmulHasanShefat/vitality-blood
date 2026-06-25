"use client";

import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ 
  currentPage = 1, 
  totalPages = 5, 
  onPageChange 
}) {
  
  // পেজ নম্বর জেনারেট করার লজিক (উদা: [1, 2, 3])
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-6 bg-transparent">
       
      
      {/* ১. Previous (আগের) বাটন */}
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-sm"
        title="Previous Page"
      >
        <FiChevronLeft className="text-lg" />
      </button>

      {/* ২. ডাইনামিক পেজ নম্বরসমূহ (২, ৩ বা তার বেশি) */}
      <div className="grid lg:grid-cols-20 md:grid-cols-10 grid-cols-4 items-center gap-1.5">
        {getPageNumbers().map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`inline-flex items-center justify-center min-w-[40px] h-[40px] px-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                isActive
                  ? "bg-[#b91c1c] text-white shadow-md shadow-red-900/10 scale-105"
                  : "bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1e293b]"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* ৩. Next (পরের) বাটন */}
      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-sm"
        title="Next Page"
      >
        <FiChevronRight className="text-lg" />
      </button>

    </div>
  );
}