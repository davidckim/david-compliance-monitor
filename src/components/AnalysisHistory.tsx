'use client';

import { AnalysisRecord } from '@/types/analysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { resultStyles } from '@/components/AnalysisResultCard';

type AnalysisHistoryProps = {
  history: AnalysisRecord[];
  onClear: () => void;
  onSelect: (record: AnalysisRecord) => void;
};

export const AnalysisHistory = ({
  history,
  onClear,
  onSelect,
}: AnalysisHistoryProps) => {
  if (history.length === 0) {
    return <p className="text-sm text-muted-foreground">No history</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">History</h2>
        <Button
          aria-label="Clear analysis history"
          onClick={onClear}
          size="sm"
          variant="ghost"
        >
          Clear
        </Button>
      </div>

      <ul aria-label="Analysis history" className="flex flex-col gap-2">
        {history.map((record) => (
          <li key={record.id}>
            <Card
              className="cursor-pointer transition-colors hover:bg-accent"
              onClick={() => onSelect(record)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(record);
              }}
            >
              <CardContent className="flex flex-col gap-1 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-medium ${resultStyles[record.result]}`}
                  >
                    {record.result}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(record.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="truncate text-muted-foreground">
                  {record.action}
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};
