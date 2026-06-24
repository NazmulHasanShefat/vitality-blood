"use server"

import { redirect } from "next/navigation";
import { getUserSession } from "../api/user"

export const requireRole = async (role)=>{
    const user = await getUserSession();
    if(!user){
        return redirect("/login");
    }
    if(user?.role !== role){
      return redirect("/un-authorized");
    }
}