"use client"

import {
  Zap,
  MessageSquare,
  Users,
  Activity,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const QUICK_ACTIONS = [
  {
    title: "AI Chat",
    desc: "Interact with the core generative AI model in real-time.",
    href: "/chat",
    iconBg: "gradient-primary",
    borderTop: "border-t-indigo-500",
    tag: "badge-primary",
    tagLabel: "Core",
    emoji: "💬",
  },
  {
    title: "AI Tools",
    desc: "Generate blogs, emails, code snippets and tailored assets.",
    href: "/tools",
    iconBg: "gradient-secondary",
    borderTop: "border-t-teal-500",
    tag: "badge-secondary",
    tagLabel: "Popular",
    emoji: "⚡",
  },
  {
    title: "Knowledge Hub",
    desc: "Feed custom files & documents for AI-powered retrieval.",
    href: "/knowledge",
    iconBg: "gradient-tertiary",
    borderTop: "border-t-amber-500",
    tag: "badge-tertiary",
    tagLabel: "RAG",
    emoji: "📂",
  },
  {
    title: "RepoMind AI",
    desc: "Map, audit, and get insights from your code repositories.",
    href: "/repomind",
    iconBg: "gradient-primary",
    borderTop: "border-t-indigo-500",
    tag: "badge-primary",
    tagLabel: "Beta",
    emoji: "🌿",
  },
]

const STATS = [
  { label: "Tokens Used",   value: "1.2M",    icon: Zap,          href: "/billing", delta: "+12% this week" },
  { label: "Active Chats",  value: "248",     icon: MessageSquare, href: "/chat",    delta: "+24 today" },
  { label: "Team Members",  value: "12",      icon: Users,         href: "/team",    delta: "3 online now" },
  { label: "System Status", value: "Healthy", icon: Activity,      href: "/dashboard", delta: "99.9% uptime" },
]

const ACTIVITY = [
  { initials: "A", action: "New AI chat session started",   time: "2 min ago",  color: "gradient-primary" },
  { initials: "M", action: "Knowledge document uploaded",   time: "15 min ago", color: "gradient-secondary" },
  { initials: "S", action: "RepoMind scan completed",       time: "1 hr ago",   color: "gradient-tertiary" },
]

export default function DashboardPage() {
  return (
    <div className="p-8 h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={15} className="text-indigo-500" />
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Welcome back</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900">Platform Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Monitor your AI platform's performance and usage.</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-indigo-200 rounded-xl px-4 py-2.5 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Demo Mode Active</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Quick Start Launchpad</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_ACTIONS.map((a, i) => (
              <Link key={i} href={a.href}>
                <div className={`card-base p-6 h-full flex flex-col justify-between cursor-pointer group border-t-[3px] ${a.borderTop}`}>
                  <div>
                    <div className="text-2xl mb-3">{a.emoji}</div>
                    <span className={`${a.tag} rounded-full mb-3 inline-block`}>{a.tagLabel}</span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-1 mb-1.5">
                      {a.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{a.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 pt-4 text-xs font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-all uppercase tracking-wider">
                    Launch <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATS.map((s, i) => (
            <Link key={i} href={s.href}>
              <div className="card-base p-5 cursor-pointer group">
                <div className="flex items-center gap-2 mb-3 text-slate-400 group-hover:text-indigo-500 transition-colors">
                  <s.icon size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{s.label}</span>
                </div>
                <div className="text-2xl font-black text-slate-900 mb-1.5">{s.value}</div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-teal-600">
                  <TrendingUp size={10} />
                  {s.delta}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Activity */}
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Recent Activity</h3>
              <span className="badge-secondary rounded-full">Live</span>
            </div>
            <div className="space-y-4">
              {ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0`}
                  >
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-800 truncate">{item.action}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                      <Clock size={10} />
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Usage */}
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Plan Usage</h3>
              <span className="badge-primary rounded-full">Premium</span>
            </div>
            <div className="space-y-5">
              {[
                { label: "Storage",    used: 85, color: "gradient-primary" },
                { label: "API Calls",  used: 40, color: "gradient-secondary" },
                { label: "Team Seats", used: 60, color: "gradient-tertiary" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="text-slate-900">{item.used}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.used}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link href="/billing">
                <button className="w-full h-10 rounded-xl text-sm font-semibold text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                  Manage Billing <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
