"use client";

import React from "react";
import Image from "next/image";

export default function MemberGrid() {
  // ব্লাড ডোনেশন রিলেটেড লাইভ ইমেজ এবং সেটির টাইটেল ডাটা
  const galleryItems = [
    {
      id: 1,
      title: "Lifesaving Plasma Donation",
      imageUrl: "https://images.unsplash.com/photo-1615461066841-6116ecdccd04?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Dedicated Healthcare Team",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "A Drop of Hope & Kindness",
      imageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "Volunteers Organizing Camp",
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title: "Safe Blood Collection Lab",
      imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      title: "United for Global Support",
      imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="w-full bg-white text-[#0f172a] py-16 dark:bg-[#0b0f19] dark:text-[#f8fafc] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b91c1c] dark:text-[#ef4444] bg-red-50 dark:bg-red-950/30 px-3 py-1 rounded-full">
            Our Gallery
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our best word with all members
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Moments of solidarity, professional precision, and community strength captured across our blood network.
          </p>
        </div>

        {/* ইমেজ গ্রিড লেআউট (মোবাইলে ১টা, ট্যাবে ২টি এবং ডেক্সটপে ৩টি কলাম) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group cursor-pointer bg-slate-100 dark:bg-slate-900"
            >
              {/* লাইভ ইমেজ রেন্ডারিং */}
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={item.id <= 3}
              />

              {/* গ্রাডিয়েন্ট শ্যাডো ওভারলে (সাধারণ অবস্থায় অদৃশ্য থাকে, Hover করলে দেখা যাবে) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* শ্যাডোর উপরে টাইটেল টেক্সট (Hover করলে নিচ থেকে অ্যানিমেশন হয়ে আসবে) */}
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}