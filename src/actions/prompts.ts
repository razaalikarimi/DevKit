"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

const userId = "demo-user-id" // Using mock user for now

export const getPrompts = async () => {
  try {
    return await db.promptTemplate.findMany({
      where: {
        OR: [
          { userId },
          { isPublic: true }
        ]
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  } catch (error) {
    console.error("[getPrompts] Error:", error)
    return []
  }
}

export const createPrompt = async (data: { name: string, description: string, prompt: string, isPublic: boolean }) => {
  const prompt = await db.promptTemplate.create({
    data: {
      ...data,
      userId
    }
  })
  revalidatePath("/prompts")
  return prompt
}

export const deletePrompt = async (id: string) => {
  await db.promptTemplate.delete({
    where: { id, userId }
  })
  revalidatePath("/prompts")
}
