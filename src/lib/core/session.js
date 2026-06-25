"use server";

import { redirect } from "next/navigation";
import { getUserSession } from "../api/user";
import { auth } from "../auth";
import { headers } from "next/headers";

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) {
    return redirect("/login");
  }
  if (user?.role !== role) {
    return redirect("/un-authorized");
  }
};

export const getuserToken = async () => {
  const token = await auth.api.getToken({
    headers: await headers(),
  });
  return token?.token || null;
};
