'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image.js'
import Link from 'next/link.js'
import { redirect, usePathname, useRouter } from 'next/navigation.js'
import { authClient } from '@/lib/auth-client'
import { Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/auth')
  const isHomePage = pathname === '/'
  const isDashboardPage = pathname === '/dashboard'
  const { data: session, isPending } = authClient.useSession()



  const router = useRouter()

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  return (
    <header className="fixed top-0 z-50 w-full border-zinc-400/10 border-b-[1px] backdrop-blur-lg">
      <div className="container relative flex-center py-4 ">
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Chatback"
              width={30}
              height={30}
              className="rounded-lg"
            />
            <h1 className="font-bold text-xl">Chatback</h1>
          </Link>
        </div>
        {!isAuthPage && (
          <>
          {
              isHomePage && (
              <nav className="flex-1 flex-center gap-14 font-semibold text-md tracking-wide">
              <Link href="/">Features </Link>
              <Link href="/">Pricing</Link>
              <Link href="/">Contact</Link>
            </nav>
            )
          }
            

            {!isPending ? (
              <div className="flex flex-1 items-center justify-end gap-2">
                {session && isHomePage && (
                  <Button
                    onClick={() => redirect('/dashboard')}
                    variant="ghost"
                    className="cursor-pointer font-bold text-md"
                  >
                    Dashboard
                  </Button>
                )}
                {session && isDashboardPage && (
                  <div className="flex items-center gap-2">
                    <Button variant={"link"} className="cursor-pointer text-md  hover:no-underline">
                      Help
                    </Button>
                  <Avatar>
                    <AvatarImage src={session?.user?.image || ''} />
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  </div>
                )}
                {!session && (
                  <>
                    <Button
                      onClick={handleSignIn}
                      variant="ghost"
                      className="cursor-pointer font-bold text-md"
                    >
                      Sign in
                    </Button>
                    <Button
                      onClick={handleSignIn}
                      className="cursor-pointer bg-zinc-900 font-bold text-md text-white"
                    >
                      Try it for free
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-end gap-2">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            )}
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
