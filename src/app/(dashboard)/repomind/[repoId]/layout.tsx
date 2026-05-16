"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Terminal, MessageSquare, GitBranch, ShieldAlert, Cpu } from "lucide-react";

export default async function RepoDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ repoId: string }>;
}) {
  const resolvedParams = await params;
  const params_repoId = resolvedParams.repoId;
  const pathname = usePathname();
  const baseUrl = `/repomind/${params_repoId}`;

  const tabs = [
    { name: "Overview", href: baseUrl, icon: Terminal, exact: true },
    { name: "Chat & Agents", href: `${baseUrl}/chat`, icon: MessageSquare, exact: false },
    { name: "Architecture", href: `${baseUrl}/architecture`, icon: Cpu, exact: false },
    { name: "Security Audit", href: `${baseUrl}/security`, icon: ShieldAlert, exact: false },
    { name: "PR Reviews", href: `${baseUrl}/pull-requests`, icon: GitBranch, exact: false },
  ];

  return (
    <div className="flex flex-col flex-1 h-[calc(100vh-4rem)]">
      <div className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0">
        <div className="flex h-14 items-center px-4 md:px-8 gap-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground whitespace-nowrap px-1 py-4 border-b-2",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-background/50">
        {children}
      </div>
    </div>
  );
}
