import { Bar, BarChart, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { chartConfig } from '@/data/constants';
import { PopularityChartProps } from '../types';
import { PopularTrackCard } from './PopularTrackCard';
import { cn } from '@/utils/cn';

export const PopularityChart = ({
  avgMessage,
  chartData,
  mostPopular,
  leastPopular,
  showLeastPopular = false,
}: PopularityChartProps) => (
  <div>
    <header className="mb-4">
      <h2
        className={cn(
          'sm:text-lg md:text-xl font-montserrat font-semibold mb-2',
          avgMessage.textColor
        )}
      >
        {avgMessage.title}
      </h2>
      <p className="text-sm sm:text-base">{avgMessage.text}</p>
    </header>

    {mostPopular && (
      <div
        className={cn(
          'flex gap-4',
          showLeastPopular
            ? 'flex-col-reverse md:flex-row'
            : 'max-w-xl flex-col'
        )}
      >
        {showLeastPopular && (
          <PopularTrackCard
            className="md:flex-1 min-w-0"
            label="Menos popular"
            track={leastPopular!}
          />
        )}
        <PopularTrackCard
          className="md:flex-1 min-w-0"
          label="Mais popular"
          track={mostPopular}
        />
      </div>
    )}

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
