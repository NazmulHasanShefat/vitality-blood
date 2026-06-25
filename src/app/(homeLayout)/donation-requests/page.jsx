import React from 'react';
import FindLifeSaver from './requestCmp';
import { getPendingBloodDonationRequest } from '@/lib/api/donation';
import { getUserSession } from '@/lib/api/user';
import { getuserToken } from '@/lib/core/session';

const page = async () => {
    const allPedingBloodDonationRequests = await getPendingBloodDonationRequest();
    const user = await getUserSession()
    return (
        <div>
            <FindLifeSaver pedingRequests={allPedingBloodDonationRequests} user={user}/>
        </div>
    );
};

export default page;