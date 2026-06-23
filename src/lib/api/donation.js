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
export const getRecentDonorDonationRequest = async (requesterId)=>{
      try {
        return await serverFetch(`/api/get-recent-donor-request/${requesterId}`);
    } catch (error) {
        console.log(error)
    }
}
export const getFilterDonorDonationRequest = async (requesterId, searchWord)=>{
      try {
        return await serverFetch(`/api/filter-donation-request/${requesterId}?searchQuery=${searchWord}`);
    } catch (error) {
        console.log(error)
    }
}
export const getallDonationRequest = async ()=>{
      try {
        return await serverFetch(`/api/all-donation-requests`);
    } catch (error) {
        console.log(error)
    }
}

