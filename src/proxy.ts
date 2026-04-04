import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest){
  
const {pathname} = req.nextUrl
const publicRoutes = ["/login", "/register","/api/auth"]
if(publicRoutes.some((path)=> pathname.startsWith(path))){
return NextResponse.next()

}

const token = await getToken({ req, secret: process.env.AUTH_SECRET })
console.log("Token:", token)
console.log("Request URL:", req.url)
if(!token){
  const loginUrl = new URL("/login", req.url)
  loginUrl.searchParams.set("callbackUrl", req.url)
  console.log("No token - Redirecting to:", loginUrl.toString())
  return NextResponse.redirect(loginUrl)
}
   return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
