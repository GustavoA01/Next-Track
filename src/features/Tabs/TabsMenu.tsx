'use client';
import { Tabs, TabsList } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DiscoverContent } from './DiscoverTab/container/DiscoverContent';
import { StatisticContent } from './StatisticTab/container/StatisticContent';
import { useState } from 'react';
import { tabs } from '@/data/constants';
import { TabsMenuProps } from './StatisticTab/types';
import { cn } from '@/utils/cn';
import { PlayerProvider, usePlayerProvider } from './usePlayerProvider';
import { Player } from './DiscoverTab/components/Player';
import { TabType } from '@/data/types';

export const TabsMenu = (props: TabsMenuProps) => (
  <PlayerProvider>
    <TabsMenuContent {...props} />
  </PlayerProvider>
);

const TabsMenuContent = ({
  playlist,
  genresStatistics,
  artistsStatistics,
  tracks,
  accessToken,
  userId,
}: TabsMenuProps) => {
  const { uris } = usePlayerProvider();
  const [tabValue, setTabValue] = useState<TabType['value']>('discover');
  const activeIndex = tabs.findIndex(({ value }) => value === tabValue);

  return (
    <Tabs
      className="w-full"
      value={tabValue}
      onValueChange={(value) => setTabValue(value as TabType['value'])}
    >
      <div className="relative w-full">
        <TabsList className="bg-transparent m-auto w-full">
          {tabs.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant="ghost"
              onClick={() => setTabValue(value)}
              className={cn('flex-1', tabValue === value && 'text-white/80')}
            >
              <Icon
                className={cn(
                  'text-muted-foreground',
                  tabValue === value && 'text-primary'
                )}
              />
              {label}
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

      <div id="spotify-player-anchor" />
      {uris.length > 0 && (
        <div className={cn(tabValue === 'statistics' && 'hidden')}>
          <Player token={accessToken} uris={uris} />
        </div>
      )}
    </Tabs>
  );
};
