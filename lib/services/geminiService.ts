"use client";

// Generate a unique session ID for this browser session
const getSessionId = () => {
  if (typeof window === "undefined") return "server";

  let sessionId = sessionStorage.getItem("chat-session-id");
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("chat-session-id", sessionId);
  }
  return sessionId;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sessionId: getSessionId(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return data.error || "Error: Transmission failed.";
    }

    return data.response;
  } catch (error) {
    console.error("Error communicating with chat API:", error);
    return "Connection interrupted. Neural link unstable. Please try again.";
  }
};

// Reset chat session
export const resetChatSession = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("chat-session-id");
  }
};
