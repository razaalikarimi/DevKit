"use client"

import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
  return (
    <section className="relative bg-white">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Content */}
          <div>
            {/* Eyebrow label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-500 mb-7 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
              Enterprise AI Workflow Platform
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-slate-900 leading-[1.12] mb-6">
              Develop & deploy
              <br />
              <span className="text-indigo-600">intelligent workflows</span>
              <br />
              with confidence.
            </h1>

            {/* Description */}
            <p className="text-[15px] text-slate-500 max-w-lg leading-relaxed mb-8">
              DevKit unifies AI chat, knowledge retrieval, code intelligence, and team workflows into one powerful platform — built for teams that move fast.
            </p>

            {/* Checklist */}
            <ul className="space-y-2.5 mb-8">
              {[
                "RAG-powered knowledge base",
                "Real-time AI chat with memory",
                "Repository intelligence & code review",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 size={15} className="text-indigo-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <button className="h-11 px-6 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors flex items-center gap-2">
                  Start Building Free
                  <ArrowRight size={14} />
                </button>
              </Link>
              <Link href="#solutions">
                <button className="h-11 px-6 rounded-md border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-sm font-medium transition-colors">
                  View Solutions
                </button>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-10 pt-8 mt-10 border-t border-slate-100">
              {[
                { label: "Uptime SLA",      value: "99.9%" },
                { label: "API Latency",     value: "<50ms" },
                { label: "Security Schema", value: "SOC2"  },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Clean Browser / UI Preview */}
          <div className="hidden lg:block">
            <div className="w-full max-w-[480px] ml-auto rounded-xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.07)] overflow-hidden">

              {/* Browser chrome */}
              <div className="bg-slate-50 border-b border-slate-200 h-10 px-4 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 flex items-center px-2 font-mono max-w-[200px]">
                    app.devkit.io/chat
                  </div>
                </div>
              </div>

              {/* Page header row */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[9px] font-black">D</span>
                </div>
                <span className="text-xs font-semibold text-slate-700">DevKit AI Chat</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-400">Connected</span>
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-5 space-y-4 bg-white">
                {/* User message */}
                <div className="flex gap-2.5 flex-row-reverse">
                  <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    U
                  </div>
                  <div className="bg-indigo-600 text-white px-3.5 py-2.5 rounded-xl rounded-tr-sm text-xs leading-relaxed max-w-[75%]">
                    How do I index my repository for code search?
                  </div>
                </div>

                {/* AI message */}
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-[10px] font-bold flex-shrink-0">
                    AI
                  </div>
                  <div className="bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl rounded-tl-sm text-xs text-slate-700 max-w-[75%] space-y-1.5 leading-relaxed">
                    <p className="font-semibold text-slate-800">RepoMind indexes your codebase automatically.</p>
                    <p>Add your remote URL under Settings → Repositories. We parse, index, and build a semantic graph of your code.</p>
                    <div className="flex gap-1.5 pt-0.5">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] text-slate-500 font-medium">Graph RAG</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] text-slate-500 font-medium">99.2% Accuracy</span>
                    </div>
                  </div>
                </div>

                {/* Input row */}
                <div className="mt-2 border border-slate-200 rounded-lg bg-slate-50 flex items-center gap-3 px-3.5 py-2.5">
                  <span className="text-xs text-slate-400 flex-1">Message DevKit AI…</span>
                  <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <ArrowRight size={11} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
