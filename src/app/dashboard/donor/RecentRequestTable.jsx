"use client";

import DeleteConfirmModal from "@/components/dashboard/deleteModal/DeleteConfirmModal";
import { OptionsDrop } from "@/components/dashboard/donation-requests-options/OptionsDropDown";
import Link from "next/link";
import React, { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCheck,
  FiX,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUser,
} from "react-icons/fi";



export default function RecentDonationRequestTable({ donorRequests }) {
  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f19] py-8 px-4 sm:px-6 lg:px-8 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Table Content Card Wrapper Layout */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* Header Title Information Context */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
               Recent Blood Donation Requests
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Manage, monitor, and process active emergency blood requests.
              </p>
            </div>
          </div>

          {/* Responsive Layout Scroll View Wrapping Table Element Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#1e293b]/50 border-b border-gray-100 dark:border-gray-800 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-4 px-6">Recipient</th>
                  <th className="py-4 px-6">Blood Group</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Schedule</th>
                  <th className="py-4 px-6">Donor Details</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                {donorRequests.map((request) => {
                  const requestId = request?._id;
                  return (
                    <tr
                      key={requestId}
                      className="hover:bg-slate-50/50 dark:hover:bg-[#1e293b]/20 transition duration-150"
                    >
                      {/* Recipient Identity Cells */}
                      <td className="py-4 px-6 font-bold text-gray-900 dark:text-slate-200">
                        {request.recipientName}
                      </td>

                      {/* Blood Token Display Container Badge */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center justify-center bg-red-50 dark:bg-red-950/40 text-[#b91c1c] dark:text-[#f87171] font-extrabold px-3 py-1 rounded-lg text-xs border border-red-100 dark:border-red-900/30">
                          {request.bloodGroup}
                        </span>
                      </td>

                      {/* Geolocation Coordinate Points Maps Column */}
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <FiMapPin className="text-gray-400 shrink-0 text-base" />
                          <span className="truncate max-w-[150px]">
                            {request.recipientUpazila},{" "}
                            {request.recipientDistrict}
                          </span>
                        </div>
                      </td>

                      {/* Scheduling Deadlines Node Grid Cells */}
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                        <div className="space-y-1 text-xs font-medium">
                          <div className="flex items-center gap-1.5">
                            <FiCalendar className="text-gray-400" />
                            <span>{request.donationDate}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FiClock className="text-gray-400" />
                            <span>{request.donationTime}</span>
                          </div>
                        </div>
                      </td>

                           {/* Donor Information Node (Conditional Block Logic Execution Area) */}
                      <td className="py-4 px-6">
                        {request.donationStatus === "inprogress" &&
                        request.donorInfo ? (
                          <div className="text-xs space-y-0.5">
                            <div className="font-bold text-gray-800 dark:text-slate-300 flex items-center gap-1">
                              <FiUser className="text-gray-400" />{" "}
                              {request.donorInfo.name}
                            </div>
                            <div className="text-gray-400 dark:text-gray-500 font-medium">
                              {request.donorInfo.email}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 dark:text-gray-600 italic">
                            No assigned donor
                          </span>
                        )}
                      </td>

                      {/* Interactive Custom Status Render Tags Block */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border uppercase ${
                            request.donationStatus === "pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30"
                              : request.donationStatus === "inprogress"
                                ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30"
                                : request.donationStatus === "done"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30"
                                  : "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700"
                          }`}
                        >
                          {request.donationStatus}
                        </span>
                      </td>
                 

                      {/* Operations Interaction Action Layout Buttons Field Cells */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2.5">
                          {/* Dynamic Functional Conditional Logic Buttons: Appears Only On In-Progress Scopes */}
                  

                          {/* Base Utilities Action Links Wrapper Buttons */}

                          <OptionsDrop requestId={requestId} request={request}/>

                          <DeleteConfirmModal />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Safe Interceptor Modal Overlay Layer Layout */}
    
    </div>
  );
}
