import { fireEvent, render, screen } from '@testing-library/react';
import { MusicCard } from '../container/MusicCard';
import { NextImgProps } from '@/globalTestsMocks';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: NextImgProps) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      data-testid="next-image"
    />
  ),
}));

const defaultProps = {
  index: 0,
  id: '123',
  imageUrl: 'https://fakeimg.com/album.jpg',
  musicName: 'Test Song',
  artistName: 'Test Artist',
  duration: '3:45',
  onClick: jest.fn(),
  onAddToPlaylist: jest.fn(),
};

describe('MusicCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with all props', () => {
    render(<MusicCard {...defaultProps} />);

    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('3:45')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByAltText('Foto do álbum')).toBeInTheDocument();
  });

  it('should render correct index number (index + 1)', () => {
    const { rerender } = render(<MusicCard {...defaultProps} index={0} />);
    expect(screen.getByText('1')).toBeInTheDocument();

    rerender(<MusicCard {...defaultProps} index={4} />);
    expect(screen.getByText('5')).toBeInTheDocument();

    rerender(<MusicCard {...defaultProps} index={9} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', () => {
    render(<MusicCard {...defaultProps} />);

    const card = screen.getByTestId('music-card');
    fireEvent.click(card);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should call onAddToPlaylist when add button is clicked', () => {
    render(<MusicCard {...defaultProps} />);

    const addBtn = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(addBtn);

    expect(defaultProps.onAddToPlaylist).toHaveBeenCalledTimes(1);
  });

  it('should apply correct classes to Card component', () => {
    render(<MusicCard {...defaultProps} />);

    const card = screen.getByTestId('music-card');
    expect(card).toHaveClass('group/card');
    expect(card).toHaveClass('w-full');
    expect(card).toHaveClass('px-4', 'sm:px-8');
    expect(card).toHaveClass('bg-transparent');
    expect(card).toHaveClass('border-none');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toHaveClass('hover:bg-surface-hover/40');
    expect(card).toHaveClass('transition-all');
    expect(card).toHaveClass('duration-200');
    expect(card).toHaveClass('shadow-none');
  });

  it('should apply correct classes to index number', () => {
    render(<MusicCard {...defaultProps} />);

    const indexNumber = screen.getByText('1');
    expect(indexNumber).toHaveClass('text-sm', 'sm:text-base');
    expect(indexNumber).toHaveClass('font-montserrat');
    expect(indexNumber).toHaveClass('text-muted-foreground');
  });

  it('should have correct flex layout structure', () => {
    render(<MusicCard {...defaultProps} />);

    const mainDiv = document.querySelector('.flex.justify-between');
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv).toHaveClass(
      'flex',
      'justify-between',
      'items-center',
      'gap-2'
    );

    const leftSection = document.querySelector(
      '.flex.items-center.gap-4.md\\:gap-8'
    );
    expect(leftSection).toBeInTheDocument();
    expect(leftSection).toHaveClass(
      'flex',
      'items-center',
      'gap-4',
      'md:gap-8'
    );
  });

  it('should pass correct props to AlbumImg component', () => {
    render(<MusicCard {...defaultProps} />);

    const albumImage = screen.getByAltText('Foto do álbum');
    expect(albumImage).toHaveAttribute('src', 'https://fakeimg.com/album.jpg');
  });

  it('should pass correct props to MusicInfo component', () => {
    render(<MusicCard {...defaultProps} />);

    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('should pass correct props to RightInfo component', () => {
    render(<MusicCard {...defaultProps} />);

    const addButton = screen.getByTestId('add-to-playlist-button');

    expect(screen.getByText('3:45')).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it('should handle different index values correctly', () => {
    const indexes = [0, 1, 2, 5, 10, 25];

    indexes.forEach((index) => {
      const { unmount } = render(<MusicCard {...defaultProps} index={index} />);

      expect(screen.getByText(String(index + 1))).toBeInTheDocument();
      unmount();
    });
  });

  it('should handle long music names', () => {
    const longMusicName =
      'This is a very long music name that should still render correctly within the component layout';

    render(<MusicCard {...defaultProps} musicName={longMusicName} />);

    expect(screen.getByText(longMusicName)).toBeInTheDocument();
  });

  it('should handle long artist names', () => {
    const longArtistName =
      'This is a very long artist name that should still render correctly within the component layout';

    render(<MusicCard {...defaultProps} artistName={longArtistName} />);

    expect(screen.getByText(longArtistName)).toBeInTheDocument();
  });

  it('should handle special characters in names', () => {
    const specialMusicName = 'Song @#$%^&*() 123';
    const specialArtistName = 'Artist @#$%^&*() 123';

    render(
      <MusicCard
        {...defaultProps}
        musicName={specialMusicName}
        artistName={specialArtistName}
      />
    );

    expect(screen.getByText(specialMusicName)).toBeInTheDocument();
    expect(screen.getByText(specialArtistName)).toBeInTheDocument();
  });

  it('should handle different duration formats', () => {
    const durations = ['0:30', '1:00', '10:45', '1:15:30'];

    durations.forEach((duration) => {
      const { unmount } = render(
        <MusicCard {...defaultProps} duration={duration} />
      );

      expect(screen.getByText(duration)).toBeInTheDocument();
      unmount();
    });
  });

  it('should have correct gap classes in left section', () => {
    render(<MusicCard {...defaultProps} />);

    const leftSection = document.querySelector(
      '.flex.items-center.gap-4.md\\:gap-8'
    );
    expect(leftSection).toHaveClass('gap-4', 'md:gap-8');
  });

  it('should have correct gap class in main container', () => {
    render(<MusicCard {...defaultProps} />);

    const mainContainer = document.querySelector('.flex.justify-between');
    expect(mainContainer).toHaveClass('gap-2');
  });

  it('should have transition effects on card', () => {
    render(<MusicCard {...defaultProps} />);

    const card = screen.getByTestId('music-card');
    expect(card).toHaveClass('transition-all', 'duration-200');
  });

  it('should have hover effects on card', () => {
    render(<MusicCard {...defaultProps} />);

    const card = screen.getByTestId('music-card');
    expect(card).toHaveClass('hover:bg-surface-hover/40');
    expect(card).toHaveClass('cursor-pointer');
  });

  it('should render AlbumImg with correct testid', () => {
    render(<MusicCard {...defaultProps} />);

    const albumImage = screen.getByTestId('next-image');
    expect(albumImage).toBeInTheDocument();
  });
});
