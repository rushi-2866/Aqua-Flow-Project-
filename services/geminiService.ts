import { GoogleGenAI } from "@google/genai";

export const getAIResponse = async (userPrompt: string, role: string) => {
  try {
    // Creating a fresh instance to ensure the latest API key is used
    // Fix: Using process.env.API_KEY directly as per SDK requirements and guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `You are an AI Supply Chain Assistant for AquaFlow, a water manufacturing company. 
        The user is currently browsing the dashboard with the role of ${role}. 
        Provide professional, data-driven, and brief answers. Focus on inventory, logistics, and sales performance.`,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently unable to connect to the intelligence server. Please try again in a moment.";
  }
};