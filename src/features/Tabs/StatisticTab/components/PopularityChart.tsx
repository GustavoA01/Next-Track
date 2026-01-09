import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AverageMessageType } from "@/data/types/recommendations";

const chartConfig = {
  popularity: {
    label: "Popularidade das músicas (0 - 100)",
    dataKey: "popularity",
    color: " #1db954",
  },
};

type PopularityChartProps = {
  avgMessage: AverageMessageType;
  chartData: { popularity: number }[];
};

export const PopularityChart = ({
  avgMessage,
  chartData,
}: PopularityChartProps) => (
  <div>
    <div className="mb-4">
      <h2
        className={`sm:text-lg md:text-xl ${avgMessage.textColor} font-montserrat font-semibold mb-2`}
      >
        {avgMessage.title}
      </h2>
      <p className="text-sm sm:text-base">{avgMessage.text} </p>
    </div>

    <ChartContainer
      data-testid="popularity-chart"
      className="mt-4 min-h-50 w-full"
      config={chartConfig}
    >
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
