"use client"

import { ToolInterface } from "@/components/tools/ToolInterface"
import { Briefcase } from "lucide-react"

export default function LinkedInPostPage() {
  return (
    <ToolInterface
      title="LinkedIn Post Generator"
      description="Create viral, engaging LinkedIn content to grow your personal brand and network."
      icon={Briefcase}
      prompt="Act as an expert LinkedIn ghostwriter and personal branding strategist. Write an engaging, highly-converting LinkedIn post based on the following inputs. Use compelling hooks, clear formatting (short paragraphs), and a strong call-to-action (CTA) at the end. Include 3-5 relevant hashtags."
      inputs={[
        {
          id: "topic",
          label: "Post Topic or Story",
          type: "textarea",
          placeholder: "e.g. How I scaled my SaaS startup to $10k MRR in 3 months..."
        },
        {
          id: "tone",
          label: "Tone of Voice",
          type: "text",
          placeholder: "e.g. Professional, Inspirational, Controversial, Humorous"
        },
        {
          id: "target_audience",
          label: "Target Audience",
          type: "text",
          placeholder: "e.g. Software Engineers, Entrepreneurs, Marketers"
        }
      ]}
    />
  )
}
