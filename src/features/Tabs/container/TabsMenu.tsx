"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaylistStatistics } from "@/data/types/recommendations";
import { ChartColumnDecreasing, Sparkles } from "lucide-react";
import { SpotifyPlaylist } from "@/data/types/spotify";
import { StatisticContent } from "./StatisticContent";
import { DiscoverContent } from "./DiscoverContent";
import { useState } from "react";

const tabs = [
  {
    value: "discover",
    icon: Sparkles,
    label: "Descobrir",
  },
  {
    value: "statistics",
    icon: ChartColumnDecreasing,
    label: "Estatísticas",
  },
];

export const TabsMenu = ({
  playlist,
  artistsStatistics,
  genresStatistics,
}: PlaylistStatistics & { playlist: SpotifyPlaylist }) => {
  const [tabValue, setTabValue] = useState("discover");

  return (
    <Tabs className="w-full px-4" value={tabValue} onValueChange={setTabValue}>
      <TabsList className="bg-transparent border-b rounded-none pb-0 w-full">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`border-none rounded-b-none bg-transparent`}
          >
            <tab.icon
              className={`${
                tabValue === tab.value
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            />{" "}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <DiscoverContent />

      <StatisticContent
        playlist={playlist}
        artistsStatistics={artistsStatistics}
        genresStatistics={genresStatistics}
      />
    </Tabs>
  );
};
