"use client";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUser,
  FiFilter,
} from "react-icons/fi";


import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdBloodtype } from "react-icons/md";
import DeleteConfirmModal from "@/components/dashboard/deleteModal/DeleteConfirmModal";
import { OptionsDrop } from "@/components/dashboard/donation-requests-options/OptionsDropDown";

export default function DonationRequestTable({ donorRequests = [] }) {

  const allDonorRequests = donorRequests?.data;
  console.log(donorRequests)

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleChange = (e) => {
    if (e.target.value === "all") {
      setLoading(true);
      return router.push(pathName);
    }
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("filter", e.target.value);
    router.push(`${pathName}?${urlParams.toString()}`);
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
  }, [pathName, searchParams]);

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f19] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-x-hidden">
      {loading && (
        <div className="fixed h-screen w-full backdrop-blur-xl flex items-center justify-center bg-transparent z-50 inset-0">
          <div className="block">
            <MdBloodtype className="text-5xl lg:text-9xl text-red-600 animate-bounce" />
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        {/* টেবিলের মূল কার্ড রেপার লেআউট */}
        {/* Solution 1: Removed overflow-x-auto from here to prevent it from pushing the entire card body */}
        <div className="bg-white w-full dark:bg-[#111827] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* হেডার সেকশন: শিরোনাম এবং স্টাইল করা ফিল্টার সিলেক্ট বাটন */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                Blood Donation Requests
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Manage, monitor, and process active emergency blood requests.
              </p>
            </div>

            {/* সিলেক্ট ইনপুটের জন্য মডার্ন কন্টেইনার এবং আইকন */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <label
                htmlFor="selectStatus"
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5"
              >
                <FiFilter className="text-gray-400 text-sm" />
                <span>Filter:</span>
              </label>

              <select
                onChange={handleChange}
                name="selectStatus"
                id="selectStatus"
                className="text-base font-medium !bg-gray-50 dark:bg-[#1e293b] text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/50 cursor-pointer transition-all duration-200 shadow-sm min-w-[120px]"
              >
                <option value="all" className="!bg-white dark:bg-[#111827]">
                  All
                </option>
                <option value="pending" className="!bg-white dark:bg-[#111827]">
                  Pending
                </option>
                <option
                  value="rejected"
                  className="!bg-white dark:bg-[#111827]"
                >
                  rejected
                </option>
                <option
                  value="inprogress"
                  className="!bg-white dark:bg-[#111827]"
                >
                  inprogress
                </option>
              </select>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ১. মোবাইল রেসপনসিভ কার্ড ভিউ (ছোট স্ক্রিনে কার্ড আকারে দেখাবে) */}
          {/* ========================================================================= */}
          <div className="block md:hidden divide-y divide-gray-100 dark:divide-gray-800/60">
            {allDonorRequests.map((request) => {
              const requestId = request?._id;
              return (
                <div
                  key={requestId}
                  className="p-5 space-y-4 !bg-white dark:bg-[#111827]"
                >
                  {/* রো ১: গ্রহীতার নাম এবং ব্লাড গ্রুপের ব্যাজ */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base text-gray-900 dark:text-slate-200">
                        {request.recipientName}
                      </h3>
                      {request.hospitalName && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          Hospital: {request.hospitalName}
                        </p>
                      )}
                    </div>
                    <span className="inline-flex items-center justify-center bg-red-50 dark:bg-red-950/40 text-[#b91c1c] dark:text-[#f87171] font-extrabold px-3 py-1 rounded-lg text-xs border border-red-100 dark:border-red-900/30">
                      {request.bloodGroup}
                    </span>
                  </div>

                  {/* রো ২: মেটাডেটা গ্রিড (লোকেশন এবং শিডিউলের বিস্তারিত) */}
                  <div className="grid grid-cols-2 gap-3 text-xs border-y border-gray-50 dark:border-gray-800/50 py-3">
                    {/* লোকেশন কলাম */}
                    <div className="space-y-1">
                      <span className="text-gray-400 dark:text-gray-500 block font-medium">
                        Location
                      </span>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <FiMapPin className="text-gray-400 shrink-0 text-sm" />
                        <span className="truncate">
                          {request.recipientUpazila},{" "}
                          {request.recipientDistrict}
                        </span>
                      </div>
                    </div>

                    {/* শিডিউল কলাম */}
                    <div className="space-y-1">
                      <span className="text-gray-400 dark:text-gray-500 block font-medium">
                        Schedule
                      </span>
                      <div className="flex flex-col text-gray-600 dark:text-gray-400 font-medium">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="text-gray-400" />{" "}
                          {request.donationDate}
                        </span>
                        <span className="flex items-center gap-1 mt-0.5">
                          <FiClock className="text-gray-400" />{" "}
                          {request.donationTime}
                        </span>
                      </div>
                    </div>

                    {/* অ্যাসাইন করা ডোনারের কলাম */}
                    <div className="col-span-2 space-y-1 pt-1">
                      <span className="text-gray-400 dark:text-gray-500 block font-medium">
                        Assigned Donor
                      </span>
                      {request.donationStatus === "inprogress" &&
                      request.donorInfo ? (
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800/40">
                          <FiUser className="text-gray-400 text-sm shrink-0" />
                          <div className="truncate">
                            <p className="font-bold text-gray-800 dark:text-slate-300 leading-none">
                              {request.donorInfo.name}
                            </p>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500">
                              {request.donorInfo.email}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-600 italic">
                          No assigned donor
                        </span>
                      )}
                    </div>
                  </div>

                  {/* রো ৩: স্টেটাস ব্যাজ এবং ইন্টারঅ্যাক্টিভ অ্যাকশন বাটন */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border uppercase ${
                          request.donationStatus === "pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30"
                            : request.donationStatus === "inprogress"
                              ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30"
                              : request.donationStatus === "done"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30"
                                : "bg-red-100 text-red-600 border-red-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700"
                        }`}
                      >
                        {request.donationStatus}
                      </span>
                    </div>

                    {/* ড্রপডাউন মেনু এবং ডিলিট কনফার্মেশন মোডাল ট্রিগার */}
                    <div className="flex items-center gap-2">
                      <OptionsDrop requestId={requestId} request={request} />
                      <DeleteConfirmModal requestId={requestId} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* ২. ডেস্কটপ টেবিল ভিউ (মাঝারি এবং বড় স্ক্রিনের জন্য স্ট্যান্ডার্ড লেআউট) */}
          {/* ========================================================================= */}
          {/* Solution 2: Handled overflow-x-auto correctly here within the table wrapper container */}
          <div className="hidden md:block w-full overflow-x-auto custom-scrollbar">
            {/* table-layout-auto or min-w-[800px] guarantees the table scrolls inside its box instead of expanding the outer layout */}
            <table className="w-full min-w-[900px] text-left border-collapse table-auto">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#1e293b]/50 border-b border-gray-100 dark:border-gray-800 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-4 px-6 min-w-[150px]">Recipient</th>
                  <th className="py-4 px-6 w-[120px]">Blood Group</th>
                  <th className="py-4 px-6 min-w-[180px]">Location</th>
                  <th className="py-4 px-6 min-w-[150px]">Schedule</th>
                  <th className="py-4 px-6 min-w-[180px]">Donor Details</th>
                  <th className="py-4 px-6 w-[120px]">Status</th>
                  <th className="py-4 px-6 text-center w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                {allDonorRequests.map((request) => {
                  const requestId = request?._id;
                  return (
                    <tr
                      key={requestId}
                      className="hover:bg-slate-50/50 dark:hover:bg-[#1e293b]/20 transition duration-150"
                    >
                      {/* গ্রহীতার নাম সেল */}
                      <td className="py-4 px-6 font-bold text-gray-900 dark:text-slate-200 max-w-[180px] truncate">
                        {request.recipientName}
                      </td>

                      {/* ব্লাড গ্রুপ ব্যাজ সেল */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center justify-center bg-red-50 dark:bg-red-950/40 text-[#b91c1c] dark:text-[#f87171] font-extrabold px-3 py-1 rounded-lg text-xs border border-red-100 dark:border-red-900/30">
                          {request.bloodGroup}
                        </span>
                      </td>

                      {/* জিওলোকেশন এবং লোকেশন ম্যাপস কলাম */}
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <FiMapPin className="text-gray-400 shrink-0 text-base" />
                          <span
                            className="truncate max-w-[160px]"
                            title={`${request.recipientUpazila}, ${request.recipientDistrict}`}
                          >
                            {request.recipientUpazila},{" "}
                            {request.recipientDistrict}
                          </span>
                        </div>
                      </td>

                      {/* শিডিউল এবং ডেডলাইন নোড গ্রিড সেল */}
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                        <div className="space-y-1 text-xs font-medium">
                          <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <FiCalendar className="text-gray-400" />
                            <span>{request.donationDate}</span>
                          </div>
                          <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <FiClock className="text-gray-400" />
                            <span>{request.donationTime}</span>
                          </div>
                        </div>
                      </td>

                      {/* ডোনারের বিস্তারিত তথ্য নোড সেল */}
                      <td className="py-4 px-6">
                        {request.donationStatus === "inprogress" &&
                        request.donorInfo ? (
                          <div className="text-xs space-y-0.5 max-w-[180px]">
                            <div className="font-bold text-gray-800 dark:text-slate-300 flex items-center gap-1 truncate">
                              <FiUser className="text-gray-400" />{" "}
                              {request.donorInfo.name}
                            </div>
                            <div
                              className="text-gray-400 dark:text-gray-500 font-medium truncate"
                              title={request.donorInfo.email}
                            >
                              {request.donorInfo.email}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 dark:text-gray-600 italic">
                            No assigned donor
                          </span>
                        )}
                      </td>

                      {/* কাস্টম স্টেটাস রেন্ডার ট্যাগ ব্লক সেল */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border uppercase ${
                            request.donationStatus === "pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30"
                              : request.donationStatus === "inprogress"
                                ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30"
                                : request.donationStatus === "done"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30"
                                  : "bg-red-100 text-red-600 border-red-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700"
                          }`}
                        >
                          {request.donationStatus}
                        </span>
                      </td>

                      {/* অপারেশন্স ইন্টারঅ্যাকশন বাটন লেআউট সেল */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2.5">
                          <OptionsDrop
                            requestId={requestId}
                            request={request}
                          />
                          <DeleteConfirmModal requestId={requestId} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
