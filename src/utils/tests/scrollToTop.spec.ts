import { scrollToTop } from '../scrollToTop';

describe('scrollToTop', () => {
  it('should scroll the playlist header into view', () => {
    const mockScrollIntoView = jest.fn();
    const mockElement = { scrollIntoView: mockScrollIntoView };

    document.getElementById = jest.fn().mockReturnValue(mockElement);

    scrollToTop();

    expect(document.getElementById).toHaveBeenCalledWith('playlist-header');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should do nothing when the playlist header is missing', () => {
    document.getElementById = jest.fn().mockReturnValue(null);

    scrollToTop();

    expect(document.getElementById).toHaveBeenCalledWith('playlist-header');
  });
});
