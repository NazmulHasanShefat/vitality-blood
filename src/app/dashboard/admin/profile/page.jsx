import ProfileCard from '@/components/dashboard/profile/ProfileCard';
import { getUserSession } from '@/lib/api/user';
import React from 'react';

const page = async () => {
    const user = await getUserSession();
    return (
        <div>
            <ProfileCard user={user}/>
        </div>
    );
};

export default page;