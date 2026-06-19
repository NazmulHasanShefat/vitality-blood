"use client";

import React from "react";
import Image from "next/image";
import { FiArrowRight, FiZap } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative w-full bg-white text-[#0f172a] dark:bg-[#0b0f19] dark:text-[#f8fafc] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col space-y-6 max-w-xl">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-[#b91c1c] dark:bg-red-950/40 dark:text-[#f87171] border border-red-100 dark:border-red-900/30">
                Clinical Precision
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Revolutionizing <span className="text-[#b91c1c] dark:text-[#ef4444]">Blood Supply</span> Management
            </h1>

            {/* Paragraph Description */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              LifeLink provides healthcare institutions with real-time analytics and intelligent logistics to ensure every drop of blood reaches the patient in need, exactly when they need it.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                className="inline-flex items-center justify-center bg-[#b91c1c] hover:bg-[#991b1b] text-white px-6 py-3 rounded-xl font-medium text-sm sm:text-base shadow-lg shadow-red-600/10 hover:shadow-red-600/20 transition-all duration-200 group dark:bg-[#b91c1c] dark:hover:bg-[#a11818]"
              >
                Explore Dashboard
                <FiArrowRight className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 dark:bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
              >
                Request Demo
              </button>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup & Floating Card */}
          <div className="relative w-full flex justify-center items-center group">
            {/* Soft decorative background glow effect for Dark Mode */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/5 to-transparent rounded-3xl filter blur-2xl opacity-0 dark:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Main Application Frame Mockup */}
            <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-2xl bg-[#0f172a] p-2 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
              <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-900">
                {/* Fallback to live healthcare/lab stock image */}
                <Image
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
                  alt="Blood Management Interface"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  priority
                  className="object-cover object-center opacity-90 dark:opacity-80"
                />
                
                {/* Translucent overlay inside the dashboard app view to match the image theme */}
                <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />
              </div>
            </div>

            {/* Floating Live Latency Metric Badge */}
            <div className="absolute bottom-[-20px] left-4 sm:left-8 bg-white/95 backdrop-blur-md dark:bg-[#1e293b]/95 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 flex items-center space-x-4 max-w-[210px] animate-pulse-slow">
              <div className="h-10 w-10 rounded-full bg-[#b91c1c] flex items-center justify-center shadow-md shadow-red-500/20">
                <FiZap className="text-white text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                  Real-time Latency
                </span>
                <span className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                  1.2s
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}