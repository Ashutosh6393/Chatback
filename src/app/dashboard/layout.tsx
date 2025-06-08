import NavLink from '@/components/common/NavLink'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex h-screen w-full flex-col items-center pt-20 ">
      <nav className="flex w-full items-center justify-center gap-5 ">
        <Button variant="ghost" asChild>
          <NavLink href={'/dashboard/agents'}>Agents</NavLink>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="#">Usage</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="#">Settings</Link>
        </Button>
      </nav>
      <div className="w-full flex-1 py-4"> {children}</div>
    </div>
  )
}

export default DashboardLayout
