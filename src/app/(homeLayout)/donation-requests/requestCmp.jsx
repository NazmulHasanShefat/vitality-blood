"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Card, Link } from "@heroui/react";
// React Icons
import { BiFilterAlt, BiMap } from "react-icons/bi";
import { FiGrid, FiList, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineHeart,
} from "react-icons/hi";
import { MdOutlineMessage, MdVerifiedUser } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// Import the dynamic mapping dictionary from context
import { divisions, divisionsWithDistricts } from "@/context/address";
import RequestCard from "./RequestCard";
import BloodLoadingSpinner from "@/components/ui/Loading";

const bloodGroups = [
  "All Groups",
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
];

export default function FindLifeSaver({ pedingRequests, user }) {
  const [loading, setLoading] = useState(false);
  const [blood, setblood] = useState("");
  const [district, setdistrict] = useState("");
  const [divition, setdivition] = useState("");

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // Get matching districts dynamically based on the current selection of divition
  const filteredDistricts = divition ? divisionsWithDistricts[divition] || [] : [];

  const applyFilter = () => {
    // 1. Start the loading state indicator
    setLoading(true); 
    
    if (blood || district || divition) {
      const urlParams = new URLSearchParams(searchParams);
      
      // Handle "All Groups" selection to clear the filter if selected
      if (blood && blood !== "All Groups") {
        urlParams.set("blood", encodeURIComponent(blood));
      } else {
        urlParams.delete("blood");
      }
      
      if (divition) urlParams.set("divition", divition); else urlParams.delete("divition");
      if (district) urlParams.set("district", district); else urlParams.delete("district");
      
      // 2. Trigger the router push; useEffect will automatically reset loading to false on completion
      router.push(`${pathName}?${urlParams.toString()}`);
    } else {
      // 3. Turn off loading immediately if no filters are selected
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [pathName, searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Top Banner Section */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Find a Life-Saver
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Search through our verified clinical donor database by region and
              blood group.
            </p>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Blood Group Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Blood Group
              </label>
              <div className="relative">
                <select
                  onChange={(e) => setblood(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none cursor-pointer"
                >
                  {bloodGroups.map((group, index) => (
                    <option key={index} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-3.5 pointer-events-none text-xs text-slate-400">
                  ▼
                </span>
              </div>
            </div>

            {/* Division Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Division
              </label>
              <div className="relative">
                <select
                  onChange={(e) => {
                    setdivition(e.target.value);
                    setdistrict(""); // Reset district value whenever division changes
                  }}
                  value={divition}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none cursor-pointer"
                >
                  <option value="">Select Division</option>
                  {divisions.map((div, index) => (
                    <option key={index} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
                <BiMap className="absolute left-3 top-3.5 text-slate-400 text-base" />
                <span className="absolute right-3 top-3.5 pointer-events-none text-xs text-slate-400">
                  ▼
                </span>
              </div>
            </div>

            {/* District Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                District
              </label>
              <div className="relative">
                <select
                  onChange={(e) => setdistrict(e.target.value)}
                  value={district}
                  disabled={!divition} // Prevent user interaction until division is selected
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select District</option>
                  {filteredDistricts.map((dist, index) => (
                    <option key={index} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                <BiMap className="absolute left-3 top-3.5 text-slate-400 text-base" />
                <span className="absolute right-3 top-3.5 pointer-events-none text-xs text-slate-400">
                  ▼
                </span>
              </div>
            </div>

            {/* Filter Apply Button */}
            <button
              onClick={applyFilter}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <BiFilterAlt />
              <span>{loading ? "Applying..." : "Apply Filters"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content & Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Results Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            Available Donors{" "}
            <span className="text-slate-400 text-sm font-normal">
              (124 verified)
            </span>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800 p-1 rounded-lg">
            <button className="p-1.5 rounded-md bg-white dark:bg-slate-700 text-red-600 shadow-sm">
              <FiGrid className="text-base" />
            </button>
            <button className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700/50">
              <FiList className="text-base" />
            </button>
          </div>
        </div>

        {/* Donors Cards Grid Layout mapped using Hero UI Card Structure */}
        <div className="grid relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Suspense fallback={<BloodLoadingSpinner />}>
            <RequestCard donationData={pedingRequests} user={user} />
          </Suspense>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center items-center gap-2 mt-12 pb-10">
          <button className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 transition-colors">
            <FiChevronLeft />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-700 text-white font-semibold text-sm shadow-md">
            1
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm text-slate-600 dark:text-slate-400 transition-colors">
            2
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm text-slate-600 dark:text-slate-400 transition-colors">
            3
          </button>
          <span className="px-1 text-slate-400 dark:text-slate-600">...</span>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm text-slate-600 dark:text-slate-400 transition-colors">
            12
          </button>
          <button className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 transition-colors">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}