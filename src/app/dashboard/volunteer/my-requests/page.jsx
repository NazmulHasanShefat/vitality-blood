import DonationRequestTable from '@/components/dashboard/my-requests-table/MyRequestsTable';
import { getDonorDonationRequests } from '@/lib/api/donation';
import { getUserSession } from '@/lib/api/user';
import React from 'react';

const page = async () => {
    const user = await getUserSession();
    const donorRequests = await getDonorDonationRequests(user?.id);
    return (
        <div>
            my all requests
            <DonationRequestTable donorRequests={donorRequests} />
        </div>
    );
};

export default page;