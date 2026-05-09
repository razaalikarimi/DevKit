"use client"

import { ToolInterface } from "@/components/tools/ToolInterface"
import { FileText } from "lucide-react"

export default function BlogWriterPage() {
  return (
    <ToolInterface
      title="Blog Writer"
      description="Create compelling, high-ranking blog posts for any niche."
      icon={FileText}
      prompt="Act as a professional SEO content writer. Write a comprehensive blog post based on the following inputs. Include a catchy title, introduction, body with subheadings, and a conclusion. Use a tone that is professional yet engaging."
      inputs={[
        {
          id: "topic",
          label: "Blog Topic",
          type: "text",
          placeholder: "e.g. The Future of AI in Enterprise"
        },
        {
          id: "keywords",
          label: "Target Keywords",
          type: "text",
          placeholder: "e.g. AI, Enterprise SaaS, Future Tech"
        },
        {
          id: "audience",
          label: "Target Audience",
          type: "text",
          placeholder: "e.g. Tech Founders, CTOs"
        },
        {
          id: "additional_info",
          label: "Key Points to Include",
          type: "textarea",
          placeholder: "Mention cost savings, scalability, and security..."
        }
      ]}
    />
  )
}
