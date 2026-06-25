import AllDonationRequestTable from "@/components/dashboard/all-donation-request-table/AllDonationRequestTable";
import AllPagination from "@/components/ui/AllPagination";
import BloodLoadingSpinner from "@/components/ui/Loading";
import { getallDonationRequest } from "@/lib/api/donation";
import React, { Suspense } from "react";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const filter = params?.filter || "";
  const page = params?.page || "1"
  const donorRequests = await getallDonationRequest(filter, page);
  console.log(donorRequests);
  return (
    <div>
      <Suspense fallback={<BloodLoadingSpinner />}>
        <AllDonationRequestTable donorRequests={donorRequests} />
      </Suspense>

      <AllPagination totalPage={donorRequests?.pagination?.totalPages} />
    </div>
  );
};

export default page;
