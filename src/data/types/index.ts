export type ChatResponseType = {
  chatResponse: string;
  recommendations: {
    song: string;
    artist: string;
  }[];
};

export type MessageType = { role: "user" | "assistant"; content: string };

export type VibesType = {
  emotionalVibe: number;
  energyVibe: number;
  instrumentalVibe: number;
};
