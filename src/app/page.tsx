// import Image from "next/image";
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="flex min-h-[720px] flex-col items-center justify-center">
          <Button
            variant={'outline'}
            className="mb-10 cursor-pointer rounded-full px-12 text-md shadow-none hover:bg-background"
          >
            See How It Works
          </Button>
          <h1 className="bg-gradient-to-br from-zinc-800 to-zinc-700 bg-clip-text text-center font-black text-7xl text-transparent leading-20 ">
            Upload. Train. Chat.
            <br />
            It’s That Simple.
          </h1>
          <p className="mt-10 text-center font-semibold text-xl">
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
  )
}
