"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createConversation = async (workspaceId?: string) => {
  // Use a fallback for the demo user if session is not active
  const userId = "demo-user-id"

  const conversation = await db.conversation.create({
    data: {
      userId,
      workspaceId,
      title: "New Chat",
    },
  })

  revalidatePath("/chat")
  return conversation
}

export const getConversations = async (workspaceId?: string) => {
  const userId = "demo-user-id"

  return await db.conversation.findMany({
    where: {
      userId,
      workspaceId,
      isArchived: false,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
}

export const renameConversation = async (id: string, title: string) => {
  const userId = "demo-user-id"

  await db.conversation.update({
    where: { id, userId },
    data: { title },
  })

  revalidatePath("/chat")
}

export const deleteConversation = async (id: string) => {
  const userId = "demo-user-id"

  await db.conversation.delete({
    where: { id, userId },
  })

  revalidatePath("/chat")
}
