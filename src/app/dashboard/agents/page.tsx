import { Button } from '@/components/ui/button'
import { BotMessageSquare } from 'lucide-react'
import Link from 'next/link'

const agents: { id: number; name: string; description: string }[] = [
  // {
  //   id: 1,
  //   name: 'Agent 1',
  //   description: 'Agent 1 description',
  // },
]

const AgentsPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between px-10">
        <h1 className="font-extrabold text-3xl">AI Agents</h1>
        <Button asChild>
          <Link href="/dashboard/create-agent">Create Agent</Link>
        </Button>
      </div>
      {agents.length === 0 ? (
        <div className="flex h-full flex-1 flex-center">
          <p className="text-gray-500">No agents found</p>
        </div>
      ) : (
        <div className="flex flex-1 flex-start flex-wrap gap-10 px-20">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="flex h-40 w-30 flex-col items-center rounded-2xl border-[1px] border-gray-200 bg-light-gray p-4"
            >
              <div className="flex flex-1 flex-center">
                <BotMessageSquare size={50} className="text-zinc-800" />
              </div>

              <h2>{agent.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AgentsPage
