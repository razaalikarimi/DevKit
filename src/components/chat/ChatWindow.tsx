"use client"

import { useChat } from "@ai-sdk/react"
import { useState, useEffect, useRef } from "react"
import { 
  Send, 
  User, 
  Bot, 
  StopCircle,
  Brain,
  Zap,
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useParams } from "next/navigation"
import { toast } from "sonner"

export const ChatWindow = () => {
  const params = useParams()
  const chatId = params.chatId as string
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const chatHelpers = useChat({
    id: chatId,
    api: "/api/chat",
    body: {
      chatId,
      personality: "Professional",
      model: "gemini-1.5-flash"
    },
    onResponse: (response: any) => {
      if (!response.ok) {
        toast.error("Failed to connect to AI neural link.")
      }
    },
  } as any) as any

  const { messages, sendMessage, status, stop, regenerate } = chatHelpers
  const [input, setInput] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const isLoading = status === "streaming" || status === "submitted"

  const reload = () => {
    regenerate()
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
    }
  }, [messages])

  if (!isMounted) return null

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Asset copied to clipboard.")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-10 border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
            <Zap size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 tracking-tight">Enterprise Core AI</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] mt-0.5">Verified Instance</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-teal-50 border border-teal-100 rounded-lg shadow-xs">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Neural Link Active</span>
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl">
            <MoreHorizontal size={18} />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="max-w-4xl mx-auto p-10 space-y-12">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                <Brain size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">New Conversation</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Start a conversation with DevKit AI. Type a message below to begin.
                </p>
              </div>
            </div>
          )}

          {messages.map((m: any) => (
            <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                m.role === "user" ? "bg-indigo-600 text-white" : "bg-teal-50 text-teal-600 border border-teal-100"
              }`}>
                {m.role === "user" ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`flex flex-col gap-2 max-w-[80%] ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`px-5 py-3.5 text-sm leading-relaxed border shadow-xs ${
                  m.role === "user" 
                    ? "bg-indigo-600 text-white border-indigo-600 rounded-2xl rounded-tr-none" 
                    : "bg-white text-slate-800 border-slate-100 rounded-2xl rounded-tl-none"
                }`}>
                  {m.content || ""}
                </div>
                {m.role !== "user" && (
                  <div className="flex items-center gap-4 px-1">
                    <button 
                      onClick={() => copyToClipboard(m.content || "")} 
                      className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      Copy Response
                    </button>
                    <button 
                      onClick={() => reload()} 
                      className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      Regenerate
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shadow-sm">
                <Bot size={18} />
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-xs flex gap-1 items-center">
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" />
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-8 bg-white border-t border-slate-100 shadow-sm">
        <form onSubmit={onSubmit} className="max-w-4xl mx-auto relative">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Ask DevKit AI a question..."
            className="min-h-[60px] max-h-[200px] w-full bg-slate-50 border border-slate-200/80 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-xl pr-32 py-4 resize-none text-sm text-slate-800 placeholder:text-slate-400 leading-relaxed transition-all shadow-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                // @ts-ignore
                onSubmit(e)
              }
            }}
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {isLoading ? (
              <Button onClick={() => stop()} size="sm" variant="ghost" className="h-9 px-3 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold uppercase tracking-wider text-[10px] rounded-lg">
                <StopCircle size={16} className="mr-1.5" />
                Terminate
              </Button>
            ) : (
              <Button type="submit" size="sm" disabled={!input || !input.trim()} className="enterprise-btn h-9 px-5 font-semibold text-[10px] uppercase tracking-wider rounded-lg">
                <Send size={12} className="mr-1.5" />
                Send
              </Button>
            )}
          </div>
        </form>
        <div className="max-w-4xl mx-auto mt-3.5 flex items-center justify-between">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Identity: {process.env.NEXT_PUBLIC_APP_NAME || "DEVKIT"} v1.0.0
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Security: TLS 1.3 / AES-256
          </div>
        </div>
      </div>
    </div>
  )
}
