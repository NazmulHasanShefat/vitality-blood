import DashboardStats from '@/components/dashboard/DashboardStates';
import { getUserSession } from '@/lib/api/user';
import React from 'react';

const VolunteerHomePage = async () => {
    const user = await getUserSession();
    return (
        <div>
            <DashboardStats userData={user}/>
        </div>
    );
};

export default VolunteerHomePage;