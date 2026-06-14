"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

// Helper to get or create DB user from Clerk session
const getDbUserId = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) return "demo-user-id";

  let user = await db.user.findUnique({ where: { clerkId } });
  
  if (!user) {
    const clerkUser = await currentUser();
    user = await db.user.create({
      data: {
        clerkId,
        email: clerkUser?.emailAddresses[0]?.emailAddress || `${clerkId}@example.com`,
        name: clerkUser?.fullName || 'New User',
      }
    });
  }
  
  return user.id;
}

export const createConversation = async (workspaceId?: string) => {
  const userId = await getDbUserId()

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
  try {
    const userId = await getDbUserId()

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
  } catch (error) {
    console.error("[getConversations] Error:", error)
    return []
  }
}

export const renameConversation = async (id: string, title: string) => {
  const userId = await getDbUserId()

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
  const userId = await getDbUserId()

  // deleteMany never throws if record not found (unlike delete)
  await db.conversation.deleteMany({
    where: { id, userId },
  })

  revalidatePath("/chat")
}
