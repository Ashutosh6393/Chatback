// import Image from "next/image";
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Home() {
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
      <section className="bg-light-gray py-20">
        <div className="container">
          <div
            id="highlights"
            className="flex min-h-[680px] flex-col items-center"
          >
            <div className="flex-center gap-2 rounded-full border-1 border-black px-5 py-1">
              <div className="size-1.5 rounded-full bg-blue-500" />
              <h2>Highlights</h2>
            </div>
          </div>
          <div id="working" className="flex-center flex-col">
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
          </div>
        </div>
      </section>
    </>
  )
}
