"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import { useUser, UserButton, SignInButton } from "@/lib/mock-clerk"
import { useState, useEffect } from "react"

export const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`
      h-16 sticky top-0 z-50 px-6 md:px-12 flex items-center justify-between
      transition-all duration-300 border-b
      ${scrolled
        ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm"
        : "bg-white border-slate-100"}
    `}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shadow-md">
          <Sparkles size={15} className="text-white" />
        </div>
        <span className="text-lg font-bold text-slate-900 tracking-tight">
          Dev<span className="gradient-text-primary">Kit</span>
        </span>
        <span className="hidden sm:block badge-primary">AI</span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-1">
        {[
          { label: "Solutions", href: "#solutions" },
          { label: "Platform", href: "/dashboard" },
          { label: "Developers", href: "/tools" },
          { label: "Pricing", href: "/billing" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Auth */}
      <div className="flex items-center gap-3">
        {!isLoaded ? (
          <div className="w-24 h-9 rounded-lg bg-slate-100 animate-pulse" />
        ) : !isSignedIn ? (
          <>
            <Link
              href="/sign-in"
              className="hidden md:block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Sign in
            </Link>
            <Link href="/sign-up">
              <button className="btn-primary h-9 px-5 rounded-xl text-sm font-semibold flex items-center gap-1.5">
                Get Started <ArrowRight size={14} />
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
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
