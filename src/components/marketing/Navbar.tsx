"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useUser, UserButton } from "@/lib/mock-clerk"
import { useState, useEffect } from "react"

export const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`
      h-16 sticky top-0 z-50 px-6 md:px-12 flex items-center justify-between
      transition-all duration-200 border-b
      ${scrolled
        ? "bg-white/96 backdrop-blur-sm border-slate-200 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
        : "bg-white border-slate-100"}
    `}>
      {/* Logo — simple wordmark with minimal mark */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-black leading-none">D</span>
        </div>
        <span className="text-[15px] font-bold text-slate-900 tracking-tight">
          DevKit
        </span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-0.5">
        {[
          { label: "Solutions", href: "#solutions" },
          { label: "Platform",  href: "/dashboard" },
          { label: "Developers",href: "/tools" },
          { label: "Pricing",   href: "/billing" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3.5 py-2 rounded-md text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Auth */}
      <div className="flex items-center gap-3">
        {!isLoaded ? (
          <div className="w-20 h-8 rounded-md bg-slate-100 animate-pulse" />
        ) : !isSignedIn ? (
          <>
            <Link
              href="/sign-in"
              className="hidden md:block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              Sign in
            </Link>
            <Link href="/sign-up">
              <button className="h-9 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center gap-1.5 transition-colors">
                Get Started <ArrowRight size={13} />
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              Dashboard
            </Link>
            <UserButton />
          </>
        )}
      </div>
    </nav>
  )
}
