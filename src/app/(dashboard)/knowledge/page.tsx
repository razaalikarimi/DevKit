"use client"

import { useState, useEffect, useRef } from "react"
import {
  FileUp,
  Search,
  FileText,
  Trash2,
  ShieldCheck,
  Database,
  Loader2,
  Sparkles,
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
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchDocs() }, [])

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
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) throw new Error()
      toast.success(`${file.name} uploaded successfully.`)
      fetchDocs()
    } catch {
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
    } catch {
      toast.error("Failed to delete document")
    }
  }

  const filteredDocs = documents.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )
  const totalSize = documents.reduce((a, d) => a + d.size, 0)
  const formattedSize = (totalSize / (1024 * 1024)).toFixed(2)
  const usagePct = Math.min(100, (totalSize / (100 * 1024 * 1024)) * 100)

  return (
    <div className="p-8 h-full overflow-y-auto bg-[#F8FAFC]">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUpload}
        accept=".pdf,.docx,.txt"
      />

      <div className="max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-teal-600" />
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Knowledge Base</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900">Knowledge Assets</h1>
            <p className="text-slate-500 text-sm mt-1">Manage documents for semantic search and AI context.</p>
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="btn-secondary h-11 px-6 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            {isUploading
              ? <Loader2 className="animate-spin" size={16} />
              : <FileUp size={16} />}
            {isUploading ? "Processing..." : "Add Document"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => {
                e.preventDefault(); setDragOver(false)
                const file = e.dataTransfer.files[0]
                if (file && fileInputRef.current) {
                  const dt = new DataTransfer(); dt.items.add(file)
                  fileInputRef.current.files = dt.files
                  fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }))
                }
              }}
              className={`rounded-2xl p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200
                ${dragOver
                  ? "border-2 border-teal-400 bg-teal-50 shadow-md"
                  : "border-2 border-dashed border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/40"}
              `}
            >
              <div className="w-14 h-14 rounded-2xl gradient-secondary flex items-center justify-center mb-4 shadow-lg">
                <FileUp size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Data Sources</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                Drag & drop PDF, DOCX, or TXT files. DevKit indexes your data for instant semantic retrieval.
              </p>
              <span className="mt-4 badge-secondary rounded-full px-3 py-1.5 text-xs">Browse Files</span>
            </div>

            {/* Document List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Document Inventory</span>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <Input
                    placeholder="Filter documents..."
                    className="h-9 pl-9 w-52 bg-slate-50 border-slate-200 text-sm rounded-xl"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <div className="p-12 text-center text-slate-400 text-sm">
                  <Loader2 className="animate-spin mx-auto mb-3 text-indigo-500" size={22} />
                  Loading documents...
                </div>
              ) : filteredDocs.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-sm">
                  No documents found. Upload one to get started.
                </div>
              ) : (
                filteredDocs.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between px-5 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                        <FileText size={17} className="text-indigo-500" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{doc.name}</div>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-0.5">
                          <span className="uppercase font-bold">{(doc.size / 1024).toFixed(1)} KB</span>
                          <span>•</span>
                          <span className="uppercase font-bold">{new Date(doc.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="text-teal-600 flex items-center gap-1 font-bold uppercase">
                            <ShieldCheck size={10} /> Verified
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            {/* Storage */}
            <div className="card-base p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl gradient-secondary flex items-center justify-center shadow-md">
                  <Database className="text-white" size={17} />
                </div>
                <h3 className="font-bold text-slate-900">System Resources</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-500">Vector Storage</span>
                    <span className="text-slate-900">{formattedSize} MB / 100 MB</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-brand rounded-full transition-all duration-1000"
                      style={{ width: `${usagePct}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Index Count</div>
                    <div className="text-2xl font-black text-slate-900">{documents.length}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Architecture</div>
                    <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">Hybrid RAG</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RAG Info */}
            <div
              className="rounded-2xl p-6 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)" }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, white, transparent)" }}
              />
              <h3 className="font-bold text-sm mb-3">Enterprise RAG Engine</h3>
              <p className="text-xs text-indigo-100 leading-relaxed mb-5">
                DevKit utilizes high-performance vector indexing to provide your AI
                with secure, real-time access to your knowledge base.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-200">
                <ShieldCheck size={12} />
                AES-256 Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
