import { ChatWindow } from "@/components/chat/ChatWindow"
import { db } from "@/lib/db"

export default async function ChatIdPage({ params }: { params: { chatId: string } }) {
  // Fetch old messages from DB
  const messages = await db.message.findMany({
    where: { conversationId: params.chatId },
    orderBy: { createdAt: "asc" }
  })

  // Map them to the AI SDK format
  const initialMessages = messages.map(m => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    content: m.content,
    parts: [{ type: "text", text: m.content }]
  }))

  return <ChatWindow key={params.chatId} initialMessages={initialMessages as any} />
}
