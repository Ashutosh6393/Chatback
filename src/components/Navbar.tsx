'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image.js'
import Link from 'next/link.js'
import { usePathname, useRouter } from 'next/navigation.js'

const Navbar = () => {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/auth')
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  const handleSignUp = () => {
    router.push('/auth/signup')
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
            <nav className="flex-1 flex-center gap-14 font-semibold text-md tracking-wide">
              <Link href="/">Features </Link>
              <Link href="/">Pricing</Link>
              <Link href="/">Contact</Link>
            </nav>
            <div className="flex flex-1 items-center justify-end gap-2">
              <Button
                onClick={handleSignIn}
                variant="ghost"
                className="cursor-pointer font-bold text-md"
              >
                Sign in
              </Button>
              <Button
                onClick={handleSignUp}
                className="cursor-pointer bg-zinc-900 font-bold text-md text-white"
              >
                Try it for free
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
