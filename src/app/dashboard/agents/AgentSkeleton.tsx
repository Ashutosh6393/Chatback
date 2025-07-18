import { Skeleton } from '@/components/ui/skeleton'

const AgentSkeleton = () => {
  return (
    <div className="flex h-full w-full gap-4">
      <Skeleton className="mb-4 h-10 w-1/3" />
      <Skeleton className="mb-4 h-10 w-1/3" />
      <Skeleton className="mb-4 h-10 w-1/3" />
    </div>
  )
}

export default AgentSkeleton
