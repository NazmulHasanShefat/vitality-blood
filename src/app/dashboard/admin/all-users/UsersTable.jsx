"use client";
import { UsersOptionsDropDown } from "@/components/ui/UsersOptionsDropdown";
import React from "react";
import { 
  FiShield, 
  FiUserCheck, 
  FiUserX, 
  FiCheckCircle, 
  FiMail,
  FiMapPin
} from "react-icons/fi";

export default function UsersTable({ usersData = [], onAction, currentStatus, onStatusChange }) {
  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b0f19] py-8 px-4 sm:px-6 lg:px-8 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* টেবিলের মূল কন্টেইনার কার্ড */}
        <div className="bg-white w-full dark:bg-[#111827] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          {/* হেডার সেকশন */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                Manage System Users
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                View, update roles, and manage account statuses directly from the action bar.
              </p>
            </div>

            {/* সিলেক্ট ইনপুট */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <select
                value={currentStatus}
                onChange={(e) => onStatusChange?.(e.target.value)}
                className="text-xs font-semibold bg-gray-50 dark:bg-[#1e293b] text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer transition-all duration-200 shadow-sm min-w-[130px]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* টেবিল রেপার */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left border-collapse table-auto">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#1e293b]/50 border-b border-gray-100 dark:border-gray-800 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6 text-center">Blood Group</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center w-[160px]">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                {usersData.length > 0 ? (
                  usersData.map((user) => {
                    const userId = user._id?.$oid || user._id || user.id;

                    return (
                      <tr 
                        key={userId} 
                        className="hover:bg-slate-50/50 dark:hover:bg-[#1e293b]/20 transition duration-150"
                      >
                        {/* ১. ইউজার অবতার এবং নাম */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img 
                              src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"} 
                              alt={user.name} 
                              className="w-10 h-10 rounded-full object-cover border border-gray-150 dark:border-gray-700 shadow-sm bg-slate-100"
                            />
                            <span className="font-bold text-gray-900 dark:text-slate-200 whitespace-nowrap">
                              {user.name}
                            </span>
                          </div>
                        </td>

                        {/* ২. ইমেইল এড্রেস */}
                        <td className="py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">
                          <div className="flex items-center gap-1.5">
                            <FiMail className="text-gray-400 shrink-0" />
                            <span>{user.email}</span>
                          </div>
                        </td>

                        {/* ৩. ব্লাড গ্রুপ */}
                        <td className="py-4 px-6 text-center">
                          <span className="inline-block bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 font-extrabold px-3 py-1 rounded-md text-xs tracking-wide">
                            {user.bloodGroup || "N/A"}
                          </span>
                        </td>

                        {/* ৪. জেলা ও উপজেলা */}
                        <td className="py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">
                          <div className="flex items-center gap-1.5 text-xs">
                            <FiMapPin className="text-gray-400 shrink-0" />
                            <span className="capitalize">{user.upazila}, {user.district}</span>
                          </div>
                        </td>

                        {/* ৫. ইউজার রোল ব্যাজ */}
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

                        {/* ৬. ইউজার স্টেটাস ব্যাজ */}
                        <td className="py-4 px-6">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border uppercase ${
                            user.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30"
                              : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/30"
                          }`}>
                            {user.status}
                          </span>
                        </td>

                        {/* ৭. ইন-লাইন অ্যাকশন আইকন বাটনসমূহ (কোন ড্রপডাউন নেই) */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            
                        <UsersOptionsDropDown user={user}/>

                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-400 dark:text-gray-500 font-medium italic">
                      No users available.
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