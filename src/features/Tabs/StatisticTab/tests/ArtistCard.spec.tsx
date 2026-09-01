import { fireEvent, render, screen } from '@testing-library/react';
import { NextImgProps } from '@/globalTestsMocks';
import { ArtistCard } from '../components/ArtistCard';

type MockImageProps = NextImgProps & {
  onLoad?: () => void;
  onError?: () => void;
};

jest.mock('next/image', () => {
  function MockImage({
    src,
    alt,
    width,
    height,
    onLoad,
    onError,
  }: MockImageProps) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }
  return MockImage;
});

const mockArtist = {
  id: '1',
  name: 'Test Artist',
  count: 10,
  href: 'https://api.spotify.com/v1/artists/1',
  image: 'https://spotify/image-artist-mock',
  spotifyUrl: 'https://api.spotify.com/v1/artists/1',
};

const renderArtistCard = () =>
  render(<ArtistCard artist={mockArtist} palleteColor="#121212" index={1} />);

const renderLoadedArtistCard = () => {
  const view = renderArtistCard();
  fireEvent.load(screen.getByRole('img'));
  return view;
};

describe('ArtistCard', () => {
  it('shows a skeleton until the image loads', () => {
    renderArtistCard();

    expect(screen.getByTestId('artist-card-skeleton')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('opacity-0');

    fireEvent.load(screen.getByRole('img'));

    expect(
      screen.queryByTestId('artist-card-skeleton')
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link')).not.toHaveClass('opacity-0');
  });

  it('should render correctly with given props', () => {
    renderLoadedArtistCard();

    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    expect(screen.getByText(`${mockArtist.count} músicas`)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      mockArtist.spotifyUrl
    );
  });

  it('renders image with correct attirbutes', () => {
    renderLoadedArtistCard();
    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', mockArtist.image);
    expect(img).toHaveAttribute('alt', mockArtist.name);
    expect(img).toHaveAttribute('width', '150');
    expect(img).toHaveAttribute('height', '150');
  });

  it('should render background color with correct pallete attributes', () => {
    renderLoadedArtistCard();
    const bg = screen.getByTestId('header-bg-color');

    expect(bg).toHaveStyle(
      'background: linear-gradient(to top, #121212 60%, transparent 100%)'
    );
  });

  it('renders the correct artist position counter', () => {
    renderLoadedArtistCard();
    const counter = screen.getByTestId('artist-counter');

    expect(counter).toHaveTextContent('2');
    expect(counter).toHaveStyle('color: #121212; textShadow: 0 0 10px #121212');
  });

  it('staggers the slide-in animation based on index', () => {
    renderLoadedArtistCard();
    const link = screen.getByRole('link');

    expect(link).toHaveClass('animate-slide-in-down');
    expect(link).toHaveStyle({ animationDelay: '0.1s' });
  });

  it('should call a function when card is clicked', () => {
    renderLoadedArtistCard();
    const onClick = jest.fn();
    const link = screen.getByRole('link');

    link.addEventListener('click', onClick);
    fireEvent.click(link);

    expect(onClick).toHaveBeenCalled();
  });
});
