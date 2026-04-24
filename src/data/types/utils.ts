import { VibesType } from '.';
import { PlaylistStatisticsType } from './recommendations';

export type msFormatterReturnType = {
  hours: number;
  minutes: number;
  seconds: string;
};

export type getPopularityReturnType = {
  popularity: number;
  count: number;
}[];

export type getContextPromptProps = PlaylistStatisticsType & {
  vibes: VibesType;
  isVibesChanged: boolean;
};
