import { getallDonationRequest } from '@/lib/api/donation';
import React from 'react';
import DonationRequestTable from './DonationRequestTable';
import AllPagination from '@/components/ui/AllPagination';

const page = async ({searchParams}) => {
    const params = await searchParams;
    const filter = params.filter || "";
    const page = params.page || "1";
    const allDonationRequest = await getallDonationRequest(filter, page);
    return (
        <div>
            <DonationRequestTable donorRequests={allDonationRequest} />
            <AllPagination totalPage={allDonationRequest?.pagination?.totalPages}/>
        </div>
    );
};

export default page;