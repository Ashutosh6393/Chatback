import { Agent } from "@/generated/prisma/index";
import { create } from "zustand";

interface AgentStoreType {
  agents: Agent[] | null;
  setAgents: (agents: Agent[]) => void;
}

export const useAgentStore = create<AgentStoreType>((set) => ({
  agents: null,
  setAgents: (agents) => set({ agents }),
}));
