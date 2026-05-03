import { useRef, useState, useEffect } from 'react';
import { useCsvParser } from '../hooks/useCsvParser';
import { useDeals } from '../context/DealsContext';

function isCsvFile(file: File): boolean {
  return file.name.toLowerCase().endsWith('.csv');
}

export function CsvDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const { data, error: parseError, isLoading } = useCsvParser(selectedFile);
  const { setDeals } = useDeals();

  useEffect(() => {
    if (data.length > 0) setDeals(data);
  }, [data]);

  const handleFile = (file: File) => {
    if (!isCsvFile(file)) {
      setFileError('Format non supporté. Veuillez importer un fichier .csv.');
      setSelectedFile(null);
      return;
    }
    setFileError(null);
    setSelectedFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => setIsDragOver(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onClick = () => inputRef.current?.click();

  const displayError = fileError || parseError;
  const isSuccess = !isLoading && !displayError && data.length > 0 && selectedFile;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={[
          'flex flex-col items-center justify-center gap-3',
          'border-2 border-dashed rounded-xl p-10 cursor-pointer',
          'transition-all duration-150 select-none',
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : isSuccess
              ? 'border-green-400 bg-green-50'
              : displayError
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50',
        ].join(' ')}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={onInputChange}
        />

        {isLoading ? (
          <>
            <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            <p className="text-sm text-gray-500">Chargement en cours…</p>
          </>
        ) : isSuccess ? (
          <>
            <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-medium text-green-700">{selectedFile.name}</p>
            <p className="text-sm text-green-600">{data.length} ligne{data.length > 1 ? 's' : ''} importée{data.length > 1 ? 's' : ''}</p>
          </>
        ) : displayError ? (
          <>
            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-600 text-center">{displayError}</p>
            <p className="text-xs text-gray-400">Cliquez pour réessayer</p>
          </>
        ) : (
          <>
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-500 text-center">
              Déposez votre fichier CSV ici ou{' '}
              <span className="text-blue-500 underline">cliquez pour parcourir</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
