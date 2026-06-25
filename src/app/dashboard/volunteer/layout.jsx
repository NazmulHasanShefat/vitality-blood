import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { getUserSession } from "@/lib/api/user";
import { requireRole } from "@/lib/core/session";
import React from "react";
export const dynamic = "force-dynamic";

const VolunteerLayout = async ({ children }) => {
  await requireRole("volunteer")
    const user = await getUserSession();
  return (
    <div className="flex">
      <Sidebar user={user} />
      <div className="w-full flex-1 lg:ml-50 overflow-x-hidden">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
};

export default VolunteerLayout;
