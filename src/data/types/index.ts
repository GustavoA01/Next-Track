import { SpotifyPlaylistTrack } from './spotify';
import { Timestamp } from 'firebase/firestore';

export interface ChatContentResponse {
  userId: string;
  playlistId: string;
  chatResponse: string;
  userMessage: string;
  createdAt: Timestamp;
  recommendations: SpotifyPlaylistTrack[];
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
