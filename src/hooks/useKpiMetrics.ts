import { useDeals } from '../context/DealsContext';

interface KpiMetrics {
  pipelineTotal: number;
  averageBasket: number;
  prospectsCount: number;
}

export function useKpiMetrics(): KpiMetrics {
  const { totalAmount, dealsCount } = useDeals();

  return {
    pipelineTotal: totalAmount,
    averageBasket: dealsCount > 0 ? totalAmount / dealsCount : 0,
    prospectsCount: dealsCount,
  };
}
