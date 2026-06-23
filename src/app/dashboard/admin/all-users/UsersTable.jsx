"use client";
import React, { useState } from "react";
import { 
  FiMoreVertical, 
  FiShield, 
  FiUserCheck, 
  FiUserX, 
  FiCheckCircle, 
  FiFilter,
  FiMail
} from "react-icons/fi";

export default function UsersTable({ usersData = [], onAction }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ড্রপডাউন টগল করার হ্যান্ডলার
  const toggleDropdown = (userId) => {
    if (activeDropdown === userId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(userId);
    }
  };

  // স্টেটাস অনুযায়ী ইউজার ফিল্টার করার লজিক
  const filteredUsers = usersData.filter((user) => {
    if (statusFilter === "all") return true;
    return user.status === statusFilter;
  });

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f19] py-8 px-4 sm:px-6 lg:px-8 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* টেবিলের মূল কন্টেইনার কার্ড */}
        <div className="bg-white w-full dark:bg-[#111827] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          {/* হেডার সেকশন: টাইটেল এবং ফিল্টারিং অপশন */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                Manage System Users
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                View, filter, update roles, and manage account statuses for all users.
              </p>
            </div>

            {/* ফিল্টার সিলেক্ট বাটন */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <label htmlFor="filterStatus" className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <FiFilter className="text-gray-400 text-sm" />
                <span>Status:</span>
              </label>
              <select
                id="filterStatus"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs font-medium bg-gray-50 dark:bg-[#1e293b] text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer transition-all duration-200 shadow-sm min-w-[130px]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* টেবিল রেপার (ডেস্কটপ এবং স্ক্রলিংয়ের জন্য) */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[850px] text-left border-collapse table-auto">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#1e293b]/50 border-b border-gray-100 dark:border-gray-800 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr 
                      key={user._id} 
                      className="hover:bg-slate-50/50 dark:hover:bg-[#1e293b]/20 transition duration-150"
                    >
                      {/* ইউজার অবতার এবং নাম */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"} 
                            alt={user.name} 
                            className="w-10 h-10 rounded-full object-cover border border-gray-150 dark:border-gray-700 shadow-sm bg-slate-100"
                          />
                          <span className="font-bold text-gray-900 dark:text-slate-200">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* ইমেইল এড্রেস */}
                      <td className="py-4 px-6 text-gray-650 dark:text-gray-400 font-medium">
                        <div className="flex items-center gap-1.5">
                          <FiMail className="text-gray-400 shrink-0" />
                          <span>{user.email}</span>
                        </div>
                      </td>

                      {/* ইউজার রোল ব্যাজ */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border capitalize ${
                          user.role === 'admin' 
                            ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/30'
                            : user.role === 'volunteer'
                            ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30'
                            : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/40 dark:text-slate-300 dark:border-slate-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>

                      {/* ইউজার স্টেটাস ব্যাজ */}
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border uppercase ${
                          user.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30"
                            : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/30"
                        }`}>
                          {user.status}
                        </span>
                      </td>

                      {/* থ্রি-ডট ড্রপডাউন অ্যাকশন মেনু */}
                      <td className="py-4 px-6 text-center relative">
                        <button
                          onClick={() => toggleDropdown(user._id)}
                          className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition duration-150"
                        >
                          <FiMoreVertical className="text-base mx-auto" />
                        </button>

                        {/* ড্রপডাউন মেনু পপআপ */}
                        {activeDropdown === user._id && (
                          <>
                            {/* ড্রপডাউন ক্লিক ব্যাকড্রপ ক্লোজার */}
                            <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)}></div>
                            
                            <div className="absolute right-6 mt-1 w-52 bg-white dark:bg-[#1f2937] border border-gray-100 dark:border-gray-700 rounded-xl shadow-2xl z-20 overflow-hidden divide-y divide-gray-50 dark:divide-gray-700/50 animation-fade-in">
                              
                              {/* ১. ব্লক / আনব্লক অ্যাকশন বাটন */}
                              <div className="py-1">
                                {user.status === "active" ? (
                                  <button
                                    onClick={() => { onAction(user._id, "block"); setActiveDropdown(null); }}
                                    className="w-full px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 transition"
                                  >
                                    <FiUserX className="text-sm" />
                                    <span>Block User</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => { onAction(user._id, "unblock"); setActiveDropdown(null); }}
                                    className="w-full px-4 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 flex items-center gap-2 transition"
                                  >
                                    <FiCheckCircle className="text-sm" />
                                    <span>Unblock User</span>
                                  </button>
                                )}
                              </div>

                              {/* ২. রোল পরিবর্তনের বাটনসমূহ */}
                              <div className="py-1">
                                {/* ডোনার থেকে ভলান্টিয়ার বানানোর বাটন */}
                                {user.role === "donor" && (
                                  <button
                                    onClick={() => { onAction(user._id, "makeVolunteer"); setActiveDropdown(null); }}
                                    className="w-full px-4 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 flex items-center gap-2 transition"
                                  >
                                    <FiUserCheck className="text-sm" />
                                    <span>Make Volunteer</span>
                                  </button>
                                )}

                                {/* ডোনার বা ভলান্টিয়ার থেকে এডমিন বানানোর বাটন */}
                                {user.role !== "admin" && (
                                  <button
                                    onClick={() => { onAction(user._id, "makeAdmin"); setActiveDropdown(null); }}
                                    className="w-full px-4 py-2 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/20 flex items-center gap-2 transition"
                                  >
                                    <FiShield className="text-sm" />
                                    <span>Make Admin</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400 dark:text-gray-500 font-medium italic">
                      No users found matching the selected criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}