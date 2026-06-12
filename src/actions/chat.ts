"use server"

import { auth } from "@/lib/mock-clerk"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createConversation = async (workspaceId?: string) => {
  const { userId: clerkId } = await auth()
  const userId = clerkId || "demo-user-id"

  const conversation = await db.conversation.create({
    data: {
      userId,
      workspaceId,
      title: "New Chat",
      id: crypto.randomUUID(),
      updatedAt: new Date(),
    },
  })

  revalidatePath("/chat")
  return conversation
}

export const getConversations = async (workspaceId?: string) => {
  const { userId: clerkId } = await auth()
  const userId = clerkId || "demo-user-id"

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
  const { userId: clerkId } = await auth()
  const userId = clerkId || "demo-user-id"

  try {
    await db.conversation.update({
      where: { id, userId },
      data: { title },
    })
  } catch {
    // Record may not exist or userId mismatch — silently ignore
  }

  revalidatePath("/chat")
}

export const deleteConversation = async (id: string) => {
  const { userId: clerkId } = await auth()
  const userId = clerkId || "demo-user-id"

  // deleteMany never throws if record not found (unlike delete)
  await db.conversation.deleteMany({
    where: { id, userId },
  })

  revalidatePath("/chat")
}
