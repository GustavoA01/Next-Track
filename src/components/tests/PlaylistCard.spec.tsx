import { render, screen } from '@testing-library/react';
import { PlaylistCard } from '../PlaylistCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="next-image"
    />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }: any) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

const defaultProps = {
  id: '1234',
  playlistName: 'Metallica',
  totalTracks: 10,
  playlistImage: 'https://github.com/shadcn.png',
};

describe('PlaylistCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render playlist name correctly', () => {
    render(<PlaylistCard {...defaultProps} />);
    expect(screen.getByText('Metallica')).toBeInTheDocument();
  });

  it('should render total tracks with correct formatting', () => {
    render(<PlaylistCard {...defaultProps} />);
    expect(screen.getByText('10 músicas')).toBeInTheDocument();
  });

  it('should render image with correct src and alt', () => {
    render(<PlaylistCard {...defaultProps} />);

    const image = screen.getByAltText('Metallica');
    expect(image).toHaveAttribute('src', 'https://github.com/shadcn.png');
    expect(image).toHaveAttribute('alt', 'Metallica');
  });

  it('should have correct link href', () => {
    render(<PlaylistCard {...defaultProps} />);

    const link = screen.getByTestId('next-link');
    expect(link).toHaveAttribute('href', 'playlist/1234');
  });

  it('should apply group class to link', () => {
    render(<PlaylistCard {...defaultProps} />);

    const link = screen.getByTestId('next-link');
    expect(link).toHaveClass('group');
  });

  it('should render image with correct dimensions', () => {
    render(<PlaylistCard {...defaultProps} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('width', '150');
    expect(image).toHaveAttribute('height', '150');
  });

  it('should handle different track counts', () => {
    const { rerender } = render(
      <PlaylistCard {...defaultProps} totalTracks={1} />
    );
    expect(screen.getByText('1 músicas')).toBeInTheDocument();

    rerender(<PlaylistCard {...defaultProps} totalTracks={5} />);
    expect(screen.getByText('5 músicas')).toBeInTheDocument();

    rerender(<PlaylistCard {...defaultProps} totalTracks={0} />);
    expect(screen.getByText('0 músicas')).toBeInTheDocument();
  });

  it('should handle long playlist names with truncation', () => {
    const longName =
      'This is a very long playlist name that should be truncated because it exceeds the normal length';

    render(<PlaylistCard {...defaultProps} playlistName={longName} />);

    const title = screen.getByText(longName);
    expect(title).toHaveClass('truncate');
    expect(title).toHaveClass('line-clamp-1');
  });

  it('should apply hover effects to card', () => {
    render(<PlaylistCard {...defaultProps} />);

    const card = document.querySelector('.px-4');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toHaveClass('hover:bg-surface-hover');
    expect(card).toHaveClass('hover:-translate-y-1.5');
    expect(card).toHaveClass('transition-all');
    expect(card).toHaveClass('duration-400');
  });

  it('should render Sparkles icon', () => {
    render(<PlaylistCard {...defaultProps} />);

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render Circle icon', () => {
    render(<PlaylistCard {...defaultProps} />);

    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should apply correct classes to playlist title', () => {
    render(<PlaylistCard {...defaultProps} />);

    const title = screen.getByText('Metallica');
    expect(title).toHaveClass('text-sm');
    expect(title).toHaveClass('sm:text-lg');
    expect(title).toHaveClass('font-bold');
    expect(title).toHaveClass('font-inter');
    expect(title).toHaveClass('group-hover:text-primary');
    expect(title).toHaveClass('transition-colors');
    expect(title).toHaveClass('duration-300');
  });

  it('should apply correct classes to image', () => {
    render(<PlaylistCard {...defaultProps} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass('rounded-md');
    expect(image).toHaveClass('aspect-square');
    expect(image).toHaveClass('w-full');
    expect(image).toHaveClass('h-auto');
    expect(image).toHaveClass('group-hover:scale-110');
    expect(image).toHaveClass('group-hover:blur-xs');
    expect(image).toHaveClass('transition-all');
    expect(image).toHaveClass('duration-300');
    expect(image).toHaveClass('object-cover');
  });

  it('should render Sparkles overlay with correct classes', () => {
    render(<PlaylistCard {...defaultProps} />);

    const overlay = document.querySelector('.absolute.inset-0');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('flex');
    expect(overlay).toHaveClass('items-center');
    expect(overlay).toHaveClass('justify-center');
    expect(overlay).toHaveClass('bg-primary');
    expect(overlay).toHaveClass('opacity-0');
    expect(overlay).toHaveClass('group-hover:opacity-100');
    expect(overlay).toHaveClass('rounded-full');
  });

  it('should handle special characters in playlist name', () => {
    const specialName = 'Playlist @#$%^&*() 123';

    render(<PlaylistCard {...defaultProps} playlistName={specialName} />);

    expect(screen.getByText(specialName)).toBeInTheDocument();
  });

  it('should have correct structure hierarchy', () => {
    render(<PlaylistCard {...defaultProps} />);

    const link = screen.getByTestId('next-link');
    const card = document.querySelector('.px-4') as HTMLElement;
    const image = screen.getByTestId('next-image');
    const title = screen.getByText('Metallica');
    const tracks = screen.getByText('10 músicas');

    expect(link).toContainElement(card);
    expect(card).toContainElement(image);
    expect(card).toContainElement(title);
    expect(card).toContainElement(tracks);
  });

  it('should have correct spacing classes in content div', () => {
    render(<PlaylistCard {...defaultProps} />);

    const contentDiv = document.querySelector('.space-y-2');
    expect(contentDiv).toBeInTheDocument();
    expect(contentDiv).toHaveClass('space-y-2');
  });

  it('should have flex alignment for tracks section', () => {
    render(<PlaylistCard {...defaultProps} />);

    const tracksContainer = document.querySelector('.flex.items-center.gap-2');
    expect(tracksContainer).toBeInTheDocument();
    expect(tracksContainer).toHaveClass('flex');
    expect(tracksContainer).toHaveClass('items-center');
    expect(tracksContainer).toHaveClass('gap-2');
  });

  it('should apply correct classes to tracks text', () => {
    render(<PlaylistCard {...defaultProps} />);

    const tracksText = screen.getByText('10 músicas');
    expect(tracksText).toHaveClass('text-muted-foreground');
    expect(tracksText).toHaveClass('text-xs');
    expect(tracksText).toHaveClass('sm:text-sm');
  });

  it('should have correct border radius on image container', () => {
    render(<PlaylistCard {...defaultProps} />);

    const imageContainer = document.querySelector(
      '.overflow-hidden.rounded-md'
    );
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveClass('overflow-hidden');
    expect(imageContainer).toHaveClass('rounded-md');
  });

  it('should have correct padding on card', () => {
    render(<PlaylistCard {...defaultProps} />);

    const card = document.querySelector('.px-4');
    expect(card).toHaveClass('px-4');
  });

  it('should have correct z-index on overlay', () => {
    render(<PlaylistCard {...defaultProps} />);

    const overlay = document.querySelector('.z-10');
    expect(overlay).toBeInTheDocument();
  });

  it('should handle very large number of tracks', () => {
    render(<PlaylistCard {...defaultProps} totalTracks={999999} />);

    expect(screen.getByText('999999 músicas')).toBeInTheDocument();
  });
});
