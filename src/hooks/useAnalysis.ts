'use client';

import { useState } from 'react';
import { AnalysisRecord } from '@/types/analysis';

export function useAnalysis() {
  const [action, setAction] = useState('');
  const [guideline, setGuideline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<AnalysisRecord | null>(
    null
  );

  const handleSubmit = async (
    e: React.SyntheticEvent,
    onSuccess?: (record: AnalysisRecord) => void
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, guideline }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? 'Something went wrong');
      }

      const data: AnalysisRecord = await response.json();
      setCurrentResult(data);
      onSuccess?.(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    action,
    setAction,
    guideline,
    setGuideline,
    isLoading,
    error,
    currentResult,
    handleSubmit,
  };
}
