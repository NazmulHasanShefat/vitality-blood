"use client";

import { signIn } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData অবজেক্ট তৈরি (e.currentTarget ব্যবহার করে সরাসরি ফর্মের ডাটা নেওয়া হয়েছে)
    const formDataInstance = new FormData(e.currentTarget);

    // formEntries / Object.fromEntries() মেথড ব্যবহার করে ডাটা অবজেক্টে রূপান্তর
    const loginData = Object.fromEntries(formDataInstance.entries());

    // এখানে আপনার সাবমিট করা ডাটা অবজেক্ট আকারে পেয়ে যাবেন
    const {data , error} = await signIn.email({
      ...loginData,
      callbackURL: "/",
    })
    if(error){
      alert(error.message)
    }
    if(data){
      toast.success("login successfull")
   
    }
    console.log("Submitted Login Data:", loginData);

    // আপনার API কল বা লগইন লজিক এখানে যুক্ত করতে পারেন:
    // fetch('/api/login', { method: 'POST', body: JSON.stringify(loginData) })
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-[#0f172a] dark:text-[#f8fafc] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-[#111827] p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
        {/* হেডার / লোগো সেকশন */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#b91c1c] dark:text-[#ef4444] tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Log in to manage blood requests and donations
          </p>
        </div>

        {/* লগইন ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ইমেইল ইনপুট */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                id="email"
                name="email" // Object.fromEntries-এর জন্য এই name কী (key) হিসেবে কাজ করবে
                required
                placeholder="example@mail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* পাসওয়ার্ড ইনপুট */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs font-medium text-[#b91c1c] dark:text-[#ef4444] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password" // Object.fromEntries-এর জন্য এই name কী (key) হিসেবে কাজ করবে
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* রিমেম্বার মি চেকবক্স */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-[#1e293b]"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-600 dark:text-gray-400 select-none"
              >
                Remember me
              </label>
            </div>
          </div>

          {/* সাবমিট বাটন */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3 rounded-xl font-semibold tracking-wide transition shadow-lg shadow-red-600/10 flex items-center justify-center gap-2 focus:outline-none dark:bg-[#b91c1c] dark:hover:bg-[#a11818]"
            >
              <FiLogIn className="text-lg" />
              Sign In
            </button>
          </div>
        </form>

        {/* রেজিস্টার পেজের লিঙ্ক */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {"        Don't have an account?"}
          <Link
            href="/register"
            className="font-semibold text-[#b91c1c] dark:text-[#ef4444] hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
