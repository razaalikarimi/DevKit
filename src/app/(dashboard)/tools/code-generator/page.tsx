"use client"

import { ToolInterface } from "@/components/tools/ToolInterface"
import { Code2 } from "lucide-react"

export default function CodeGeneratorPage() {
  return (
    <ToolInterface
      title="AI Code Generator"
      description="Write clean, efficient, and well-documented code in any programming language."
      icon={Code2}
      prompt="Act as a senior software engineer. Write high-quality, production-ready code based on the following requirements. Include comments explaining the logic, use best practices for the specified language, and handle potential errors or edge cases."
      inputs={[
        {
          id: "language",
          label: "Programming Language",
          type: "text",
          placeholder: "e.g. Python, TypeScript, Rust, Go"
        },
        {
          id: "task",
          label: "What should the code do?",
          type: "textarea",
          placeholder: "e.g. Create a React hook to detect clicking outside a component..."
        },
        {
          id: "frameworks",
          label: "Libraries / Frameworks (Optional)",
          type: "text",
          placeholder: "e.g. React, Express, Tailwind CSS"
        }
      ]}
    />
  )
}
