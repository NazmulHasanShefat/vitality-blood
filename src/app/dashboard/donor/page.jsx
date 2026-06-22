import {
  getDonorDonationRequests,
  getRecentDonorDonationRequest,
} from "@/lib/api/donation";
import React from "react";
import RecentDonationRequestTable from "./RecentRequestTable";
import { getUserSession } from "@/lib/api/user";

const DonorPage = async () => {
  const user = await getUserSession();
  const donorRequests = await getRecentDonorDonationRequest(user.id);
  console.log(donorRequests);
  return (
    <section>
      <div className="bg-slate-50 dark:bg-gray-900 px-8 pt-5">
        <div className="px-5 rounded-lg py-5 bg-white">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Welcome to <span className="text-red-700"> Dashboard </span>
        </h1>
        <p>
          Welcome to your donor dashboard. Here you can manage your profile,
          track your donation activity, respond to blood requests, and continue
          making a life-saving impact in your community.
        </p>
        </div>
      </div>
      <RecentDonationRequestTable donorRequests={donorRequests} />
    </section>
  );
};

export default DonorPage;
