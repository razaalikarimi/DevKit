"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth, currentUser } from "@clerk/nextjs/server"

const getDbUserId = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) return "demo-user-id";

  try {
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
  } catch (error) {
    return "demo-user-id";
  }
}

export const getDocuments = async () => {
  const userId = await getDbUserId();
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
  const userId = await getDbUserId();
  await db.document.delete({
    where: { id, userId }
  })
  revalidatePath("/knowledge")
}
