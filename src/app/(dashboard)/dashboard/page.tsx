"use client"

import { 
  Zap, 
  MessageSquare, 
  Users, 
  Activity, 
} from "lucide-react"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="p-10 h-full overflow-y-auto max-w-6xl">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Overview</h1>
        <p className="text-muted-foreground">Monitor your platform's performance and usage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Tokens Used", value: "1.2M", icon: Zap },
          { label: "Active Chats", value: "248", icon: MessageSquare },
          { label: "Team Members", value: "12", icon: Users },
          { label: "System Status", value: "Healthy", icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-secondary/50 border border-border rounded-xl">
            <div className="flex items-center gap-3 mb-4 text-muted-foreground">
              <stat.icon size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
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
