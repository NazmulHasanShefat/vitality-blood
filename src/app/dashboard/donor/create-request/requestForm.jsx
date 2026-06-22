"use client";

import { createDonationRequest } from "@/lib/actions/donationRequest";
import { toast } from "@heroui/react";
import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiBriefcase,
  FiDroplet,
  FiCalendar,
  FiClock,
  FiMessageSquare,
  FiSend,
} from "react-icons/fi";

export default function CreateDonationRequest({ user }) {
  // Mock logged-in user data context (Simulated auth state session data)
  const loggedInUser = {
    name: user?.name,
    email: user?.email,
    id: user?.id,
  };

  // State mapping database configuration parameters for conditional upazila listing
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Static blood donation structural mock datasets
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const districts = [
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Sylhet",
    "Barishal",
    "Rangpur",
    "Mymensingh",
  ];

  const upazilas = {
    Dhaka: ["Dhanmondi", "Mirpur", "Gulshan", "Uttara", "Shahbagh"],
    Chattogram: ["Panchlaish", "Double Mooring", "Hathazari", "Anwara"],
    Rajshahi: ["Boalia", "Matihar", "Shah Makhdum"],
  };

  // Process data retrieval dynamically via FormData upon submit execution
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataInstance = new FormData(e.currentTarget);
    const rawRequestData = Object.fromEntries(formDataInstance.entries());

    // Injecting requirements variables safely (Read-Only context & implicit backend defaults)
    const finalizedDonationRequest = {
      ...rawRequestData,
      requesterName: loggedInUser.name,
      requesterEmail: loggedInUser.email,
      requesterId: loggedInUser.id,
      
      donationStatus: "pending", // Implicit requirement: Enforced default fallback value injection
    };

    const result = await createDonationRequest(finalizedDonationRequest);
    if (result.insertedId) {
      toast.success("Request created successfully");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-[#0f172a] dark:text-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#111827] p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
        {/* Form Core Title Header Block */}
        <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#990000] dark:text-[#ef4444] tracking-tight">
            Create Blood Donation Request
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Please fill out the form requirements accurately to broadcast an
            emergency dispatch.
          </p>
        </div>

        {/* Structural Form Fields Layout Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Requester Details (Implicit Read-Only Blocks) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Requester Name (Logged In)
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  value={loggedInUser.name}
                  disabled // Requirement: Locked configuration enforcement state
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b]/20 text-gray-400 dark:text-gray-500 outline-none cursor-not-allowed font-medium text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Requester Email (Logged In)
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  value={loggedInUser.email}
                  name="recipientEmail"
                  disabled // Requirement: Locked configuration enforcement state
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b]/20 text-gray-400 dark:text-gray-500 outline-none cursor-not-allowed font-medium text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Recipient Baseline Parameters info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="recipientName"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Recipient Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  required
                  placeholder="Patient Full Name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bloodGroup"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Required Blood Group
              </label>
              <div className="relative">
                <FiDroplet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  required
                  defaultValue=""
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition appearance-none text-sm"
                >
                  <option
                    value=""
                    disabled
                    className="bg-white text-gray-800 dark:bg-[#111827] dark:text-slate-100"
                  >
                    Select Blood Group
                  </option>
                  {bloodGroups.map((group) => (
                    <option
                      key={group}
                      value={group}
                      className="bg-white text-gray-800 dark:bg-[#111827] dark:text-slate-100"
                    >
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Geolocation Selectors Context (District & Upazila maps) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="recipientDistrict"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Recipient District
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                <select
                  id="recipientDistrict"
                  name="recipientDistrict"
                  required
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition appearance-none text-sm"
                >
                  <option
                    value=""
                    disabled
                    className="bg-white text-gray-800 dark:bg-[#111827] dark:text-slate-100"
                  >
                    Select District
                  </option>
                  {districts.map((district) => (
                    <option
                      key={district}
                      value={district}
                      className="bg-white text-gray-800 dark:bg-[#111827] dark:text-slate-100"
                    >
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="recipientUpazila"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Recipient Upazila
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                <select
                  id="recipientUpazila"
                  name="recipientUpazila"
                  required
                  disabled={!selectedDistrict}
                  defaultValue=""
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition appearance-none disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <option
                    value=""
                    disabled
                    className="bg-white text-gray-800 dark:bg-[#111827] dark:text-slate-100"
                  >
                    Select Upazila
                  </option>
                  {selectedDistrict &&
                    upazilas[selectedDistrict]?.map((upazila) => (
                      <option
                        key={upazila}
                        value={upazila}
                        className="bg-white text-gray-800 dark:bg-[#111827] dark:text-slate-100"
                      >
                        {upazila}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Clinical Logistics Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-1">
              <label
                htmlFor="hospitalName"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Hospital Name
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  required
                  placeholder="e.g. Dhaka Medical College Hospital"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="fullAddress"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Full Address Line
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  id="fullAddress"
                  name="fullAddress"
                  required
                  placeholder="e.g. Zahir Raihan Rd, Dhaka"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Date and Time Schedule Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="donationDate"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Donation Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="date"
                  id="donationDate"
                  name="donationDate"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="donationTime"
                className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
              >
                Donation Time
              </label>
              <div className="relative">
                <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="time"
                  id="donationTime"
                  name="donationTime"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 6: In-Depth Detailed Request Message Textarea Block */}
          <div>
            <label
              htmlFor="requestMessage"
              className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
            >
              Request Message (Details)
            </label>
            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-4 text-gray-400 text-lg" />
              <textarea
                id="requestMessage"
                name="requestMessage"
                required
                rows={4}
                placeholder="Explain in detail why blood is required, patient clinical state, or specific emergency notes..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition text-sm resize-none"
              />
            </div>
          </div>

          {/* Form Action Footer Area Containing Broadcast Request Controller Action Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-red-900/10 active:scale-[0.98]"
            >
              <FiSend className="text-base" />
              Submit Donation Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
