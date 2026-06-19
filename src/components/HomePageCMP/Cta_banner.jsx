"use client";

import React from "react";
import { FiPhoneCall, FiShield } from "react-icons/fi";

export default function CallToAction() {
  return (
    <section className="w-full bg-white dark:bg-[#0b0f19] py-12 md:py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* মেইন ডার্ক ব্যানার কন্টেইনার (ইমেজের অবিকল বর্ডার রেডিয়াস সহ) */}
        <div className="w-full bg-[#091524] text-white rounded-[32px] px-6 py-12 md:py-16 text-center shadow-xl border border-slate-800 relative overflow-hidden">
          
          {/* হালকা ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            
            {/* মেইন হেডিং */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Secure Your Supply Chain?
            </h2>

            {/* সাবকন্টেন্ট / ডেসক্রিপশন */}
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
              Join over 1,200 medical facilities leveraging VitalityBlood&apos;s infrastructure to save lives through data-driven management.
            </p>

            {/* বাটন গ্রুপ (মোবাইলে ফুল উইডথ, স্মল স্ক্রিন থেকে পাশাপাশি) */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              
              {/* প্রাইমারি বাটন: Talk to a Specialist */}
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#b91c1c] hover:bg-[#991b1b] text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 gap-2 shadow-lg shadow-red-900/20 active:scale-[0.98]"
              >
                <FiPhoneCall className="text-base" />
                Talk to a Specialist
              </button>

              {/* সেকেন্ডারি বাটন: View Compliance Data */}
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1e293b]/60 hover:bg-[#1e293b] text-slate-200 border border-slate-700/80 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 gap-2 active:scale-[0.98]"
              >
                <FiShield className="text-base" />
                View Compliance Data
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}