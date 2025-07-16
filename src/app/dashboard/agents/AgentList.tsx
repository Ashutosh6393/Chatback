'use client'

import { BotMessageSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAgentStore } from '@/store/agentStore'
import { useAuthStore } from '@/store/globalStore'

const AgentList = () => {
  const { agents, setAgents } = useAgentStore()
  const { user } = useAuthStore()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const fetchAgents = async () => {
      try {
        const response = await fetch(`/api/agents?userId=${user?.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch agents')
        }
        const data = await response.json()
        setAgents(data)
        console.log('Fetched agents:', data)

        // setAgents(await response.json());
      } catch (error) {
        console.error('Error fetching agents:', error)
        toast.error('Failed to fetch agents.')
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [user, setAgents])

  return (
    <>
      {!agents ? (
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
    </>
  )
}

export default AgentList
