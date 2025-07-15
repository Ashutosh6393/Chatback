// import type {  } from "@prisma/client";

import type { Agent } from '@prisma/client'
import { create } from 'zustand'
import { db } from '../lib/prisma'

type Agentv
: db.agent

interface AgentStoreType {
  agents: Agent[] | null
  setAgents: (agents: Agent[]) => void
}

export const useAgentStore = create<AgentStoreType>((set) => ({
  agents: null,
  setAgents: (agents) => set({ agents }),
}))
