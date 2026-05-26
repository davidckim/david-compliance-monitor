import { AnalysisRecord, resultStyles } from '@/types/analysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AnalysisResultCard = ({
  analysis,
}: {
  analysis: AnalysisRecord;
}) => {
  return (
    <Card aria-label="Analysis result" role="region">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span>Result</span>
          <span
            aria-label={`Result: ${analysis.result}`}
            className={resultStyles[analysis.result]}
          >
            {analysis.result}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Confidence</p>
          <p>{(analysis.confidence * 100).toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Action</p>
          <p>{analysis.action}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Guideline</p>
          <p>{analysis.guideline}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Timestamp</p>
          <p>{new Date(analysis.timestamp).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};
