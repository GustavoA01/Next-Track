"use server";
import { ChatResponseType } from "@/data/types";
import { ai } from "@/services/googelGemini";

export async function geminiRequest({
  prompt,
}: {
  prompt: string;
}): Promise<ChatResponseType> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}`,
    });

    const formattedText = response.text
      ?.replace(/```json/g, "")
      .replace(/```/g, "");

    return JSON.parse(formattedText || "{}");
  } catch (error) {
    console.error("Gemini request error:", error);
    throw new Error("Failed to fetch Gemini ", error as any);
  }
}
