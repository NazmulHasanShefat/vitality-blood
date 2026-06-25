"use client";
import React, { useState } from "react";
import Pagination from "./Pagination"; // পাথ ঠিক করে নিবেন
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AllPagination({ totalPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalPages = totalPage; 

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("page", pageNumber);
    router.push(`${pathName}?${urlParams.toString()}`);
    setLoading(true);
    console.log("Current active page index:", pageNumber);
  };

  return (
    <div className="p-6">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
