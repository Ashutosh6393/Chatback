import type { Metadata } from 'next'
import { Inter, Playfair_Display, Urbanist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/sonner'
import { EdgeStoreProvider } from '../lib/edgestore'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${urbanist.variable} ${urbanist.className} antialiased`}
      >
        <EdgeStoreProvider>
          <Navbar />
          {children}
          <Toaster />
        </EdgeStoreProvider>
      </body>
    </html>
  )
}
