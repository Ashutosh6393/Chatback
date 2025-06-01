import HighlightCard from '@/components/common/HighlightCard'
import PageTile from '@/components/common/PageTile'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BookOpen, Share2, Shield } from 'lucide-react'
import Usecases from '@/components/Usecases'

export default function Home() {
  const highligtsCardData = [
    {
      title: 'Custom Training',
      description:
        'Train your chatbot using internal documents, wikis, product manuals, links, and FAQs—no coding required.',
      icon: <BookOpen className="h-10 w-10 text-pink-600" />,
    },
    {
      title: 'Multi-Platform Integration',
      description:
        'Deploy your chatbot effortlessly on your website, Slack, WhatsApp, Telegram, and more using our versatile APIs and widgets.',
      icon: <Share2 className="h-10 w-10 text-green-600" />,
    },
    {
      title: 'Scalable & Secure',
      description:
        'Our platform ensures your chatbot is always up-to-date and secure, ready to handle any customer query.',
      icon: <Shield className="h-10 w-10 text-blue-600" />,
    },
  ]

  const accordionData = [
    {
      title: 'Empower Your Chatbot with Your Knowledge Base',
      description:
        'Upload your PDFs, internal docs, product manuals, and URLs. Our AI instantly learns from your data to power accurate, context-aware responses.',
    },
    {
      title: 'Customize & Preview',
      description:
        'Personalize the chatbot’s look and feel—logo, color, avatar, and tone. See live previews to match your brand perfectly',
    },
    {
      title: 'Integrate Anywhere',
      description:
        'Add it to your website with a chat popover, or use our API. Connect effortlessly to platforms like Slack, WhatsApp, and Telegram.',
    },
    {
      title: 'Monitor & Improve',
      description:
        'Track messages, engagement, and user behavior in real-time. Refine responses with insights and boost performance continuously.',
    },
  ]
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

        <div className="container z-40">
          <div id="hero" className="min-h-[680px] flex-center flex-col">
            <Button
              variant={'outline'}
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
            <Button className="mt-10 cursor-pointer rounded-lg bg-zinc-900 p-5 font-md text-lg text-white shadow-grad">
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
              className="w-full md:w-[80%] lg:w-[60%]"
              defaultValue="item-1"
            >
              {accordionData.map(({ title, description }, index) => (
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

      {/* <div id="working" className="flex-center flex-col">
            <h2>how it works</h2>
          </div>
          <div id="usecases" className="flex-center flex-col">
            <h2>usecases</h2>
          </div>
          <div id="pricing" className="flex-center flex-col">
            <h2>pricing</h2>
          </div>
          <div id="contact" className="flex-center flex-col">
            <h2>contactus</h2>
          </div> */}
    </>
  )
}
