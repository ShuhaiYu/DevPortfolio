import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "@/lib/constants";

// Store chat sessions per client (in production, use Redis or similar)
const chatSessions = new Map<string, ReturnType<typeof createChat>>();

function createChat(apiKey: string) {
  const ai = new GoogleGenAI({ apiKey });
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const { message, sessionId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get or create chat session
    let chat = chatSessions.get(sessionId);
    if (!chat) {
      chat = createChat(apiKey);
      chatSessions.set(sessionId, chat);

      // Clean up old sessions (simple memory management)
      if (chatSessions.size > 100) {
        const firstKey = chatSessions.keys().next().value;
        if (firstKey) chatSessions.delete(firstKey);
      }
    }

    const result = await chat.sendMessage({ message });
    const responseText = result.text || "Command processed, but response was empty.";

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Connection interrupted. Neural link unstable." },
      { status: 500 }
    );
  }
}
