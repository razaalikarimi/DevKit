"use client"

import { ToolInterface } from "@/components/tools/ToolInterface"
import { Image as ImageIcon } from "lucide-react"

export default function ImagePromptPage() {
  return (
    <ToolInterface
      title="Image Prompt Generator"
      description="Create highly detailed prompts for AI image generators like Midjourney or DALL-E."
      icon={ImageIcon}
      prompt="Act as an expert prompt engineer for Midjourney v6 and DALL-E 3. Convert the user's simple idea into a highly detailed, professional image generation prompt. Include specific details about lighting, camera angle, lens type, artistic style, medium, and color palette. Provide 3 different variations of the prompt."
      inputs={[
        {
          id: "idea",
          label: "Basic Image Idea",
          type: "textarea",
          placeholder: "e.g. A futuristic city in the clouds, cyberpunk style..."
        },
        {
          id: "style",
          label: "Artistic Style",
          type: "text",
          placeholder: "e.g. Photorealistic, Watercolor, 3D Render, Anime"
        },
        {
          id: "mood",
          label: "Mood / Lighting",
          type: "text",
          placeholder: "e.g. Cinematic lighting, gloomy, neon, golden hour"
        }
      ]}
    />
  )
}
