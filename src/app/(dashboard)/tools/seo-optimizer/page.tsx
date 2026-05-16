"use client"

import { ToolInterface } from "@/components/tools/ToolInterface"
import { Search } from "lucide-react"

export default function SEOOptimizerPage() {
  return (
    <ToolInterface
      title="SEO Content Optimizer"
      description="Analyze and generate SEO metadata to rank higher on search engines."
      icon={Search}
      prompt="Act as an expert Technical SEO Specialist. Based on the provided content or topic, generate the following: 1) An optimized Page Title (under 60 chars), 2) A compelling Meta Description (under 160 chars), 3) 5-7 LSI keywords, 4) A suggested H1, H2, H3 heading structure."
      inputs={[
        {
          id: "topic",
          label: "Page Topic or Content Summary",
          type: "textarea",
          placeholder: "Paste your content summary here..."
        },
        {
          id: "primary_keyword",
          label: "Primary Keyword",
          type: "text",
          placeholder: "e.g. Best AI SaaS Platforms"
        },
        {
          id: "search_intent",
          label: "Search Intent",
          type: "text",
          placeholder: "e.g. Informational, Commercial, Transactional"
        }
      ]}
    />
  )
}
