import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { getUserSession } from "@/lib/api/user";
import React from "react";

const AdminLayout = async ({ children }) => {
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

export default AdminLayout;
