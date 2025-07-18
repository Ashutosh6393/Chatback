'use client'
import { BotMessageSquare } from 'lucide-react'
// import { headers } from 'next/headers'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getAgents } from '@/app/actions/getAgents'
import { useAgentStore } from '@/store/agentStore'
import { useAuthStore } from '@/store/globalStore'
import AgentSkeleton from './AgentSkeleton'

type Props = {
  userId: string
}

const AgentList = ({ userId }: Props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { setAgents, agents } = useAgentStore()

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
    </>
  )
}

export default AgentList

// Todo: Optimize fetching agents (pagination can be added later), caching could be done,
// todo: and we can use useOptimistic to updtate the UI immediately after creating an agent.
// todo: check if the agent is already in the store before fetching it again.
