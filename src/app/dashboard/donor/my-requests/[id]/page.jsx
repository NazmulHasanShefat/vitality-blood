import { getDonationDetails } from "@/lib/api/donation";
import {
  FiDroplet,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUser,
  FiFileText,
  FiActivity,
  FiArrowLeft,
  FiMessageSquare,
  FiHeart,
} from "react-icons/fi";
import DonateNowModal from "./DonateNowModal";
import { getUserSession } from "@/lib/api/user";

export default async function DonationRequestDetails({ params }) {
  const { id } = await params;
  console.log(id);
  // Mocking the data fetched via API based on your exact MongoDB document structure
  const requestDetails = await getDonationDetails(id);
  const user = await getUserSession();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-[#0f172a] dark:text-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Navigation / Header Action Top Bar */}
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-slate-100 mb-6 transition"
        >
          <FiArrowLeft className="text-base" />
          Back to Dashboard
        </button>

        {/* Main Clean Structural Master Profile Container Card Layout */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* Top Primary Identity Spotlight Banner Panel */}
          <div className="bg-gradient-to-r from-[#990000] to-[#b91c1c] p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-12 -translate-y-12 blur-xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
              <div className="flex items-center gap-4">
                {/* Dynamic visual bounding blood group container accent badge */}
                <div className="h-16 w-16 rounded-2xl bg-white text-[#b91c1c] flex flex-col items-center justify-center shadow-lg font-black text-2xl tracking-tighter select-none shrink-0">
                  <span>{requestDetails.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-red-200/90 bg-red-900/30 px-2.5 py-0.5 rounded-md">
                    Emergency Request Details
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                    {requestDetails.recipientName}
                  </h1>
                </div>
              </div>

              {/* Status Indicator Tag matching specific dynamic constraints */}
              <div className="shrink-0">
                <span
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white tracking-wider border ${
                    requestDetails.donationStatus === "pending"
                      ? "bg-amber-500/10 text-amber-600 border-amber-600"
                      : requestDetails.donationStatus === "inprogress"
                        ? "bg-blue-500/10 text-purple-500 border-purple-500"
                        : requestDetails.donationStatus === "done"
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                          : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                  }`}
                >
                  <FiActivity className="animate-pulse" />
                  {requestDetails.donationStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Core Information Data Node Distribution Blocks Grid Area */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Row Section 1: Distribution Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card Block Item A: Logistics Delivery Schedules */}
              <div className="bg-slate-50 dark:bg-[#1e293b]/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/60">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-3">
                  <FiCalendar className="text-sm text-gray-400" /> Donation
                  Schedule
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-200">
                    Date:{" "}
                    <span className="font-semibold">
                      {requestDetails.donationDate}
                    </span>
                  </p>
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-200">
                    Time:{" "}
                    <span className="font-semibold">
                      {requestDetails.donationTime}
                    </span>
                  </p>
                </div>
              </div>

              {/* Card Block Item B: Location Boundaries Parameters mapping metrics */}
              <div className="bg-slate-50 dark:bg-[#1e293b]/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/60">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-3">
                  <FiMapPin className="text-sm text-gray-400" /> Destination
                  Scope
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-200">
                    Upazila:{" "}
                    <span className="font-semibold">
                      {requestDetails.recipientUpazila}
                    </span>
                  </p>
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-200">
                    District:{" "}
                    <span className="font-semibold">
                      {requestDetails.recipientDistrict}
                    </span>
                  </p>
                </div>
              </div>

              {/* Card Block Item C: Meta-Information Origin Properties Tracker */}
              <div className="bg-slate-50 dark:bg-[#1e293b]/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/60 sm:col-span-2 lg:col-span-1">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-3">
                  <FiUser className="text-sm text-gray-400" /> Requester Profile
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-200">
                    Name:{" "}
                    <span className="font-semibold">
                      {requestDetails.requesterName}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-mono truncate">
                    Email: {requestDetails?.requesterEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Row Section 2: Clinical Hospital Distribution Address Details */}
            <div className="border-t border-gray-100 dark:border-gray-800/80 pt-6">
              <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <FiMapPin className="text-base text-[#b91c1c] dark:text-[#ef4444]" />{" "}
                Hospital & Medical Center Logistics
              </h3>
              <div className="space-y-2 bg-slate-50 dark:bg-[#1e293b]/20 p-5 rounded-2xl border border-gray-100 dark:border-gray-800/40">
                <div>
                  <span className="text-xs font-semibold text-gray-400">
                    Target Institution:
                  </span>
                  <p className="text-base font-bold text-gray-900 dark:text-slate-200">
                    {requestDetails.hospitalName}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-200/50 dark:border-gray-800/50">
                  <span className="text-xs font-semibold text-gray-400">
                    Full Address Layout:
                  </span>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
                    {requestDetails.fullAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Row Section 3: In-Depth Detailed Request Message Text Message Block */}
            <div className="border-t border-gray-100 dark:border-gray-800/80 pt-6">
              <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <FiMessageSquare className="text-base text-[#b91c1c] dark:text-[#ef4444]" />{" "}
                Clinical Notes / Request Message
              </h3>
              <div className="bg-red-50/30 dark:bg-red-950/10 border border-red-100/60 dark:border-red-900/20 p-5 rounded-2xl text-sm leading-relaxed text-gray-700 dark:text-gray-300 italic font-medium">
                &ldquo;{requestDetails.requestMessage}&rdquo;
              </div>
            </div>

            {/* Row Section 4: Document Registration Technical Logs */}
            <div className="border-t border-gray-100 dark:border-gray-800/60 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-medium text-gray-400 dark:text-gray-500 gap-2">
              <span className="flex items-center gap-1.5">
                <FiFileText /> System File ID:{" "}
                <span className="font-mono">{requestDetails._id.$oid}</span>
              </span>
              <span>
                Broadcast Date:{" "}
                {new Date(requestDetails.createdAt.$date).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Footer Optional Call to Action Block */}
          <div className="bg-gray-50 dark:bg-[#1e293b]/30 px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
            {/* <button
              type="button"
              className="inline-flex items-center justify-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md shadow-red-900/10 active:scale-[0.98]"
            >
              <FiHeart className="text-base fill-current" />
              Donate now
            </button> */}
            <DonateNowModal user={user} requestDetails={requestDetails}/>
          </div>
        </div>
      </div>
    </div>
  );
}
