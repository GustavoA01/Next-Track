import { SpotifyPlaylistTracks } from "@/data/types/spotify";
import { Bar, BarChart, XAxis } from "recharts";
import {
  getPopularityAvgMessage,
  getPopularity,
} from "@/lib/getRecommendations";
import {
  ChartTooltipContent,
  ChartLegendContent,
  ChartContainer,
  ChartLegend,
} from "@/components/ui/chart";

const chartConfig = {
  popularity: {
    label: "Popularidade das músicas (0 - 100)",
    dataKey: "popularity",
    color: " #1db954",
  },
};

type PopularityChartProps = {
  tracks: SpotifyPlaylistTracks;
};

export const PopularityChart = ({ tracks }: PopularityChartProps) => {
  const avgMessage = getPopularityAvgMessage(tracks, tracks.total);
  const chartData = getPopularity(tracks);

  return (
    <div>
      <div className="mb-4">
        <h2
          className={`sm:text-lg md:text-xl ${avgMessage.color} font-montserrat font-semibold mb-2`}
        >
          {avgMessage.title}
        </h2>
        <p className="text-sm sm:text-base">{avgMessage.text} </p>
      </div>

      <ChartContainer className="mt-4 min-h-50 w-full" config={chartConfig}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="popularity"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="popularity" fill="var(--color-primary)" />
          <ChartTooltipContent />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
