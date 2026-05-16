"use client"

import { ToolInterface } from "@/components/tools/ToolInterface"
import { PenTool } from "lucide-react"

export default function ResumeBuilderPage() {
  return (
    <ToolInterface
      title="AI Resume Builder"
      description="Create professional, ATS-friendly resume bullet points tailored to job descriptions."
      icon={PenTool}
      prompt="Act as an expert Executive Resume Writer. Rewrite the provided work experience into powerful, metric-driven bullet points tailored to the target job role. Use the XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]). Make sure it passes ATS scanners."
      inputs={[
        {
          id: "target_role",
          label: "Target Job Title",
          type: "text",
          placeholder: "e.g. Senior Frontend Engineer"
        },
        {
          id: "experience",
          label: "Current Work Experience / Duties",
          type: "textarea",
          placeholder: "I worked on the main app, fixed bugs, used React, and managed a team of 3..."
        },
        {
          id: "skills",
          label: "Key Skills to Highlight",
          type: "text",
          placeholder: "e.g. React, Next.js, Leadership, Performance Optimization"
        }
      ]}
    />
  )
}
