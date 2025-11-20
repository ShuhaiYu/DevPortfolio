import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Safely access environment variable
const getApiKey = () => {
  try {
    return process.env.API_KEY;
  } catch (e) {
    console.error("Failed to access process.env", e);
    return undefined;
  }
};

let chatSession: Chat | null = null;

const getChatSession = () => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("API_KEY is missing in environment variables.");
    return null;
  }

  if (!chatSession) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
    } catch (error) {
      console.error("Failed to initialize Gemini Chat:", error);
      return null;
    }
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    
    // Simulation for when API key is missing (demo mode) to prevent crash
    if (!chat) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return "System Offline: API Key configuration missing. Please ensure process.env.API_KEY is set.";
    }

    const result = await chat.sendMessage({ message });
    return result.text || "Command processed, but response was empty.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Connection interrupted. Neural link unstable. Please try again.";
  }
};