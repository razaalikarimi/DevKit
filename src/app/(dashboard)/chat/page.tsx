"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createConversation } from "@/actions/chat"
import { Loader2 } from "lucide-react"

export default function ChatPage() {
  const router = useRouter()

  useEffect(() => {
    const initChat = async () => {
      try {
        const chat = await createConversation()
        if (chat && chat.id) {
          router.replace(`/chat/${chat.id}`)
        }
      } catch (err) {
        console.error("Failed to initialize chat session:", err)
      }
    }
    initChat()
  }, [router])

  return (
    <div className="flex items-center justify-center h-full w-full bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
        <span className="text-xs font-semibold tracking-wider text-slate-500">Initializing Chat Session...</span>
      </div>
    </div>
  )
}
