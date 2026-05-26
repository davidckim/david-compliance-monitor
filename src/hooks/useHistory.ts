'use client';

import { useEffect, useState } from 'react';
import { AnalysisRecord } from '@/types/analysis';

const STORAGE_KEY = 'compliance-history';

export function useHistory() {
  const [history, setHistory] = useState<AnalysisRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const addHistory = (record: AnalysisRecord) => {
    setHistory((prev) => {
      const updated = [record, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    addHistory,
    clearHistory,
  };
}
