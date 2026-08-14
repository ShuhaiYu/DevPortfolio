"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface ChatState {
  isChatOpen: boolean;
  setChatOpen: (open: boolean) => void;
}

const ChatStateContext = createContext<ChatState | null>(null);

/**
 * Shares the chat panel's open state between `AIChat` (rendered inside a page)
 * and `NowWidget` (rendered in the root layout). Both occupy the bottom-right
 * corner, so the widget needs to know when the chat has taken that space.
 */
export default function ChatStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setChatOpen] = useState(false);

  const value = useMemo<ChatState>(
    () => ({ isChatOpen, setChatOpen }),
    [isChatOpen],
  );

  return (
    <ChatStateContext.Provider value={value}>
      {children}
    </ChatStateContext.Provider>
  );
}

/**
 * Reads the shared chat state. Returns a closed, inert state when no provider
 * is mounted so components stay renderable in isolation.
 */
export function useChatState(): ChatState {
  return (
    useContext(ChatStateContext) ?? {
      isChatOpen: false,
      setChatOpen: () => {},
    }
  );
}
