import { MostListenGenreBar } from '../components/MostListenGenreBar';
import { PopularityChart } from '../components/PopularityChart';
import { StatisticSubTitle } from '../components/StatSubTitle';
import { TabsContent } from '@/components/ui/tabs';
import { useStatisticTab } from '../hook/useStatisticTab';
import { Suspense } from 'react';
import { StatisticsContentSkeleton } from '@/components/Skeletons';
import { StatisticContentProps } from '../types';
import { ArtistsCarousel } from './ArtistsCarousel';

export const StatisticContent = ({
  playlist,
  artistsStatistics,
  genresStatistics,
}: StatisticContentProps) => {
  const { avgMessage, chartData, formatName, getHexaColor } = useStatisticTab(
    playlist.tracks
  );

  return (
    <TabsContent value="statistics" className="flex flex-col gap-10">
      <Suspense fallback={<StatisticsContentSkeleton />}>
        {playlist.tracks.total === 0 ? (
          <div className="animate-fade-in-up-down w-full flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground">
              A playlist não contém músicas
            </p>
          </div>
        ) : (
          <>
            <section className="mt-4">
              <StatisticSubTitle text="Os 10 artistas mais presentes" />
              <ArtistsCarousel
                getHexaColor={getHexaColor}
                artistsStatistics={artistsStatistics.slice(0, 10)}
              />
            </section>

            <section>
              <StatisticSubTitle text="Top 5 gêneros mais presentes" />
              <div className="space-y-4">
                {genresStatistics.slice(0, 5).map((genre) => (
                  <MostListenGenreBar
                    key={genre.name}
                    name={formatName(genre.name)}
                    value={genre.percentage}
                  />
                ))}
              </div>
            </section>

            <section>
              <StatisticSubTitle text="Nível de popularidade das músicas" />
              <PopularityChart avgMessage={avgMessage} chartData={chartData} />
            </section>
          </>
        )}
      </Suspense>
    </TabsContent>
  );
};
