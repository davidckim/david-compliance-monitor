'use client';

import { useState } from 'react';

import { useHistory } from '@/hooks/useHistory';
import { useAnalysis } from '@/hooks/useAnalysis';

import { AnalysisForm } from '@/components/AnalysisForm';
import { AnalysisResultCard } from '@/components/AnalysisResultCard';
import { AnalysisHistory } from '@/components/AnalysisHistory';
import { AnalysisRecord } from '@/types/analysis';
import { Separator } from '@/components/ui/separator';

export const AnalysisContainer = () => {
  const {
    action,
    guideline,
    isLoading,
    error,
    currentResult,
    handleSubmit,
    setAction,
    setGuideline,
  } = useAnalysis();
  const { history, addHistory, clearHistory } = useHistory();
  const [isEditingFromHistory, setIsEditingFromHistory] = useState(false);

  const handleAnalyze = (e: React.SyntheticEvent) => {
    handleSubmit(e, (record) => {
      addHistory(record);
      setIsEditingFromHistory(false);
    });
  };

  const handleSelectHistory = (record: AnalysisRecord) => {
    setAction(record.action);
    setGuideline(record.guideline);
    setIsEditingFromHistory(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditingFromHistory(false);
    setAction('');
    setGuideline('');
  };

  return (
    <div className="flex flex-col gap-8">
      <AnalysisForm
        action={action}
        error={error}
        guideline={guideline}
        handleCancelEdit={handleCancelEdit}
        isLoading={isLoading}
        isEditingFromHistory={isEditingFromHistory}
        onActionChange={setAction}
        onGuidelineChange={setGuideline}
        onSubmit={handleAnalyze}
      />
      {currentResult && (
        <>
          <Separator />
          <AnalysisResultCard analysis={currentResult} />
        </>
      )}
      <Separator />
      <AnalysisHistory
        history={history}
        onClear={clearHistory}
        onSelect={handleSelectHistory}
      />
    </div>
  );
};
