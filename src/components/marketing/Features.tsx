"use client"

import { motion } from "framer-motion"
import { 
  MessageSquare, 
  Code2, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Cpu,
  BarChart3,
  Bot
} from "lucide-react"

const features = [
  {
    title: "Next-Gen Chat",
    description: "Human-like conversations with multi-modal support and context awareness.",
    icon: MessageSquare,
    className: "md:col-span-2",
    color: "bg-blue-500/10 text-blue-400"
  },
  {
    title: "AI Agents",
    description: "Autonomous workers for complex tasks.",
    icon: Bot,
    className: "md:col-span-1",
    color: "bg-purple-500/10 text-purple-400"
  },
  {
    title: "Code Intel",
    description: "Enterprise-grade code generation and security scanning.",
    icon: Code2,
    className: "md:col-span-1",
    color: "bg-emerald-500/10 text-emerald-400"
  },
  {
    title: "Workflows",
    description: "Drag-and-drop AI pipeline builder for rapid automation.",
    icon: Zap,
    className: "md:col-span-2",
    color: "bg-amber-500/10 text-amber-400"
  },
  {
    title: "Real-time Analytics",
    description: "Monitor AI performance and costs across your entire organization.",
    icon: BarChart3,
    className: "md:col-span-1",
    color: "bg-pink-500/10 text-pink-400"
  },
  {
    title: "Secure RAG",
    description: "Knowledge-base integration with advanced encryption and isolation.",
    icon: ShieldCheck,
    className: "md:col-span-1",
    color: "bg-cyan-500/10 text-cyan-400"
  }
]

export const Features = () => {
  return (
    <section id="features" className="py-24 container px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Enterprise Capabilities</h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Everything you need to ship AI-native applications at scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-3xl glass-dark border border-white/5 p-8 hover:border-white/20 transition-all ${feature.className}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
            
            {/* Subtle Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
