import { db } from "@/lib/prisma";

const getAgents = async (userId: string) => {
  const agents = await db.agent.findMany({
    where: {
      userId: userId,
    },
  });

  return agents;
};

export { getAgents };
