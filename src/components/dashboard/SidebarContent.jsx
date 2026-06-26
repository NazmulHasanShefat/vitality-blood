import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import {
  LuCalendarCheck,
  LuDroplet,
  LuDroplets,
  LuFileText,
  LuLayoutDashboard,
  LuLifeBuoy,
  LuPlus,
  LuSettings,
  LuTruck,
  LuUsers,
} from "react-icons/lu";
import { FiGrid, FiUsers } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import SignOut from "../ui/SignOut";

export default function SidebarContent({ onClose, user }) {
  const pathName = usePathname();
  const getNavItem = () => {
    if (user?.role === "donor") {
      return [
        { key: "dashboard", label: "Dashboard", href: "/dashboard/donor", icon: FiGrid },
        { key: "my-request", label: "My Request", href: "/dashboard/donor/my-requests", icon: FiUsers },
        { key: "create-request", label: "Create Request", href: "/dashboard/donor/create-request", icon: FiUsers },
        { key: "profile", label: "Profile", href: "/dashboard/donor/profile", icon: FaRegUser },
      ];
    }
    if (user?.role === "admin") {
      return [
        { key: "dashboard", label: "Dashboard", href: "/dashboard/admin", icon: FiGrid },
        { key: "my-request", label: "My Request", href: "/dashboard/admin/my-requests", icon: FiUsers },
        { key: "create-request", label: "Create Request", href: "/dashboard/admin/create-request", icon: FiUsers },
        { key: "profile", label: "Profile", href: "/dashboard/admin/profile", icon: FaRegUser },
        { key: "all-users", label: "All Users", href: "/dashboard/admin/all-users", icon: LuUsers },
        { key: "all-donation-request", label: "All Donation Request", href: "/dashboard/admin/all-donation-requests", icon: LuFileText },
      ];
    } else {
      return [
        { key: "dashboard", label: "Dashboard", href: "/dashboard/volunteer", icon: FiGrid },
        { key: "my-request", label: "My Request", href: "/dashboard/volunteer/my-requests", icon: FiUsers },
        { key: "create-request", label: "Create Request", href: "/dashboard/volunteer/create-request", icon: FiUsers },
        { key: "profile", label: "Profile", href: "/dashboard/volunteer/profile", icon: FaRegUser },
        { key: "all-donation-request", label: "All Donation Request", href: "/dashboard/volunteer/all-donation-requests", icon: LuFileText },
      ];
    }
  };

  const menuItems = getNavItem();

  const FOOTER_ITEMS = [
    { key: "settings", label: "Settings", href: "/dashboard/settings", icon: LuSettings },
    { key: "support", label: "Support", href: "/dashboard/support", icon: LuLifeBuoy },
  ];

  return (
    <div className="flex h-full w-72 flex-col bg-white transition-colors duration-300">
      {/* Brand Branding Area */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#b91c1c] shadow-md shadow-red-600/10">
          <LuDroplets className="text-lg text-white fill-current" />
        </div>
        <div className="leading-tight flex flex-col text-left">
          <p className="text-base font-bold tracking-tight text-[#990000] dark:text-[#ef4444]">
            VitalityBlood
          </p>
          <p className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-wide">
            Clinical Admin
          </p>
        </div>
      </div>

      {/* Primary Action Call: Register Donor */}
      <div className="px-4">
        <Button className="w-full justify-center gap-2 rounded-xl bg-[#b91c1c] font-semibold text-white transition-all duration-200 hover:bg-[#991b1b] shadow-md shadow-red-900/10 active:scale-[0.98] dark:bg-[#b91c1c] dark:hover:bg-[#a11818]">
    
         {user?.role}
        </Button>
      </div>

      {/* Main Internal Navigation Lists */}
      <nav className="mt-5 flex-1 space-y-1 overflow-y-auto px-3">
        {menuItems.map(({ key, label, href, icon: Icon }) => {
          return (
            <Link
              key={key}
              href={href}
              onClick={onClose} // এখানে 'onclose' এর বদলে 'onClose' করা হয়েছে
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                pathName === href
                  ? "bg-[#e2eeff] text-[#1e40af] dark:bg-blue-950/40 dark:text-blue-400"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
              }`}
            >
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Items (যদি এখানেও ক্লিক করলে ড্রয়ার বন্ধ করতে চান, তবে এখানেও onClick={onClose} ব্যবহার করতে পারেন) */}
      <div className="px-3 pb-5">
        <div className="border-t border-gray-100 dark:border-gray-800 my-2 mx-2 w-auto" />
        <div className="space-y-1">
         <SignOut />
        </div>
      </div>
    </div>
  );
}