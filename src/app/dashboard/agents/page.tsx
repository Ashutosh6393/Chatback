'use client'
import { BotMessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation.js'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const agents: { id: number; name: string; description: string }[] = [
  // {
  //   id: 1,
  //   name: 'Agent 1',
  //   description: 'Agent 1 description',
  // },
]

const AgentsPage = () => {
  const router = useRouter()

  const createAgentHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const description = formData.get('description') as string

    // Here you would typically send the data to your backend to create the agent
    console.log('Creating agent:', { name, description })

    // Reset the form or close the dialog after creation
    event.currentTarget.reset()

    router.push('/dashboard/agents/create-agent/file')
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between px-10">
        <h1 className="font-extrabold text-3xl">AI Agents</h1>

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="default">Create Agent</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Agent</DialogTitle>
                <DialogDescription>
                  Provide the name and description of the Agent.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Name</Label>
                  <Input
                    id="name-1"
                    name="name"
                    placeholder="Customer Support"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Description (optional)</Label>
                  <Input
                    id="username-1"
                    name="username"
                    placeholder="This agent is responsible for customer support."
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
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
