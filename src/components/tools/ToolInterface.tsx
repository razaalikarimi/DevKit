"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
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

  const { messages, sendMessage, status, setMessages } = useChat({
    // @ts-ignore
    api: "/api/chat",
  } as any)

  const isLoading = status !== "ready"
  const lastMessage = messages[messages.length - 1]
  const result = lastMessage?.role === "assistant" 
    ? (lastMessage.parts ? lastMessage.parts.map((p: any) => p.text).join("") : (lastMessage as any).content || "")
    : ""

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct the final prompt
    let finalPrompt = `${prompt}\n\nInputs:\n`
    Object.entries(formState).forEach(([key, value]) => {
      finalPrompt += `- ${key}: ${value}\n`
    })

    setMessages([])
    sendMessage({ text: finalPrompt })
  }

  const copyToClipboard = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    toast.success("Asset copied to clipboard.")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-10 h-full overflow-y-auto max-w-7xl mx-auto">
      <Link href="/tools" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors mb-12 group text-xs font-bold uppercase tracking-widest">
        <ArrowLeft size={16} />
        Return to Solutions Directory
      </Link>

      <div className="flex flex-col lg:flex-row gap-1 bg-border border border-border">
        {/* Input Panel */}
        <div className="flex-1 bg-white p-10 space-y-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary flex items-center justify-center">
                <Icon size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-10">
            {inputs.map((input) => (
              <div key={input.id} className="space-y-3">
                <Label className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
                  {input.label}
                </Label>
                {input.type === "text" ? (
                  <Input
                    placeholder={input.placeholder}
                    className="bg-secondary/20 border-border rounded-none h-12 text-sm"
                    onChange={(e) => setFormState({ ...formState, [input.id]: e.target.value })}
                  />
                ) : (
                  <Textarea
                    placeholder={input.placeholder}
                    className="bg-secondary/20 border-border rounded-none min-h-[160px] text-sm leading-relaxed"
                    onChange={(e) => setFormState({ ...formState, [input.id]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="enterprise-btn h-14 w-full text-xs font-bold uppercase tracking-widest"
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <RotateCcw className="animate-spin" size={18} />
                  Executing Generation...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <Sparkles size={18} />
                  Initiate Production
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Output Panel */}
        <div className="flex-1 bg-secondary/10 flex flex-col min-h-[500px]">
          <div className="p-10 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Generated Output</h2>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={copyToClipboard}
                  disabled={!result}
                  className="h-10 w-10 text-muted-foreground hover:text-primary"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={!result}
                  className="h-10 w-10 text-muted-foreground hover:text-primary"
                >
                  <Download size={18} />
                </Button>
              </div>
            </div>

            <div className="flex-1 relative overflow-hidden bg-white border border-border p-8">
              <AnimatePresence mode="wait">
                {!result && !isLoading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 opacity-30"
                  >
                    <Zap className="text-primary mb-6" size={48} />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] max-w-[180px]">
                      Awaiting Input Configuration
                    </p>
                  </motion.div>
                ) : (
                  <div className="text-foreground text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {result}
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Encryption: AES-256
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Verified Output
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
