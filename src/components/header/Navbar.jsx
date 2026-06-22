"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import SignOut from "../ui/SignOut";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data } = authClient.useSession();
  console.log(data);

  // Navigation Links

  function getNavLinks() {
    if (!data) {
      return [
        { name: "Search Donor", href: "/searchdonor" },
        { name: "Donation Requiest", href: "/donation-requests" },
        { name: "login", href: "/login" },
        { name: "Home", href: "/" },
      ];
    } else {
      return [
        { name: "Search Donor", href: "/searchdonor" },
        { name: "Donation Requiest", href: "/donation-requests" },
        { name: "Home", href: "/" },
      ];
    }
  }
  const navLinks = getNavLinks();
  // Helper to check if link is active
  const isActive = (path) => pathname === path;

  const dashboardLink = `/dashboard/${data?.user?.role}`;
  return (
    <nav className="w-full border-b bg-[#f8fafc] border-gray-200 text-gray-700 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between  py-2 items-center">
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-[#990000] dark:text-[#ef4444]"
            >
              VitalityBlood
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 h-full items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative h-full flex items-center text-sm font-medium transition-colors duration-150 ${
                  isActive(link.href)
                    ? "text-[#990000] dark:text-[#ef4444] font-semibold"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                }`}
              >
                {link.name}
                {/* Underline Indicator for Active Link */}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#990000] dark:bg-[#ef4444]" />
                )}
              </Link>
            ))}
          </div>

          {/* Right: Desktop Action Items */}
          <div className="hidden md:flex items-center space-x-5">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none relative"
            >
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
              <FiBell className="text-xl text-[#2b6cb0] dark:text-[#63b3ed]" />
            </button>
            {!data ? (
              <Link
                href="/register"
                className="bg-[#990000] hover:bg-[#7a0000] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm dark:bg-[#990000] dark:hover:bg-[#b31a1a]"
              >
                Register Donor
              </Link>
            ) : (
              <>
              <Link
                href={dashboardLink}
                className="bg-[#990000] hover:bg-[#7a0000] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm dark:bg-[#990000] dark:hover:bg-[#b31a1a]"
              >
                Dashboard
              </Link>
              <SignOut />
              </>
            )}
          </div>

          {/* Mobile Hamburguer Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              type="button"
              className="p-1 text-gray-500 dark:text-gray-400"
            >
              <FiBell className="text-xl text-[#2b6cb0] dark:text-[#63b3ed]" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 border-t border-gray-200 dark:border-gray-800"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-950 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-red-50 text-[#990000] dark:bg-red-950/30 dark:text-[#ef4444]"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-100 dark:border-gray-900 px-3">
                 {!data ? (
              <Link
                href="/register"
                className="bg-[#990000] hover:bg-[#7a0000] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm dark:bg-[#990000] dark:hover:bg-[#b31a1a]"
              >
                Register Donor
              </Link>
            ) : (
              <>
              <Link
                href={dashboardLink}
                className="bg-[#990000] hover:bg-[#7a0000] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm dark:bg-[#990000] dark:hover:bg-[#b31a1a]"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="bg-[#990000] hover:bg-[#7a0000] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm dark:bg-[#990000] dark:hover:bg-[#b31a1a]"
              >
                sign Out
              </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
