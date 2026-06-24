"use client"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const SignOutButtonForUAPage = () => {
    const router = useRouter();
  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login"); // Redirect to login page after successful sign out
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleSignOut}
      type="submit"
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 px-6 py-3 rounded-xl font-semibold text-sm transition duration-200 active:scale-[0.98]"
    >
      <FiLogOut className="text-base" />
      Sign Out
    </button>
  );
};

export default SignOutButtonForUAPage;
