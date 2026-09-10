import { Dispatch, SetStateAction } from 'react';
import { ChatContentResponse } from '.';
import { SpotifyPlaylistTrack } from './spotify';

export type ProvidersType = { children: React.ReactNode };

export type ChatProviderType = {
  messages: ChatContentResponse[] | undefined;
  isResponseLoading: boolean;
  recommendationsTracks: SpotifyPlaylistTrack[];
  isRecommendationsLoading: boolean;
  playlistTrackIds: Set<string>;
  isAddingTracks: boolean;
  temporaryMessage: string;
  errorMessage: string;
  openConfirmDialog: boolean;
  setOpenConfirmDialog: Dispatch<SetStateAction<boolean>>;
  deleteChatFn: () => Promise<unknown>;
  sendChatRequest: (params: { prompt: string }) => Promise<void>;
  onAddToPlaylist: (trackUri: string, musicId: string) => Promise<void>;
  onAddAllRecommendations: (trackUris: string[], musicsIds: string[]) => void;
  hasChat: boolean;
  emotionalVibe: number;
  setEmotionalVibe: Dispatch<SetStateAction<number>>;
  energyVibe: number;
  setEnergyVibe: Dispatch<SetStateAction<number>>;
  instrumentalVibe: number;
  setInstrumentalVibe: Dispatch<SetStateAction<number>>;
  onResetVibes: () => void;
  isVibesChanged: boolean;
};

export type PlayerProviderType = {
  uris: string[];
  setUris: (uris: string[]) => void;
};
