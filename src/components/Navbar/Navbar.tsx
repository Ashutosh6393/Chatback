'use client'

import type { User } from 'better-auth'
import { Loader2 } from 'lucide-react'
import { memo, Suspense } from 'react'
import Spinner from '@/components/common/Spinner'
import AuthStatus from './AuthStatus'
import NavbarShell from './NavbarShell'

type Props = {
  user: User | null
}

const Navbar = memo(({ user }: Props) => {
  return (
    <NavbarShell>
      <Suspense fallback={<Spinner />}>
        <AuthStatus user={user} />
      </Suspense>
    </NavbarShell>
  )
})

export default Navbar
