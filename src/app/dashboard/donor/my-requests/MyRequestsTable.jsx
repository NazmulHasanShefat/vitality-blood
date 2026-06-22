"use client";

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
  FiUser 
} from "react-icons/fi";
import { OptionsDrop } from "./OptionsDropDown";

export default function DonationRequestTable({donorRequests}) {
  // Mock dataset structured exactly according to your provided database document schema
  const [requests, setRequests] = useState([
    {
      _id: { $oid: "6a379d5f8fa67e2fa90588c1" },
      recipientName: "Rahim Uddin",
      bloodGroup: "B+",
      recipientDistrict: "Dhaka",
      recipientUpazila: "Gulshan",
      hospitalName: "United Hospital",
      fullAddress: "Plot 15, Road 71, Gulshan 2",
      donationDate: "2026-07-09",
      donationTime: "19:14",
      requestMessage: "Emergency surgery require blood immediately.",
      requesterName: "Karim Ahmed",
      requesterId: "6a362d03117538b7b86333ee",
      donationStatus: "inprogress", // Can be pending, inprogress, done, or canceled
      donorInfo: {
        name: "Asif Rahman",
        email: "asif.donor@gmail.com"
      },
      createdAt: { $date: "2026-06-21T08:14:23.783Z" }
    },
    {
      _id: { $oid: "6a379d5f8fa67e2fa90588c2" },
      recipientName: "Sultana Razia",
      bloodGroup: "O-",
      recipientDistrict: "Dhaka",
      recipientUpazila: "Mirpur",
      hospitalName: "Dhaka Medical College",
      fullAddress: "Zahir Raihan Rd, Dhaka",
      donationDate: "2026-06-28",
      donationTime: "11:00",
      requestMessage: "Thalassemia patient regular transfusion.",
      requesterName: "Nigar Sultana",
      requesterId: "6a362d03117538b7b86333ff",
      donationStatus: "pending",
      createdAt: { $date: "2026-06-21T09:30:00.000Z" }
    }
  ]);

  // Modal control states for handling deletions safely
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // Status mutation updates controller logic
  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id.$oid === id ? { ...req, donationStatus: newStatus } : req
      )
    );
    // In production, integrate database API trigger here: axios.patch(`/api/requests/${id}`, { donationStatus: newStatus })
  };

  // Safe delete triggers sequence
  const openDeleteModal = (id) => {
    setSelectedRequestId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setRequests((prev) => prev.filter((req) => req._id.$oid !== selectedRequestId));
    setIsModalOpen(false);
    setSelectedRequestId(null);
    // In production, trigger endpoint mutation here: axios.delete(`/api/requests/${id}`)
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f19] py-8 px-4 sm:px-6 lg:px-8 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Table Content Card Wrapper Layout */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          {/* Header Title Information Context */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Blood Donation Requests</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage, monitor, and process active emergency blood requests.</p>
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
                    <tr key={requestId} className="hover:bg-slate-50/50 dark:hover:bg-[#1e293b]/20 transition duration-150">
                      
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
                          <span className="truncate max-w-[150px]">{request.recipientUpazila}, {request.recipientDistrict}</span>
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
                        {request.donationStatus === "inprogress" && request.donorInfo ? (
                          <div className="text-xs space-y-0.5">
                            <div className="font-bold text-gray-800 dark:text-slate-300 flex items-center gap-1">
                              <FiUser className="text-gray-400" /> {request.donorInfo.name}
                            </div>
                            <div className="text-gray-400 dark:text-gray-500 font-medium">{request.donorInfo.email}</div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 dark:text-gray-600 italic">No assigned donor</span>
                        )}
                      </td>

                      {/* Interactive Custom Status Render Tags Block */}
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border uppercase ${
                          request.donationStatus === "pending" ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30" :
                          request.donationStatus === "inprogress" ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30" :
                          request.donationStatus === "done" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30" :
                          "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700"
                        }`}>
                          {request.donationStatus}
                        </span>
                      </td>

                      {/* Operations Interaction Action Layout Buttons Field Cells */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2.5">
                          
                          {/* Dynamic Functional Conditional Logic Buttons: Appears Only On In-Progress Scopes */}
                          {request.donationStatus === "inprogress" && (
                            <>
                              <button
                                type="button"
                                title="Mark as Done"
                                onClick={() => handleStatusChange(requestId, "done")}
                                className="p-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white rounded-lg transition dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30 dark:hover:bg-emerald-600 dark:hover:text-white"
                              >
                              Done
                              </button>
                              <button
                                type="button"
                                title="Cancel Request"
                                onClick={() => handleStatusChange(requestId, "canceled")}
                                className="p-1.5 bg-red-50 text-[#b91c1c] border border-red-100 hover:bg-[#b91c1c] hover:text-white rounded-lg transition dark:bg-red-950/30 dark:text-[#f87171] dark:border-red-900/30 dark:hover:bg-[#b91c1c] dark:hover:text-white"
                              >
                                <FiX className="text-base" />
                              </button>
                            </>
                          )}

                          {/* Base Utilities Action Links Wrapper Buttons */}
                       

                          <OptionsDrop requestId={requestId}/>
                          
                          <button
                            type="button"
                            title="Edit Request"
                            onClick={() => window.location.href = `/dashboard/edit-donation-request/${requestId}`}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl transition"
                          >
                            <FiEdit2 className="text-sm" />
                          </button>

                          <button
                            type="button"
                            title="Delete Request"
                            onClick={() => openDeleteModal(requestId)}
                            className="p-2 text-gray-400 hover:text-[#b91c1c] hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>

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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#111827] max-w-sm w-full rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 text-center animate-scaleIn">
            <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-950/30 text-[#b91c1c] dark:text-[#f87171] flex items-center justify-center mx-auto text-2xl mb-4">
              <FiTrash2 />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-200">Delete Donation Request?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Are you sure you want to delete this donation request tracking file permanently? This mutation can not be undone.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-5 py-2 text-sm font-semibold bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl transition shadow-md shadow-red-900/10"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}