"use client";

import React, { useEffect, useState } from "react";
import { Card, Link } from "@heroui/react";
// React Icons
import { BiFilterAlt, BiMap } from "react-icons/bi";
import {
  FiPlus,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineHeart,
} from "react-icons/hi";
import { MdOutlineMessage, MdVerifiedUser } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Dummy datasets based on your requirement to map
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
const districts = ["Dhaka", "Chittagong", "Rajshahi", "Sylhet", "Khulna"];
const upazilas = ["Mirpur", "Gulshan", "Dhanmondi", "Uttara", "Banani"];

export default function FindLifeSaver({ pedingRequests, user }) {
  const [loading, setLoading] = useState(false);
  const [blood, setblood] = useState("");
  const [district, setdistrict] = useState("");
  const [upazila, setupazila] = useState("");

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  console.log(blood);
  const applyFilter = () => {
    
     if(blood || district || upazila){
       const urlParams = new URLSearchParams(searchParams);
         urlParams.set("blood", blood);
         urlParams.set("district", district);
         urlParams.set("upazila", upazila);
       router.push(`${pathName}?${urlParams.toString()}`);
       setLoading(true);
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

            {/* District Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                District
              </label>
              <div className="relative">
                <select
                  onChange={(e) => setdistrict(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none cursor-pointer"
                >
                  <option value="">Select District</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                <BiMap className="absolute left-3 top-3.5 text-slate-400 text-base" />
                <span className="absolute right-3 top-3.5 pointer-events-none text-xs text-slate-400">
                  ▼
                </span>
              </div>
            </div>

            {/* Upazila Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Upazila
              </label>
              <div className="relative">
                <select
                  onChange={(e) => setupazila(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none cursor-pointer"
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((upazila, index) => (
                    <option key={index} value={upazila}>
                      {upazila}
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
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <BiFilterAlt />
              <span>Apply Filters</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pedingRequests.map((donor, index) => (
            <Card
              key={index}
              className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Row with Blood Badge and Verification Pill */}
                <div className="p-4 flex justify-between items-start">
                  {/* Blood Group Circle Icon */}
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    {donor.bloodGroup}
                  </div>

                  {/* Status Pill Dynamic Styling */}
                  {donor.donationStatus === "verified" ? (
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400 px-2 py-1 rounded-md border border-green-200 dark:border-green-900/50">
                      <MdVerifiedUser className="text-xs" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-900/50">
                      Rare Group
                    </span>
                  )}
                </div>

                {/* Hero UI Main Info Context Area */}
                <div className="px-4 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">
                    {donor.recipientName}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 mb-4">
                    <HiOutlineLocationMarker />
                    <span>{donor.fullAddress}</span>
                  </div>

                  {/* Informational Rows */}
                  <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400 dark:text-slate-500">
                        Donation Date:
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <HiOutlineCalendar className="text-slate-400" />{" "}
                        {donor.donationDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 dark:text-slate-500">
                        Donation Time:
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {donor?.donationTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero UI Footer Containing Actions */}
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                {donor.donationStatus === "rare group" ? (
                  <Link
                    href="#"
                    className="w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    <MdOutlineMessage className="text-sm" />
                    <span>Send Urgent Request</span>
                  </Link>
                ) : (
                  <Link
                    href={
                      !user
                        ? `/login`
                        : `/dashboard/${user?.role}/my-requests/${donor._id}`
                    }
                    className="w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    <HiOutlineHeart className="text-sm" />
                    <span>Contact Donor</span>
                  </Link>
                )}
              </div>
            </Card>
          ))}
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
