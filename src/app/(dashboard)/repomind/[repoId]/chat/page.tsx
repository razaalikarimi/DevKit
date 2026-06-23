/* eslint-disable */
"use client";
import * as React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Code2, Terminal, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RepoChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your RepoMind Agent. I've indexed `acme-corp/devkit-ai-saas`. What would you like to know about the codebase?",
      status: "done"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: input, status: "done" }]);
    setInput("");
    setIsTyping(true);

    // Simulate Agent Thinking process
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "To answer this, I'm analyzing the `src/app/api/stripe/route.ts` file to trace the webhook execution flow...",
        status: "thinking"
      }]);
      
      setTimeout(() => {
        setMessages(prev => {
          const newMsg = [...prev];
          newMsg[newMsg.length - 1] = {
            role: "assistant",
            content: "Based on my analysis of `src/app/api/stripe/route.ts` and `src/lib/stripe.ts`, the payment flow works as follows:\n\n1. Stripe sends a webhook to the `/api/stripe` endpoint.\n2. The handler verifies the webhook signature using `STRIPE_WEBHOOK_SECRET`.\n3. On `checkout.session.completed`, it extracts the `userId` from the session metadata.\n4. It uses Prisma to update the user's `credits` balance (adds credits based on the tier).\n\nHere is the relevant code snippet from `route.ts`:\n```typescript\nif (event.type === 'checkout.session.completed') {\n  await prisma.user.update({\n    where: { id: session.metadata.userId },\n    data: { credits: { increment: 1000 } }\n  });\n}\n```",
            status: "done"
          };
          return newMsg;
        });
        setIsTyping(false);
      }, 2000);
    }, 500);
  };

  return (
    <div className="flex h-full max-w-6xl mx-auto p-4 md:p-8 gap-6">
      <Card className="flex flex-col flex-1 bg-background/60 backdrop-blur-xl border-white/10 overflow-hidden shadow-2xl">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50 border border-border/50 text-foreground'
                }`}>
                  {msg.status === 'thinking' && (
                    <div className="flex items-center gap-2 text-sm text-primary mb-2 font-medium">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Agent is analyzing codebase...
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap font-sans leading-relaxed">
                    {msg.content}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && messages[messages.length - 1].role === 'user' && (
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="max-w-[80%] rounded-2xl p-4 bg-muted/50 border border-border/50 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                     <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150" />
                     <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-300" />
                  </div>
               </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 bg-background border-t border-border/50">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2 max-w-4xl mx-auto relative"
          >
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the codebase... (e.g. 'Where is the payment logic?')" 
              className="flex-1 bg-muted/50 border-white/10 pr-12 rounded-full shadow-inner focus-visible:ring-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 rounded-full h-8 w-8"
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="text-center mt-2 text-[10px] text-muted-foreground flex items-center justify-center gap-4">
            <span>RepoMind Agent uses advanced RAG & 1 credit per message.</span>
            <span className="flex items-center gap-1"><Code2 className="h-3 w-3"/> Context: 1.2M lines</span>
          </div>
        </div>
      </Card>

      {/* Side panel for agent logs / thoughts */}
      <Card className="w-80 hidden lg:flex flex-col bg-background/40 backdrop-blur-sm border-white/10">
        <div className="p-4 border-b border-border/50 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Agent Logs</h3>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 font-mono text-[10px] text-muted-foreground">
            <div className="text-green-500">[System] RepoMind Orchestrator initialized.</div>
            <div>[VectorDB] Connected to Pinecone. Index: 'devkit-ai-saas'.</div>
            <div>[Agent] Waiting for user input...</div>
            {isTyping && (
              <>
                <div className="text-blue-400">{'>> User Query Received: Route planning...'}</div>
                <div>[Orchestrator] Selected Tool: `CodeRetrievalQA`</div>
                <div className="text-yellow-500">[RAG] Generating embeddings for query...</div>
                <div className="text-yellow-500">[RAG] Searching Pinecone (top_k=5)...</div>
                <div>[RAG] Retrieved chunks from `src/app/api/stripe/route.ts` (Score: 0.92)</div>
                <div className="text-purple-400">[LLM] Generating response based on context...</div>
              </>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
