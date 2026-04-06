import React from "react";
import Welcome from "../components/Welcome";
import SessionDebug from "../components/SessionDebug";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import User from "@/models/user.model";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";
import EditRoleMobile from "@/components/EditRoleMobile";

 async function Home() {
  await connectDB();
  const session = await auth();
  const user = await User.findById(session?.user.id);
  if(!user){
    redirect("/login");
  }
  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role === "user");
   if(inComplete){
    return <EditRoleMobile />
   }


  
  return (
    <>
      
    </>
  );
}
export default Home;
