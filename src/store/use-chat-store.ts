import { create } from "zustand"

interface ChatState {
  activeConversationId: string | null
  setActiveConversationId: (id: string | null) => void
  isSidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export const useChatStore = create<ChatState>((set) => ({
  activeConversationId: null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  isSidebarOpen: true,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}))
