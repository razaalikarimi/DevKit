"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Globe, Sparkles, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// Floating card — decorative UI preview
const FloatingCard = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <div
    className={`bg-white rounded-2xl border border-slate-200 shadow-lg p-4 ${className}`}
  >
    {children}
  </div>
)

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Dot pattern background */}
      <div className="absolute inset-0 hero-dots opacity-60 pointer-events-none" />

      {/* Gradient blobs */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 badge-primary mb-7 rounded-full px-3 py-1.5">
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Next-Generation Enterprise AI Platform
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] mb-6 text-slate-900">
              Build Smarter
              <br />
              <span className="gradient-text-brand">AI Workflows</span>
              <br />
              <span className="text-slate-400 text-4xl md:text-5xl font-bold">at Enterprise Scale.</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed mb-8">
              DevKit unifies AI chat, knowledge retrieval, code intelligence, and team workflows into one powerful platform — built for teams that move fast.
            </p>

            {/* Checklist */}
            <ul className="space-y-2 mb-9">
              {[
                "RAG-powered knowledge base",
                "Real-time AI chat with memory",
                "Repository intelligence & code review",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-slate-600">
                  <CheckCircle2 size={17} className="text-teal-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <button className="btn-primary h-12 px-7 rounded-xl text-sm font-bold flex items-center gap-2">
                  Start Building Free
                  <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="#solutions">
                <button className="btn-outline-primary h-12 px-7 rounded-xl text-sm font-bold">
                  View Solutions
                </button>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 pt-10 mt-10 border-t border-slate-100">
              {[
                { label: "Uptime SLA", value: "99.9%", icon: Shield, color: "text-indigo-600" },
                { label: "API Latency", value: "<50ms", icon: Zap, color: "text-teal-600" },
                { label: "Countries", value: "80+", icon: Globe, color: "text-amber-500" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <stat.icon size={18} className={stat.color} />
                  <div>
                    <div className="text-xl font-black text-slate-900">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Floating UI mockup */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Center card */}
            <div className="animate-float-gentle">
              <FloatingCard className="w-72 z-10 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">AI Response</div>
                    <div className="text-xs text-slate-400">Just now</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-indigo-100 w-full" />
                  <div className="h-2 rounded-full bg-indigo-100 w-4/5" />
                  <div className="h-2 rounded-full bg-indigo-100 w-full" />
                  <div className="h-2 rounded-full bg-indigo-100 w-3/5" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="badge-secondary rounded-full">RAG Active</div>
                  <div className="badge-tertiary rounded-full">98.7% Accuracy</div>
                </div>
              </FloatingCard>
            </div>

            {/* Top-right mini card */}
            <FloatingCard
              className="absolute -top-4 right-4 w-52 animate-float-gentle"
              style={{ animationDelay: "1.5s" } as React.CSSProperties}
            >
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Accuracy</div>
              <div className="text-3xl font-black gradient-text-primary">98.7%</div>
              <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full gradient-primary w-[98%] rounded-full" />
              </div>
            </FloatingCard>

            {/* Bottom-left mini card */}
            <FloatingCard
              className="absolute -bottom-4 left-4 w-56 animate-float-gentle"
              style={{ animationDelay: "3s" } as React.CSSProperties}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Status</span>
              </div>
              <div className="space-y-2">
                {["AI Engine", "Knowledge API", "Auth"].map((s) => (
                  <div key={s} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">{s}</span>
                    <span className="font-bold text-emerald-600">Operational</span>
                  </div>
                ))}
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  )
}
