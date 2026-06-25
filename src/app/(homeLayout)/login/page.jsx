import React from "react";
import Link from "next/link";
import { LoginForm } from "./LoginForm"; // আপনার ফাইল পাথ অনুযায়ী ঠিক করে নিবেন
export const metadata = {
  title: "Vitality Blood - login",
  description: "A blood donation platform",
};
export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-[#0f172a] dark:text-[#f8fafc] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-[#111827] p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
        
        {/* Header / Logo Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#b91c1c] dark:text-[#ef4444] tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Log in to manage blood requests and donations
          </p>
        </div>

        {/* Separated Login Form Component */}
        <LoginForm />

        {/* Register Page Link */}
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