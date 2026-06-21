import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { getUserSession } from "@/lib/api/user";
import React from "react";

const DonorDashboardlayout = async ({ children }) => {
  const user = await getUserSession();
  return (
    <div className="flex">
      <Sidebar user={user}/>
      <div className="w-full flex-1 lg:ml-50">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
};

export default DonorDashboardlayout;
