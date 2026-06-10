import { google } from "@ai-sdk/google"
import { streamText } from "ai"
import { db } from "@/lib/db"

export const maxDuration = 30

export async function POST(req: Request) {
  const userId = "demo-user-id"
  const { messages, model, personality } = await req.json()
  console.log("Incoming Messages:", JSON.stringify(messages, null, 2))

  // Construct a system message based on personality
  let systemMessage = "You are DevKit AI, a helpful enterprise assistant."
  
  if (personality === "Professional") {
    systemMessage = "You are a highly professional enterprise AI assistant. Use a formal tone, be concise, and focus on business value."
  } else if (personality === "Creative") {
    systemMessage = "You are a creative AI assistant. Use an engaging tone, be descriptive, and offer innovative ideas."
  } else if (personality === "Code Expert") {
    systemMessage = "You are an expert software engineer. Provide detailed code examples, follow best practices, and explain complex concepts simply."
  } else if (personality === "Concise") {
    systemMessage = "Be extremely brief and to the point. Avoid fluff."
  }

  // Use the selected model or fallback to Flash
  const selectedModel = model === "gemini-1.5-pro" ? "gemini-1.5-pro" : "gemini-1.5-flash"

  // Map UI messages to CoreMessages for streamText
  const coreMessages = messages.map((m: any) => ({
    role: m.role,
    content: m.parts ? m.parts.map((p: any) => p.text).join("") : m.content
  }))

  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
    
    // DEMO MODE: If no real key is provided, stream a mock response
    if (!apiKey || apiKey.startsWith("AIza...")) {
      const mockText = "This is a simulated AI response. Your UI and backend are fully functional! To get real AI generation, please provide a valid GOOGLE_GENERATIVE_AI_API_KEY in the .env file.";
      
      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          const words = mockText.split(" ");
          
          for (let i = 0; i < words.length; i++) {
            // Vercel AI SDK Data Stream format: 0:text
            controller.enqueue(encoder.encode(`0:"${words[i]} "\n`));
            await new Promise(r => setTimeout(r, 50));
          }
          controller.close();
        }
      });
      
      return new Response(stream, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "x-vercel-ai-data-stream": "v1" }
      });
    }

    const result = await streamText({
      model: google(selectedModel),
      system: systemMessage,
      messages: coreMessages,
    })

    return (result as any).toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response(JSON.stringify({ error: "Failed to generate response" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
