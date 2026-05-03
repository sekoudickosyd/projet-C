import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Deal } from '../types/deal';

interface DealsContextValue {
  deals: Deal[];
  isLoaded: boolean;
  totalAmount: number;
  dealsCount: number;
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

  const totalAmount = useMemo(
    () => deals.reduce((sum, d) => sum + (d.amount ?? 0), 0),
    [deals]
  );

  const value = useMemo(
    () => ({ deals, isLoaded, totalAmount, dealsCount: deals.length, setDeals: handleSetDeals }),
    [deals, isLoaded, totalAmount]
  );

  return <DealsContext.Provider value={value}>{children}</DealsContext.Provider>;
}

export function useDeals(): DealsContextValue {
  const ctx = useContext(DealsContext);
  if (!ctx) throw new Error('useDeals must be used inside DealsProvider');
  return ctx;
}
