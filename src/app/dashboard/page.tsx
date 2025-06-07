'use client'

import { authClient } from '@/lib/auth-client'
// import { Loader } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

const DashboardPage = () => {
  const { data: session, isPending, error } = authClient.useSession()

  console.log(session?.user)

  if (isPending)
    return (
      <div className="flex-center h-screen w-full flex-col gap-2">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
        <p className=" text-muted-foreground">Loading...</p>
      </div>
    )

  if (error) {
    toast.error(error.message)
    redirect('/')
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl">Dashboard</h1>
      </div>
    </div>
  )
}

export default DashboardPage
