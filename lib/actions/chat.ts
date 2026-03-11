// @ts-nocheck
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Provided by user
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are an AI assistant for the REACT (Rural Empowerment and Climate Technology) Initiative. 
REACT is a youth-led organization advancing climate resilience, humanitarian response, and sustainable development in underserved and rural communities.
You are helping users understand the website, the organization's goals, and its initiatives. Be helpful, concise, and professional.

IMPORTANT INSTRUCTIONS: 
1. DO NOT use markdown formatting (no bolding, italics, or lists with asterisks). Respond ONLY in plain, conversational text.
2. If the user asks how to find things on the website, use these paths:
- Home: /
- Blog / Impact Stories: /blog
- Gallery / Photos: /gallery
- Dashboard/Admin: /admin`;

export async function generateChatResponse(history: { role: "user" | "model", parts: { text: string }[] }[], message: string) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return { success: true, text: response.text() };
  } catch (error) {
    console.error("AI Chat error:", error);
    return { error: "Failed to connect to the AI service." };
  }
}
