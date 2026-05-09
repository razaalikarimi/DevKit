"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { 
  Zap, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  Sparkles,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface ToolInterfaceProps {
  title: string
  description: string
  icon: any
  prompt: string
  inputs: {
    id: string
    label: string
    type: "text" | "textarea"
    placeholder: string
  }[]
}

export const ToolInterface = ({ 
  title, 
  description, 
  icon: Icon, 
  prompt, 
  inputs 
}: ToolInterfaceProps) => {
  const [formState, setFormState] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  const { messages, append, isLoading, setMessages } = useChat({
    api: "/api/chat",
  })

  const lastMessage = messages[messages.length - 1]
  const result = lastMessage?.role === "assistant" ? lastMessage.content : ""

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct the final prompt
    let finalPrompt = `${prompt}\n\nInputs:\n`
    Object.entries(formState).forEach(([key, value]) => {
      finalPrompt += `- ${key}: ${value}\n`
    })

    setMessages([])
    append({
      role: "user",
      content: finalPrompt,
    })
  }

  const copyToClipboard = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    toast.success("Copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 h-full overflow-y-auto max-w-5xl mx-auto">
      <Link href="/tools" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Tools
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Input Panel */}
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Icon size={24} />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
            </div>
            <p className="text-zinc-500 text-sm">{description}</p>
          </div>

          <Card className="p-6 glass-dark border-white/5 bg-white/[0.02]">
            <form onSubmit={handleGenerate} className="space-y-6">
              {inputs.map((input) => (
                <div key={input.id} className="space-y-2">
                  <Label className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
                    {input.label}
                  </Label>
                  {input.type === "text" ? (
                    <Input
                      placeholder={input.placeholder}
                      className="bg-white/5 border-white/5 focus-visible:ring-purple-500/50"
                      onChange={(e) => setFormState({ ...formState, [input.id]: e.target.value })}
                    />
                  ) : (
                    <Textarea
                      placeholder={input.placeholder}
                      className="bg-white/5 border-white/5 focus-visible:ring-purple-500/50 min-h-[120px]"
                      onChange={(e) => setFormState({ ...formState, [input.id]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full ai-gradient border-none h-12 text-lg font-bold"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RotateCcw className="animate-spin" size={20} />
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles size={20} />
                    Generate Content
                  </span>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Result</h2>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyToClipboard}
                disabled={!result}
                className="text-zinc-500 hover:text-white"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                disabled={!result}
                className="text-zinc-500 hover:text-white"
              >
                <Download size={16} />
              </Button>
            </div>
          </div>

          <Card className="flex-1 p-6 glass-dark border-white/5 bg-white/[0.02] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!result && !isLoading ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                >
                  <Zap className="text-zinc-800 mb-4" size={48} />
                  <p className="text-zinc-600 text-sm max-w-[200px]">
                    Fill in the details and click generate to see the magic happen.
                  </p>
                </motion.div>
              ) : (
                <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {result}
                </div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  )
}
