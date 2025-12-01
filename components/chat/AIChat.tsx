"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Bot, User, Terminal } from "lucide-react";
import { sendMessageToGemini } from "@/lib/services/geminiService";
import { OWNER_NAME } from "@/lib/constants";
import type { ChatMessage } from "@/lib/types";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: `System initialized. Connected to ${OWNER_NAME}'s portfolio database. How can I assist you?`,
      timestamp: Date.now(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMessage.text);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: "Error: Transmission failed.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 group flex items-center justify-center w-14 h-14 bg-dark border border-primary/60 text-primary rounded-full shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:bg-primary hover:text-dark transition-all duration-300 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-[380px] bg-black/90 backdrop-blur-xl border border-primary/40 rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 transform origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Holographic Header */}
        <div className="bg-primary/10 p-3 flex justify-between items-center border-b border-primary/20 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">
              Gemini_Link_v2.5
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-[450px] overflow-y-auto p-4 space-y-4 font-mono text-sm bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center ${
                  msg.role === "model"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-slate-500 text-slate-300 bg-slate-800"
                }`}
              >
                {msg.role === "model" ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div
                className={`max-w-[80%] p-3 rounded-lg text-xs md:text-sm leading-relaxed border ${
                  msg.role === "user"
                    ? "border-white/10 bg-white/5 text-slate-200"
                    : "border-primary/20 bg-primary/5 text-primary shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-primary text-xs animate-pulse px-2">
              <Terminal className="w-3 h-3" />
              <span>PROCESSING_DATA_STREAM...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-black border-t border-primary/20">
          <div className="flex items-center space-x-2 bg-white/5 rounded border border-white/10 px-3 py-2 focus-within:border-primary/50 transition-colors">
            <span className="text-primary font-mono">{">"}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type command..."
              className="flex-1 bg-transparent text-white text-sm font-mono focus:outline-none placeholder-slate-600"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="text-primary hover:text-white disabled:opacity-30 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
