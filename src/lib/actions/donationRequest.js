"use server"

import { serverMutaion } from "../core/server"

export const createDonationRequest = async(formData)=>{
    try {
        return await serverMutaion("/api/create-donatio-request", formData);
    } catch (error) {
        console.log(error)
    }
}