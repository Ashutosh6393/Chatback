import { db } from '@/lib/prisma'

export async function getAgents(userId: string) {
  if (!userId) {
    return []
  }

  const agents = await db.agent.findMany({
    where: {
      userId: userId,
    },
  })

  return agents
}
