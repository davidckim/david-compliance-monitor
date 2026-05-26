'use client';

import { Loader2 } from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

type AnalysisFormProps = {
  action: string;
  guideline: string;
  isLoading: boolean;
  error: string | null;
  isEditingFromHistory: boolean;
  handleCancelEdit: () => void;
  onActionChange: (value: string) => void;
  onGuidelineChange: (value: string) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
};

export const AnalysisForm = ({
  action,
  error,
  guideline,
  handleCancelEdit,
  isEditingFromHistory,
  isLoading,
  onActionChange,
  onGuidelineChange,
  onSubmit,
}: AnalysisFormProps) => {
  return (
    <form
      aria-label="Compliance analysis form"
      aria-busy={isLoading}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      {isEditingFromHistory && (
        <Alert className="border-violet-500/50 bg-violet-500/10">
          <AlertDescription className="flex items-center justify-between">
            <span className="font-semibold text-violet-300">
              Editing from history
            </span>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="action">Action</Label>
        <Textarea
          id="action"
          placeholder="Describe reported action"
          value={action}
          onChange={(e) => onActionChange(e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="guideline">Guideline</Label>
        <Textarea
          id="guideline"
          placeholder="Describe guideline"
          value={guideline}
          onChange={(e) => onGuidelineChange(e.target.value)}
          rows={3}
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end gap-2">
        {isEditingFromHistory && (
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading || !action || !guideline}
          suppressHydrationWarning
        >
          {isLoading ? (
            <Loader2
              aria-label="Analyzing"
              className="animate-spin"
              role="status"
            />
          ) : isEditingFromHistory ? (
            'Resubmit'
          ) : (
            'Analyze'
          )}
        </Button>
      </div>
    </form>
  );
};
