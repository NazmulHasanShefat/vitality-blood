"use client";

import React, { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

export function LoginForm() {
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Creating FormData object
    const formDataInstance = new FormData(e.currentTarget);
    // Converting data into an object
    const loginData = Object.fromEntries(formDataInstance.entries());

    const { data, error } = await signIn.email({
      ...loginData,
      callbackURL: "/",
    });

    if (error) {
      toast.danger(error.message);
      setLoading(false);
    }
    if (data) {
      toast.success("Login successful");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
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
            name="email"
            required
            placeholder="example@mail.com"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Password Input */}
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
            name="password"
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

      {/* Remember Me Checkbox */}
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

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3 rounded-xl font-semibold tracking-wide transition shadow-lg shadow-red-600/10 flex items-center justify-center gap-2 focus:outline-none dark:bg-[#b91c1c] dark:hover:bg-[#a11818] disabled:opacity-50"
        >
          <FiLogIn className="text-lg" />
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}