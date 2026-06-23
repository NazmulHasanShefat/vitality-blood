"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiUsers,
  FiDroplet,
  FiCalendar,
  FiTruck,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiPlusCircle,
} from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

export default function Sidebar({ user }) {
  const pathname = usePathname(); // অ্যাক্টিভ রুট ট্র্যাক করার জন্য (Next.js এনভায়রনমেন্ট)

  const getNavItem = () => {
    if (user?.role === "donor") {
      return [
        { name: "Dashboard", href: "/dashboard/donor", icon: FiGrid },
        {
          name: "my request",
          href: "/dashboard/donor/my-requests",
          icon: FiUsers,
        },
        {
          name: "create request",
          href: "/dashboard/donor/create-request",
          icon: FiUsers,
        },
        { name: "Profile", href: "/dashboard/donor/profile", icon: FaRegUser },
      ];
    }
    if (user?.role === "admin") {
      return [
        { name: "Dashboard", href: "/dashboard/admin", icon: FiGrid },
        {
          name: "my request",
          href: "/dashboard/admin/my-requests",
          icon: FiUsers,
        },
        {
          name: "create request",
          href: "/dashboard/admin/create-request",
          icon: FiUsers,
        },
        { name: "Profile", href: "/dashboard/admin/profile", icon: FaRegUser },
        {
          name: "All users",
          href: "/dashboard/admin/all-users",
          icon: FaRegUser,
        },
        {
          name: "All donation request",
          href: "/dashboard/admin/all-donation-requests",
          icon: FaRegUser,
        },
      ];
    } else {
      return [
        { name: "Dashboard", href: "/dashboard/donor", icon: FiGrid },
        { name: "Donors", href: "/donors", icon: FiUsers },
        { name: "Inventory", href: "/inventory", icon: FiDroplet },
        { name: "Appointments", href: "/appointments", icon: FiCalendar },
        { name: "Blood Drives", href: "/drives", icon: FiTruck },
        { name: "Reports", href: "/reports", icon: FiBarChart2 },
      ];
    }
  };

  const menuItems = getNavItem();
  const bottomItems = [
    { name: "Settings", href: "/settings", icon: FiSettings, type: "link" },
    { name: "Logout", href: "/support", icon: HiOutlineLogout, type: "button" },
  ];

  return (
    <aside className="w-50 hidden lg:flex h-screen bg-white border-r border-gray-100  flex-col justify-between p-4 dark:bg-[#111827] dark:border-gray-800 transition-colors duration-300 fixed left-0 top-0 z-40">
      <div className="flex flex-col space-y-6">
        <Link href={`/`} className="flex items-center space-x-3 px-2">
          <div className="h-9 w-9 rounded-xl bg-[#b91c1c] flex items-center justify-center shadow-md shadow-red-600/10 text-white font-bold text-lg">
            <FiDroplet className="fill-current text-white text-base" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#990000] dark:text-[#ef4444] tracking-tight leading-none">
              VitalityBlood
            </span>
            <span className="text-[10px] font-medium text-gray-400 mt-1">
              Clinical Admin
            </span>
          </div>
        </Link>

        {/* রেজিস্টার ডোনার বাটন (ছবির মতন রেড ব্যাকগ্রাউন্ড ও প্লাস আইকন) */}
        <button
          type="button"
          className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-red-900/10 active:scale-[0.98] dark:bg-[#b91c1c] dark:hover:bg-[#a11818]"
        >
          <FiPlusCircle className="text-base" />
          Register Donor
        </button>

        {/* নেভিগেশন লিংক মেনু */}
        <nav className="space-y-1 pt-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            // ছবির মতন ড্যাশবোর্ড আইটেমটি সিলেক্টেড (Active) বোঝানোর লজিক
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#e2eeff] text-[#1e40af] dark:bg-blue-950/40 dark:text-blue-400"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
                }`}
              >
                <IconComponent
                  className={`text-lg ${isActive ? "text-[#1e40af] dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* বটম সেকশন: সেটিংস এবং সাপোর্ট */}
      <div className="flex flex-col space-y-1">
        {/* ছবির মডার্ন সেপারেটর বা হালকা থিন লাইন */}
        <div className="border-t border-gray-100 dark:border-gray-800 my-2 w-full" />

        {bottomItems.map((item) => {
          const IconComponent = item.icon;
          return item.type === "link" ? (
            <Link
              key={item.name}
              href={item.href}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200 transition-all duration-200"
            >
              <IconComponent className="text-lg text-gray-400 dark:text-gray-500" />
              <span>{item.name}</span>
            </Link>
          ) : (
            <button
              key={item.name}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200 transition-all duration-200"
            >
              <IconComponent className="text-lg text-gray-400 dark:text-gray-500" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
