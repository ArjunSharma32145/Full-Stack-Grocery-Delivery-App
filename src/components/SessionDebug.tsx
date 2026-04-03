'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

function SessionDebug() {
  const { data, status } = useSession()

  React.useEffect(() => {
    if (status !== 'loading') {
      console.log('Session user:', data?.user ?? null)
    }
  }, [data, status])

  return null
}

export default SessionDebug
