import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RightInfo } from '../container/RightInfo';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

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
};

describe('RightInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it('should render duration text correctly', () => {
    render(<RightInfo {...defaultProps} />);

    const duration = screen.getByText('3:45');
    expect(duration).toBeInTheDocument();
    expect(duration).toHaveClass('text-sm', 'text-muted-foreground');
  });

  it('should render Plus icon when music is not added', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));

    render(<RightInfo {...defaultProps} />);

    const plusIcon = document.querySelector('svg');
    expect(plusIcon).toBeInTheDocument();
    expect(plusIcon).toHaveClass('lucide-plus');
  });

  it('should render Check icon when music is already added', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(['741']));

    render(<RightInfo {...defaultProps} />);

    const checkIcon = document.querySelector('svg');
    expect(checkIcon).toBeInTheDocument();
    expect(checkIcon).toHaveClass('lucide-check');
  });

  it('should apply correct classes to wrapper div when music is not added', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));

    const { container } = render(<RightInfo {...defaultProps} />);

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
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(['741']));

    const { container } = render(<RightInfo {...defaultProps} />);

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
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));
    onAddToPlaylistMock.mockResolvedValueOnce(undefined);

    render(<RightInfo {...defaultProps} />);

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onAddToPlaylistMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should change from Plus to Check icon after successful addition', async () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));
    onAddToPlaylistMock.mockResolvedValueOnce(undefined);

    const { container, rerender } = render(<RightInfo {...defaultProps} />);

    let plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toBeInTheDocument();

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onAddToPlaylistMock).toHaveBeenCalled();
    });

    rerender(<RightInfo {...defaultProps} />);

    const checkIcon = container.querySelector('.lucide-check');
    expect(checkIcon).toBeInTheDocument();
  });

  it('should not call onAddToPlaylist when clicked and music is already added', async () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(['741']));

    render(<RightInfo {...defaultProps} />);

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    expect(onAddToPlaylistMock).not.toHaveBeenCalled();
  });

  it('should show toast.info when trying to add already added music', () => {
    const { toast } = require('sonner');
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(['741']));

    render(<RightInfo {...defaultProps} />);

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    expect(toast.info).toHaveBeenCalledWith('Música já adicionada à playlist');
  });

  it('should show toast.error when onAddToPlaylist fails', async () => {
    const { toast } = require('sonner');
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));
    onAddToPlaylistMock.mockRejectedValueOnce(new Error('Network error'));

    render(<RightInfo {...defaultProps} />);

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Ocorreu um erro ao adicionar a música'
      );
    });
  });

  it('should stop propagation when clicking already added music', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(['741']));

    const onClickParent = jest.fn();
    render(
      <div onClick={onClickParent}>
        <RightInfo {...defaultProps} />
      </div>
    );

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    expect(onClickParent).not.toHaveBeenCalled();
  });

  it('should not stop propagation when adding new music', async () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));
    onAddToPlaylistMock.mockResolvedValueOnce(undefined);

    const onClickParent = jest.fn();
    render(
      <div onClick={onClickParent}>
        <RightInfo {...defaultProps} />
      </div>
    );

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onClickParent).toHaveBeenCalled();
    });
  });

  it('should load initial state from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(['741']));

    const { container } = render(<RightInfo {...defaultProps} />);

    const checkIcon = container.querySelector('.lucide-check');
    expect(checkIcon).toBeInTheDocument();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('addedMusics');
  });

  it('should handle localStorage with no data', () => {
    localStorageMock.getItem.mockReturnValueOnce(null);

    const { container } = render(<RightInfo {...defaultProps} />);

    const plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toBeInTheDocument();
  });

  it('should handle empty array in localStorage', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));

    const { container } = render(<RightInfo {...defaultProps} />);

    const plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toBeInTheDocument();
  });

  it('should apply animation class to Check icon', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(['741']));

    const { container } = render(<RightInfo {...defaultProps} />);

    const checkIcon = container.querySelector('.lucide-check');
    expect(checkIcon).toHaveClass('animate-scale-appear');
  });

  it('should apply correct size classes to icons', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));

    const { container } = render(<RightInfo {...defaultProps} />);

    const plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toHaveClass('md:w-6', 'md:h-6', 'w-4', 'h-4');
  });

  it('should apply correct text color to Plus icon', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));

    const { container } = render(<RightInfo {...defaultProps} />);

    const plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toHaveClass('text-white');
  });

  it('should apply correct text color to Check icon', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(['741']));

    const { container } = render(<RightInfo {...defaultProps} />);

    const checkIcon = container.querySelector('.lucide-check');
    expect(checkIcon).toHaveClass('text-black');
  });

  it('should update state after successful addition', async () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));
    onAddToPlaylistMock.mockResolvedValueOnce(undefined);

    const { container, rerender } = render(<RightInfo {...defaultProps} />);

    let wrapper = container.querySelector('.group\\/add');
    expect(wrapper).toBeInTheDocument();

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onAddToPlaylistMock).toHaveBeenCalled();
    });

    rerender(<RightInfo {...defaultProps} />);

    wrapper = container.querySelector('.bg-primary');
    expect(wrapper).toBeInTheDocument();
  });

  it('should revert state on error', async () => {
    const { toast } = require('sonner');
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));
    onAddToPlaylistMock.mockRejectedValueOnce(new Error('Error'));

    const { container, rerender } = render(<RightInfo {...defaultProps} />);

    let plusIcon = container.querySelector('.lucide-plus');
    expect(plusIcon).toBeInTheDocument();

    const button = screen.getByTestId('add-to-playlist-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });

    rerender(<RightInfo {...defaultProps} />);

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
        />
      );

      expect(screen.getByText(duration)).toBeInTheDocument();
      unmount();
    });
  });

  it('should have correct transition classes on wrapper', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([]));

    const { container } = render(<RightInfo {...defaultProps} />);

    const wrapper = container.querySelector('.border-primary');
    expect(wrapper).toHaveClass('transition-all', 'duration-200');
  });
});
