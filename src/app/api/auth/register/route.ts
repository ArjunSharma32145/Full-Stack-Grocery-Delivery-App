import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  try {
    await connectDB()
        const {name,email,password}=await req.json()
        if(!name?.trim() || !email?.trim() || !password?.trim()){
          return NextResponse.json({message:"Please fill all fields"},{status:400})
        }

        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
          name,
          email,
          password:hashedPassword
        })
        return NextResponse.json(user,{status:200})


  } catch (error) {
   return NextResponse.json({message:`register error ${error}`},{status:500})
  }
}