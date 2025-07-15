'use client'
import { ArrowLeft, File, Globe, MessageCircle, Text } from 'lucide-react'
import { useRouter } from 'next/navigation'
import NavLink from '@/components/common/NavLink'
import { Button } from '@/components/ui/button'

const trainOptions = [
  { option: 'File', icon: <File className="size-5" />, link: 'file' },
  { option: 'Text', icon: <Text className="size-5" />, link: 'text' },
  { option: 'Website', icon: <Globe className="size-5" />, link: 'website' },
  { option: 'Q&A', icon: <MessageCircle className="size-5" />, link: 'qna' },
]

const CreateAgentLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.push('/dashboard/agents')
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-4 ">
        <Button variant={'ghost'} onClick={handleBackClick} size={'icon'}>
          <ArrowLeft />
        </Button>
        <h1 className="font-extrabold text-3xl">Create New Agent</h1>
      </div>
      <div className="flex gap-10">
        <div className="flex w-1/6 flex-col items-start gap-3 self-start">
          {trainOptions.map((option) => (
            <Button
              key={option.option}
              variant="ghost"
              asChild
              className="w-full justify-start"
            >
              <NavLink
                href={`/dashboard/create-agent/${/[A-Za-z0-9]+/i}/${option.link}`}
                className="font-semibold"
              >
                {option.icon}
                {option.option}
              </NavLink>
            </Button>
          ))}
        </div>
        <div className="w-3/6 rounded-lg border-[1px] border-zinc-500/40 p-4">
          {children}
        </div>
        <div className="flex w-2/6 flex-col gap-4 rounded-lg border-[1px] border-zinc-500/40 p-4 self-start">
          <h1 className="font-semibold text-zinc-500">Sources</h1>
          <div className="flex flex-1 flex-col gap-2">
            <div>{}</div>
            <hr className="border-zinc-500 border-dashed" />
            <div className="flex justify-between">
              <p>Total size: </p>
              <p className="font-bold">0KB</p>
            </div>
            <p className="text-right">/ 400KB</p>
          </div>
          <Button variant="default" className="w-full cursor-pointer">
            Create Agent
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateAgentLayout
