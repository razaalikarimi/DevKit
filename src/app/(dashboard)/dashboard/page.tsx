"use client"

import {
  Zap,
  MessageSquare,
  Users,
  Activity,
  ArrowRight,
  TrendingUp,
  Clock,
  GitBranch,
  FolderOpen,
} from "lucide-react"
import Link from "next/link"

const QUICK_ACTIONS = [
  {
    title: "AI Chat",
    desc:  "Interact with the core generative AI model in real-time.",
    href:  "/chat",
    icon:  MessageSquare,
  },
  {
    title: "AI Tools",
    desc:  "Generate blogs, emails, code snippets and tailored assets.",
    href:  "/tools",
    icon:  Zap,
  },
  {
    title: "Knowledge Hub",
    desc:  "Feed custom files & documents for AI-powered retrieval.",
    href:  "/knowledge",
    icon:  FolderOpen,
  },
  {
    title: "RepoMind AI",
    desc:  "Map, audit, and get insights from your code repositories.",
    href:  "/repomind",
    icon:  GitBranch,
  },
]

const STATS = [
  { label: "Tokens Used",   value: "1.2M",    icon: Zap,           href: "/billing",   delta: "+12% this week" },
  { label: "Active Chats",  value: "248",      icon: MessageSquare, href: "/chat",      delta: "+24 today"      },
  { label: "Team Members",  value: "12",       icon: Users,         href: "/team",      delta: "3 online now"   },
  { label: "System Status", value: "Healthy",  icon: Activity,      href: "/dashboard", delta: "99.9% uptime"   },
]

const ACTIVITY = [
  { initials: "A", action: "New AI chat session started", time: "2 min ago",  },
  { initials: "M", action: "Knowledge document uploaded", time: "15 min ago", },
  { initials: "S", action: "RepoMind scan completed",     time: "1 hr ago",   },
]

const USAGE_BARS = [
  { label: "Storage",    used: 85, color: "bg-indigo-500" },
  { label: "API Calls",  used: 40, color: "bg-slate-400"  },
  { label: "Team Seats", used: 60, color: "bg-slate-600"  },
]

export default function DashboardPage() {
  return (
    <div className="p-8 h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="max-w-6xl">

        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
              Welcome back
            </p>
            <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Monitor your AI platform's performance and usage.</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-md px-3.5 py-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-slate-600">Demo Mode Active</span>
          </div>
        </div>

        {/* Quick Actions — clean cards, no emojis, no colored top borders */}
        <div className="mb-10">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-4">
            Quick Start
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_ACTIONS.map((a, i) => (
              <Link key={i} href={a.href}>
                <div className="card-base p-5 h-full flex flex-col justify-between cursor-pointer group">
                  <div>
                    <div className="w-9 h-9 rounded-md bg-slate-100 text-slate-400 flex items-center justify-center mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <a.icon size={17} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors mb-1.5">
                      {a.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{a.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 pt-4 text-xs font-semibold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats — no bright icon colors, clean hover */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATS.map((s, i) => (
            <Link key={i} href={s.href}>
              <div className="card-base p-5 cursor-pointer group">
                <div className="flex items-center gap-2 mb-3 text-slate-400 group-hover:text-indigo-500 transition-colors">
                  <s.icon size={14} />
                  <span className="text-[10px] font-semibold uppercase tracking-widest">{s.label}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1.5">{s.value}</div>
                <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                  <TrendingUp size={10} />
                  {s.delta}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Grid — Activity + Plan Usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Recent Activity */}
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-slate-800">Recent Activity</h3>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded px-2 py-0.5">
                Live
              </span>
            </div>
            <div className="space-y-4">
              {ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-center gap-3.5">
                  {/* Neutral initials avatar — no colored backgrounds */}
                  <div className="w-8 h-8 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-600 flex-shrink-0">
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-700 truncate">{item.action}</div>
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
              <h3 className="text-sm font-semibold text-slate-800">Plan Usage</h3>
              <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded px-2 py-0.5">
                Premium
              </span>
            </div>
            <div className="space-y-5">
              {USAGE_BARS.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500 font-medium">{item.label}</span>
                    <span className="text-slate-700 font-semibold">{item.used}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all`}
                      style={{ width: `${item.used}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link href="/billing">
                <button className="w-full h-9 rounded-md text-sm font-semibold text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                  Manage Billing <ArrowRight size={13} />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
