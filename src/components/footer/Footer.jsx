"use client";

import React from "react";
import Link from "next/link";
import { FiShare2, FiMail, FiAlertCircle } from "react-icons/fi";

export default function Footer() {
  // নেভিগেশন লিংক গ্রুপ
  const navigationLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Donor Network", href: "/donors" },
    { name: "Blood Drives", href: "/drives" },
    { name: "Reports", href: "/reports" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Compliance", href: "/compliance" },
  ];

  const contactLinks = [
    { name: "Support Center", href: "/support" },
    { name: "Emergency Line", href: "/emergency" },
  ];

  return (
    <footer className="w-full bg-[#e2eeff] text-gray-700 border-t border-blue-100 dark:bg-[#0b0f19] dark:text-gray-400 dark:border-gray-800 transition-colors duration-300">
      
      {/* মেইন ফুটার কন্টেন্ট এরিয়া */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* বাম কলাম: ব্র্যান্ড এবং ডেসক্রিপশন (১২ ভাগের মধ্যে ৫ ভাগ জায়গা নেবে) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-2xl font-bold tracking-tight text-[#990000] dark:text-[#ef4444]"
            >
              VitalityBlood
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-gray-600 dark:text-gray-400">
              A clinical-grade management ecosystem designed for the future of healthcare. 
              Precision, reliability, and human-centric engineering.
            </p>
          </div>

          {/* ডান কলাম: লিংক গ্রুপস (১২ ভাগের মধ্যে ৭ ভাগ জায়গা নেবে) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* ১. Navigation Links */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 tracking-wide uppercase mb-3">
                Navigation
              </h3>
              <ul className="space-y-2.5">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm hover:text-[#990000] dark:hover:text-[#ef4444] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ২. Legal Links */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 tracking-wide uppercase mb-3">
                Legal
              </h3>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm hover:text-[#990000] dark:hover:text-[#ef4444] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ৩. Contact & Social Icons */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 tracking-wide uppercase mb-3">
                Contact
              </h3>
              <ul className="space-y-2.5 mb-4">
                {contactLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm hover:text-[#990000] dark:hover:text-[#ef4444] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* ইমেজের মতন সোশ্যাল/অ্যাকশন আইকন কন্টেইনার */}
              <div className="flex items-center space-x-4 pt-1 text-gray-500 dark:text-gray-400">
                <button 
                  type="button" 
                  aria-label="Share Ecosystem"
                  className="hover:text-[#990000] dark:hover:text-[#ef4444] text-lg transition-colors focus:outline-none"
                >
                  <FiShare2 />
                </button>
                <button 
                  type="button" 
                  aria-label="Mail Support"
                  className="hover:text-[#990000] dark:hover:text-[#ef4444] text-xl transition-colors focus:outline-none"
                >
                  <FiMail />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* বটম বার: কপিরাইট এবং ইমার্জেন্সি অ্যালার্ট সিস্টেম */}
      <div className="w-full border-t border-blue-200/60 dark:border-gray-800 bg-[#dae9ff]/50 dark:bg-[#090d16] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          
          {/* কপিরাইট নোটিশ */}
          <div className="text-gray-500 dark:text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} VitalityBlood Management System. Clinical Grade Precision.
          </div>
          
          {/* ইমার্জেন্সি অ্যালার্ট নোটিফিকেশন */}
          <div className="flex items-center space-x-1.5 font-semibold text-[#990000] dark:text-[#f87171]">
            <FiAlertCircle className="text-sm animate-pulse" />
            <span>Emergency Alert System: Active</span>
          </div>

        </div>
      </div>

    </footer>
  );
}