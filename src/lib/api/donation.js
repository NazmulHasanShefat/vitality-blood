"use server"

import { serverFetch } from "../core/server"

export const getDonorDonationRequests = async (donorId)=>{
    try {
        return await serverFetch(`/api/get-donor-donation-request/${donorId}`)
    } catch (error) {
        console.log(error)
    }
}
export const getDonationDetails = async (requestId)=>{
    try {
        return await serverFetch(`/api/get-donation-detail/${requestId}`);
    } catch (error) {
        console.log(error)
    }
}