import NextAuth from "next-auth"
 import Credentials from "next-auth/providers/credentials"
import connectDB from "./lib/db"
import bcrypt from "bcryptjs"
import User from "./models/user.model"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
     Credentials({
        credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
     async authorize(credentials: any, request: any){
          await connectDB()
          const email= credentials?.email as string
          const password= credentials?.password as string
          const user= await User.findOne({email}).lean()
          if(!user){
            throw new Error("No user found with this email")
          }
          if(!password || !user.password){
            throw new Error("Password missing")
          }
          const isPasswordValid= await bcrypt.compare(password,user.password)
          if(!isPasswordValid){
            throw new Error("Invalid password")
          }
          return {
            id:user._id.toString(),
            email:user.email,
            name:user.name,
            role:user.role
          }
         
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
    })
  ],
  callbacks:{
       async signIn({user,account}) {
           if(account?.provider === "google"){
            await connectDB()
            if(!user.email){
              return false
            }

            let existingUser = await User.findOne({email:user.email})
            if(!existingUser){
              existingUser = await User.create({
                name:user.name || user.email.split("@")[0],
                email:user.email,
                image:user.image,
                role:"user"
              })
            }

            user.id = existingUser._id.toString()
            user.role = existingUser.role
          }
          return true
       },
         jwt({token,user}) {
             if(user){
              token.id = user.id ?? token.sub
              token.name = user.name ?? token.name
              token.email = user.email ?? token.email
              token.role = user.role ?? token.role ?? "user"
              token.picture = user.image ?? token.picture
             }
              return token
         },
         session({session,token}) {
          if(session.user){
            session.user.id = (token.id as string) || ""
            session.user.name = (token.name as string) || ""
            session.user.email = (token.email as string) || ""
            session.user.role = (token.role as string) || "user"
            session.user.image = (token.picture as string) || undefined
          }
            return session 
         },
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge: 10*24 * 60 * 60*1000,
  },
  secret:process.env.AUTH_SECRET
})