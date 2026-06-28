/* eslint-disable */
"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Code2, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function RepoChat() {
  const params = useParams<{ repoId: string }>();
  const repoId = params?.repoId || "";

  const [messages, setMessages] = useState<{ id: string, role: string, content: string }[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your RepoMind Agent. What would you like to know about this codebase?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: "user", content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/repomind/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, repoId }),
      });

      if (!response.ok || !response.body) throw new Error("Failed to fetch");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantContent = "";
      const assistantMessageId = (Date.now() + 1).toString();

      setMessages(prev => [...prev, { id: assistantMessageId, role: "assistant", content: "" }]);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          
          // If it's DEMO mode streaming, we sent custom JSON events, but we changed to text stream.
          // Let's handle both raw text and our custom demo JSON stream just in case.
          let textChunk = chunk;
          if (chunk.includes("text-delta")) {
             try {
                const parts = chunk.split("\n\n").filter(Boolean);
                let extractedText = "";
                for (const part of parts) {
                   if (part.startsWith("data: ")) {
                      const json = JSON.parse(part.slice(6));
                      if (json.delta) extractedText += json.delta;
                   }
                }
                textChunk = extractedText;
             } catch(e) {}
          }

          assistantContent += textChunk;
          setMessages(prev => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            updated[lastIndex] = { ...updated[lastIndex], content: assistantContent };
            return updated;
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-7.5rem)] max-w-6xl mx-auto p-4 md:p-8 gap-6">
      <Card className="flex flex-col flex-1 bg-background/60 backdrop-blur-xl border-white/10 overflow-hidden shadow-2xl">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50 border border-border/50 text-foreground'
                }`}>
                  <div className="text-sm font-sans leading-relaxed">
                    {msg.role === 'user' ? (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    ) : (
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc ml-5 my-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal ml-5 my-2 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold text-foreground" {...props} />,
                          code: ({node, inline, ...props}: any) => 
                            inline 
                              ? <code className="bg-background border border-border/50 px-1 py-0.5 rounded text-xs font-mono" {...props} />
                              : <pre className="bg-background border border-border/50 p-3 rounded-lg my-2 overflow-x-auto text-[11px] font-mono leading-relaxed"><code {...props} /></pre>
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="max-w-[80%] rounded-2xl p-4 bg-muted/50 border border-border/50 flex items-center gap-2">
                     <Loader2 className="h-4 w-4 animate-spin text-primary" />
                     <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
               </div>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-background border-t border-border/50">
          <form 
            onSubmit={handleSubmit}
            className="flex items-center gap-2 max-w-4xl mx-auto relative"
          >
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the codebase..." 
              className="flex-1 bg-muted/50 border-white/10 pr-12 rounded-full shadow-inner focus-visible:ring-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 rounded-full h-8 w-8"
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
