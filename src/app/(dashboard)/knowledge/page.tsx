"use client"

import { useState, useEffect, useRef } from "react"
import { 
  FileUp, 
  Search, 
  FileText, 
  Trash2, 
  ShieldCheck,
  Database,
  Loader2
} from "lucide-react"
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
      
      toast.success(`${file.name} uploaded successfully.`)
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
      toast.success("Document removed.")
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
    <div className="p-10 h-full overflow-y-auto">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleUpload}
        accept=".pdf,.docx,.txt"
      />
      
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Knowledge Assets</h1>
          <p className="text-muted-foreground text-sm">Manage enterprise documents for semantic search and AI context.</p>
        </div>
        <Button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="enterprise-btn h-12"
        >
          {isUploading ? <Loader2 className="animate-spin" size={16} /> : <FileUp size={16} />}
          {isUploading ? "Processing..." : "Add Document"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-border p-16 flex flex-col items-center justify-center text-center bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
          >
            <FileUp size={48} className="text-primary mb-6" />
            <h3 className="text-xl font-bold mb-2">Upload Data Sources</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Drag and drop PDF, DOCX, or TXT files. DevKit indexes your data for instant retrieval.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Document Inventory</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <Input 
                  placeholder="Filter inventory..." 
                  className="h-9 pl-9 bg-white border-border text-xs w-[240px] rounded-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1 bg-border border border-border">
              {loading ? (
                <div className="p-12 bg-white text-center text-muted-foreground text-sm">Loading inventory...</div>
              ) : filteredDocs.length === 0 ? (
                <div className="p-12 bg-white text-center text-muted-foreground text-sm">No documents registered.</div>
              ) : (
                filteredDocs.map((doc) => (
                  <div key={doc.id} className="p-6 bg-white hover:bg-secondary/50 transition-colors group flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <FileText size={24} className="text-primary" />
                      <div>
                        <div className="text-sm font-bold text-foreground">{doc.name}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-4 mt-1">
                          <span className="uppercase font-bold tracking-widest">{(doc.size / 1024).toFixed(1)} KB</span>
                          <span>•</span>
                          <span className="uppercase font-bold tracking-widest">{new Date(doc.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="text-primary flex items-center gap-1 font-bold uppercase tracking-widest">
                            <ShieldCheck size={10} />
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 border border-border bg-white">
            <div className="flex items-center gap-3 mb-8">
              <Database className="text-primary" size={24} />
              <h3 className="font-bold text-lg">System Resources</h3>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">Vector Storage</span>
                  <span>{formattedSize} MB / 100 MB</span>
                </div>
                <div className="h-1 bg-secondary overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${Math.min(100, (totalSize / (100 * 1024 * 1024)) * 100)}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-1">Index Count</div>
                  <div className="text-2xl font-bold">{documents.length}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-1">Architecture</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-primary">Hybrid RAG</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border border-border bg-primary text-white">
            <h3 className="font-bold text-lg mb-4">Enterprise RAG</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-8">
              DevKit utilizes high-performance vector indexing to provide your AI with secure, real-time access to your organization's unique knowledge base.
            </p>
            <div className="h-[1px] bg-white/20 w-full mb-8" />
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
              Encryption: AES-256
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
