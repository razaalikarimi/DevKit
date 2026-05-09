"use client"

import { 
  FileText, 
  Mail, 
  Briefcase, 
  Code2, 
  Search, 
  Video, 
  PenTool, 
  Image as ImageIcon, 
  Zap,
  ArrowRight
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const tools = [
  {
    title: "Blog Writer",
    description: "Generate high-quality SEO-optimized blog posts in seconds.",
    icon: FileText,
    href: "/tools/blog-writer",
  },
  {
    title: "Email Generator",
    description: "Professional emails for sales, support, and marketing.",
    icon: Mail,
    href: "/tools/email-generator",
  },
  {
    title: "LinkedIn Post",
    description: "Viral LinkedIn content to grow your personal brand.",
    icon: Briefcase,
    href: "/tools/linkedin-post",
  },
  {
    title: "AI Code Generator",
    description: "Write clean, efficient code in any programming language.",
    icon: Code2,
    href: "/tools/code-generator",
  },
  {
    title: "YouTube Script",
    description: "Engaging video scripts for your YouTube channel.",
    icon: Video,
    href: "/tools/youtube-script",
  },
  {
    title: "SEO Optimizer",
    description: "Analyze and optimize your content for search engines.",
    icon: Search,
    href: "/tools/seo-optimizer",
  },
  {
    title: "Resume Builder",
    description: "Professional resumes tailored to job descriptions.",
    icon: PenTool,
    href: "/tools/resume-builder",
  },
  {
    title: "Image Prompt",
    description: "Detailed prompts for Midjourney and DALL-E.",
    icon: ImageIcon,
    href: "/tools/image-prompt",
  }
]

export default function ToolsPage() {
  return (
    <div className="p-10 h-full overflow-y-auto">
      <div className="mb-12 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Tools Directory</h1>
        <p className="text-muted-foreground text-sm">Specialized enterprise-grade generators for every business operation.</p>
      </div>

      <div className="relative mb-12 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          placeholder="Search for a solution..." 
          className="pl-12 bg-white border-border rounded-none h-12 focus-visible:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-border border border-border">
        {tools.map((tool, i) => (
          <Link key={i} href={tool.href}>
            <div className="p-8 bg-white hover:bg-secondary transition-colors group h-full flex flex-col justify-between">
              <div className="space-y-6">
                <tool.icon size={28} className="text-primary" />
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-8 flex items-center text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Open Tool
                <div className="w-8 h-[1px] bg-primary ml-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
