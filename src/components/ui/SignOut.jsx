import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const SignOut = () => {
    const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // Redirect to your login page
        },
      },
    });
  };
  return (
    <button
      onClick={handleSignOut}
      className="bg-[#990000] hover:bg-[#7a0000] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm dark:bg-[#990000] dark:hover:bg-[#b31a1a]"
    >
      SignOut
    </button>
  );
};

export default SignOut;
