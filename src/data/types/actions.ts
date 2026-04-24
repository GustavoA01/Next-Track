import { ParamValue } from 'next/dist/server/request/params';
import { ChatPromptType } from '.';

export type AddToPlaylistProps = {
  jsonUris: { uris: string[] };
  playlistId: ParamValue;
  accessToken: string;
};

export type historyType = {
  role: 'user' | 'model';
  parts: {
    text: string;
  }[];
};

export type GeminiRequestParams = ChatPromptType & { playlistId: string };
