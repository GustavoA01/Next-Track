"use server";
import { ChatResponseType } from "@/data/types";
import { ai } from "@/services/googelGemini";
import { HarmBlockThreshold, HarmCategory } from "@google/genai";

export async function geminiRequest({
  prompt,
}: {
  prompt: string;
}): Promise<ChatResponseType> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}`,
      config: {
        responseMimeType: "application/json",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini request error:", error);
    throw new Error("Failed to fetch Gemini ", error as any);
  }
}
