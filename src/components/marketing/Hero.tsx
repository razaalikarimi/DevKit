"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Shield, Globe } from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container px-4 text-center z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/10 text-xs font-medium text-purple-400 mb-8 animate-reveal">
          <Sparkles size={14} />
          <span>The future of AI is here</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
          Architect Your <br />
          <span className="ai-gradient-text">AI Future</span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The all-in-one platform for enterprise AI. Build agents, generate content, 
          and automate your entire workflow with the power of Aura.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="h-14 px-8 text-lg ai-gradient border-none group">
            Start Building Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg glass border-white/10 hover:bg-white/5">
            View Enterprise Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/5">
          {[
            { label: "Active Users", value: "2.5M+", icon: Globe },
            { label: "Uptime", value: "99.99%", icon: Shield },
            { label: "Tokens/sec", value: "850k", icon: Zap },
            { label: "Models", value: "50+", icon: Sparkles },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex flex-col items-center"
            >
              <stat.icon className="w-5 h-5 text-zinc-500 mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
