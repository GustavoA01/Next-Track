import { act, renderHook } from '@testing-library/react';
import { useDiscoverVibe } from '../hooks/useDiscoverVibe';

describe('useDiscoverVibre', () => {
  it('onResetVibes should reset vibes to 50', () => {
    const { result } = renderHook(() => useDiscoverVibe());
    const { emotionalVibe, energyVibe, instrumentalVibe, onResetVibes } = result.current;

    onResetVibes();
    expect(emotionalVibe).toBe(50);
    expect(energyVibe).toBe(50);
    expect(instrumentalVibe).toBe(50);
  });

  it('isVibesChanged should be false when vibes are at default values', () => {
    const { result } = renderHook(() => useDiscoverVibe());
    const { setEmotionalVibe, setEnergyVibe, setInstrumentalVibe } = result.current;

    act(() => {
      setEmotionalVibe(50);
      setEnergyVibe(50);
      setInstrumentalVibe(50);
      expect(result.current.isVibesChanged).toBe(false);
    });

    act(() => {
      setEmotionalVibe(40);
    });
    expect(result.current.isVibesChanged).toBe(true);

    act(() => {
      setEmotionalVibe(50);
      setEnergyVibe(60);
    });
    expect(result.current.isVibesChanged).toBe(true);

    act(() => {
      setEnergyVibe(50);
      setInstrumentalVibe(10);
    });
    expect(result.current.isVibesChanged).toBe(true);
  });
});
