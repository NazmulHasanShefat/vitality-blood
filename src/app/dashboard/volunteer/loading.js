import React from "react";
import { FiDroplet } from "react-icons/fi";

export default function Loading() {
  return (
    /* Changed 'fixed' to 'absolute' so it fills the nearest relative parent container instead of the whole screen */
    <div className="absolute min-h-[100.1px] inset-0 z-40 flex flex-col items-center justify-center bg-white/70 dark:bg-[#111827]/70 backdrop-blur-sm transition-colors duration-300 rounded-2xl">
      <div className="relative flex items-center justify-center">
        
        {/* Outer double spinning ring */}
        <div className="h-16 w-16 rounded-full border-4 border-transparent border-t-[#b91c1c] border-b-[#b91c1c] animate-spin" />
        
        {/* Inner alternative spinning ring (rotates in reverse) */}
        <div className="absolute h-11 w-11 rounded-full border-4 border-transparent border-l-[#f87171] border-r-[#f87171] animate-spin [animation-duration:1.5s] reverse" />
        
        {/* Center blood droplet icon with pulsing animation */}
        <div className="absolute flex items-center justify-center animate-pulse">
          <FiDroplet className="text-2xl text-[#b91c1c] fill-[#b91c1c]" />
        </div>
        
      </div>
      
      {/* Loading text message below the spinner */}
      <p className="mt-3 text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wider animate-pulse">
        Loading...
      </p>
    </div>
  );
}