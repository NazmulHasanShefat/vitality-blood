import AllDonationRequestTable from '@/components/dashboard/all-donation-request-table/AllDonationRequestTable';
import { getallDonationRequest } from '@/lib/api/donation';
import React from 'react';

const page = async ({searchParams}) => {
    const params = await searchParams;
    const filter = params?.filter || "";
    const donorRequests = await getallDonationRequest(filter);
    return (
        <div>
           <AllDonationRequestTable donorRequests={donorRequests} />
        </div>
    );
};

export default page;