import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RightInfo } from '../container/RightInfo';

jest.mock('sonner', () => ({
  toast: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

const onAddToPlaylistMock = jest.fn();
const defaultProps = {
  id: '741',
  duration: '3:45',
  onAddToPlaylist: onAddToPlaylistMock,
  isInPlaylist: false,
};

describe('RightInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render duration text correctly', () => {
    render(<RightInfo {...defaultProps} />);

    const duration = screen.getByText('3:45');
    expect(duration).toBeInTheDocument();
    expect(duration).toHaveClass('text-sm', 'text-muted-foreground');
  });

  it('should render Plus icon when music is not added', () => {
    render(<RightInfo {...defaultProps} isInPlaylist={false} />);

    const plusIcon = document.querySelector('svg');
    expect(plusIcon).toBeInTheDocument();
    expect(plusIcon).toHaveClass('lucide-plus');
  });

  it('should render Check icon when music is already added', () => {
    render(<RightInfo {...defaultProps} isInPlaylist={true} />);

    const checkIcon = document.querySelector('svg');
    expect(checkIcon).toBeInTheDocument();
    expect(checkIcon).toHaveClass('lucide-check');
  });

  it('should apply correct classes to wrapper div when music is not added', () => {
    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    const wrapper = container.querySelector('.border-primary');
    expect(wrapper).toHaveClass(
      'border',
      'border-primary',
      'rounded-full',
      'p-2'
    );
    expect(wrapper).toHaveClass('group/add', 'hover:bg-primary');
    expect(wrapper).not.toHaveClass('bg-primary');
  });

  it('should apply correct classes to wrapper div when music is added', () => {
    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={true} />
    );

    const wrapper = container.querySelector('.bg-primary');
    expect(wrapper).toHaveClass(
      'border',
      'border-primary',
      'rounded-full',
      'p-2',
      'bg-primary'
    );
    expect(wrapper).not.toHaveClass('group/add', 'hover:bg-primary');
  });

  it('should call onAddToPlaylist when clicked and music is not added', async () => {
    onAddToPlaylistMock.mockResolvedValueOnce(undefined);

    render(<RightInfo {...defaultProps} isInPlaylist={false} />);

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onAddToPlaylistMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should change from Plus to Check icon after successful addition', async () => {
    onAddToPlaylistMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 50))
    );

    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    let plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toBeInTheDocument();

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onAddToPlaylistMock).toHaveBeenCalled();
    });

    await waitFor(() => {
      const checkIcon = container.querySelector('.lucide-check');
      expect(checkIcon).toBeInTheDocument();
    });
  });

  it('should update UI before parent updates isInPlaylist prop', async () => {
    onAddToPlaylistMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 50))
    );

    const { container, rerender } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    fireEvent.click(screen.getByTestId('add-to-playlist-button'));

    await waitFor(() => {
      expect(container.querySelector('.lucide-check')).toBeInTheDocument();
    });

    expect(container.querySelector('.lucide-plus')).not.toBeInTheDocument();

    rerender(<RightInfo {...defaultProps} isInPlaylist={false} />);

    expect(container.querySelector('.lucide-check')).toBeInTheDocument();
  });

  it('should keep added state when parent updates isInPlaylist to true', async () => {
    onAddToPlaylistMock.mockResolvedValueOnce(undefined);

    const { container, rerender } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    fireEvent.click(screen.getByTestId('add-to-playlist-button'));

    await waitFor(() => {
      expect(container.querySelector('.lucide-check')).toBeInTheDocument();
    });

    rerender(<RightInfo {...defaultProps} isInPlaylist={true} />);

    expect(container.querySelector('.lucide-check')).toBeInTheDocument();
    expect(container.querySelector('.lucide-plus')).not.toBeInTheDocument();
  });

  it('should show plus icon when isInPlaylist changes from true to false', async () => {
    onAddToPlaylistMock.mockResolvedValueOnce(undefined);

    const { container, rerender } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    fireEvent.click(screen.getByTestId('add-to-playlist-button'));

    await waitFor(() => {
      expect(container.querySelector('.lucide-check')).toBeInTheDocument();
    });

    rerender(<RightInfo {...defaultProps} isInPlaylist={true} />);
    expect(container.querySelector('.lucide-check')).toBeInTheDocument();

    rerender(<RightInfo {...defaultProps} isInPlaylist={false} />);

    expect(container.querySelector('.lucide-plus')).toBeInTheDocument();
    expect(container.querySelector('.lucide-check')).not.toBeInTheDocument();
  });

  it('should reset local added state when track id changes', async () => {
    onAddToPlaylistMock.mockResolvedValueOnce(undefined);

    const { container, rerender } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    fireEvent.click(screen.getByTestId('add-to-playlist-button'));

    await waitFor(() => {
      expect(container.querySelector('.lucide-check')).toBeInTheDocument();
    });

    rerender(<RightInfo {...defaultProps} id="999" isInPlaylist={false} />);

    expect(container.querySelector('.lucide-plus')).toBeInTheDocument();
    expect(container.querySelector('.lucide-check')).not.toBeInTheDocument();
  });

  it('should not call onAddToPlaylist when clicked and music is already added', async () => {
    render(<RightInfo {...defaultProps} isInPlaylist={true} />);

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    expect(onAddToPlaylistMock).not.toHaveBeenCalled();
  });

  it('should show toast.info when trying to add already added music', () => {
    const { toast } = require('sonner');

    render(<RightInfo {...defaultProps} isInPlaylist={true} />);

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    expect(toast.info).toHaveBeenCalledWith('Música já adicionada à playlist');
  });

  it('should show toast.error when onAddToPlaylist fails', async () => {
    const { toast } = require('sonner');
    onAddToPlaylistMock.mockRejectedValueOnce(new Error('Network error'));

    render(<RightInfo {...defaultProps} isInPlaylist={false} />);

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Ocorreu um erro ao adicionar a música'
      );
    });
  });

  it('should stop propagation when clicking already added music', () => {
    const onClickParent = jest.fn();
    render(
      <div onClick={onClickParent}>
        <RightInfo {...defaultProps} isInPlaylist={true} />
      </div>
    );

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    expect(onClickParent).not.toHaveBeenCalled();
  });

  it('should not stop propagation when adding new music', async () => {
    onAddToPlaylistMock.mockResolvedValueOnce(undefined);

    const onClickParent = jest.fn();
    render(
      <div onClick={onClickParent}>
        <RightInfo {...defaultProps} isInPlaylist={false} />
      </div>
    );

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onClickParent).toHaveBeenCalled();
    });
  });

  it('should reflect isInPlaylist prop on mount', () => {
    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={true} />
    );

    const checkIcon = container.querySelector('.lucide-check');
    expect(checkIcon).toBeInTheDocument();
  });

  it('should apply animation class to Check icon', () => {
    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={true} />
    );

    const checkIcon = container.querySelector('.lucide-check');
    expect(checkIcon).toHaveClass('animate-scale-appear');
  });

  it('should apply correct size classes to icons', () => {
    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    const plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toHaveClass('md:w-6', 'md:h-6', 'w-4', 'h-4');
  });

  it('should apply correct text color to Plus icon', () => {
    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    const plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toHaveClass('text-white');
  });

  it('should apply correct text color to Check icon', () => {
    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={true} />
    );

    const checkIcon = container.querySelector('.lucide-check');
    expect(checkIcon).toHaveClass('text-black');
  });

  it('should update state after successful addition', async () => {
    onAddToPlaylistMock.mockResolvedValueOnce(undefined);

    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    let wrapper = container.querySelector('.group\\/add');
    expect(wrapper).toBeInTheDocument();

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onAddToPlaylistMock).toHaveBeenCalled();
    });

    await waitFor(() => {
      wrapper = container.querySelector('.bg-primary');
      expect(wrapper).toBeInTheDocument();
    });
  });

  it('should revert state on error', async () => {
    const { toast } = require('sonner');
    onAddToPlaylistMock.mockRejectedValueOnce(new Error('Error'));

    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    let plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toBeInTheDocument();

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });

    plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toBeInTheDocument();
  });

  it('should handle different duration formats', () => {
    const durations = ['0:30', '1:00', '10:45', '1:15:30'];

    durations.forEach((duration) => {
      const { unmount } = render(
        <RightInfo
          id="123"
          duration={duration}
          onAddToPlaylist={onAddToPlaylistMock}
          isInPlaylist={false}
        />
      );

      expect(screen.getByText(duration)).toBeInTheDocument();
      unmount();
    });
  });

  it('should have correct transition classes on wrapper', () => {
    const { container } = render(
      <RightInfo {...defaultProps} isInPlaylist={false} />
    );

    const wrapper = container.querySelector('.border-primary');
    expect(wrapper).toHaveClass('transition-all', 'duration-200');
  });
});
