"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 glass-dark border-b border-white/10"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-white">Aura</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
        <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        <Link href="#about" className="hover:text-white transition-colors">About</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/sign-in">
          <Button variant="ghost" className="text-zinc-400 hover:text-white">Sign In</Button>
        </Link>
        <Link href="/sign-up">
          <Button className="ai-gradient border-none hover:opacity-90 transition-opacity">Get Started</Button>
        </Link>
      </div>
    </motion.nav>
  )
}
