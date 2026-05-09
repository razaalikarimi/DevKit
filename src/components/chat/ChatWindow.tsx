"use client"

import { useChat } from "@ai-sdk/react"
import { useState, useEffect, useRef } from "react"
import { 
  Send, 
  User, 
  Bot, 
  Copy, 
  RotateCcw, 
  StopCircle,
  ChevronDown,
  Brain,
  Zap,
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

export const ChatWindow = () => {
  const [input, setInput] = useState("")
  const { messages, status, sendMessage, stop, reload } = useChat({
    api: "/api/chat",
  })

  const isLoading = status === "streaming" || status === "submitting"
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
    }
  }, [messages])

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Asset copied to clipboard.")
  }

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return
    
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-10 border-b border-border bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center">
            <Zap size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest">Enterprise Core AI</h2>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mt-0.5">Verified Instance</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary/30 border border-border">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Neural Link Active</span>
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary">
            <MoreHorizontal size={20} />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="max-w-4xl mx-auto p-10 space-y-12">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
              <div className="w-16 h-16 bg-secondary flex items-center justify-center">
                <Brain className="text-primary" size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-widest">New Conversation</h3>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] max-w-xs">
                  Initiate prompt to interact with the neural network.
                </p>
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex gap-6 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${
                m.role === "user" ? "bg-primary text-white" : "bg-secondary text-primary border border-border"
              }`}>
                {m.role === "user" ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`flex flex-col gap-3 max-w-[80%] ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`p-6 text-sm leading-relaxed border ${
                  m.role === "user" 
                    ? "bg-primary text-white border-primary" 
                    : "bg-white text-foreground border-border"
                }`}>
                  {m.parts ? (
                    m.parts.map((part: any, i: number) => (
                      <div key={i}>
                        {part.type === 'text' && part.text}
                        {part.type === 'tool-invocation' && (
                          <div className="mt-4 p-4 bg-secondary/50 border border-border italic text-xs">
                            Running {part.toolInvocation.toolName}...
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    (m as any).content || ""
                  )}
                </div>
                {m.role !== "user" && (
                  <div className="flex items-center gap-4 px-1">
                    <button 
                      onClick={() => copyToClipboard(m.parts?.[0]?.text || (m as any).content || "")} 
                      className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    >
                      Copy Asset
                    </button>
                    <button 
                      onClick={() => reload()} 
                      className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    >
                      Regenerate
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-secondary text-primary border border-border flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div className="bg-white border border-border p-6 flex gap-1">
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-10 bg-white border-t border-border">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter operational prompt..."
            className="min-h-[60px] max-h-[200px] w-full bg-secondary/20 border-border focus-visible:ring-1 focus-visible:ring-primary rounded-none pr-32 py-4 resize-none text-sm leading-relaxed"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {isLoading ? (
              <Button onClick={() => stop()} size="sm" variant="ghost" className="h-10 px-4 text-destructive hover:bg-destructive/5 font-bold uppercase tracking-widest text-[10px]">
                <StopCircle size={18} className="mr-2" />
                Terminate
              </Button>
            ) : (
              <Button type="submit" size="sm" disabled={!input.trim()} className="enterprise-btn h-10 px-6 font-bold text-[10px] uppercase tracking-widest">
                <Send size={14} className="mr-2" />
                Send
              </Button>
            )}
          </div>
        </form>
        <div className="max-w-4xl mx-auto mt-4 flex items-center justify-between">
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Identity: {process.env.NEXT_PUBLIC_APP_NAME || "AURA"} v1.0.0
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Security: TLS 1.3 / AES-256
          </div>
        </div>
      </div>
    </div>
  )
}
