"use client";

import { useState } from "react";
import { Drawer, Button } from "@heroui/react";
import {
  LuLayoutDashboard,
  LuUsers,
  LuDroplet,
  LuCalendarCheck,
  LuTruck,
  LuFileText,
  LuSettings,
  LuLifeBuoy,
  LuPlus,
  LuDroplets,
} from "react-icons/lu";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LuLayoutDashboard },
  { key: "donors", label: "Donors", icon: LuUsers },
  { key: "inventory", label: "Inventory", icon: LuDroplet },
  { key: "appointments", label: "Appointments", icon: LuCalendarCheck },
  { key: "blood-drives", label: "Blood Drives", icon: LuTruck },
  { key: "reports", label: "Reports", icon: LuFileText },
];

const FOOTER_ITEMS = [
  { key: "settings", label: "Settings", icon: LuSettings },
  { key: "support", label: "Support", icon: LuLifeBuoy },
];

function SidebarContent({ activeKey, onSelect }) {
  return (
    <div className="flex h-full w-72 flex-col bg-white transition-colors duration-300">
      {/* Brand Branding Area */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        {/* Logo wrapper mirroring reference bounding boxes */}
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
          <LuPlus className="text-lg" />
          Register Donor
        </Button>
      </div>

      {/* Main Internal Navigation Lists */}
      <nav className="mt-5 flex-1 space-y-1 overflow-y-auto px-3">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = key === activeKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#e2eeff] text-[#1e40af] dark:bg-blue-950/40 dark:text-blue-400"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
              }`}
            >
              {/* Dynamic state token color maps */}
              <Icon className={`text-lg shrink-0 ${isActive ? "text-[#1e40af] dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Base Secondary Utility Footers */}
      <div className="px-3 pb-5">
        {/* Subtle structural separation divider strip */}
        <div className="border-t border-gray-100 dark:border-gray-800 my-2 mx-2 w-auto" />
        <div className="space-y-1">
          {FOOTER_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200 transition-all duration-200"
            >
              <Icon className="text-lg shrink-0 text-gray-400 dark:text-gray-500" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VitalityBloodDrawer() {
  const [activeKey, setActiveKey] = useState("dashboard");

  return (
    <Drawer>
      {/* Drawer layout activation switch */}
      <Button
        isIconOnly
        variant="light"
        aria-label="Toggle sidebar"
        className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl"
      >
        <LuLayoutDashboard className="text-2xl" />
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          {/* Main layout container base tokens targeting dark/light scopes */}
          <Drawer.Dialog className="w-72 max-w-[85vw] bg-white dark:bg-[#111827] border-r border-gray-100 dark:border-gray-800 p-0 transition-colors duration-300">
            <Drawer.CloseTrigger className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800 p-1.5 rounded-lg transition dark:text-gray-500 dark:hover:text-gray-200 z-50" />
            <SidebarContent activeKey={activeKey} onSelect={setActiveKey} />
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}