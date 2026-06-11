"use client"

import { Cpu, Globe, Lock, Database, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const FEATURES = [
  {
    title: "Enterprise Intelligence",
    description: "Proprietary AI models optimized for complex business reasoning and autonomous task execution.",
    icon: Cpu,
    accent: "primary",   // indigo
    tag: "Core AI",
    iconBg: "gradient-primary",
    tagCls: "badge-primary",
  },
  {
    title: "Global Scalability",
    description: "Deploy AI across your entire org with multi-region support, auto-scaling, and 99.9% SLA guarantees.",
    icon: Globe,
    accent: "secondary", // teal
    tag: "Infrastructure",
    iconBg: "gradient-secondary",
    tagCls: "badge-secondary",
  },
  {
    title: "Security & Compliance",
    description: "AES-256 encryption, SOC2 Type II, GDPR, and HIPAA compliance built into the core platform.",
    icon: Lock,
    accent: "primary",
    tag: "Security",
    iconBg: "gradient-primary",
    tagCls: "badge-primary",
  },
  {
    title: "Custom Integrations",
    description: "Connect existing data sources and workflows with our REST API, webhooks, and native SDK.",
    icon: Database,
    accent: "tertiary",  // amber
    tag: "Integrations",
    iconBg: "gradient-tertiary",
    tagCls: "badge-tertiary",
  },
]

export const Features = () => {
  return (
    <section className="bg-[#F8FAFC]" id="solutions">
      <div className="section-padding max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-secondary rounded-full px-3 py-1.5 mb-5">
            <Sparkles size={13} className="text-teal-600" />
            Our Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            Everything your team needs
            <br />
            <span className="gradient-text-brand">in one platform.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Reliable, secure, and blazing-fast AI solutions built for
            mission-critical operations at any scale.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {FEATURES.map((f, i) => (
            <Link key={i} href="/dashboard">
              <div className="card-base p-7 h-full flex flex-col justify-between group cursor-pointer">
                <div>
                  <div className={`${f.tagCls} rounded-full mb-5 inline-block`}>{f.tag}</div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5 shadow-md`}
                  >
                    <f.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                </div>

                <div className="flex items-center gap-1.5 pt-5 text-xs font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-200 uppercase tracking-wider">
                  Explore <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-gradient mb-14" />

        {/* Bottom CTA Banner */}
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)",
          }}
        >
          {/* dot pattern overlay */}
          <div className="absolute inset-0 hero-dots opacity-10 pointer-events-none" />

          <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 bg-white/15 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                500+ Enterprise Teams
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                Ready to transform your AI strategy?
              </h3>
              <p className="text-indigo-100 max-w-md leading-relaxed text-sm">
                Join leading enterprise teams already using DevKit to automate
                workflows and unlock insights at scale.
              </p>
            </div>
            <Link href="/dashboard">
              <button className="bg-white text-indigo-700 font-bold text-sm px-8 h-12 rounded-xl hover:bg-indigo-50 transition-all shadow-lg flex items-center gap-2 whitespace-nowrap">
                Start Free Trial
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
