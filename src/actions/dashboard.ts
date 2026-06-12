"use server"

import { db } from "@/lib/db"

const USER_ID = "demo-user-id"

export const getDashboardStats = async () => {
  const [
    chatCount,
    totalTokens,
    docCount,
    docTotalSize,
    user,
    recentMessages,
    recentDocs,
    recentChats,
  ] = await Promise.all([
    // Total conversations
    db.conversation.count({
      where: { userId: USER_ID, isArchived: false },
    }),

    // Total tokens used (sum of all message tokens)
    db.message.aggregate({
      where: {
        conversation: { userId: USER_ID },
        tokens: { not: null },
      },
      _sum: { tokens: true },
    }),

    // Total documents uploaded
    db.document.count({
      where: { userId: USER_ID },
    }),

    // Total storage used in bytes
    db.document.aggregate({
      where: { userId: USER_ID },
      _sum: { size: true },
    }),

    // User info (plan, credits)
    db.user.findFirst({
      where: { id: USER_ID },
      select: { plan: true, credits: true },
    }),

    // Recent 5 messages for activity feed
    db.message.findMany({
      where: {
        conversation: { userId: USER_ID },
        role: "user",
      },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        content: true,
        createdAt: true,
        conversationId: true,
      },
    }),

    // Recent documents
    db.document.findMany({
      where: { userId: USER_ID },
      orderBy: { createdAt: "desc" },
      take: 2,
      select: { name: true, createdAt: true },
    }),

    // Recent chats
    db.conversation.findMany({
      where: { userId: USER_ID, isArchived: false },
      orderBy: { updatedAt: "desc" },
      take: 2,
      select: { title: true, updatedAt: true },
    }),
  ])

  // Format tokens: e.g. 1200000 → "1.2M", 5000 → "5K"
  const rawTokens = totalTokens._sum.tokens ?? 0
  const formattedTokens =
    rawTokens >= 1_000_000
      ? `${(rawTokens / 1_000_000).toFixed(1)}M`
      : rawTokens >= 1_000
      ? `${(rawTokens / 1_000).toFixed(1)}K`
      : `${rawTokens}`

  // Format storage: bytes → MB/KB
  const rawBytes = docTotalSize._sum.size ?? 0
  const formattedStorage =
    rawBytes >= 1_048_576
      ? `${(rawBytes / 1_048_576).toFixed(1)} MB`
      : rawBytes >= 1_024
      ? `${(rawBytes / 1_024).toFixed(1)} KB`
      : `${rawBytes} B`

  // Credits used percentage (user starts with 1000)
  const maxCredits = 1000
  const credits = user?.credits ?? 0
  const creditsUsedPct = Math.round(((maxCredits - credits) / maxCredits) * 100)

  // Storage percentage (assume 500MB max)
  const maxBytes = 500 * 1024 * 1024
  const storagePct = Math.min(Math.round((rawBytes / maxBytes) * 100), 100)

  // API calls percentage — based on conversations as proxy
  const maxChats = 500
  const chatPct = Math.min(Math.round((chatCount / maxChats) * 100), 100)

  // Build activity feed from real events
  const activity: { label: string; time: string; type: "chat" | "doc" | "system" }[] = []

  recentChats.forEach((c) => {
    activity.push({
      label: c.title ? `Chat: ${c.title}` : "New chat session started",
      time: formatRelativeTime(c.updatedAt),
      type: "chat",
    })
  })

  recentDocs.forEach((d) => {
    activity.push({
      label: `Document uploaded: ${d.name}`,
      time: formatRelativeTime(d.createdAt),
      type: "doc",
    })
  })

  // Sort by most recent
  activity.sort((a, b) => 0) // already sorted from DB

  return {
    stats: {
      tokens: formattedTokens,
      chats: chatCount.toString(),
      docs: docCount.toString(),
      plan: user?.plan ?? "FREE",
      credits,
    },
    usage: {
      storage: { pct: storagePct, label: formattedStorage },
      apiCalls: { pct: chatPct, label: `${chatCount} / ${maxChats}` },
      credits:  { pct: creditsUsedPct, label: `${credits} remaining` },
    },
    activity: activity.slice(0, 3),
  }
}

// Helper: convert Date to "2 min ago", "1 hr ago" etc.
function formatRelativeTime(date: Date): string {
  const now = Date.now()
  const diff = now - new Date(date).getTime()
  const mins = Math.floor(diff / 60_000)
  const hrs  = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)

  if (mins < 1)   return "just now"
  if (mins < 60)  return `${mins} min ago`
  if (hrs < 24)   return `${hrs} hr ago`
  return `${days}d ago`
}
