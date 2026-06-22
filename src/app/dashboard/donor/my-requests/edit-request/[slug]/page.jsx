import React from 'react';
import DonationRequestEditForm from './EditForm';
import { getDonationDetails } from '@/lib/api/donation';

const page = async ({params}) => {
    const {slug} = await params;
    const donationDetails = await getDonationDetails(slug);
    return (
        <div>
            <DonationRequestEditForm donationDetails={donationDetails}/>
        </div>
    );
};

export default page;