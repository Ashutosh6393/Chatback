import { Button } from '@/components/ui/button'
import Image from 'next/image.js'
import Link from 'next/link.js'

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full backdrop-blur-md">
      <div className="container flex items-center justify-between py-4 ">
        <div className="flex items-center justify-between">
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

        <nav className="flex items-center justify-between gap-14 font-semibold text-md tracking-wide">
          <Link href="/">Features </Link>
          <Link href="/">Pricing</Link>
          <Link href="/">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="cursor-pointer font-bold text-md">
            Sign in
          </Button>
          <Button className="cursor-pointer bg-zinc-900 font-bold text-md text-white">
            Try it for free
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
