import { render, screen } from '@testing-library/react';
import { NextImgProps, resizeObserverMock } from '@/globalTestsMocks';
import { PopularityChart } from '../components/PopularityChart';

jest.mock('next/image', () => {
  function MockImage({ src, alt, width, height }: NextImgProps) {
    return <img src={src} alt={alt} width={width} height={height} />;
  }
  return MockImage;
});

describe('PopularityChart', () => {
  beforeAll(() => {
    resizeObserverMock();
  });

  it('should render PopularityChart component correctly', () => {
    const mockAvgMessage = {
      title: 'Popularidade Média',
      text: 'Popularidade média das músicas da sua playlist',
      textColor: 'text-green-500',
    };

    const mockChartData = [
      { popularity: 20 },
      { popularity: 40 },
      { popularity: 60 },
      { popularity: 80 },
      { popularity: 100 },
    ];

    render(
      <PopularityChart avgMessage={mockAvgMessage} chartData={mockChartData} />
    );

    const chart = screen.getByTestId('popularity-chart');

    expect(chart).toBeInTheDocument();
  });

  it('should render most popular after least popular in the DOM', () => {
    const mockAvgMessage = {
      title: 'Popularidade Média',
      text: 'Popularidade média das músicas da sua playlist',
      textColor: 'text-green-500',
    };

    const leastPopular = {
      id: 'least',
      name: 'Hidden Gem',
      artists: [{ name: 'Indie' }],
      album: { images: [{ url: 'https://spotify/least.jpg' }] },
      popularity: 12,
      external_urls: { spotify: 'https://open.spotify.com/track/least' },
    };

    const mostPopular = {
      id: 'most',
      name: 'Hit Song',
      artists: [{ name: 'Star' }],
      album: { images: [{ url: 'https://spotify/most.jpg' }] },
      popularity: 95,
      external_urls: { spotify: 'https://open.spotify.com/track/most' },
    };

    render(
      <PopularityChart
        avgMessage={mockAvgMessage}
        chartData={[{ popularity: 50 }]}
        leastPopular={leastPopular as never}
        mostPopular={mostPopular as never}
        showLeastPopular
      />
    );

    const least = screen.getByText('Menos popular');
    const most = screen.getByText('Mais popular');

    expect(
      least.compareDocumentPosition(most) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
