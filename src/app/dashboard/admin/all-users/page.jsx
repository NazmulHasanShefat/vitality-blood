import { getListUsers, getListUsersWithPaginate } from '@/lib/api/user';
import React from 'react';
import UsersTable from './UsersTable';
import Pagination from '@/components/ui/Pagination';
import UsersListPagination from '@/components/ui/UserListPagination';

const page = async ({searchParams}) => {
    const params = await searchParams;
    const page = params.page || 1;
    const users = await getListUsers();
    const ShowLinitUser = await getListUsersWithPaginate(page);
    console.log(ShowLinitUser)
    const newLimitUsers = ShowLinitUser?.data
    console.log(users)
    return (
        <div>
            <UsersTable usersData={newLimitUsers}/>
            <UsersListPagination ShowLimitUser={ShowLinitUser}/>
        </div>
    );
};

export default page;