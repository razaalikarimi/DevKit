import { db } from "./db"

export const getUserCredits = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: { credits: true }
  })
  return user?.credits ?? 0
}

export const deductCredits = async (userId: string, amount: number) => {
  return await db.user.update({
    where: { clerkId: userId },
    data: {
      credits: {
        decrement: amount
      }
    }
  })
}

export const hasEnoughCredits = async (userId: string, amount: number) => {
  const credits = await getUserCredits(userId)
  return credits >= amount
}
