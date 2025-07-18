'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { BotMessageSquare, LoaderIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation.js'
import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { createAgent } from '@/app/actions/createAgent'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAgentStore } from '@/store/agentStore'
import { useAuthStore } from '@/store/globalStore'
import AgentList from './AgentList'
import AgentSkeleton from './AgentSkeleton'

const formSchema = z.object({
  agentName: z.string().min(2, {
    message: 'Agent name must be at least 2 characters.',
  }),
  agentDescription: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters.' }),
})

const AgentsPage = () => {
  const [modelOpen, setModelOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      setModelOpen(true)
      router.replace('/dashboard/agents')
    }
  }, [searchParams, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentName: '',
      agentDescription: '',
    },
  })

  const handleClose = () => {
    form.reset()
    setModelOpen(!modelOpen)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const newAgent = await createAgent(
        user!.id,
        values.agentName,
        values.agentDescription,
      )

      if (newAgent) {
        console.log('Agent create successfully', newAgent)
        router.push(`/dashboard/train-agent/${newAgent.id}/file`)
      }
    } catch (error) {
      console.error('Error creating agent:', error)
      toast.error('Failed to create agent.')
    } finally {
      setLoading(false)
      handleClose()
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between ">
        <h1 className="font-extrabold text-3xl">AI Agents</h1>

        <Dialog open={modelOpen} onOpenChange={handleClose}>
          <DialogTrigger asChild>
            <Button variant="default">Create Agent</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <DialogHeader>
                  <DialogTitle>Create Agent</DialogTitle>
                  <DialogDescription>
                    Provide the name and description of the Agent.
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={form.control}
                  name="agentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Customer Support" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="agentDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Chatbot for handling customer queries."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading}>
                    <LoaderIcon
                      className={`animate-spin ${loading ? 'block' : 'hidden'}`}
                    />
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Suspense fallback={<AgentSkeleton />}>
        {user?.id ? <AgentList userId={user.id} /> : null}
      </Suspense>
      {/* <Suspense fallback={<AgentSkeleton />}>
        <AgentList />
      </Suspense> */}
    </div>
  )
}

export default AgentsPage
