import React from 'react';
import DonationRequestTable from './MyRequestsTable';
import { getUserSession } from '@/lib/api/user';
import { getDonorDonationRequests, getFilterDonorDonationRequest } from '@/lib/api/donation';
import Pagination from '@/components/ui/Pagination';
import PaginationCMP from './PaginationCMP';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const page = async ({searchParams}) => {

    const params = await searchParams;
    const filter = params?.filter || "";
    const user = await getUserSession();
    await delay(2000);
    // const donorRequests = await getDonorDonationRequests(user.id)
    const donorRequests = await getFilterDonorDonationRequest(user.id, `${filter}`)
    console.log(donorRequests)
    return (
        <div className='w-full overflow-x-hidden'>
            <DonationRequestTable donorRequests={donorRequests} user={user}/>
           <PaginationCMP />
        </div>
    );
};

export default page;