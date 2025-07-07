'use client'

import { useEffect } from 'react'
import { authClient } from '@/lib/auth-client'
import { useAuthStore } from '@/store/globalStore'

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const setAuth = useAuthStore((state) => state.setAuth)
  const logout = useAuthStore((state) => state.logout)

  const { data: session } = authClient.useSession()

  useEffect(() => {
    if (session) {
      setAuth({
        isAuthenticated: true,
        user: {
          id: session?.user.id,
          name: session?.user.name,
          email: session?.user.email,
          image: session?.user.image || '',
        },
      })
    } else {
      logout()
    }
  }, [session, setAuth, logout])

  return <>{children}</>
}
