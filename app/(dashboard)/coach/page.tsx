"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Cpu, User, Loader2, Sparkles, Hexagon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  "Analyze my transport data.",
  "Optimize my energy consumption.",
  "Project my 6-month impact.",
];

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("flex gap-3 w-full", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
          isUser
            ? "border-emerald-400/30 bg-emerald-400/10"
            : "border-white/20 bg-white/5"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-emerald-400" />
        ) : (
          <Hexagon className="w-4 h-4 text-white/70" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed backdrop-blur-md",
          isUser
            ? "bg-emerald-400/10 text-emerald-50 border border-emerald-400/20"
            : "bg-white/5 text-white/90 border border-white/10"
        )}
      >
        <p className="whitespace-pre-wrap font-light">{message.content}</p>
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex gap-3"
    >
      <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0">
        <Hexagon className="w-4 h-4 text-white/70 animate-pulse" />
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { CoachParticles } from "@/components/canvas/CoachParticles";

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "OS Initialized. Gemini Core active. I am monitoring your spatial footprint. State your query.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-5).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const assistantMessage: Message = {
        // eslint-disable-next-line react-hooks/purity
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "Processing failed. Data stream interrupted.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      toast.error("Uplink failed.");
      const errorMessage: Message = {
        // eslint-disable-next-line react-hooks/purity
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "API uplink disconnected. Operating in offline mode. Recommendation: Reduce energy grid usage.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-start pointer-events-none relative">
      <CoachParticles isThinking={isLoading} />
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg bg-black/80 backdrop-blur-2xl border-r border-b border-white/10 p-6 pointer-events-auto flex flex-col h-[75vh] relative overflow-hidden shadow-2xl"
      >
        {/* Decorative corner brackets */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500/50" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h1 className="text-sm font-mono tracking-widest uppercase text-white/90">AI Core Terminal</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase">Gemini_Linked</span>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6 scrollbar-none relative z-10"
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <AnimatePresence>
            {isLoading && <TypingIndicator />}
          </AnimatePresence>
        </div>

        {/* Suggested Prompts */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="text-[10px] font-mono px-3 py-2 bg-black border border-white/10 text-white/50 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors uppercase tracking-widest"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <form 
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} 
          className="relative flex items-center z-10"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="AWAITING COMMAND..."
            disabled={isLoading}
            className="w-full bg-black border-none border-t border-white/10 focus-visible:ring-1 focus-visible:ring-emerald-500/50 rounded-none h-14 pl-4 pr-14 text-white font-mono text-xs tracking-widest placeholder:text-white/20"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-white/5 hover:bg-emerald-500/20 text-emerald-400 rounded-none p-0 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
