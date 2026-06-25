import React from 'react';

import { getUserSession } from '@/lib/api/user';
import {  getFilterDonorDonationRequest } from '@/lib/api/donation';
import DonationRequestTable from '@/components/dashboard/my-requests-table/MyRequestsTable';

const page = async ({searchParams}) => {

    const params = await searchParams;
    const filter = params?.filter || "";
    const user = await getUserSession();
  
    // const donorRequests = await getDonorDonationRequests(user.id)
    const donorRequests = await getFilterDonorDonationRequest(user.id, `${filter}`)

    return (
        <div className='w-full overflow-x-hidden'>
            <DonationRequestTable donorRequests={donorRequests} user={user}/>
    
        </div>
    );
};

export default page;