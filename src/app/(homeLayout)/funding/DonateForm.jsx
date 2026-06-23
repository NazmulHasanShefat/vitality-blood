"use client";

import React, { useState } from "react";
import { FiCreditCard, FiArrowRight } from "react-icons/fi";

export default function DonationForm() {
  const [amount, setAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");

  const presetAmounts = ["200", "500", "1000", "2000"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = amount === "custom" ? customAmount : amount;
    
    // bKash, SSLCommerz, বা Stripe গেটওয়ে ট্রিগার করার লজিক এখানে হবে
    console.log("Processing One-Time Payment for:", {
      amount: finalAmount,
      type: "one-time"
    });
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-xl">
      <form action="/api/checkout_sessions" method="POST" className="space-y-6">
        
        {/* প্রিসেট অ্যামাউন্ট সিলেকশন গ্রিড */}
        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Select Donation Amount (BDT)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {presetAmounts.map((preset) => {
              const isSelected = amount === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  role="link"
                  onClick={() => {
                    setAmount(preset);
                    setCustomAmount("");
                  }}
                  className={`py-3.5 px-4 rounded-xl border font-bold text-sm transition-all duration-200 text-center ${
                    isSelected
                      ? "bg-red-50 text-[#b91c1c] border-[#b91c1c] dark:bg-red-950/20 dark:text-[#f87171] dark:border-[#b91c1c]"
                      : "!bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1e293b]/50"
                  }`}
                >
                  ৳{preset}
                </button>
              );
            })}
          </div>
        </div>

        {/* কাস্টম অ্যামাউন্ট ইনপুট টগল */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAmount("custom")}
            className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all duration-200 shrink-0 ${
              amount === "custom"
                ? "bg-red-50 text-[#b91c1c] border-[#b91c1c] dark:bg-red-950/20 dark:text-[#f87171]"
                : "!bg-white dark:bg-[#111827] text-gray-500 border-gray-200 dark:border-gray-800"
            }`}
          >
            Custom Amount
          </button>

          {amount === "custom" && (
            <div className="relative flex-1 animate-fadeIn">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">৳</span>
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                required={amount === "custom"}
                min="10"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e293b]/40 text-gray-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition"
              />
            </div>
          )}
        </div>

        {/* পার্সোনাল ডিটেইলস ইনপুট */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Full Name (Optional)
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e293b]/40 text-gray-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition"
            />
          </div>
        </div>

        {/* সাবমিট বাটন */}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3.5 rounded-xl font-bold text-sm transition shadow-lg shadow-red-900/10 active:scale-[0.98] mt-2"
        >
          <FiCreditCard className="text-base" />
          Proceed to One-Time Payment
          <FiArrowRight className="text-base" />
        </button>

      </form>
    </div>
  );
}