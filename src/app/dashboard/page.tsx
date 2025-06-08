'use client'

import { authClient } from '@/lib/auth-client'
// import { Loader } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

const DashboardPage = () => {
  const { data: session, isPending, error } = authClient.useSession()

  console.log(session?.user)

  if (isPending)
    return (
      <div className="h-screen w-full flex-center flex-col gap-2">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
        <p className=" text-muted-foreground">Loading...</p>
      </div>
    )

  if (error) {
    toast.error(error.message)
    redirect('/')
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl">Dashboard</h1>
        <p>hello</p>
      </div>
    </div>
  )
}

export default DashboardPage
