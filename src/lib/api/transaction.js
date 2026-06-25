"use server"

import { serverFetch } from "../core/server"

export const getTransactionHistory = async()=>{
    try {
        return serverFetch("/api/get-transaction-history");
    } catch (error) {
        console.log(error)
    }
}