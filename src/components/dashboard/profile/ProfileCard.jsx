"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiUser, FiMail, FiMapPin, FiDroplet, FiEdit3, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { districts, upazilas } from "@/context/address";

// বাংলাদেশর জেলা ও উপজেলার ডাটা সোর্স
const bdLocationData = {
  Dhaka: ["Dhanmondi", "Mirpur", "Gulshan", "Uttara", "Savars", "Motijheel"],
  Khulna: ["Dacope", "Bagerhat Sadar", "Rupsha", "Phultala", "Koyra", "Dumuria"],
  Rajshahi: ["Mohanpur", "Bagha", "Puthia", "Paba", "Godagari", "Tanore"],
  Chittagong: ["Hathazari", "Patiya", "Raozan", "Sitakunda", "Anwara", "Sadar"],
  Sylhet: ["Beanibazar", "Golapganj", "Fenchuganj", "Balaganj", "Biswanath"],
  Barisal: ["Bakerganj", "Babuganj", "Gournadi", "Mehendiganj", "Muladi"],
  Rangpur: ["Mithapukur", "Pirganj", "Badarganj", "Kaunia", "Gangachara"],
  Mymensingh: ["Gaffargaon", "Ishwarganj", "Muktagachha", "Bhaluka", "Trishal"]
};

export default function ProfileCard({ user }) {
  const [isEditable, setIsEditable] = useState(false);

  // মূল ইউজার ডাটা স্টেট
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
    role: user?.role || "donor", 
    bloodGroup: user?.bloodGroup || "O+",
    district: user?.district || "",
    upazila: user?.upazila || "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
        role: user.role || "donor",
        bloodGroup: user.bloodGroup || "O+",
        district: user.district || "",
        upazila: user.upazila || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (name === "district") {
        updatedData.upazila = bdLocationData[value]?.[0] || "";
      }
      return updatedData;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving updated profile data:", userData);
    setIsEditable(false);
  };

  const availableUpazilas = bdLocationData[userData.district] || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-[#0f172a] dark:text-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#111827] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        {/* Banner Decoration Area */}
        <div className="h-32 w-full bg-gradient-to-r from-[#990000] to-[#b91c1c] relative" />

        {/* Profile Info Summary (সম্পূর্ণ সেন্টারড লেআউট) */}
        <div className="px-6 pb-8 relative flex flex-col items-center text-center">
          
          {/* Profile Image Avatar (সেন্টার করার জন্য মার্জিন অটো ও মাইনাস মার্জিন ব্যালেন্স করা হয়েছে) */}
          <div className="relative h-28 w-28 -mt-14 rounded-full border-4 border-white dark:border-[#111827] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md z-10">
            <Image
              src={user?.image}
              alt={`${userData.name}'s Profile Avatar`}
              fill
              className="object-cover"
              priority
              unoptimized={userData.avatar.includes("ibb.co")}
            />
          </div>
          
          {/* নাম এবং ব্যাজ (সেন্টারড টেক্সট) */}
          <div className="mt-4 mb-4">
            <h1 className="text-2xl text-gray-900 dark:text-slate-100 font-bold tracking-tight mb-1">
              {userData.name}
            </h1>
            <span className="inline-block px-3 py-0.5 text-xs font-bold uppercase tracking-wider bg-red-50 dark:bg-red-950/40 text-[#b91c1c] dark:text-[#f87171] rounded-full capitalize">
              {userData.role}
            </span>
          </div>

          {/* ফর্ম অ্যাকশন বাটন (একদম সেন্টারে বসানো হয়েছে) */}
          <div className="mb-8">
            {!isEditable ? (
              <button
                type="button"
                onClick={() => setIsEditable(true)}
                className="inline-flex items-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-md shadow-red-900/10 active:scale-[0.98]"
              >
                <FiEdit3 className="text-base" />
                Edit Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditable(false)}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl font-semibold text-sm transition active:scale-[0.98]"
              >
                <FiXCircle className="text-base" />
                Cancel Edit
              </button>
            )}
          </div>

          {/* ইনপুট ফর্ম এলিমেন্টস (ফর্মের টেক্সট বামে এলাইন রাখার জন্য w-full দেওয়া) */}
          <form onSubmit={handleSave} className="space-y-6 w-full text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e293b]/40 text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    disabled 
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b]/20 text-gray-400 dark:text-gray-500 outline-none cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Blood Group
                </label>
                <div className="relative">
                  <FiDroplet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <select
                    name="bloodGroup"
                    value={userData.bloodGroup}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e293b]/40 text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  District
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <select
                    name="district"
                    value={userData.district}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e293b]/40 text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer capitalize"
                  >
                    <option value="" disabled>Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Upazila */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Upazila
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <select
                    name="upazila"
                    value={userData.upazila}
                    onChange={handleInputChange}
                    disabled={!isEditable || !userData.district}
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e293b]/40 text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer capitalize"
                  >
                    <option value="" disabled>
                      {userData.district ? "Select Upazila" : "Select District First"}
                    </option>
                    {Object.keys(upazilas).map((upazila) => (
                      <option key={upazila} value={upazila}>
                        {upazila}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Save Changes Button */}
            {isEditable && (
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8 py-3 rounded-xl font-semibold text-sm transition shadow-lg shadow-red-900/10 active:scale-[0.98]"
                >
                  <FiCheckCircle className="text-base" />
                  Save Changes
                </button>
              </div>
            )}

          </form>

        </div>
      </div>
    </div>
  );
}