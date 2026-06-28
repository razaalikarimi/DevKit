/* eslint-disable */
"use client"

import { useEffect, useState } from "react"
import { getPrompts, createPrompt, deletePrompt } from "@/actions/prompts"
import { 
  Plus, 
  Search, 
  Copy, 
  Trash2, 
  Terminal, 
  Share2,
  Lock,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  // Form State
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchPrompts()
  }, [])

  const fetchPrompts = async () => {
    const data = await getPrompts()
    setPrompts(data)
    setLoading(false)
  }

  const handleCreate = async () => {
    if (!name || !content) return
    try {
      await createPrompt({ name, description, prompt: content, isPublic })
      toast.success("Prompt template added.")
      setOpen(false)
      fetchPrompts()
      setName("")
      setDescription("")
      setContent("")
      setIsPublic(false)
    } catch (error) {
      toast.error("Failed to create prompt")
    }
  }

  const handleDelete = async (id: string) => {
    await deletePrompt(id)
    toast.success("Template removed.")
    fetchPrompts()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Prompt copied to clipboard.")
  }

  const filteredPrompts = prompts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={14} className="text-purple-500" />
            <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">Prompts</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">System Prompts</h1>
          <p className="text-slate-500 text-sm mt-1">Engineered instructions and reusable AI templates.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="enterprise-btn h-12 px-8">
            <Plus size={18} />
            Register Template
          </DialogTrigger>
          <DialogContent className="bg-white border-border rounded-none text-foreground max-w-2xl p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold border-b border-border pb-4">New Template Configuration</DialogTitle>
            </DialogHeader>
            <div className="space-y-8 py-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Asset Name</Label>
                <Input 
                  placeholder="e.g. Legal Compliance Reviewer" 
                  className="bg-white border-border rounded-none h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Operational Description</Label>
                <Input 
                  placeholder="Define the primary use case..." 
                  className="bg-white border-border rounded-none h-12"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">System Logic / Instructions</Label>
                <Textarea 
                  placeholder="Provide explicit AI instructions..." 
                  className="bg-white border-border rounded-none min-h-[200px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/50 border border-border">
                <div className="space-y-1">
                  <Label className="text-sm font-bold">Public Accessibility</Label>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Share this asset across the workspace</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
            </div>
            <DialogFooter className="border-t border-border pt-6">
              <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-none">Discard</Button>
              <Button onClick={handleCreate} className="enterprise-btn h-12 px-10">Confirm Asset</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-12 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          placeholder="Filter templates..." 
          className="h-12 pl-12 bg-white border-border rounded-none focus-visible:ring-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-20 bg-white text-center">
            <Loader2 className="animate-spin mx-auto text-primary" size={32} />
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="col-span-full py-32 bg-white flex flex-col items-center justify-center text-center opacity-40">
            <Terminal size={48} className="mb-4" />
            <p className="font-bold uppercase tracking-widest text-xs">No assets identified</p>
          </div>
        ) : (
          filteredPrompts.map((prompt) => (
            <div key={prompt.id} className="p-8 bg-white hover:bg-secondary/50 transition-colors group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <Terminal size={28} className="text-primary" />
                  <div className="flex items-center gap-2">
                    {prompt.isPublic ? (
                      <div className="px-2 py-1 bg-primary/10 text-primary text-[8px] font-bold uppercase tracking-widest flex items-center gap-1">
                        <Share2 size={10} />
                        Public
                      </div>
                    ) : (
                      <div className="px-2 py-1 bg-secondary text-muted-foreground text-[8px] font-bold uppercase tracking-widest flex items-center gap-1">
                        <Lock size={10} />
                        Internal
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{prompt.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-8 leading-relaxed">
                  {prompt.description || "No operational description provided."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-border">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary p-0 hover:bg-transparent"
                  onClick={() => copyToClipboard(prompt.prompt)}
                >
                  <Copy size={14} className="mr-2" />
                  Copy Sequence
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(prompt.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  )
}

