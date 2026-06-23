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
