import { 
  FileText, 
  Mail, 
  Linkedin, 
  Code2, 
  Search, 
  Youtube, 
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
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Email Generator",
    description: "Professional emails for sales, support, and marketing.",
    icon: Mail,
    href: "/tools/email-generator",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    title: "LinkedIn Post",
    description: "Viral LinkedIn content to grow your personal brand.",
    icon: Linkedin,
    href: "/tools/linkedin-post",
    color: "text-sky-500",
    bg: "bg-sky-500/10"
  },
  {
    title: "AI Code Generator",
    description: "Write clean, efficient code in any programming language.",
    icon: Code2,
    href: "/tools/code-generator",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "YouTube Script",
    description: "Engaging video scripts for your YouTube channel.",
    icon: Youtube,
    href: "/tools/youtube-script",
    color: "text-red-500",
    bg: "bg-red-500/10"
  },
  {
    title: "SEO Optimizer",
    description: "Analyze and optimize your content for search engines.",
    icon: Search,
    href: "/tools/seo-optimizer",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    title: "Resume Builder",
    description: "Professional resumes tailored to job descriptions.",
    icon: PenTool,
    href: "/tools/resume-builder",
    color: "text-pink-500",
    bg: "bg-pink-500/10"
  },
  {
    title: "Image Prompt",
    description: "Detailed prompts for Midjourney and DALL-E.",
    icon: ImageIcon,
    href: "/tools/image-prompt",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10"
  }
]

export default function ToolsPage() {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">AI Tools</h1>
        <p className="text-zinc-500 mt-1 text-sm">Specialized generators for every business need.</p>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <Input 
          placeholder="Search for a tool..." 
          className="pl-10 bg-white/5 border-white/5 focus-visible:ring-purple-500/50 h-11"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, i) => (
          <Link key={i} href={tool.href}>
            <Card className="p-6 glass-dark border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all group h-full flex flex-col">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${tool.bg} ${tool.color}`}>
                <tool.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                {tool.description}
              </p>
              <div className="mt-6 flex items-center text-xs font-bold text-zinc-600 uppercase tracking-widest group-hover:text-white transition-colors">
                Try Now
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
