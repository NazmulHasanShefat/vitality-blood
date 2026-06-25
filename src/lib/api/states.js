"use server"

import { protectedFetch } from "../core/server"

export const getAllStates = async()=>{
    try {
       return protectedFetch("/api/get-all-states");
    } catch (error) {
        console.log(error)
    }
}