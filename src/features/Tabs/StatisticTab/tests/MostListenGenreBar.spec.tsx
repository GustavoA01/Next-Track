import { render, screen } from '@testing-library/react';
import { MostListenGenreBar } from '../components/MostListenGenreBar';

describe('MostListenGenreBar', () => {
  it('renders component with correct attributes', () => {
    render(
      <MostListenGenreBar rank={1} name="Rock" count={48} maxCount={48} />
    );
    const component = screen.getByTestId('genre-bar');

    expect(component).toHaveTextContent('1');
    expect(component).toHaveTextContent('Rock');
    expect(component).toHaveTextContent('48 artistas');
    expect(screen.getByTestId('genre-bar-fill')).toHaveStyle({ width: '100%' });
  });

  it('renders singular artist label when count is 1', () => {
    render(<MostListenGenreBar rank={5} name="Jazz" count={1} maxCount={10} />);

    expect(screen.getByText('1 artista')).toBeInTheDocument();
    expect(screen.getByTestId('genre-bar-fill')).toHaveStyle({ width: '10%' });
  });
});
