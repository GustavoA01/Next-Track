import { ChatContentResponse } from '@/data/types';
import { PlaylistStatisticsType } from '@/data/types/recommendations';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';

export type DiscoverContentProps = PlaylistStatisticsType & {
  accessToken: string;
};

export type RecommendationsProps = {
  recommendationsTracks: SpotifyPlaylistTrack[];
  accessToken: string;
  onAddToPlaylist: (trackUri: string, musicId: string) => Promise<void>;
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
  setEmotionalVibe: React.Dispatch<React.SetStateAction<number>>;
  setEnergyVibe: React.Dispatch<React.SetStateAction<number>>;
  setInstrumentalVibe: React.Dispatch<React.SetStateAction<number>>;
  onReset: () => void;
  isVibesChanged: boolean;
};

export type BadgesGroupProps = {
  onSelectBadge: (badge: string) => void;
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
