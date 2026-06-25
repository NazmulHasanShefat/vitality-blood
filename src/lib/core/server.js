"use server";

import { getuserToken } from "./session";
import { headers } from 'next/headers';

const baseUrl = process.env.BACKEND_BASE_URL;

export const authHeader = async () => {
  try {
    const token = await getuserToken();
    const header = {
      authorization: `Bearer ${token}`,
    };
    return token ? header : {};

  } catch (error) {
    console.log(error);
  }
};

export const serverMutaion = async (
  apiPath,
  formData,
  actionMethod = "POST",
) => {
  try {
    const res = await fetch(`${baseUrl}${apiPath}`, {
      method: actionMethod,
      headers: {
        "Content-Type": "application/json",
        ... await authHeader(),
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const serverFetch = async (apiUrl) => {
  try {
    const res = await fetch(`${baseUrl}${apiUrl}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export const protectedFetch = async (apiUrl) => {
  try {
    const res = await fetch(`${baseUrl}${apiUrl}`, {
      headers: await authHeader(),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
