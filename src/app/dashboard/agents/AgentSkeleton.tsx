import { Skeleton } from '@/components/ui/skeleton'

const AgentSkeleton = () => {
  return (
    <div className="w-full h-full flex gap-4">
      <Skeleton className="h-10 w-1/3 mb-4" />
      <Skeleton className="h-10 w-1/3 mb-4" />
      <Skeleton className="h-10 w-1/3 mb-4" />
    </div>
  )
}

export default AgentSkeleton
