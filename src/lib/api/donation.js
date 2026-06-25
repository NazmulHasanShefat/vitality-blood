"use server"

import { protectedFetch, serverFetch } from "../core/server"

export const getDonorDonationRequests = async (donorId)=>{
    try {
        return await protectedFetch(`/api/get-donor-donation-request/${donorId}`)
    } catch (error) {
        console.log(error)
    }
}
export const getDonationDetails = async (requestId)=>{
    try {
        return await protectedFetch(`/api/get-donation-detail/${requestId}`);
    } catch (error) {
        console.log(error)
    }
}
export const getRecentDonorDonationRequest = async (requesterId)=>{
      try {
        return await protectedFetch(`/api/get-recent-donor-request/${requesterId}`);
    } catch (error) {
        console.log(error)
    }
}
export const getFilterDonorDonationRequest = async (requesterId, searchWord)=>{
      try {
        return await protectedFetch(`/api/filter-donation-request/${requesterId}?searchQuery=${searchWord}`);
    } catch (error) {
        console.log(error)
    }
}
export const getallDonationRequest = async ()=>{
      try {
        return await protectedFetch(`/api/all-donation-requests`);
    } catch (error) {
        console.log(error)
    }
}

export const getPendingBloodDonationRequest = async (bloodGroup,divition , district)=>{
    try {
       return serverFetch(`/api/get-pending-blood-donation-request?donationStatus=pending&bloodGroup=${bloodGroup || ""}&recipientDivision=${divition || ""}&recipientDistrict=${district || ""}`) 
    } catch (error) {
        console.log(error)
    }
}