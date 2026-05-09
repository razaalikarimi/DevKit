"use client"

import { useEffect, useState } from "react"
import { getPrompts, createPrompt, deletePrompt } from "@/actions/prompts"
import { 
  Plus, 
  Search, 
  Star, 
  Copy, 
  Trash2, 
  Terminal, 
  Tag,
  Sparkles,
  Share2,
  Lock
} from "lucide-react"
import { Card } from "@/components/ui/card"
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
      toast.success("Prompt created successfully")
      setOpen(false)
      fetchPrompts()
      // Reset form
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
    toast.success("Prompt deleted")
    fetchPrompts()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const filteredPrompts = prompts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Prompt Library</h1>
          <p className="text-zinc-500 mt-1 text-sm">Save and reuse your most effective AI instructions.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="ai-gradient border-none gap-2">
              <Plus size={16} />
              New Prompt
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-dark border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Create Prompt Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label className="text-zinc-400">Name</Label>
                <Input 
                  placeholder="e.g. SEO Content Strategist" 
                  className="bg-white/5 border-white/10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-400">Description</Label>
                <Input 
                  placeholder="What is this prompt for?" 
                  className="bg-white/5 border-white/10"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-400">System Prompt / Instructions</Label>
                <Textarea 
                  placeholder="Act as a professional..." 
                  className="bg-white/5 border-white/10 min-h-[150px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Public Template</Label>
                  <p className="text-xs text-zinc-500">Allow others in your workspace to use this prompt.</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} className="ai-gradient border-none font-bold">Save Prompt</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-8 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
        <Input 
          placeholder="Search templates..." 
          className="h-11 pl-10 bg-white/5 border-white/10 text-zinc-300 focus:border-purple-500/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map((n) => (
            <Card key={n} className="h-48 glass-dark border-white/5 animate-pulse bg-white/5" />
          ))
        ) : filteredPrompts.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-50">
            <Terminal size={48} className="mb-4" />
            <p className="text-lg">No prompts found</p>
            <p className="text-sm">Create your first prompt to get started.</p>
          </div>
        ) : (
          filteredPrompts.map((prompt) => (
            <Card key={prompt.id} className="p-6 glass-dark border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Terminal size={20} />
                </div>
                <div className="flex items-center gap-2">
                  {prompt.isPublic ? (
                    <div className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Share2 size={10} />
                      Public
                    </div>
                  ) : (
                    <div className="px-2 py-1 rounded-full bg-zinc-500/10 text-zinc-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Lock size={10} />
                      Private
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{prompt.name}</h3>
              <p className="text-sm text-zinc-500 line-clamp-2 mb-6">
                {prompt.description || "No description provided."}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-zinc-400 hover:text-white gap-2"
                  onClick={() => copyToClipboard(prompt.prompt)}
                >
                  <Copy size={14} />
                  Copy Prompt
                </Button>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-zinc-600 hover:text-red-500"
                    onClick={() => handleDelete(prompt.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              {/* Decorative Background */}
              <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.02] pointer-events-none" />
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
