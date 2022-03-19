import { getToken } from 'next-auth/jwt';
import { NextResponse } from "next/server"
export async function middleware(req) {
  if(req.page.name !== '/auth/create-password'){
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
    });
    if (token) return NextResponse.redirect("/")
    return NextResponse.next()
  }
}