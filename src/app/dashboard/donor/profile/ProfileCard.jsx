"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiUser, FiMail, FiMapPin, FiDroplet, FiEdit3, FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function ProfileCard() {
  // Toggle state to manage form editability
  const [isEditable, setIsEditable] = useState(false);

  // Mock initial user data (Can be fetched from your database/auth session)
  const [userData, setUserData] = useState({
    name: "Dr. Sarah Vance",
    email: "sarah.vance@vitalityblood.org",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
    role: "Admin", // Can be Admin, Donor, or Volunteer
    bloodGroup: "O+",
    district: "Dhaka",
    upazila: "Dhanmondi",
  });

  // Handle input changes dynamically when form is editable
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save and submit sequence
  const handleSave = (e) => {
    e.preventDefault();

    // Inside a real application, trigger your database API mutation here
    // example: axios.patch('/api/user/profile', userData)

    console.log("Saving updated profile data to database:", userData);

    // Lock the form back to its initial non-editable state after processing
    setIsEditable(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-[#0f172a] dark:text-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#111827] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        {/* Banner Decoration Area */}
        <div className="h-32 w-full bg-gradient-to-r from-[#990000] to-[#b91c1c] relative" />

        {/* Profile Info Summary & Layout Container */}
        <div className="px-6 pb-8 relative">
          
          {/* Avatar and User Role Summary Header Block */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-8 gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
              {/* Profile Image Avatar */}
              <div className="relative h-28 w-28 rounded-full border-4 border-white dark:border-[#111827] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
                <Image
                  src={userData.avatar}
                  alt={`${userData.name}'s Profile Avatar`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Text Layout Metadata */}
              <div className="text-center sm:text-left mb-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                  {userData.name}
                </h1>
                <span className="inline-block mt-1.5 px-3 py-0.5 text-xs font-bold uppercase tracking-wider bg-red-50 dark:bg-red-950/40 text-[#b91c1c] dark:text-[#f87171] rounded-full">
                  {userData.role}
                </span>
              </div>
            </div>

            {/* Top Right Form Action Toggler Button */}
            <div className="flex justify-center">
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
          </div>

          {/* Main Structural Information Interactive Form Container */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name Input Field */}
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e293b]/40 text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-[#1e293b]/20"
                  />
                </div>
              </div>

              {/* Email Input Field (CRITICAL: Permanently locked / disabled regardless of state) */}
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
                    disabled // Static enforcement constraint rule applied here
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b]/20 text-gray-400 dark:text-gray-500 outline-none cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              {/* Blood Group Select Token Selector Field */}
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e293b]/40 text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-[#1e293b]/20 appearance-none"
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

              {/* District Input Field */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  District
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="district"
                    value={userData.district}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e293b]/40 text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-[#1e293b]/20"
                  />
                </div>
              </div>

              {/* Upazila Input Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Upazila
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="upazila"
                    value={userData.upazila}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e293b]/40 text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-[#1e293b]/20"
                  />
                </div>
              </div>

            </div>

            {/* Bottom Form Footer Block containing Save Action Toggles */}
            {isEditable && (
              <div className="pt-4 flex justify-end animate-fadeIn">
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