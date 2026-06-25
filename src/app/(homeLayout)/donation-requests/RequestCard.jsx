import { Card } from "@heroui/react";
import Link from "next/link";
import React, { use } from "react";
import {
  HiOutlineCalendar,
  HiOutlineHeart,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { MdOutlineMessage, MdVerifiedUser } from "react-icons/md";

const RequestCard = ({ donationData, user }) => {
  const pendingDonationsData = use(donationData);
  const pendingDonations = pendingDonationsData?.data;
  console.log(pendingDonationsData)
  return (
    <>
      {pendingDonations.map((donor, index) => (
        <Card
          key={index}
          className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            {/* Header Row with Blood Badge and Verification Pill */}
            <div className="p-4 flex justify-between items-start">
              {/* Blood Group Circle Icon */}
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {donor.bloodGroup}
              </div>

              {/* Status Pill Dynamic Styling */}
              {donor.donationStatus === "verified" ? (
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400 px-2 py-1 rounded-md border border-green-200 dark:border-green-900/50">
                  <MdVerifiedUser className="text-xs" /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-900/50">
                  Rare Group
                </span>
              )}
            </div>

            {/* Hero UI Main Info Context Area */}
            <div className="px-4 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">
                {donor.recipientName}
              </h3>

              <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 mb-4">
                <HiOutlineLocationMarker />
                <span>{donor.fullAddress}</span>
              </div>

              {/* Informational Rows */}
              <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400 dark:text-slate-500">
                    Donation Date:
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <HiOutlineCalendar className="text-slate-400" />{" "}
                    {donor.donationDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 dark:text-slate-500">
                    Donation Time:
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {donor?.donationTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero UI Footer Containing Actions */}
          <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
            {donor.donationStatus === "rare group" ? (
              <Link
                href="#"
                className="w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm"
              >
                <MdOutlineMessage className="text-sm" />
                <span>Send Urgent Request</span>
              </Link>
            ) : (
              <Link
                href={
                  !user
                    ? `/login`
                    : `/dashboard/${user?.role}/my-requests/${donor._id}`
                }
                className="w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm"
              >
                <HiOutlineHeart className="text-sm" />
                <span>Contact Donor</span>
              </Link>
            )}
          </div>
        </Card>
      ))}
    </>
  );
};

export default RequestCard;
