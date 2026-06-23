import AllDonationRequestTable from '@/components/dashboard/all-donation-request-table/AllDonationRequestTable';
import { getallDonationRequest } from '@/lib/api/donation';
import React from 'react';

const page = async () => {
    const donorRequests = await getallDonationRequest();
    return (
        <div>
           <AllDonationRequestTable donorRequests={donorRequests} />
        </div>
    );
};

export default page;