import { Button } from '@/components/ui/button'

const AgentsPage = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">My Agents</h1>
        <Button>Create Agent</Button>
      </div>
    </div>
  )
}

export default AgentsPage
