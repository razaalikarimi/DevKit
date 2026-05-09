"use client"

import { ToolInterface } from "@/components/tools/ToolInterface"
import { Mail } from "lucide-react"

export default function EmailGeneratorPage() {
  return (
    <ToolInterface
      title="Email Generator"
      description="Write professional emails that get responses."
      icon={Mail}
      prompt="Act as a professional business communicator. Write a clear, concise, and effective email based on the following inputs. Ensure the tone is appropriate for the context provided."
      inputs={[
        {
          id: "to",
          label: "Recipient (Role/Name)",
          type: "text",
          placeholder: "e.g. Hiring Manager at Google"
        },
        {
          id: "purpose",
          label: "Purpose of Email",
          type: "text",
          placeholder: "e.g. Following up on a job application"
        },
        {
          id: "tone",
          label: "Tone",
          type: "text",
          placeholder: "e.g. Professional, Friendly, Urgent"
        },
        {
          id: "context",
          label: "Context / Key Details",
          type: "textarea",
          placeholder: "Mention that I have 5 years of experience in React..."
        }
      ]}
    />
  )
}
