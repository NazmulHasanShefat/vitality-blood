"use client";
import React from "react";
import { Card } from "@heroui/react";
// ব্লাড ডোনেশন প্রজেক্টের সাথে মানানসই ৩টি আইকন নেওয়া হয়েছে
import { FiUsers, FiDollarSign, FiHeart } from "react-icons/fi";

export default function DashboardStats({ statsData, userData }) {
  // প্রপ্স থেকে ডাইনামিক ডাটা রিসিভ করা হচ্ছে (ডিফল্ট ফলব্যাক ভ্যালুসহ)
  const totalDonors = statsData?.totalDonors || 12850;
  const totalFunding = statsData?.totalFunding || 42500;
  const totalRequests = statsData?.totalRequests || 18;
  const userName = userData?.name || "User";

  return (
    <div className="w-full space-y-8 p-6 bg-slate-50 dark:bg-[#0b0f19] min-h-screen transition-colors duration-300">
      
      {/* ১. ওয়েলকাম সেকশন (আপনার ড্যাশবোর্ড হোম পেইজের স্টাইল অনুযায়ী) */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Monitoring real-time blood inventory, community funding, and active urgent donor requests.
        </p>
      </div>

      {/* ২. ৩টি ফিচার্ড স্ট্যাটিস্টিকস কার্ডের গ্রিড লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* কার্ড ১: Total Donors (মোট রক্তদাতা) */}
        <Card className="w-full p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 shadow-xl rounded-2xl flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-100 dark:border-red-900/30">
              <FiUsers className="text-[#b91c1c] dark:text-[#f87171] text-xl" />
            </div>
            {/* আপনার স্ক্রিনশটের মতো একটি গ্রোথ ইন্ডিকেটর ব্যাজ যোগ করা হয়েছে */}
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">
              +4.2%
            </span>
          </div>
          <Card.Header className="p-0 flex flex-col items-start">
            <Card.Title className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">
              {totalDonors.toLocaleString()}
            </Card.Title>
            <Card.Description className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-1">
              Total Active Donors
            </Card.Description>
          </Card.Header>
        </Card>

        {/* কার্ড ২: Total Funding (মোট অনুদান) */}
        <Card className="w-full p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 shadow-xl rounded-2xl flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-100 dark:border-amber-900/30">
              <FiDollarSign className="text-amber-700 dark:text-amber-400 text-xl" />
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">
              Stable
            </span>
          </div>
          <Card.Header className="p-0 flex flex-col items-start">
            <Card.Title className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">
              ${totalFunding.toLocaleString()}
            </Card.Title>
            <Card.Description className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-1">
              Total Community Funding
            </Card.Description>
          </Card.Header>
        </Card>

        {/* কার্ড ৩: Total Blood Donation Request (রক্তের অনুরোধসমূহ) */}
        <Card className="w-full p-6 bg-white dark:bg-[#111827] border-l-4 border-l-red-600 dark:border-gray-800 shadow-xl rounded-2xl flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
          {/* আপনার দ্বিতীয় স্ক্রিনশটের মতো এটিকে একটু আলাদা 'Critical' বাটন লুক দেওয়া হয়েছে */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-100 dark:border-rose-900/30">
              <FiHeart className="text-rose-600 dark:text-rose-400 text-xl animate-pulse" />
            </div>
            <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-2.5 py-1 rounded-full uppercase tracking-wide">
              Critical
            </span>
          </div>
          <Card.Header className="p-0 flex flex-col items-start">
            <Card.Title className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">
              {totalRequests} Active Requests
            </Card.Title>
            <Card.Description className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-1">
              Emergency Blood Requests
            </Card.Description>
          </Card.Header>
        </Card>

      </div>
    </div>
  );
}