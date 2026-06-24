import React from "react";
import { FiHeart, FiShield, FiUsers, FiCheckCircle } from "react-icons/fi";
import DonationForm from "./DonateForm"; // নিচে ২ নম্বর ফাইলে এই ক্লায়েন্ট কম্পোনেন্টটি আছে

export const metadata = {
  title: "Donate Now | Vitality Blood Network",
  description: "Support our blood donation campaigns and save lives today.",
};

export default async function DonatePage() {
 
  // const campaignData = await getCampaignDetails();

  const impactStats = [
    { id: 1, icon: <FiHeart className="text-xl text-red-600" />, title: "Free Blood Matching", desc: "Helps connect critical patients with blood donors instantly." },
    { id: 2, icon: <FiUsers className="text-xl text-blue-600" />, title: "Volunteer Support", desc: "Funds logistics and campaigns in remote areas of Bangladesh." },
    { id: 3, icon: <FiShield className="text-xl text-emerald-600" />, title: "Secure Data", desc: "Ensures encrypted data privacy for millions of medical records." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-[#0f172a] dark:text-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* হেডার সেকশন */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-50 dark:bg-red-950/30 text-[#b91c1c] dark:text-[#f87171] rounded-full mb-4">
            <FiHeart className="animate-pulse" /> Every Taka Counts
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight mb-4">
            Empower Our Life-Saving Mission
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Your generous financial support keeps our platform 100% free for blood seekers and helps organize awareness camps across the country.
          </p>
        </div>

        {/* মেইন গ্রিড লেআউট (বাম পাশে ইনফো, ডান পাশে ইন্টারেক্টিভ ফর্ম) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* বাম কলাম: ইমপ্যাক্ট ও ইনফরমেশন (সার্ভার সাইড রেন্ডার্ড) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-4">
                Where Does Your Donation Go?
              </h3>
              
              <div className="space-y-5">
                {impactStats.map((stat) => (
                  <div key={stat.id} className="flex gap-4 items-start">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1e293b]/50 shrink-0 border border-gray-100 dark:border-gray-800">
                      {stat.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-slate-200">
                        {stat.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-6 border-gray-100 dark:border-gray-800" />

              {/* ট্রাস্ট ব্যাজ */}
              <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-4 flex gap-3 items-center">
                <FiCheckCircle className="text-xl text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-xs font-medium text-emerald-800 dark:text-emerald-400">
                  Secured 256-bit SSL encrypted transactions. Standard refund policy applies.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <DonationForm />
          </div>

        </div>

      </div>
    </div>
  );
}