"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const CreateUser = async (userData) => {
  try {
    const newUser = await auth.api.createUser({
      body: userData,
    });
    return { success: true, ...newUser };
  } catch (error) {
    const errorMessages = {
      USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
        "An account with this email already exists.",
      PASSWORD_TOO_SHORT: "Password is too short.",
      PASSWORD_TOO_LONG: "Password is too long.",
      INVALID_EMAIL: "Please enter a valid email address.",
      FORBIDDEN: "You don't have permission to perform this action.",
    };
    const code = error?.body?.code || error?.code;

    return {
      success: false,
      message:
        errorMessages[code] ?? "Failed to create user. Please try again.",
      code,
    };
  }
};

export const SignOutServerAction = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    // Redirect the user back to the home or login page after signing out
    redirect("/login")
    
  } catch (error) {
    console.log(error);
  }
};
