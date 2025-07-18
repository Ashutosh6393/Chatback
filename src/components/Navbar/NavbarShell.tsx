import Image from 'next/image'
import Link from 'next/link'

export default function NavbarShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <header className="fixed top-0 z-50 w-full border-b backdrop-blur-lg">
      <div className="container flex-center py-4">
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
        {children}
      </div>
    </header>
  )
}
