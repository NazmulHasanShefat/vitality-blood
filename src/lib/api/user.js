"use server"
import { headers } from "next/headers"
import { auth } from "../auth"

export const getUserSession = async()=>{
    try {
        const currentUser = await auth.api.getSession({
            headers: await headers()
        })
        return currentUser?.user || null;

    } catch (error) {
        console.log(error)
    }
}
