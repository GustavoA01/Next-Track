import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
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
}: PopularityChartProps) => {
  const showAllXTicks = chartData.length <= 7;
  const maxCount = chartData.reduce(
    (max, item) => Math.max(max, item.count),
    0
  );
  const yAxisWidth = Math.max(28, String(maxCount).length * 10 + 8);

  return (
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
        className="mt-4 min-h-50 w-full aspect-auto h-56 sm:h-64 [&_.recharts-tooltip-cursor]:fill-transparent"
        config={chartConfig}
      >
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="popularity"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            interval={showAllXTicks ? 0 : 'preserveStartEnd'}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            allowDecimals={false}
            width={yAxisWidth}
            domain={[0, 'dataMax']}
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tick={{ fontSize: 11 }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                hideIndicator
                className="min-w-0 w-fit gap-0 rounded-md px-2 py-0.5 text-[11px] leading-tight shadow-sm"
                formatter={(value, _name, item) => {
                  const popularity = item.payload.popularity;
                  const count = Number(value);
                  const label = count === 1 ? '1 música' : `${count} músicas`;
                  return `${label} · ${popularity}`;
                }}
              />
            }
          />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            activeBar={false}
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
          />
        </BarChart>
      </ChartContainer>

      <p className="mt-2 text-center text-xs text-muted-foreground px-2">
        Músicas agrupadas por nível de popularidade (0–100)
      </p>
    </div>
  );
};
