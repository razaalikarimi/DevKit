"use client"

import { useChat } from "ai/react"
import { useState, useEffect, useRef } from "react"
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Copy, 
  RotateCcw, 
  StopCircle,
  Settings2,
  ChevronDown,
  Cpu,
  Brain,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const MODELS = [
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", icon: Zap, speed: "Ultra Fast", desc: "Best for quick tasks & daily chat" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", icon: Brain, speed: "Smart", desc: "Best for complex reasoning & coding" },
  { id: "gpt-4o", name: "GPT-4o (Legacy)", icon: Cpu, speed: "Balanced", desc: "Classic high-performance model" },
]

export const ChatWindow = () => {
  const [selectedModel, setSelectedModel] = useState(MODELS[0])
  const [personality, setPersonality] = useState("Professional")

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload, body } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel.id,
      personality: personality
    }
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
    }
  }, [messages])

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="flex flex-col h-full bg-[#09090b] border-l border-white/5 relative">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-white/5 px-3 py-1.5 rounded-xl transition-colors">
                <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center">
                  <selectedModel.icon className="text-white w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-white">{selectedModel.name}</h2>
                    <ChevronDown size={14} className="text-zinc-500" />
                  </div>
                  <p className="text-[10px] text-zinc-500">{selectedModel.speed}</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 glass-dark border-white/10 text-white">
              <DropdownMenuLabel className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest">Select Model</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              {MODELS.map((model) => (
                <DropdownMenuItem 
                  key={model.id} 
                  onClick={() => setSelectedModel(model)}
                  className="flex flex-col items-start gap-1 p-3 focus:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <model.icon size={14} className={selectedModel.id === model.id ? "text-purple-400" : "text-zinc-500"} />
                    <span className="font-bold">{model.name}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">{model.desc}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white gap-2">
                <Settings2 size={16} />
                <span className="text-xs">{personality}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-dark border-white/10 text-white">
              {["Professional", "Creative", "Concise", "Code Expert"].map((p) => (
                <DropdownMenuItem key={p} onClick={() => setPersonality(p)}>
                  {p}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <Sparkles className="text-purple-500 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">How can I help you today?</h3>
              <p className="text-zinc-500 max-w-sm">
                I'm set to <span className="text-purple-400">{personality}</span> mode using <span className="text-purple-400">{selectedModel.name}</span>.
              </p>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role !== "user" && (
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                    <Bot className="text-purple-400 w-5 h-5" />
                  </div>
                )}
                
                <div className={`group relative max-w-[85%] rounded-2xl p-4 ${
                  m.role === "user" 
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/10" 
                    : "bg-white/5 border border-white/10 text-zinc-200"
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed text-sm">
                    {m.content}
                  </div>
                  
                  {/* Action Buttons */}
                  {m.role !== "user" && (
                    <div className="absolute -bottom-8 left-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => copyToClipboard(m.content)}
                        className="p-1.5 rounded-md hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                      <button 
                        onClick={() => reload()}
                        className="p-1.5 rounded-md hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <User className="text-zinc-400 w-5 h-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-6 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <form 
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto relative group"
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder={`Message ${selectedModel.name}...`}
            className="min-h-[60px] max-h-[200px] w-full bg-white/5 border-white/10 focus-visible:ring-purple-500/50 rounded-2xl pr-24 py-4 resize-none transition-all placeholder:text-zinc-600"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e as any)
              }
            }}
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {isLoading ? (
              <Button 
                type="button"
                onClick={() => stop()}
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 rounded-lg p-0 hover:bg-red-500/10 text-red-500"
              >
                <StopCircle size={18} />
              </Button>
            ) : (
              <Button 
                type="submit" 
                size="sm" 
                disabled={!input.trim()}
                className="h-8 w-8 rounded-lg p-0 ai-gradient border-none"
              >
                <Send size={16} />
              </Button>
            )}
          </div>
        </form>
        <p className="text-[10px] text-center text-zinc-600 mt-4">
          Built with <span className="text-purple-400 font-bold">Aura Engine v2.0</span> • Enterprise AI
        </p>
      </div>
    </div>
  )
}
