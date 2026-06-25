import DonationRequestTable from "@/components/dashboard/my-requests-table/MyRequestsTable";
import AllPagination from "@/components/ui/AllPagination";
import BloodLoadingSpinner from "@/components/ui/Loading";
import {
  getDonorDonationRequests,
  getFilterDonorDonationRequest,
} from "@/lib/api/donation";
import { getUserSession } from "@/lib/api/user";
import React, { Suspense } from "react";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const filter = params?.filter || "";
  const page = params?.page || "1";
  const user = await getUserSession();
  const donorRequests = await getFilterDonorDonationRequest(
    user.id,
    `${filter}`,
    page,
  );
  return (
    <div>
      <Suspense fallback={<BloodLoadingSpinner />}>
        <DonationRequestTable donorRequests={donorRequests} />
      </Suspense>
      <AllPagination totalPage={donorRequests?.pagination?.totalPages} />
    </div>
  );
};

export default page;
