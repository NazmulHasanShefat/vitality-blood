import DashboardStats from "@/components/dashboard/DashboardStates";
import { getAllStates } from "@/lib/api/states";
import { getUserSession } from "@/lib/api/user";
import React from "react";
import RecentDonationRequestTable from "../donor/RecentRequestTable";
import { getRecentDonorDonationRequest } from "@/lib/api/donation";

const AdminPage = async () => {
  const allStates = await getAllStates();
  const user = await getUserSession();
  const userRecentDonations = await getRecentDonorDonationRequest(user?.id);
  return (
    <div>
      <DashboardStats allStates={allStates} user={user} />
      <RecentDonationRequestTable donorRequests={userRecentDonations} />
    </div>
  );
};

export default AdminPage;
