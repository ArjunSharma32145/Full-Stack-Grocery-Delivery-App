import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import User from "@/models/user.model";

export async function POST(req:NextRequest){
  try{
    await connectDB();
    const {role,mobile}=await req.json(); 
    const session  = await auth();
    const user = await User.findOneAndUpdate({email:session?.user.email},{
      role,mobile
    },{new:true})
    if(!user){
      return NextResponse.json({message:"User not found"},{status:404})
    }
     return NextResponse.json(user,{status:200})
  } catch(error){
    return NextResponse.json({message:"edit role and mobile failed"},{status:500})
  }
}
