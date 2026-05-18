"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Plus, Search, GitBranch, ShieldAlert, Cpu } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function RepoMindDashboard() {
  // Mock data for initial UI setup
  const repositories = [
    {
      id: "repo_1",
      name: "aura-ai-saas",
      fullName: "acme-corp/aura-ai-saas",
      language: "TypeScript",
      status: "READY",
      lastScan: "2 hours ago",
      issues: 3,
    },
    {
      id: "repo_2",
      name: "core-infrastructure",
      fullName: "acme-corp/core-infrastructure",
      language: "Terraform",
      status: "INDEXING",
      lastScan: "Scanning now...",
      issues: 0,
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RepoMind AI</h2>
          <p className="text-muted-foreground mt-1">
            Autonomous Repository Intelligence System
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => toast.success("GitHub repository synchronization started.")}
          >
            <Terminal className="mr-2 h-4 w-4" />
            Sync GitHub
          </Button>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => toast.info("GitHub OAuth flow is being initialized.")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Connect Repository
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background/60 backdrop-blur-sm border-white/10 dark:border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Repositories</CardTitle>
            <Terminal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 connected this week</p>
          </CardContent>
        </Card>
        <Card className="bg-background/60 backdrop-blur-sm border-white/10 dark:border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lines of Code Indexed</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">Across all branches</p>
          </CardContent>
        </Card>
        <Card className="bg-background/60 backdrop-blur-sm border-white/10 dark:border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Risks</CardTitle>
            <ShieldAlert className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">-3 since last scan</p>
          </CardContent>
        </Card>
        <Card className="bg-background/60 backdrop-blur-sm border-white/10 dark:border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active PR Reviews</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 pending AI analysis</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2 my-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search repositories..." className="pl-8 bg-background" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repositories.map((repo) => (
          <Link href={`/repomind/${repo.id}`} key={repo.id}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-white/10 dark:border-white/5 bg-background/60 backdrop-blur-xl h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      {repo.name}
                    </CardTitle>
                    <CardDescription className="mt-1.5">{repo.fullName}</CardDescription>
                  </div>
                  <Badge variant={repo.status === "READY" ? "default" : "secondary"} className="animate-in fade-in zoom-in">
                    {repo.status === "INDEXING" && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-2" />}
                    {repo.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    {repo.language}
                  </div>
                  {repo.issues > 0 && (
                    <div className="flex items-center gap-1.5 text-sm text-rose-500">
                      <ShieldAlert className="h-4 w-4" />
                      {repo.issues} risks
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="px-6 py-4 border-t border-border/50 text-xs text-muted-foreground bg-muted/20">
                Last scan: {repo.lastScan}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
