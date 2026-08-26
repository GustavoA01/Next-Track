import { createContext, useContext, useMemo, useState } from "react";

type PlayerProviderType = {
  uris: string[];
  setUris: (uris: string[]) => void;
} 

const PlayerContext = createContext<PlayerProviderType>({} as PlayerProviderType);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [uris, setUris] = useState<string[]>([]);
  
  const value = useMemo(() => ({
    uris,
    setUris,
  }), [uris]);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export const usePlayerProvider = () => {
  const context = useContext(PlayerContext);
  if (!context) 
    throw new Error('usePlayerProvider deve ser usado dentro de PlayerProvider');
  
  return context;
}