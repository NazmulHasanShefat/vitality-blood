"use client";

import { updateDonationRequest } from "@/lib/actions/donationRequest";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import {
  FiUser,
  FiDroplet,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiMessageSquare,
  FiCheckCircle,
  FiArrowLeft,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const districts = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

const upazilas = {
  Dhaka: ["Uttara", "Mirpur", "Gulshan", "Dhanmondi", "Motijheel", "Mohammadpur"],
  Chittagong: ["Agrabad", "Panchlaish", "Kotwali", "Chandgaon"],
  Sylhet: ["Sylhet Sadar", "Bianibazar", "Golapganj"],
  Rajshahi: ["Rajshahi Sadar", "Boalia", "Motihar"],
  Khulna: ["Khulna Sadar", "Sonadanga", "Khalishpur"],
  Barishal: ["Barishal Sadar", "Bakerganj"],
  Rangpur: ["Rangpur Sadar", "Gangachara"],
  Mymensingh: ["Mymensingh Sadar", "Trishal"],
};

export default function DonationRequestEditForm({donationDetails, user}) {
  const formData ={...donationDetails}
  const {data} = authClient.useSession();

  const [selectedDistrict, setSelectedDistrict] = useState(formData.recipientDistrict);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formEntries = new FormData(e.currentTarget);
    const updatedPayload = Object.fromEntries(formEntries.entries());
    const filterId = donationDetails?._id;
    const result = await updateDonationRequest(updatedPayload, filterId);
    console.log(result, "this is submition result")
    if(result.matchedCount){
      toast.success("request updated successfully");
      redirect(`/dashboard/${data?.user?.role}/my-requests`)
    }
    console.log("Updated Payload:", updatedPayload);
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] !text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition text-sm";

  const selectClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white !text-gray-900 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition appearance-none text-sm";

  const labelClass = "block text-sm font-semibold mb-2 !text-gray-900 dark:text-gray-300";

  const disabledInputClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b]/20 text-gray-500 dark:text-gray-500 outline-none cursor-not-allowed font-medium text-sm";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 mb-6 transition"
        >
          <FiArrowLeft className="text-base" /> Back to Dashboard
        </button>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="p-8 border-b border-slate-100 dark:border-slate-800/60 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-900/40">
            <h1 className="text-2xl font-black tracking-tight text-red-700">
              Update Donation Request
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Modify the existing parameters for this emergency tracking session securely.
            </p>
          </div>

          <form onSubmit={handleUpdateSubmit} className="p-8 space-y-6">

            {/* Section 1: Requester Details (Read-Only) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Requester Name (Logged In)</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    value={formData.requesterName}
                    disabled
                    className={disabledInputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Requester Email (Logged In)</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className={disabledInputClass}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Recipient Name & Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="recipientName" className={labelClass}>Recipient Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    required
                    defaultValue={formData.recipientName}
                    placeholder="Patient Full Name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bloodGroup" className={labelClass}>Required Blood Group</label>
                <div className="relative">
                  <FiDroplet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    required
                    defaultValue={formData.bloodGroup}
                    className={selectClass}
                  >
                    <option value="" disabled className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                      Select Blood Group
                    </option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group} className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: District & Upazila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="recipientDistrict" className={labelClass}>Recipient District</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                  <select
                    id="recipientDistrict"
                    name="recipientDistrict"
                    required
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className={selectClass}
                  >
                    <option value="" disabled className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                      Select District
                    </option>
                    {districts.map((district) => (
                      <option key={district} value={district} className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="recipientUpazila" className={labelClass}>Recipient Upazila</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                  <select
                    id="recipientUpazila"
                    name="recipientUpazila"
                    required
                    disabled={!selectedDistrict}
                    defaultValue={formData.recipientUpazila}
                    className={`${selectClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="" disabled className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                      Select Upazila
                    </option>
                    {selectedDistrict &&
                      upazilas[selectedDistrict]?.map((upazila) => (
                        <option key={upazila} value={upazila} className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                          {upazila}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Hospital Name & Full Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="hospitalName" className={labelClass}>Hospital Name</label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    id="hospitalName"
                    name="hospitalName"
                    required
                    defaultValue={formData.hospitalName}
                    placeholder="e.g. Dhaka Medical College Hospital"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="fullAddress" className={labelClass}>Full Address Line</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    id="fullAddress"
                    name="fullAddress"
                    required
                    defaultValue={formData.fullAddress}
                    placeholder="e.g. Zahir Raihan Rd, Dhaka"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Donation Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="donationDate" className={labelClass}>Donation Date</label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="date"
                    id="donationDate"
                    name="donationDate"
                    required
                    defaultValue={formData.donationDate}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="donationTime" className={labelClass}>Donation Time</label>
                <div className="relative">
                  <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="time"
                    id="donationTime"
                    name="donationTime"
                    required
                    defaultValue={formData.donationTime}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Section 6: Request Message */}
            <div>
              <label htmlFor="requestMessage" className={labelClass}>Request Message (Details)</label>
              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-4 text-gray-400 text-lg" />
                <textarea
                  id="requestMessage"
                  name="requestMessage"
                  required
                  rows={4}
                  defaultValue={formData.requestMessage}
                  placeholder="Explain in detail why blood is required, patient clinical state, or specific emergency notes..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] !text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition text-sm resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex justify-end items-center gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-5 py-2.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl transition duration-200 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md shadow-red-500/10 transition duration-200 active:scale-95"
              >
                <FiCheckCircle className="text-base" /> Update Donation Request
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}