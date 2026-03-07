import { useState } from "react";

export const useDiscoverVibe = () => {
  const [emotionalVibe, setEmotionalVibe] = useState<number>(50);
  const [energyVibe, setEnergyVibe] = useState<number>(50);
  const [instrumentalVibe, setInstrumentalVibe] = useState<number>(50);

  const isVibesChanged =
    emotionalVibe !== 50 || energyVibe !== 50 || instrumentalVibe !== 50;

  const onResetVibes = () => {
    setEmotionalVibe(50);
    setEnergyVibe(50);
    setInstrumentalVibe(50);
  };

  return {
    emotionalVibe,
    setEmotionalVibe,
    energyVibe,
    setEnergyVibe,
    instrumentalVibe,
    setInstrumentalVibe,
    onResetVibes,
    isVibesChanged,
  };
};
