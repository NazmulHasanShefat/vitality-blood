import React, { Suspense } from "react";

import { getUserSession } from "@/lib/api/user";
import { getFilterDonorDonationRequest } from "@/lib/api/donation";
import DonationRequestTable from "@/components/dashboard/my-requests-table/MyRequestsTable";
import BloodLoadingSpinner from "@/components/ui/Loading";
import AllPagination from "@/components/ui/AllPagination";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const filter = params?.filter || "";
  const user = await getUserSession();
  const page = params?.page || "1";
  // const donorRequests = await getDonorDonationRequests(user.id)
  const donorRequests = await getFilterDonorDonationRequest(
    user.id,
    `${filter}`,
    page
  );

  return (
    <div className="w-full overflow-x-hidden">
      <Suspense fallback={<BloodLoadingSpinner />}>
        <DonationRequestTable donorRequests={donorRequests} user={user} />
      </Suspense>
      <AllPagination totalPage={2}/>
    </div>
  );
};

export default page;
