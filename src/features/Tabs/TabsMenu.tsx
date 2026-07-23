'use client';
import { Tabs, TabsList } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DiscoverContent } from './DiscoverTab/container/DiscoverContent';
import { StatisticContent } from './StatisticTab/container/StatisticContent';
import { useState } from 'react';
import { tabs } from '@/data/constants';
import { TabsMenuProps } from './StatisticTab/types';
import { cn } from '@/lib/utils';

export const TabsMenu = ({
  playlist,
  genresStatistics,
  artistsStatistics,
  tracks,
  accessToken,
  userId,
}: TabsMenuProps) => {
  const [tabValue, setTabValue] = useState('discover');
  const activeIndex = tabs.findIndex((tab) => tab.value === tabValue);

  return (
    <Tabs className="w-full" value={tabValue} onValueChange={setTabValue}>
      <div className="relative w-full">
        <TabsList className="bg-transparent m-auto w-full">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant="ghost"
              onClick={() => setTabValue(tab.value)}
              className={cn(
                'flex-1',
                tabValue === tab.value && 'text-white/80'
              )}
            >
              <tab.icon
                className={cn(
                  'text-muted-foreground',
                  tabValue === tab.value && 'text-primary'
                )}
              />
              {tab.label}
            </Button>
          ))}
        </TabsList>

        <span
          aria-hidden
          data-testid="tab-indicator"
          className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
          style={{
            width: `${100 / tabs.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      </div>

      <DiscoverContent
        tracks={tracks}
        accessToken={accessToken}
        userId={userId}
        genresStatistics={genresStatistics}
        artistsStatistics={artistsStatistics}
      />

      <StatisticContent
        tracks={tracks}
        playlist={playlist}
        genresStatistics={genresStatistics}
        artistsStatistics={artistsStatistics}
      />
    </Tabs>
  );
};
