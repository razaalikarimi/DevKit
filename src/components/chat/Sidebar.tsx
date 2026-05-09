"use client"

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
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { label: "AI Tools", icon: Zap, href: "/tools" },
    { label: "Knowledge", icon: FolderOpen, href: "/knowledge" },
    { label: "Prompts", icon: Star, href: "/prompts" },
    { label: "Team", icon: Users, href: "/team" },
    { label: "Billing", icon: CreditCard, href: "/billing" },
  ]

  return (
    <div className="w-[260px] h-full flex flex-col bg-slate-50/50 border-r border-border">
      {/* Brand */}
      <div className="h-16 px-6 flex items-center gap-3">
        <Sparkles className="text-primary w-5 h-5" />
        <span className="font-bold text-foreground tracking-tight text-lg">Aura</span>
      </div>

      <div className="px-4 py-2">
        <Button 
          onClick={handleNewChat}
          className="w-full bg-primary text-white hover:bg-primary/90 shadow-none rounded-lg h-10 gap-2 text-sm"
        >
          <Plus size={16} />
          New Conversation
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 mt-4">
        <div className="space-y-1">
          {routes.map((route, i) => (
            <Link key={i} href={route.href}>
              <div className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group
                ${pathname === route.href 
                  ? "bg-primary/10 text-primary font-semibold" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}
              `}>
                <route.icon size={18} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <div className="px-3 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50">History</span>
          </div>
          <ChatList />
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-border bg-secondary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-semibold">Admin</span>
              <span className="text-[10px] text-muted-foreground">Premium</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Settings size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
