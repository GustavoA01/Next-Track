"use client";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { PlaylistStatisticsType } from "@/data/types/recommendations";
import { ChartColumnDecreasing, Sparkles } from "lucide-react";
import { SpotifyPlaylist } from "@/data/types/spotify";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiscoverContent } from "./DiscoverTab/container/DiscoverContent";
import { StatisticContent } from "./StatisticTab/container/StatisticContent";

const tabs = [
  {
    label: "Descobrir",
    value: "discover",
    icon: Sparkles,
  },
  {
    label: "Estatísticas",
    value: "statistics",
    icon: ChartColumnDecreasing,
  },
];

type TabsMenuProps = PlaylistStatisticsType & {
  playlist: SpotifyPlaylist;
  accessToken: string;
};

export const TabsMenu = ({
  playlist,
  genresStatistics,
  artistsStatistics,
  tracks,
  accessToken,
}: TabsMenuProps) => {
  const [tabValue, setTabValue] = useState("discover");

  return (
    <Tabs className="w-full" value={tabValue} onValueChange={setTabValue}>
      <TabsList className="bg-transparent m-auto w-full">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant="ghost"
            onClick={() => setTabValue(tab.value)}
            className={`flex-1 rounded-none ${
              tabValue === tab.value
                ? "border-b-2 border-primary text-white/80"
                : "border-b-2 border-transparent"
            }`}
          >
            <tab.icon
              className={`${
                tabValue === tab.value
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            />{" "}
            {tab.label}
          </Button>
        ))}
      </TabsList>

      <DiscoverContent
        genresStatistics={genresStatistics}
        artistsStatistics={artistsStatistics}
        tracks={tracks}
        accessToken={accessToken}
      />

      <StatisticContent
        playlist={playlist}
        genresStatistics={genresStatistics}
        artistsStatistics={artistsStatistics}
      />
    </Tabs>
  );
};
