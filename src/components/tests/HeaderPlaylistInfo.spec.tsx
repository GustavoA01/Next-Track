import { render, screen } from '@testing-library/react';
import { HeaderPlaylistInfo } from '../Header/HeaderPlaylistInfo';

describe('HeaderPlaylistInfo', () => {
  beforeEach(() => {
    render(
      <HeaderPlaylistInfo
        totalTracks={10}
        ownerName="User123"
        timeText="26h 30min"
      />
    );
  });

  it('renders component correctly', () => {
    expect(screen.getByText('Criada por')).toBeInTheDocument();
    expect(screen.getByText('User123')).toBeInTheDocument();
    expect(screen.getByText('10 músicas')).toBeInTheDocument();
    expect(screen.getByText('26h 30min')).toBeInTheDocument();
  });

  it('renders component with correct attributes', () => {
    const createdByText = screen.getByText('Criada por');
    const ownerName = screen.getByText('User123');
    const totalTracks = screen.getByText('10 músicas');
    const timeText = screen.getByText('26h 30min');

    expect(createdByText).toHaveClass('text-muted-foreground');
    expect(ownerName).toHaveClass('font-semibold md:text-lg');
    expect(totalTracks).toHaveClass('text-muted-foreground');
    expect(timeText).toHaveClass('text-muted-foreground');
  });

  it('renders with minutes-only timeText', () => {
    render(
      <HeaderPlaylistInfo
        totalTracks={10}
        ownerName="User123"
        timeText="45min"
      />
    );

    expect(screen.getByText('45min')).toBeInTheDocument();
  });

  it('renders with large track count', () => {
    render(
      <HeaderPlaylistInfo
        totalTracks={12345}
        ownerName="User123"
        timeText="12h 00min"
      />
    );

    expect(screen.getByText('12345 músicas')).toBeInTheDocument();
  });

  it('renders two separator icons', () => {
    const { container } = render(
      <HeaderPlaylistInfo
        totalTracks={10}
        ownerName="User123"
        timeText="10min"
      />
    );
    const svgs = container.querySelectorAll('svg');

    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });
});
