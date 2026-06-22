"use client";
import Pagination from "@/components/ui/Pagination";
import React from "react";

const PaginationCMP = () => {
  return (
    <Pagination
      currentPage={2} // আপনার বর্তমান পেজ নম্বর স্টেট/প্যারামস থেকে আসবে
      totalPages={2} // ব্যাকএন্ড বা এপিআই রেসপন্স থেকে আসা মোট পেজ সংখ্যা
      onPageChange={(pageNumber) =>
        console.log("Navigate to page:", pageNumber)
      }
    />
  );
};

export default PaginationCMP;
