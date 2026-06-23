import { getallDonationRequest } from '@/lib/api/donation';
import React from 'react';
import DonationRequestTable from './DonationRequestTable';

const page = async () => {
    const allDonationRequest = await getallDonationRequest();
    return (
        <div>
            all donation request
            <DonationRequestTable donorRequests={allDonationRequest} />
        </div>
    );
};

export default page;