import { NextResponse } from "next/server"

import { headers } from "next/headers"
import { auth } from "./lib/auth";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(session){
        NextResponse.next();
    }else{
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
  matcher: ['/funding/:path*','/dashboard/:path*' ]
}