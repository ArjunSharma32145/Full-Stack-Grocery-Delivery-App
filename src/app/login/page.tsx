'use client'
import React from 'react'
import { ArrowLeft,  Eye, EyeOff,  Key, Leaf, Loader2, LogIn, Mail, User } from 'lucide-react'
import {motion} from 'motion/react'
import Image from 'next/image'
import googleImage from '../../assets/google.png'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

function Login() {

  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [showPassword,setShowPassword] = React.useState(false)
  const [loading,setLoading] = React.useState(false)
  const [googleLoading, setGoogleLoading] = React.useState(false)
  const [error,setError] = React.useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const session = useSession()
  console.log(session)
  console.log('Callback URL:', callbackUrl)
  
  const handleLogin=async (e:React.FormEvent) =>{
    e.preventDefault()
    setLoading(true)
    try{
      const result = await signIn("credentials", {
        email: email.trim(),
        password: password.trim(),
        redirect: false
      })
      
      if (result?.ok) {
        router.push(callbackUrl)
      } else {
        setError(result?.error || 'Login failed')
      }
      router.push("/")
      setLoading(false)
    } catch (error) {
      console.error("Login error")
      setLoading(false)
    } 
  }

  const handleGoogleLogin = async () => {
    if (googleLoading) return
    setGoogleLoading(true)
    await signIn("google", { callbackUrl })
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>
    
      <motion.h1 
      initial={{ opacity: 0,y:-20 }}
      animate={{ opacity: 1 ,y:0}}
      transition={{ duration: 0.6 }}
      className='text-4xl font-extrabold text-green-700 mb-2 '>Welcome Back</motion.h1>
      <p className='text-gray-600 mb-8 flex items-center'>Sign in to your account <Leaf className='w-5 h-5 text-green-600'/></p>
      <motion.form
      onSubmit={handleLogin}
       initial={{ opacity: 0,y:20 }}
       animate={{ opacity: 1 ,y:0}}
       transition={{ duration: 0.6 }}
       className='w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md'
      >
      

          <div className='relative mb-4'>
        <Mail className='absolute left-3 top-3.5 w-5 h-5 text-gray-400'/>
        <input type="text" placeholder='Your Email' className='w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none' 
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
        </div>

          <div className='relative mb-4'>
        <Key className='absolute left-3 top-3.5 w-5 h-5 text-gray-400'/>
        <input type={showPassword ? "text" : "password"} placeholder='Your Password' className='w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none' 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />
        {
          showPassword ? <EyeOff className='absolute right-3 top-3.5 w-5 h-5 text-gray-400 cursor-pointer' onClick={() => setShowPassword(false)} /> : <Eye className='absolute right-3 top-3.5 w-5 h-5 text-gray-400 cursor-pointer' onClick={() => setShowPassword(true)} />
        }
        </div>

      {
        (()=>{
          const formValidation=email.trim()!=='' && password.trim()!==''
         return <button
         className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shoadow-md inline-flex items-center justify-center gap-2 ${
         formValidation
         ?"bg-green-600 hover:bg-green-700 text-white"
         :"bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
         type='submit'
         disabled={!formValidation || loading}
         >
          {loading?<Loader2 className='w-5 h-5 animate-spin' /> : "Login"}
         </button>
        })()
      }

      {error && <p className='mt-3 text-sm text-red-600'>{error}</p>}

      <div className='flex items-center my-6 gap-3 text-gray-400'>
        <span className='border-b border-gray-400 w-full'></span>
        OR
        <span className='border-b border-gray-400 w-full'></span>
      </div>

      <div
        
        className='w-full py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium inline-flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60'
        onClick={()=> signIn("google",{callbackUrl:"/"})}
        
      >
        <Image src={googleImage} alt='Google' className='w-5 h-5' />
        {googleLoading ? 'Redirecting...' : 'Continue with Google'}
      </div>
      </motion.form>
      <p className='cursor-pointer text-gray-600 mt-6 text-sm flex items-center gap-1' onClick={()=>router.push("/register")}>Want to  create an account? <LogIn className='w-4 h-4'/><span className='text-blue-500 hover:text-blue-700 cursor-pointer'> Sign Up</span></p>
    </div>
  )
}

export default Login