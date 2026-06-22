"use server";

import { revalidatePath } from "next/cache";
import { serverMutaion } from "../core/server";

export const createDonationRequest = async (formData) => {
  try {
    return await serverMutaion("/api/create-donatio-request", formData);
  } catch (error) {
    console.log(error);
  }
};
export const updateDonationRequest = async (formData, id) => {
  try {
    const result = await serverMutaion(
      `/api/update-donation-request/${id}`,
      formData,
      "PATCH",
    );
    revalidatePath("/dashboard/donor/my-requests");
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const updateDonationStatus = async (data, id) => {
  try {
    const result = await serverMutaion(
      `/api/update-donation-status/${id}`,
      data,
      "PATCH",
    );
    revalidatePath("/dashboard/donor/my-requests")
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const deleteDonationRequest = async (id) => {
  try {
    const result = await serverMutaion(
      `/api/delete-donation-request/${id}`,
      {},
      "DELETE",
    );
    revalidatePath("/dashboard/donor/my-requests")
    return result;
  } catch (error) {
    console.log(error);
  }
};

