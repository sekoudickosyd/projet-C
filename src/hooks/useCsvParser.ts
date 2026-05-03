import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { Deal } from '../types/deal';
import { AMOUNT_COLUMN, DATE_CREATED_COLUMN, DUE_DATE_COLUMN } from '../config/csvColumns';

function cleanAmount(raw: string | undefined): number {
  if (!raw) return 0;
  const cleaned = String(raw)
    .replace(/[€$]/g, '')
    .replace(/\s/g, '')
    .replace(',', '.');
  const value = parseFloat(cleaned);
  return isNaN(value) ? 0 : value;
}

function parseDate(raw: string | undefined): Date | null {
  if (!raw || !raw.trim()) return null;

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw.trim())) {
    const d = new Date(raw.trim());
    return isNaN(d.getTime()) ? null : d;
  }

  // DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw.trim())) {
    const [day, month, year] = raw.trim().split('/');
    const d = new Date(`${year}-${month}-${day}`);
    return isNaN(d.getTime()) ? null : d;
  }

  return null;
}

interface UseCsvParserResult {
  data: Deal[];
  error: string | null;
  isLoading: boolean;
}

export function useCsvParser(file: File | null): UseCsvParserResult {
  const [data, setData] = useState<Deal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setData([]);

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        if (!results.data || results.data.length === 0) {
          setError('Aucune donnée trouvée dans le fichier');
          setIsLoading(false);
          return;
        }

        const deals: Deal[] = results.data.map((row) => ({
          ...row,
          taskName: row['Task Name'] ?? '',
          status: row['Status'] ?? '',
          startDate: row['Start Date'] ?? '',
          assignees: row['Assignees'] ?? '',
          priority: row['Priority'] ?? '',
          tags: row['Tags'] ?? '',
          taskContent: row['Task Content'] ?? '',
          amount: cleanAmount(row[AMOUNT_COLUMN]),
          dateCreated: parseDate(row[DATE_CREATED_COLUMN]),
          dueDate: parseDate(row[DUE_DATE_COLUMN]),
        }));

        setData(deals);
        setIsLoading(false);
      },
      error(err) {
        setError(`Erreur de lecture : ${err.message}`);
        setIsLoading(false);
      },
    });
  }, [file]);

  return { data, error, isLoading };
}
