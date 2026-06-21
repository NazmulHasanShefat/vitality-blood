import React from 'react';
import CreateDonationRequest from './requestForm';
import { getUserSession } from '@/lib/api/user';

const page = async () => {
    const user = await getUserSession()
    return (
        <div>
            <CreateDonationRequest user={user}/>
        </div>
    );
};

export default page;