"use client";

import React from "react";
import { FiUsers, FiDroplet, FiShield, FiMapPin } from "react-icons/fi";

export default function HomeStats() {
  // স্ট্যাটস ডাটা অবজেক্ট অ্যারে
  const stats = [
    {
      id: 1,
      icon: FiUsers,
      value: "4.2M",
      label: "Active Donors Worldwide",
    },
    {
      id: 2,
      icon: FiDroplet,
      value: "158k+",
      label: "Units Managed Monthly",
    },
    {
      id: 3,
      icon: FiShield,
      value: "99.9%",
      label: "Delivery Success Rate",
    },
    {
      id: 4,
      icon: FiMapPin,
      value: "1.2k",
      label: "Partnering Clinics",
    },
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-12 dark:bg-[#0b0f19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ৪টি কার্ডের গ্রিড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white border border-red-100/70 p-6 rounded-xl transition-all duration-300 hover:shadow-md dark:bg-[#111827] dark:border-gray-800"
              >
                {/* আইকন কন্টেইনার */}
                <div className="mb-4 text-[#b91c1c] dark:text-[#ef4444]">
                  <IconComponent className="text-2xl" />
                </div>

                {/* স্ট্যাটস ভ্যালু */}
                <h3 className="text-3xl font-extrabold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">
                  {stat.value}
                </h3>

                {/* স্ট্যাটস লেবেল */}
                <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}