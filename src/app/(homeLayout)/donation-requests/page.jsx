import { Suspense } from "react";
import FindLifeSaver from "./requestCmp";
import { getPendingBloodDonationRequest } from "@/lib/api/donation";
import { getUserSession } from "@/lib/api/user";
import AllPagination from "@/components/ui/AllPagination";

const DRComponentWrapper = async ({ searchParams }) => {
  const params = await searchParams;
  const blood = params?.blood || "";
  const district = params?.district || "";
  const divition = params?.divition || "";
  const page = params?.page || "1"

  const allPedingBloodDonationRequests = getPendingBloodDonationRequest(
    blood,
    divition,
    district,
    page
  );
  const user = await getUserSession();
  return (
    <div>
      <FindLifeSaver
        pedingRequests={allPedingBloodDonationRequests}
        user={user}
      />
    
    </div>
  );
};

export default DRComponentWrapper;
