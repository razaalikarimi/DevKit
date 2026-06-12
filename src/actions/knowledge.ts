"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

const userId = "demo-user-id"

export const getDocuments = async () => {
  try {
    return await db.document.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    })
  } catch (error) {
    console.error("[getDocuments] Error:", error)
    return []
  }
}

export const deleteDocument = async (id: string) => {
  await db.document.delete({
    where: { id, userId }
  })
  revalidatePath("/knowledge")
}
