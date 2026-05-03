import { CsvDropzone } from './components/CsvDropzone';
import { KpiBar } from './components/KpiBar';
import { useDeals } from './context/DealsContext';

function App() {
  const { deals, isLoaded } = useDeals();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard CRM Flash</h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          {!isLoaded && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Importez votre pipeline commercial
              </h2>
              <p className="text-gray-500 text-sm">
                Déposez votre export CSV pour visualiser vos données
              </p>
            </div>
          )}

          <CsvDropzone />

          <KpiBar />

          {isLoaded && (
            <p className="text-sm text-gray-500">
              {deals.length} deal{deals.length > 1 ? 's' : ''} chargé{deals.length > 1 ? 's' : ''} dans le pipeline
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
