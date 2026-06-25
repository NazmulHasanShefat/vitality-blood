"use client";
import { Drawer, Button } from "@heroui/react"; // useDisclosure ইমপোর্ট করা হলো
import { LuLayoutDashboard } from "react-icons/lu";
import { authClient } from "@/lib/auth-client";
import SidebarContent from "./SidebarContent";
import { useDisclosure } from "@heroui/use-disclosure";
export default function VitalityBloodDrawer() {
  const { data } = authClient.useSession();
  const user = data?.user;
  
  // Hero UI এর Disclosure হুক ব্যবহার করে স্টেট ম্যানেজ করা
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      {/* Drawer ট্রিগার করার বাটন */}
      <Button
        isIconOnly
        variant="light"
        aria-label="Toggle sidebar"
        onClick={onOpen} // এখানে বাটন ক্লিকে ওপেন হবে
        className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl"
      >
        <LuLayoutDashboard className="text-2xl" />
      </Button>

      {/* isOpen এবং onOpenChange ড্রয়ারে পাস করা হলো */}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="w-72 max-w-[85vw] bg-white dark:bg-[#111827] border-r border-gray-100 dark:border-gray-800 p-0 transition-colors duration-300">
              <Drawer.CloseTrigger className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800 p-1.5 rounded-lg transition dark:text-gray-500 dark:hover:text-gray-200 z-50" />
              
              {/* onClose ফাংশনটি প্রপ্স হিসেবে পাঠানো হলো */}
              <SidebarContent user={user} onClose={onClose} />
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}