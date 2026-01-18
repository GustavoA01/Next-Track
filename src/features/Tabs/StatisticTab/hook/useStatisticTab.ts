import { SpotifyPlaylistTracks } from "@/data/types/spotify";
import { getPopularityAvgMessage } from "@/utils/getPopularityAvgMessage";
import { getTrackPopularity } from "@/utils/getTrackPopulartity";
import { extractColors } from "extract-colors";
import { traceGlobals } from "next/dist/trace/shared";
import { useCallback, useMemo } from "react";

const formatName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const useStatisticTab = (tracks: SpotifyPlaylistTracks) => {
  const getHexaColor = useCallback(async (imageUrl: string) => {
    if (!imageUrl) return "#121212";

    try {
      const colors = await extractColors(imageUrl, {
        crossOrigin: "anonymous",
      });
      return colors[0].hex;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const avgMessage = useMemo(() => {
    return getPopularityAvgMessage(tracks, tracks.total);
  }, [traceGlobals, tracks.total]);

  const chartData = useMemo(() => {
    return getTrackPopularity(tracks);
  }, [tracks]);

  return {
    formatName,
    getHexaColor,
    avgMessage,
    chartData,
  };
};
