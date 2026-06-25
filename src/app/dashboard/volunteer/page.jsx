import DashboardStats from "@/components/dashboard/DashboardStates";
import { getAllStates } from "@/lib/api/states";
import { getUserSession } from "@/lib/api/user";
import React from "react";
import RecentDonationRequestTable from "../donor/RecentRequestTable";
import { getRecentDonorDonationRequest } from "@/lib/api/donation";

const VolunteerHomePage = async () => {
  const user = await getUserSession();
  const allStates = await getAllStates();
  const userRecentDonations = await getRecentDonorDonationRequest(user?.id);
  return (
    <div>
      <DashboardStats user={user} allStates={allStates} />
      <RecentDonationRequestTable donorRequests={userRecentDonations} />
    </div>
  );
};

export default VolunteerHomePage;
