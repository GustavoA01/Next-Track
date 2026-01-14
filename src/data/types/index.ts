import { Timestamp } from "firebase/firestore";

export interface ChatContentResponse {
  playlistId: string;
  chatResponse: string;
  userMessage: string;
  createdAt: Timestamp;
  recommendations: LastRecommendationsType[];
}

export interface ChatResponseType {
  chatResponse: string;
  recommendations: {
    song: string;
    artist: string;
  }[];
}

export type VibesType = {
  emotionalVibe: number;
  energyVibe: number;
  instrumentalVibe: number;
};

export type ChatPromptType = {
  systemMessage: { role: string; content: string };
  userMessage: { role: string; content: string };
};

export type LastRecommendationsType = {
  id: string;
  name: string;
  artists: string;
  album: string;
  duration: number;
};
