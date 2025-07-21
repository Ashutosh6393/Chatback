'use client'
import { Bot } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { headers } from 'next/headers'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useAgentStore } from '@/store/agentStore'
import AgentSkeleton from './AgentSkeleton'

type Props = {
  userId: string
}

const AgentList = ({ userId }: Props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { setAgents, agents } = useAgentStore()

  const router = useRouter()

  function handleAgentClick(agentId: string) {
    router.push(`/dashboard/train-agent/${agentId}/file`)
  }

  // console.log('userId from agentList: ', userId)

  useEffect(() => {
    const loadData = async () => {
      try {
        const agents = await fetch(`/api/agents?userId=${userId}`).then((res) =>
          res.json(),
        )

        console.log('agents from agentlist: ', agents)
        setAgents(agents)
      } catch (error) {
        console.error('Failed to load agents: ', error)
        toast.error('Failed to load agents. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      loadData()
    }
  }, [userId])

  if (loading) {
    return (
      <div className="flex h-full flex-1 flex-center">
        <AgentSkeleton />
      </div>
    )
  }

  if (!agents?.length) {
    return (
      <div className="flex h-full flex-1 flex-center">
        <p className="text-gray-500">No agents found</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-1 flex-start flex-wrap gap-10">
        {agents.map((agent) => (
          <Button
            asChild
            key={agent.id}
            variant={'outline'}
            onClick={() => handleAgentClick(agent.id)}
            className="p-4 cursor-pointer"
          >
            <div className="flex h-40 w-1/3 flex-col items-start justify-start rounded-2xl border-[1px] gap-3 border-gray-200 bg-light-gray ">
              <Bot className="text-zinc-800 size-10" />

              <div className="flex-1 w-full">
                <h2 className="text-xl font-semibold text-zinc-700 capitalize">
                  {agent.name}
                </h2>
                <p className="text-sm font-medium text-muted-foreground">
                  {agent.description}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </>
  )
}

export default AgentList

// Todo: Optimize fetching agents (pagination can be added later), caching could be done,
// todo: and we can use useOptimistic to updtate the UI immediately after creating an agent.
// todo: check if the agent is already in the store before fetching it again.
