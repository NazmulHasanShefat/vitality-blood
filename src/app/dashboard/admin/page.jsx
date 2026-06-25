import DashboardStats from '@/components/dashboard/DashboardStates';
import { getAllStates } from '@/lib/api/states';
import { getUserSession } from '@/lib/api/user';
import React from 'react';

const AdminPage = async () => {
    const allStates = await getAllStates();
    const user = await getUserSession();
    console.log(allStates)
    return (
        <div>
            <DashboardStats allStates={allStates} user={user}/>
        </div>
    );
};

export default AdminPage;