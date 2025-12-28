
import { GoogleGenAI } from "@google/genai";

export const getAIResponse = async (userPrompt: string, role: string) => {
  // Fallback if no API key is provided
  if (!process.env.API_KEY || process.env.API_KEY === 'your_actual_gemini_api_key_here' || process.env.API_KEY === '') {
    console.warn("AI Key not found. Running in Mock Mode.");
    
    // Simulate a brief delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockResponses = [
      `As the owner of NIKS-AQUA, you should focus on the 12% dip in Mumbai logistics today.`,
      "Current NIKS-AQUA inventory levels are stable across all northern nodes.",
      "The NIKS-AI predictive model suggests a 5% increase in demand for 20L Jars next week.",
      "System Alert: Check reorder points for the NIKS-500ml Classic SKU."
    ];
    
    return "[OFFLINE MOCK] " + mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `You are an AI Supply Chain Assistant named NIKS-AI for NIKS-AQUA, a water manufacturing company. 
        The user is the owner browsing the dashboard. 
        The system was developed by QLOAX Infotech.
        Provide professional, data-driven, and brief answers. Focus on inventory, logistics, and sales performance.`,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently unable to connect to the intelligence server. Please check your API_KEY configuration.";
  }
};
