'use client'

import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

const DashboardPage = () => {
  const { data: session } = authClient.useSession()

  if (session?.user) {
    redirect('/dashboard/agents')
  } else {
    redirect('/auth/signin')
  }
}

export default DashboardPage
