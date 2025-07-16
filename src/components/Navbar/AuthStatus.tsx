'use client'

import type { User } from 'better-auth'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { scrollToElement } from '@/lib/utils'
import { useAuthStore } from '@/store/globalStore'
import NavDropdown from './NavDropdown'

export default function AuthStatus() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isDashboardPage = pathname.startsWith('/dashboard')

  const { isPending, data: session } = authClient.useSession()
  const { setAuth, logout, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      setAuth({
        isAuthenticated: true,
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image || '',
        },
      })
    } else {
      logout()
    }
  }, [session, setAuth, logout])

  if (isPending) {
    return <Loader2 className="animate-spin size-5 text-muted-foreground" />
  }

  if (!session) {
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
    return (
      <NavDropdown
        user={session?.user || null}
        onLogout={async () => {
          router.push('/')
          logout()
          await authClient.signOut()
        }}
      />
    )
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
