"use client";

import { Button } from "@/components/ui/button";
import { Terminal, Plus, Search, GitBranch, ShieldAlert, Cpu, Sparkles, RefreshCw, Activity } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const repositories = [
  {
    id: "repo_1",
    name: "devkit-ai-saas",
    fullName: "acme-corp/devkit-ai-saas",
    language: "TypeScript",
    langColor: "bg-blue-500",
    status: "READY",
    lastScan: "2 hours ago",
    issues: 3,
    linesOfCode: "84.2K",
  },
  {
    id: "repo_2",
    name: "core-infrastructure",
    fullName: "acme-corp/core-infrastructure",
    language: "Terraform",
    langColor: "bg-purple-500",
    status: "INDEXING",
    lastScan: "Scanning now...",
    issues: 0,
    linesOfCode: "12.7K",
  },
  {
    id: "repo_3",
    name: "ml-pipeline",
    fullName: "acme-corp/ml-pipeline",
    language: "Python",
    langColor: "bg-yellow-500",
    status: "READY",
    lastScan: "Yesterday",
    issues: 1,
    linesOfCode: "103.5K",
  },
];

export default function RepoMindDashboard() {
  return (
    <div className="p-8 h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-indigo-500" />
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Repository Intelligence</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900">RepoMind AI</h1>
            <p className="text-slate-500 text-sm mt-1">Autonomous repository intelligence and code analysis.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-10 px-4 rounded-xl border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all"
              onClick={() => toast.success("GitHub repository synchronization started.")}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync GitHub
            </Button>
            <Button
              className="btn-primary h-10 px-5 rounded-xl text-sm font-semibold flex items-center gap-2"
              onClick={() => toast.info("GitHub OAuth flow is being initialized.")}
            >
              <Plus className="h-4 w-4" />
              Connect Repo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Repos",    value: "12",  icon: Terminal,   delta: "+2 this week",       danger: false },
            { label: "Lines Indexed",  value: "1.2M",icon: Cpu,        delta: "Across all branches", danger: false },
            { label: "Security Risks", value: "7",   icon: ShieldAlert,delta: "-3 since last scan",  danger: true  },
            { label: "PR Reviews",     value: "4",   icon: Activity,   delta: "2 pending AI analysis",danger: false },
          ].map((s, i) => (
            <div key={i} className="card-base p-5">
              <div className={`flex items-center gap-2 mb-3 ${s.danger ? "text-red-500" : "text-slate-400"}`}>
                <s.icon size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{s.label}</span>
              </div>
              <div className={`text-2xl font-black mb-1 ${s.danger ? "text-red-500" : "text-slate-900"}`}>{s.value}</div>
              <div className="text-[10px] text-slate-400 font-medium">{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search repositories..."
              className="pl-10 h-10 bg-white border-slate-200 text-sm rounded-xl"
            />
          </div>
        </div>

        {/* Repo Cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repo) => (
            <Link href={`/repomind/${repo.id}`} key={repo.id}>
              <div className="card-base p-6 h-full flex flex-col cursor-pointer group border-l-[3px] border-l-indigo-400">
                {/* Top */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <Terminal size={16} className="text-indigo-500" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                        {repo.name}
                      </div>
                      <div className="text-[11px] text-slate-400">{repo.fullName}</div>
                    </div>
                  </div>

                  <div className={`
                    flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                    ${repo.status === "READY"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
                      : "bg-blue-50 border border-blue-200 text-blue-600"}
                  `}>
                    {repo.status === "INDEXING" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    )}
                    {repo.status}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <div className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                    {repo.language}
                  </div>
                  {repo.issues > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500">
                      <ShieldAlert size={12} />
                      {repo.issues} risks
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Cpu size={12} />
                    {repo.linesOfCode} lines
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">Last scan: {repo.lastScan}</span>
                  <GitBranch size={14} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
