import { useDeals } from '../context/DealsContext';
import { useKpiMetrics } from '../hooks/useKpiMetrics';

function formatEuros(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

interface KpiCardProps {
  label: string;
  value: string;
  accent: string;
}

function KpiCard({ label, value, accent }: KpiCardProps) {
  return (
    <div className={`flex-1 rounded-xl border ${accent} bg-white px-6 py-5 shadow-sm`}>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export function KpiBar() {
  const { isLoaded } = useDeals();
  const { pipelineTotal, averageBasket, prospectsCount } = useKpiMetrics();

  if (!isLoaded) return null;

  return (
    <div className="flex gap-4 w-full">
      <KpiCard
        label="Pipeline Global"
        value={formatEuros(pipelineTotal)}
        accent="border-blue-200"
      />
      <KpiCard
        label="Panier Moyen"
        value={formatEuros(averageBasket)}
        accent="border-blue-200"
      />
      <KpiCard
        label="Volume de Prospects"
        value={prospectsCount.toString()}
        accent="border-blue-200"
      />
    </div>
  );
}
