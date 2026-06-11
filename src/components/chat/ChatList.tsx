"use client"

import { useEffect, useState } from "react"
import { getConversations, deleteConversation, renameConversation } from "@/actions/chat"
import { MessageSquare, MoreVertical, Trash2, Edit2, Check, X } from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useParams, useRouter } from "next/navigation"

export const ChatList = () => {
  const [conversations, setConversations] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetch = async () => {
      const data = await getConversations()
      setConversations(data)
    }
    fetch()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteConversation(id)
    setConversations(conversations.filter(c => c.id !== id))
    if (params.chatId === id) router.push("/chat")
  }

  const handleRename = async (id: string) => {
    if (!editTitle.trim()) return
    await renameConversation(id, editTitle)
    setConversations(conversations.map(c => c.id === id ? { ...c, title: editTitle } : c))
    setEditingId(null)
  }

  return (
    <div className="space-y-1">
      {conversations.map((chat) => (
        <div 
          key={chat.id}
          className={`
            group flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all
            ${params.chatId === chat.id ? "bg-indigo-50 text-indigo-600 font-semibold border border-indigo-100" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}
          `}
        >
          <div 
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
            onClick={() => router.push(`/chat/${chat.id}`)}
          >
            <MessageSquare size={16} className="shrink-0" />
            {editingId === chat.id ? (
              <Input
                autoFocus
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRename(chat.id)}
                className="h-6 px-1 py-0 bg-transparent border-none focus-visible:ring-0 text-foreground"
              />
            ) : (
              <span className="truncate">{chat.title}</span>
            )}
          </div>

          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            {editingId === chat.id ? (
              <div className="flex gap-1">
                <X size={14} className="hover:text-red-500 cursor-pointer" onClick={() => setEditingId(null)} />
                <Check size={14} className="hover:text-emerald-500 cursor-pointer" onClick={() => handleRename(chat.id)} />
              </div>
            ) : (
              /* I'll use a simple button for now instead of complex dropdown for speed */
              <Trash2 
                size={14} 
                className="text-zinc-600 hover:text-red-500 cursor-pointer transition-colors" 
                onClick={() => handleDelete(chat.id)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
