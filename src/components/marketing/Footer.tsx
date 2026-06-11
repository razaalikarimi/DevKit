"use client"

import Link from "next/link"
import { Sparkles, Share2, Globe, Link2, ArrowUpRight, Mail } from "lucide-react"

const FOOTER_LINKS = {
  Platform: [
    { label: "AI Chat", href: "/chat" },
    { label: "Knowledge Hub", href: "/knowledge" },
    { label: "RepoMind", href: "/repomind" },
    { label: "AI Tools", href: "/tools" },
    { label: "Workflows", href: "/workflows" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Settings", href: "#" },
    { label: "Security", href: "#" },
  ],
}

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Top gradient accent */}
      <div
        className="h-[2px] w-full"
        style={{ background: "linear-gradient(90deg, #4F46E5, #0D9488, #F59E0B)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit group">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-md">
                <Sparkles size={17} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">DevKit</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed mb-7">
              The next-generation enterprise AI platform. Empowering teams to
              build, automate, and scale with intelligence.
            </p>
            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                { icon: Share2, href: "#", label: "Twitter" },
                { icon: Globe, href: "#", label: "GitHub" },
                { icon: Link2, href: "#", label: "LinkedIn" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
                >
                  <s.icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
            <div key={cat}>
              <h5 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-5">
                {cat}
              </h5>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1 group w-fit"
                    >
                      {l.label}
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="mb-10 p-6 rounded-2xl border border-slate-700"
          style={{ background: "rgba(79,70,229,0.08)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-bold text-white mb-0.5">Stay ahead with DevKit</div>
                <div className="text-xs text-slate-400">AI insights & platform news, straight to your inbox.</div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="h-10 px-4 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors flex-1 md:w-60"
              />
              <button className="btn-primary h-10 px-5 rounded-xl text-sm font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-600">
            © 2026 DevKit AI Corporation. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-600">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
