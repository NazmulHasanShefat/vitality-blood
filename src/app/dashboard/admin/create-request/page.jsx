import CreateDonationRequest from '@/components/dashboard/create-donation-request-form/requestForm';
import { getUserSession } from '@/lib/api/user';
import React from 'react';

const CreateRequestPage = async () => {
    const user = await getUserSession();
    return (
        <div>
            <CreateDonationRequest user={user}/>
        </div>
    );
};

export default CreateRequestPage;