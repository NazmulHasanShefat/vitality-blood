import React from "react";
import Image from "next/image";
import { FiSearch, FiBell, FiHelpCircle, FiAlertTriangle } from "react-icons/fi";
import VitalityBloodDrawer from "./SideDrower";
import { getUserSession } from "@/lib/api/user";
import SignOut from "../ui/SignOut";

export default async function DashboardNavbar() {
 const user = await getUserSession();
  return (
    <header className="w-full h-15 bg-white border-b border-gray-100 dark:bg-[#111827] dark:border-gray-800 flex items-center justify-between px-6 transition-colors duration-300">
      <div className="flex-1 max-w-md">
        <div className="relative hidden">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search patient ID, blood type, or clinic..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#f1f5f9] dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm border-none focus:ring-2 focus:ring-red-500/20 outline-none transition"
          />
        </div>
        {/* <ResponsiveDrawer /> */}
        <VitalityBloodDrawer />
      </div>

      {/* ডান সাইড: অ্যাকশন বাটন এবং ইউজার প্রোফাইল সেকশন */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        
     

       

    

        {/* থিন লাইট ভার্টিকাল সেপারেটর লাইন */}
        <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block" />

        {/* ইউজার প্রোফাইল ইনফো এবং অ্যাভাটার */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-bold text-[#1e293b] dark:text-slate-100 tracking-tight leading-none group-hover:text-red-600 transition-colors">
              {user?.name}
            </span>
            <span className="text-[11px] font-medium text-gray-400 mt-1">
              {user?.email}
            </span>
          </div>

          
       
          <div className="relative h-10 w-10 rounded-full border-2 border-[#b91c1c] overflow-hidden shadow-sm">
            <Image
              src={user?.image || "https://img.magnific.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1782361399~exp=1782364999~hmac=06e26bcc29aaf9c5e32ec4c481ca8459572133eb165197f4f132212bc9236cfc&w=1060"}
              alt="Dr. Sarah Vance Profile"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        </div>
  

      </div>

    </header>
  );
}