'use client'

import type { User } from 'better-auth'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Spinner from '@/components/common/Spinner'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { scrollToElement } from '@/lib/utils'
import { useAuthStore } from '@/store/globalStore'
import NavDropdown from './NavDropdown'

type Props = {
  user: User | null
}

export default function AuthStatus({ user }: Props) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isDashboardPage = pathname.startsWith('/dashboard')
  const isAuthPage = pathname.startsWith('/auth')

  const { setAuth, logout, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && user) {
      setAuth({
        isAuthenticated: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image || '',
        },
      })
    } else {
      logout()
      //changes the auth state to null
    }
  }, [logout, user, setAuth])

  if (!user && !isAuthPage) {
    return (
      <Button
        onClick={() => router.push('/auth/signin')}
        className="bg-zinc-900 text-white"
      >
        Try it for free
      </Button>
    )
  }

  if (isDashboardPage) {
    return <NavDropdown user={user} />
  }

  if (isHomePage) {
    return (
      <>
        <nav className="flex-1 flex-center gap-14 font-semibold text-md tracking-wide">
          <Button
            variant="link"
            onClick={() => scrollToElement('highlights')}
            className="cursor-pointer p-0 font-semibold hover:no-underline"
          >
            Features
          </Button>
          <Button
            variant="link"
            onClick={() => scrollToElement('pricing')}
            className="cursor-pointer p-0 font-semibold hover:no-underline"
          >
            Pricing
          </Button>
          <Button
            variant="link"
            onClick={() => scrollToElement('contact')}
            className="cursor-pointer p-0 font-semibold hover:no-underline"
          >
            Contact
          </Button>
        </nav>
        <div className="flex-1 flex items-center justify-end gap-2">
          <Button asChild variant="ghost" className="font-bold text-md">
            <Link href="/dashboard/agents">Dashboard</Link>
          </Button>
        </div>
      </>
    )
  }

  return null
}
