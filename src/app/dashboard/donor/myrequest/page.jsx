import React from 'react';
import CreateDonationRequest from './requestForm';
import { getUserSession } from '@/lib/api/user';

const page = async () => {
    const user = await getUserSession()
    return (
        <div>
            this is my requ7est
            <CreateDonationRequest user={user}/>
        </div>
    );
};

export default page;