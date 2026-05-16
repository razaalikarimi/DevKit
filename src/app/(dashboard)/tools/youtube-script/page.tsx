"use client"

import { ToolInterface } from "@/components/tools/ToolInterface"
import { Video } from "lucide-react"

export default function YouTubeScriptPage() {
  return (
    <ToolInterface
      title="YouTube Script Writer"
      description="Write engaging, high-retention video scripts for your YouTube channel."
      icon={Video}
      prompt="Act as a viral YouTube strategist and scriptwriter. Write a full YouTube script based on the following inputs. Include a strong hook in the first 10 seconds, clear sections, visual cues (B-roll suggestions), and an engaging outro encouraging subscriptions and likes."
      inputs={[
        {
          id: "title",
          label: "Video Title / Concept",
          type: "text",
          placeholder: "e.g. 5 Habits of Highly Effective Developers"
        },
        {
          id: "length",
          label: "Estimated Video Length",
          type: "text",
          placeholder: "e.g. 8-10 minutes"
        },
        {
          id: "key_points",
          label: "Main Points to Cover",
          type: "textarea",
          placeholder: "1. Deep work 2. Consistent learning 3. Writing documentation..."
        }
      ]}
    />
  )
}
