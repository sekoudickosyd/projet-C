import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Deal } from '../types/deal';

interface DealsContextValue {
  deals: Deal[];
  isLoaded: boolean;
  setDeals: (deals: Deal[]) => void;
}

const DealsContext = createContext<DealsContextValue | undefined>(undefined);

export function DealsProvider({ children }: { children: ReactNode }) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSetDeals = (newDeals: Deal[]) => {
    setDeals(newDeals);
    setIsLoaded(true);
  };

  const value = useMemo(
    () => ({ deals, isLoaded, setDeals: handleSetDeals }),
    [deals, isLoaded]
  );

  return <DealsContext.Provider value={value}>{children}</DealsContext.Provider>;
}

export function useDeals(): DealsContextValue {
  const ctx = useContext(DealsContext);
  if (!ctx) throw new Error('useDeals must be used inside DealsProvider');
  return ctx;
}
