'use client'

// import type { User } from 'better-auth'
import { Loader2 } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { redirect, usePathname, useRouter } from 'next/navigation.js'
import { memo, Suspense, useEffect } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { authClient } from '@/lib/auth-client'
// import { scrollToElement } from '@/lib/utils'
// import { useAuthStore } from '@/store/globalStore'
import AuthStatus from './AuthStatus'
import NavbarShell from './NavbarShell'

// type Props = {
//   user: User | null
// }

const Navbar = memo(() => {
  // console.log(user)
  // const pathname = usePathname()
  // const isAuthPage = pathname.startsWith('/auth')
  // const isHomePage = pathname === '/'
  // const isDashboardPage = pathname.startsWith('/dashboard')

  // const { isAuthenticated, logout, setAuth } = useAuthStore()

  // console.log(user)

  // const { isPending } = authClient.useSession()

  // const setAuth = useAuthStore((state) => state.setAuth)

  // useEffect(() => {
  //   if (user) {
  //     setAuth({
  //       isAuthenticated: true,
  //       user: {
  //         id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         image: user.image || '',
  //       },
  //     })
  //   } else {
  //     logout()
  //   }
  // }, [user, setAuth, logout])

  // const router = useRouter()

  // const handleSignIn = () => {
  //   router.push('/auth/signin')
  // }

  // const handleLogout = async () => {
  //   await authClient.signOut()
  //   logout()
  //   router.push('/')
  // }

  return (
    // <header className="fixed top-0 z-50 w-full border-zinc-400/10 border-b-[1px] backdrop-blur-lg">
    //   <div className="container relative flex-center py-4 ">
    //     <div className="flex flex-1 items-center justify-start">
    //       <Link href="/" className="flex items-center gap-2">
    //         <Image
    //           src="/logo.png"
    //           alt="Chatback"
    //           width={30}
    //           height={30}
    //           className="rounded-lg"
    //         />
    //         <h1 className="font-bold text-xl">Chatback</h1>
    //       </Link>
    //     </div>
    //     {!isAuthPage && (
    //       <>
    //         {isHomePage && (
    //           <nav className="flex-1 flex-center gap-14 font-semibold text-md tracking-wide">
    //             <Button
    //               variant="link"
    //               onClick={() => scrollToElement('highlights')}
    //               className="cursor-pointer p-0 font-semibold hover:no-underline"
    //             >
    //               Features
    //             </Button>
    //             <Button
    //               variant="link"
    //               onClick={() => scrollToElement('pricing')}
    //               className="cursor-pointer p-0 font-semibold hover:no-underline"
    //             >
    //               Pricing
    //             </Button>
    //             <Button
    //               variant="link"
    //               onClick={() => scrollToElement('contact')}
    //               className="cursor-pointer p-0 font-semibold hover:no-underline"
    //             >
    //               Contact
    //             </Button>
    //           </nav>
    //         )}

    //         {!isPending ? (
    //           <div className="flex flex-1 items-center justify-end gap-2">
    //             {isAuthenticated && isHomePage && (
    //               <Button
    //                 // onClick={() => redirect('/dashboard/agents')}
    //                 variant="ghost"
    //                 className="cursor-pointer font-bold text-md"
    //                 asChild
    //               >
    //                 <Link href="/dashboard/agents">Dashboard</Link>
    //               </Button>
    //             )}
    //             {isAuthenticated && isDashboardPage && (
    //               <div className="flex items-center gap-2">
    //                 <Button
    //                   variant={'link'}
    //                   className="cursor-pointer text-md hover:no-underline"
    //                 >
    //                   Help
    //                 </Button>

    //                 <DropdownMenu>
    //                   <DropdownMenuTrigger>
    //                     <Avatar>
    //                       <AvatarImage src={user?.image || ''} />
    //                       <AvatarFallback>
    //                         {user?.name.charAt(0)}
    //                       </AvatarFallback>
    //                     </Avatar>
    //                   </DropdownMenuTrigger>
    //                   <DropdownMenuContent className="p-2 font-semibold">
    //                     <DropdownMenuLabel>
    //                       <p>{user?.name}</p>
    //                       <p className="text-muted-foreground text-sm">
    //                         {user?.email}
    //                       </p>
    //                     </DropdownMenuLabel>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>
    //                       <Link href="/dashboard/agents">Dashboard</Link>
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem>
    //                       <Link href="/settings">Settings</Link>
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem onClick={handleLogout}>
    //                       Logout
    //                     </DropdownMenuItem>
    //                   </DropdownMenuContent>
    //                 </DropdownMenu>
    //               </div>
    //             )}
    //             {!isAuthenticated && (
    //               <>
    //                 {/* <Button
    //                   onClick={handleSignIn}
    //                   variant="ghost"
    //                   className="cursor-pointer font-bold text-md"
    //                 >
    //                   Sign in
    //                 </Button> */}
    //                 <Button
    //                   onClick={handleSignIn}
    //                   className="cursor-pointer bg-zinc-900 font-bold text-md text-white"
    //                 >
    //                   Try it for free
    //                 </Button>
    //               </>
    //             )}
    //           </div>
    //         ) : (
    //           <div className="flex flex-1 items-center justify-end gap-2">
    //             <Loader2 className="size-5 animate-spin text-muted-foreground" />
    //           </div>
    //         )}
    //       </>
    //     )}
    //   </div>
    // </header>
    <NavbarShell>
      <Suspense
        fallback={
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        }
      >
        <AuthStatus />
      </Suspense>
    </NavbarShell>
  )
})

export default Navbar
