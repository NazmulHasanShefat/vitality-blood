import { getListUsers } from '@/lib/api/user';
import React from 'react';
import UsersTable from './UsersTable';

const page = async () => {
    const users = await getListUsers();
    console.log(users)
    return (
        <div>
            this is all users page
            <UsersTable usersData={users}/>
        </div>
    );
};

export default page;