"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Plus, 
  MessageSquare, 
  Search, 
  Settings, 
  LayoutDashboard, 
  CreditCard, 
  Users,
  FolderOpen,
  History,
  Star,
  LogOut,
  Sparkles,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { ChatList } from "./ChatList"
import { createConversation } from "@/actions/chat"
import { useRouter } from "next/navigation"

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const handleNewChat = async () => {
    const chat = await createConversation()
    router.push(`/chat/${chat.id}`)
  }

  const routes = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "AI Tools", icon: Zap, href: "/tools" },
    { label: "Knowledge", icon: FolderOpen, href: "/knowledge" },
    { label: "Prompts", icon: Star, href: "/prompts" },
    { label: "Team", icon: Users, href: "/team" },
    { label: "Billing", icon: CreditCard, href: "/billing" },
  ]

  return (
    <div className="w-[280px] h-full flex flex-col bg-[#09090b] border-r border-white/5">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-white tracking-tight">Aura AI</span>
      </div>

      {/* Main Actions */}
      <div className="px-4 mb-4">
        <Button 
          onClick={handleNewChat}
          className="w-full ai-gradient border-none justify-start gap-2 h-11"
        >
          <Plus size={18} />
          New Chat
        </Button>
      </div>

      {/* Search */}
      <div className="px-4 mb-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-500 transition-colors" size={14} />
          <Input 
            placeholder="Search chats..." 
            className="h-9 pl-9 bg-white/5 border-white/5 focus-visible:ring-purple-500/50"
          />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {routes.map((route, i) => (
            <Link key={i} href={route.href}>
              <div className={`
                flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group
                ${pathname === route.href 
                  ? "bg-purple-500/10 text-purple-400" 
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"}
              `}>
                <route.icon size={18} className={`${pathname === route.href ? "text-purple-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Chats Section */}
        <div className="mt-8">
          <div className="px-3 flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Recent Chats</span>
          </div>
          <ChatList />
        </div>

        {/* Folders Section */}
        <div className="mt-8">
          <div className="px-3 flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Folders</span>
            <Plus size={12} className="text-zinc-600 cursor-pointer hover:text-white" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300 cursor-pointer">
              <FolderOpen size={16} />
              Marketing Q2
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300 cursor-pointer">
              <FolderOpen size={16} />
              Product Roadmap
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* User & Settings */}
      <div className="p-4 mt-auto border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-white/10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">Admin</span>
            <span className="text-[10px] text-zinc-500">Pro Plan</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
          <Settings size={18} />
        </Button>
      </div>
    </div>
  )
}
