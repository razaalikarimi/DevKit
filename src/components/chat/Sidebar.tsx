"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Plus,
  MessageSquare,
  LayoutDashboard,
  CreditCard,
  Users,
  FolderOpen,
  Star,
  Settings,
  Sparkles,
  Zap,
  GitBranch,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatList } from "./ChatList"
import { createConversation } from "@/actions/chat"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const routes = [
  { label: "Overview",   icon: LayoutDashboard, href: "/dashboard", badge: null },
  { label: "AI Chat",    icon: MessageSquare,   href: "/chat",      badge: null },
  { label: "AI Tools",   icon: Zap,             href: "/tools",     badge: "New" },
  { label: "Knowledge",  icon: FolderOpen,      href: "/knowledge", badge: null },
  { label: "RepoMind AI",icon: GitBranch,       href: "/repomind",  badge: null },
  { label: "Prompts",    icon: Star,            href: "/prompts",   badge: null },
  { label: "Team",       icon: Users,           href: "/team",      badge: null },
  { label: "Billing",    icon: CreditCard,      href: "/billing",   badge: null },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  const handleNewChat = async () => {
    try {
      const chat = await createConversation()
      if (chat?.id) {
        router.push(`/chat/${chat.id}`)
        toast.success("New conversation started.")
      }
    } catch {
      toast.error("Failed to initialize new conversation.")
    }
  }

  if (!isMounted) return null

  return (
    <div className="flex w-[260px] h-full flex-col flex-shrink-0 bg-white border-r border-slate-200">
      {/* Brand */}
      <Link href="/">
        <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 text-lg">
            Dev<span className="gradient-text-primary">Kit</span>
          </span>
          <span className="ml-auto badge-primary rounded-full">AI</span>
        </div>
      </Link>

      {/* New Chat */}
      <div className="px-4 py-3 border-b border-slate-100">
        <button
          onClick={handleNewChat}
          className="btn-primary w-full h-10 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
        >
          <Plus size={15} />
          New Conversation
        </button>
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 px-3 py-3">
        <div className="space-y-0.5">
          {routes.map((route, i) => {
            const isActive = pathname === route.href
            return (
              <Link key={i} href={route.href}>
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group
                    ${isActive ? "nav-item-active" : "nav-item-base"}
                  `}
                >
                  <route.icon
                    size={17}
                    className={isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-700"}
                  />
                  <span className="flex-1 font-medium">{route.label}</span>
                  {route.badge && (
                    <span className="badge-tertiary rounded-full text-[9px] px-1.5 py-0.5">{route.badge}</span>
                  )}
                  {isActive && <ChevronRight size={14} className="text-indigo-400" />}
                </div>
              </Link>
            )
          })}
        </div>

        {/* History */}
        <div className="mt-5">
          <div className="px-3 mb-2 flex items-center gap-2">
            <div className="h-[1px] flex-1 bg-slate-100" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">History</span>
            <div className="h-[1px] flex-1 bg-slate-100" />
          </div>
          <ChatList />
        </div>
      </ScrollArea>

      {/* User */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs font-bold">AD</AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Admin</div>
              <div className="text-[10px] text-indigo-600 font-semibold">Premium Plan</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg"
            onClick={() => toast.info("Settings interface is under maintenance.")}
          >
            <Settings size={15} />
          </Button>
        </div>
      </div>
    </div>
  )
}
