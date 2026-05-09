"use client"

import { useState, useEffect, useRef } from "react"
import { 
  FileUp, 
  Search, 
  FileText, 
  MoreVertical, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  Database,
  Loader2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { getDocuments, deleteDocument } from "@/actions/knowledge"

export default function KnowledgePage() {
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [search, setSearch] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchDocs()
  }, [])

  const fetchDocs = async () => {
    const data = await getDocuments()
    setDocuments(data)
    setLoading(false)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")
      
      toast.success(`${file.name} uploaded and parsed!`)
      fetchDocs()
    } catch (error) {
      toast.error("Error uploading file")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument(id)
      toast.success("Document deleted")
      fetchDocs()
    } catch (error) {
      toast.error("Failed to delete document")
    }
  }

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalSize = documents.reduce((acc, doc) => acc + doc.size, 0)
  const formattedSize = (totalSize / (1024 * 1024)).toFixed(2)

  return (
    <div className="p-8 h-full overflow-y-auto">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleUpload}
        accept=".pdf,.docx,.txt"
      />
      
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Knowledge Base</h1>
          <p className="text-zinc-500 mt-1 text-sm">Upload documents to power your AI with custom context.</p>
        </div>
        <Button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="ai-gradient border-none gap-2"
        >
          {isUploading ? <Loader2 className="animate-spin" size={16} /> : <FileUp size={16} />}
          {isUploading ? "Uploading..." : "Upload Document"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-white/[0.01] hover:bg-white/[0.02] transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileUp size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Drop your files here</h3>
            <p className="text-zinc-500 text-sm max-w-xs mx-auto">
              Support for PDF, DOCX, and TXT. Files are processed for semantic search locally.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">My Documents</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                <Input 
                  placeholder="Search docs..." 
                  className="h-8 pl-9 bg-white/5 border-white/5 text-xs w-[200px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              [1, 2].map(n => <Card key={n} className="h-20 glass-dark border-white/5 animate-pulse" />)
            ) : filteredDocs.length === 0 ? (
              <div className="py-20 text-center opacity-30">
                <FileText size={48} className="mx-auto mb-4" />
                <p>No documents found</p>
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <Card key={doc.id} className="p-4 glass-dark border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{doc.name}</div>
                        <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                          <span>{(doc.size / 1024).toFixed(1)} KB</span>
                          <span>•</span>
                          <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="text-emerald-500 flex items-center gap-1">
                            <ShieldCheck size={10} />
                            {doc.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-zinc-500 hover:text-red-500"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6 glass-dark border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-6">
              <Database className="text-purple-400" size={20} />
              <h3 className="font-bold text-white">Storage Usage</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Workspace Storage</span>
                  <span className="text-white">{formattedSize} MB / 100 MB</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${Math.min(100, (totalSize / (100 * 1024 * 1024)) * 100)}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <div className="text-[10px] text-zinc-600 uppercase font-bold">Docs</div>
                  <div className="text-xl font-bold text-white">{documents.length}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-600 uppercase font-bold">Status</div>
                  <div className="text-sm font-bold text-emerald-500">Optimal</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
