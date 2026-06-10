"use client"

import { 
  Zap, 
  MessageSquare, 
  Users, 
  Activity, 
} from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="p-10 h-full overflow-y-auto max-w-6xl">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Overview</h1>
          <p className="text-muted-foreground text-sm">Monitor your platform's performance and usage.</p>
        </div>
        <div className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold rounded-lg flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span>Demo Mode Unlocked</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Quick Start Launchpad</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "💬 Open AI Chat", desc: "Interact with the core generative AI model.", href: "/chat" },
            { title: "⚡ AI Tools Directory", desc: "Generate blogs, emails, and tailored assets.", href: "/tools" },
            { title: "📂 Knowledge Hub", desc: "Feed custom files & documents to the AI.", href: "/knowledge" },
            { title: "🌿 RepoMind AI", desc: "Map and audit your code repositories.", href: "/repomind" }
          ].map((action, i) => (
            <Link key={i} href={action.href}>
              <div className="p-6 bg-white border border-border rounded-xl hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between h-full group">
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{action.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{action.desc}</p>
                </div>
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  Launch →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Tokens Used", value: "1.2M", icon: Zap, href: "/billing" },
          { label: "Active Chats", value: "248", icon: MessageSquare, href: "/chat" },
          { label: "Team Members", value: "12", icon: Users, href: "/team" },
          { label: "System Status", value: "Healthy", icon: Activity, href: "/dashboard" },
        ].map((stat, i) => (
          <Link key={i} href={stat.href}>
            <div className="p-6 bg-secondary/50 border border-border rounded-xl hover:bg-secondary/80 transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-4 text-muted-foreground">
              <stat.icon size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-border rounded-2xl bg-background">
          <h3 className="font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">A</div>
                <div>
                  <div className="text-sm font-bold">New chat session started</div>
                  <div className="text-xs text-muted-foreground">2 minutes ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 border border-border rounded-2xl bg-background">
          <h3 className="font-bold mb-6">Plan Usage</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
                <span>Storage</span>
                <span>85%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
                <span>API Limit</span>
                <span>40%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[40%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
