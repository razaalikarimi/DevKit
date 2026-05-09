"use client"

import { 
  Zap, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Activity, 
  Clock, 
  ArrowUpRight,
  Sparkles,
  BarChart3,
  LineChart as LineChartIcon
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts"

const data = [
  { name: "Mon", tokens: 4000, chats: 24 },
  { name: "Tue", tokens: 3000, chats: 13 },
  { name: "Wed", tokens: 2000, chats: 98 },
  { name: "Thu", tokens: 2780, chats: 39 },
  { name: "Fri", tokens: 1890, chats: 48 },
  { name: "Sat", tokens: 2390, chats: 38 },
  { name: "Sun", tokens: 3490, chats: 43 },
]

export default function DashboardPage() {
  return (
    <div className="p-8 h-full overflow-y-auto max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Platform Analytics</h1>
          <p className="text-zinc-500 mt-1 text-sm">Real-time overview of your AI consumption and activity.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs text-zinc-400">
            <Clock size={14} />
            Last 7 Days
          </div>
          <button className="ai-gradient text-white px-6 py-2 rounded-xl text-sm font-bold border-none">
            Download Report
          </button>
        </div>
      </div>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Tokens", value: "1.2M", change: "+12.5%", icon: Zap, color: "text-purple-400" },
          { label: "Active Chats", value: "248", change: "+8.2%", icon: MessageSquare, color: "text-blue-400" },
          { label: "Team Members", value: "12", change: "0%", icon: Users, color: "text-emerald-400" },
          { label: "Avg. Latency", value: "1.2s", change: "-150ms", icon: Activity, color: "text-amber-400" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 glass-dark border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold ${stat.change.startsWith("+") ? "text-emerald-500" : stat.change === "0%" ? "text-zinc-500" : "text-emerald-500"}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-sm font-medium text-zinc-500 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="md:col-span-2 p-8 glass-dark border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-white flex items-center gap-2">
              <BarChart3 size={18} className="text-purple-400" />
              Token Consumption
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Input</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Output</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#09090b", border: "1px solid #ffffff10", borderRadius: "12px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="tokens" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorTokens)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8 glass-dark border-white/5 bg-white/[0.02]">
          <h3 className="font-bold text-white mb-8 flex items-center gap-2">
            <LineChartIcon size={18} className="text-blue-400" />
            Chat Activity
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: "#09090b", border: "1px solid #ffffff10", borderRadius: "12px" }}
                />
                <Bar dataKey="chats" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 glass-dark border-white/5 bg-white/[0.02]">
          <h3 className="font-bold text-white mb-6">Model Distribution</h3>
          <div className="space-y-4">
            {[
              { name: "Gemini 1.5 Flash", usage: 75, color: "bg-purple-500" },
              { name: "Gemini 1.5 Pro", usage: 15, color: "bg-blue-500" },
              { name: "GPT-4o (Legacy)", usage: 10, color: "bg-emerald-500" },
            ].map((model, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">{model.name}</span>
                  <span className="text-white font-bold">{model.usage}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${model.color}`} style={{ width: `${model.usage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 glass-dark border-white/5 bg-white/[0.02]">
          <h3 className="font-bold text-white mb-6">Recent Alerts</h3>
          <div className="space-y-4">
            {[
              { title: "Credit Usage Alert", desc: "Your workspace has reached 80% of monthly tokens.", time: "2h ago", type: "warning" },
              { title: "New Team Member", desc: "Sarah Chen joined the workspace.", time: "5h ago", type: "info" },
              { title: "Plan Upgraded", desc: "Successfully moved to Enterprise tier.", time: "1d ago", type: "success" },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  alert.type === "warning" ? "bg-amber-500" : alert.type === "success" ? "bg-emerald-500" : "bg-blue-500"
                }`} />
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{alert.title}</div>
                  <div className="text-xs text-zinc-500">{alert.desc}</div>
                </div>
                <div className="ml-auto text-[10px] text-zinc-600 font-bold uppercase">{alert.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
