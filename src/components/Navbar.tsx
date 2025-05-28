import Image from 'next/image.js'
import Link from 'next/link.js'

const Navbar = () => {
  return (
    <header>
      <div className="container fixed top-0 z-50 mx-auto flex justify-between bg-white/50 px-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ChatBack" width={100} height={100} />
            <h1 className="font-bold text-2xl">ChatBack</h1>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/">Features </Link>
          <Link href="/">Pricing</Link>
          <Link href="/">Contact</Link>
        </nav>
        <div className="flex items-center gap-2" />
      </div>
    </header>
  )
}

export default Navbar
