"use server"

import { serverMutaion } from "../core/server"

export const createFundingHistory = async(fundData)=>{
    try {
        return serverMutaion("/api/createFundingHistory", fundData)
    } catch (error) {
        console.log(error)
    }
}