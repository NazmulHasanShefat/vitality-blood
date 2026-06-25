import React from 'react';
import FindLifeSaver from './requestCmp';
import { getPendingBloodDonationRequest } from '@/lib/api/donation';
import { getUserSession } from '@/lib/api/user';
import { getuserToken } from '@/lib/core/session';

export const dynamic = "force-dynamic";
const page = async ({searchParams}) => {
    const params = await searchParams;
    const blood = params?.blood || "";
    const district = params?.district || "";
    const upazila = params?.upazila || "";

    const allPedingBloodDonationRequests = await getPendingBloodDonationRequest(blood, null, district);
    const user = await getUserSession()
    return (
        <div>
            <FindLifeSaver pedingRequests={allPedingBloodDonationRequests} user={user}/>
        </div>
    );
};

export default page;