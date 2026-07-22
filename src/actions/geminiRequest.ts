'use server';
import { ChatResponseType } from '@/data/types';
import { GeminiRequestParams, historyType } from '@/data/types/actions';
import { getMessages } from '@/services/firebase/getMessages';
import { ai } from '@/services/googelGemini';
import { HarmBlockThreshold, HarmCategory } from '@google/genai';

export const geminiRequest = async ({
  systemMessage,
  userMessage,
  playlistId,
  userId,
}: GeminiRequestParams): Promise<ChatResponseType> => {
  try {
    const messageHistory = await getMessages(playlistId, userId);
    let historyContent: historyType[] = [];

    if (messageHistory.length > 0) {
      historyContent = messageHistory.flatMap((message) => [
        {
          role: 'user',
          parts: [{ text: message.userMessage }],
        },
        {
          role: 'model',
          parts: [
            {
              text: JSON.stringify({
                chatResponse: message.chatResponse,
                lastRecommendations: message.recommendations,
              }),
            },
          ],
        },
      ]);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...historyContent,
        { role: 'user', parts: [{ text: userMessage.content }] },
      ],
      config: {
        systemInstruction: {
          role: 'system',
          parts: [{ text: systemMessage.content }],
        },
        responseMimeType: 'application/json',
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

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error('Gemini request error:', error);
    throw new Error('Failed to fetch Gemini', { cause: error });
  }
};
