import type { Metadata } from 'next'
import { Inter, Playfair_Display, Urbanist } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import Navbar from '@/components/Navbar/Navbar'
import { Toaster } from '@/components/ui/sonner'
import { authClient } from '@/lib/auth-client'

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Chatback',
  description:
    'Chatback is a platform for chatting with your friends and family',
}

async function getUser() {
  'use server'
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  return data?.user || null
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()
  // console.log('root', user)

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${urbanist.variable} ${urbanist.className} antialiased`}
      >
        <Navbar user={user} />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
