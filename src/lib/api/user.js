"use server";
import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => {
  try {
    const currentUser = await auth.api.getSession({
      headers: await headers(),
    });
    return currentUser?.user || null;
  } catch (error) {
    console.log(error);
  }
};

export const getListUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortDirection: "desc",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  return users?.users;
};

export const getListUsersWithPaginate = async(userCurrentPage)=>{
  const pageSize = 5;
const currentPage = userCurrentPage;
   const users = await auth.api.listUsers({
    query: {
       limit: pageSize,
        offset: (currentPage - 1) * pageSize
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  const totalUsers = users.total;
const totalPages = Math.ceil(totalUsers / pageSize)

  return {name: "this is data", data: users?.users, totalPages, totalUsers};
}