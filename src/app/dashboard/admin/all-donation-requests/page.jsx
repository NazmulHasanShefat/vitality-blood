import { getallDonationRequest } from '@/lib/api/donation';
import React from 'react';
import DonationRequestTable from './DonationRequestTable';

const page = async ({searchParams}) => {
    const params = await searchParams;
    const filter = params.filter || ""
    const allDonationRequest = await getallDonationRequest(filter);
    return (
        <div>
            <DonationRequestTable donorRequests={allDonationRequest} />
        </div>
    );
};

export default page;