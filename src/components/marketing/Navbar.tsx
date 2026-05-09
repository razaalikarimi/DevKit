"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu } from "lucide-react"

export const Navbar = () => {
  return (
    <nav className="h-16 border-b border-border bg-white sticky top-0 z-50 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary" />
          <span className="text-xl font-bold tracking-tighter uppercase">Aura</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#solutions" className="hover:text-primary transition-colors">Solutions</Link>
          <Link href="#platform" className="hover:text-primary transition-colors">Platform</Link>
          <Link href="#developers" className="hover:text-primary transition-colors">Developers</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-sm font-bold hover:text-primary transition-colors">
          Log in
        </Link>
        <Button className="enterprise-btn rounded-none h-10 px-6 text-xs uppercase tracking-widest font-bold">
          Get Started
        </Button>
      </div>
    </nav>
  )
}
