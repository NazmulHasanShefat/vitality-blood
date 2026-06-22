import React from 'react';
import DonationRequestTable from './MyRequestsTable';
import { getUserSession } from '@/lib/api/user';
import { getDonorDonationRequests } from '@/lib/api/donation';

const page = async () => {
    const user = await getUserSession();
    const donorRequests = await getDonorDonationRequests(user.id)
    console.log(donorRequests)
    return (
        <div>
            <DonationRequestTable donorRequests={donorRequests}/>
        </div>
    );
};

export default page;