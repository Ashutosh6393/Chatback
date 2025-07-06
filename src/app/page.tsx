'use client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import HighlightCard from '@/components/common/HighlightCard'
import PageTile from '@/components/common/PageTile'
import Footer from '@/components/Footer'
import PricingTableShort from '@/components/PricingTableShort'
import Usecases from '@/components/Usecases'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { highligtsCardData, useCaseData } from '@/constants'
import { authClient } from '@/lib/auth-client'
import { cn, scrollToElement } from '@/lib/utils'

export default function Home() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const [loading, setLoading] = useState<boolean>(false)

  const handleBuildAgent = () => {
    setLoading(true)

    console.log(session)
    if (!session && !isPending) {
      router.push('/auth/signin')
    } else {
      router.push('/dashboard/create-agent')
    }
    setLoading(false)
  }

  return (
    <>
      <main className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
        <div
          className={cn(
            'absolute inset-0',
            '[background-size:40px_40px]',
            '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
            'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

        <div className="container z-40 scroll-smooth">
          <div id="hero" className="min-h-[680px] flex-center flex-col">
            <Button
              variant={'outline'}
              onClick={() => scrollToElement('working')}
              className="mb-10 cursor-pointer rounded-full px-12 text-foreground/70 text-md shadow-none hover:bg-background"
            >
              See How It Works
            </Button>
            <h1 className="bg-gradient-to-br from-zinc-800 to-zinc-700 bg-clip-text text-center font-black text-7xl text-transparent leading-20 ">
              Upload. Train. Chat.
              <br />
              It’s That Simple.
            </h1>
            <p className="mt-10 text-center font-semibold text-foreground/70 text-xl">
              Create custom AI chatbots trained on your FAQs, product docs,
              <br />
              internal wikis, and more — in minutes.
            </p>
            <Button
              onClick={handleBuildAgent}
              className="mt-10 cursor-pointer rounded-lg bg-zinc-900 p-5 text-lg text-white shadow-grad"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Buid your agent
            </Button>
          </div>
        </div>
      </main>
      <section id="highlights" className="bg-light-gray py-20">
        <div id="highlights" className="container flex flex-col items-center">
          <div className="flex-center flex-col ">
            <PageTile title="Highlights" dotBgColor="bg-blue-400" />
            <div className="mt-10 w-full flex-center flex-col">
              <h2 className="main-h2">Why Choose Chatback?</h2>
              <p className="main-p">
                Experience a seamless blend of customization, integration, and{' '}
                <br />
                scalability designed to elevate your customer support.
              </p>
            </div>
          </div>
          <div className="mt-15 flex items-stretch justify-between gap-5 ">
            {highligtsCardData.map(({ title, description, icon }) => (
              <HighlightCard
                key={title}
                title={title}
                description={description}
                icon={icon}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="working" className="bg-light-gray py-20">
        <div className="container flex flex-col">
          <div className="flex-center">
            <PageTile title="How it works" dotBgColor="bg-pink-400" />
          </div>
          <div className="mt-10 flex-center flex-col">
            <h2 className="main-h2">Build and Deploy in 4 Simple Steps</h2>
            <p className="main-p">
              From data upload to multi-platform deployment, creating your AI{' '}
              <br />
              support agent is straightforward.
            </p>
          </div>
          <div className="mt-15 flex-center flex-col">
            <Accordion
              type="single"
              collapsible
              className="w-full md:w-11/12 lg:w-9/12"
              defaultValue="item-1"
            >
              {useCaseData.map(({ title, description }, index) => (
                <AccordionItem
                  key={title}
                  value={`item-${index + 1}`}
                  className="my-2 rounded-2xl px-5 data-[state=open]:border-[1px] data-[state=open]:border-zinc-400/30 data-[state=closed]:border-none data-[state=open]:bg-white data-[state=open]:py-6"
                >
                  <AccordionTrigger className="font-semibold text-xl hover:no-underline data-[state=closed]:text-zinc-600/40 ">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-pretty text-base">
                    {description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      <section id="usecases" className="bg-white py-20">
        <div className="container flex flex-col">
          <div className="flex-center">
            <PageTile title="Use Cases" dotBgColor="bg-pink-400" />
          </div>
          <div className="mt-15 flex-center flex-col">
            <h2 className="main-h2">Versatile Solutions for Diverse Needs</h2>
            <p className="main-p">
              Chatback adapts to various industries, enhancing support and{' '}
              <br />
              engagement across the board.
            </p>
          </div>
          <div className="mt-15">
            <Usecases />
          </div>
        </div>
      </section>
      <section id="pricing" className="bg-light-gray py-20">
        <div className="container flex flex-col">
          <div className="flex-center">
            <PageTile title="Pricing" dotBgColor="bg-pink-400" />
          </div>
          <div className="mt-15 flex-center flex-col">
            <h2 className="main-h2">Flexible Plans for Every Stage</h2>
            <p className="main-p">
              Choose a plan that aligns with your needs, from startups to <br />
              enterprises.
            </p>
          </div>
          <div className="mt-15 flex justify-center">
            <PricingTableShort />
          </div>
        </div>
      </section>
      <section id="contact" className="relative overflow-hidden bg-white py-20">
        <div className="container flex flex-col">
          <div className="flex-center">
            <PageTile title="Connect" dotBgColor="bg-pink-400" />
          </div>
          <div className="mt-15 flex-center flex-col">
            <h2 className="main-h2">We're Here to Help</h2>
            <p className="main-p">
              Have questions or need a demo? Reach out to us through any of the{' '}
              <br />
              channels below.
            </p>
          </div>
          <div className="mt-15 flex-center gap-5">
            <Button
              variant={'default'}
              className="cursor-pointer rounded-lg bg-zinc-900 p-5 text-lg text-white"
            >
              Email Us
            </Button>
            <Button
              variant={'outline'}
              className="cursor-pointer rounded-lg p-5 text-lg"
            >
              Schedule a call
            </Button>
          </div>
        </div>
        <div className="-bottom-60 -right-60 absolute h-[500px] w-[500px] rounded-full border-[90px] border-pink-600/80 bg-transparent" />
        <div className="-bottom-60 -left-60 absolute h-[500px] w-[500px] rounded-full border-[90px] border-blue-600/80 bg-transparent" />
      </section>
      <Footer />
    </>
  )
}
