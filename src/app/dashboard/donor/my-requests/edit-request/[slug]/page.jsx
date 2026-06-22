import React from 'react';
import DonationRequestEditForm from './EditForm';
import { getDonationDetails } from '@/lib/api/donation';
import { getUserSession } from '@/lib/api/user';

const page = async ({params}) => {
    const {slug} = await params;
    const donationDetails = await getDonationDetails(slug);
    const user = await getUserSession();
    return (
        <div>
            <DonationRequestEditForm donationDetails={donationDetails} user={user}/>
        </div>
    );
};

export default page;