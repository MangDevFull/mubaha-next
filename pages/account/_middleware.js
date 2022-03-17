import { getToken } from 'next-auth/jwt';
import { NextResponse } from "next/server"
export async function middleware(req) {
  console.log('middleware',req.page.name)
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  if (token) return NextResponse.redirect("/")
  if(req.page.name==="/account" || req.page.name==="/account/") return NextResponse.redirect("/account/profile")
  return NextResponse.next()
}