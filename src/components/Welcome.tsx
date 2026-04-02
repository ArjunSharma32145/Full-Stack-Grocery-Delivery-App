'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from "motion/react"
import { ArrowRight, Bike, ShoppingBasket } from 'lucide-react'
type propType={
  nextStep?: (s:number)=> void
}
function Welcome({nextStep}:propType) {
  const router = useRouter()

  const handleNext = () => {
    if (nextStep) {
      nextStep(2)
      return
    }

    router.push('/register')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6'>
      <motion.div
        initial={{ opacity: 0,y:-20 }}
        animate={{ opacity: 1 ,y:0}}
        transition={{ duration: 0.6 }}
        className='flex  items-center gap-3'
        > 
         <ShoppingBasket className='w-10 h-10 text-green-600' />
       <h1 className='text-4xl md:text-5xl font-extrabold text-green-700'>SnapCart</h1>
      
      </motion.div>
      <motion.p
       initial={{ opacity: 0,y:10 }}
        animate={{ opacity: 1 ,y:0}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='mt-4 text-lg md:text-xl text-gray-600 max-w-md'
       >  
        Your Ultimate Grocery Shopping Companion - 10 minutes delivery at your doorstep!
      </motion.p>
      <motion.div
        initial={{ opacity: 0,scale:0.9 }}
        animate={{ opacity: 1 ,scale:1}}
        transition={{ duration: 0.6 , delay: 0.6}}
        className='flex items-center gap-10 mt-10'
      >
      <ShoppingBasket className='w-16 h-16 text-green-600 mt-8 animate-bounce' />
      <Bike className='w-16 h-16 text-orange-600 mt-4 animate-bounce' />
      </motion.div>

      <motion.button
        initial={{ opacity: 0,y:20 }}
        animate={{ opacity: 1 ,y:0}}
        transition={{ duration: 0.6 }}
        className='mt-12 px-6 py-3 bg-green-600 text-white rounded-full flex items-center gap-2 hover:bg-green-700 transition-colors'
        type='button'
        onClick={handleNext}>
       Next
       <ArrowRight/>
      </motion.button>
    </div>
  )
}

export default Welcome