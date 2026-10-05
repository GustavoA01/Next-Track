import { ChatFormType } from '@/data/chatSchema';
import { ChatContentResponse } from '@/data/types';
import { PlaylistStatisticsType } from '@/data/types/recommendations';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';

export type UseChatContentType = {
  messages: ChatContentResponse[];
  isLoading: boolean;
  temporaryMessage: string;
};

export type DiscoverContentProps = PlaylistStatisticsType & {
  accessToken: string;
  userId: string;
};

export type UseRecommendationsType = Pick<
  DiscoverContentProps,
  'tracks' | 'accessToken' | 'userId'
> & {
  playlistId: string;
};

export type RecommendationsProps = {
  recommendationsTracks: SpotifyPlaylistTrack[];
  playlistTrackIds: Set<string>;
  onAddToPlaylist: (trackUri: string, musicId: string) => Promise<void>;
  onAddAllRecommendations: (trackUris: string[], musicsIds: string[]) => void;
  isRecommendationsLoading: boolean;
  isAddingTracks: boolean;
};

export type ChatContentProps = {
  messages: ChatContentResponse[];
  isLoading: boolean;
  errorMessage: string;
  temporaryMessage: string;
  setOpenConfirmDialog: (open: boolean) => void;
};

export type AccordionVibeProps = {
  emotionalVibe: number;
  energyVibe: number;
  instrumentalVibe: number;
  setEmotionalVibe: Dispatch<SetStateAction<number>>;
  setEnergyVibe: Dispatch<SetStateAction<number>>;
  setInstrumentalVibe: Dispatch<SetStateAction<number>>;
  onReset: () => void;
  isVibesChanged: boolean;
};

export type BadgesGroupProps = {
  onSelectBadge: (badge: string) => void;
};

export type ChatInputProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleOnKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isResponseLoading: boolean;
  register: UseFormRegister<ChatFormType>;
  errorMessage?: string;
};

export type ConfirmClearChatProps = { onConfirm: () => void };

export type MessageCardProps = {
  cardClassName: string;
  cardContentClassName?: string;
  textClassName?: string;
  content: string;
};

export type PlayerProps = { token: string; uris: string[] };

export type SliderVibeProps = {
  leftLabel: string;
  rightLabel: string;
  value: number;
  setValue: (value: number) => void;
};
