import { getDonorDonationRequests, getRecentDonorDonationRequest } from "@/lib/api/donation";
import React from "react";
import RecentDonationRequestTable from "./RecentRequestTable";
import { getUserSession } from "@/lib/api/user";

const DonorPage = async () => {
  const user = await getUserSession();
  const donorRequests = await getRecentDonorDonationRequest(user.id);
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold ">
        Welcome to <span className="text-red-700"> Dashboard </span>
      </h1>
      <p>
        Welcome to your donor dashboard. Here you can manage your profile, track
        your donation activity, respond to blood requests, and continue making a
        life-saving impact in your community.
      </p>
      <RecentDonationRequestTable donorRequests={donorRequests} />
    </div>
  );
};

export default DonorPage;
