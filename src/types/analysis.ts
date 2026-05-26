export type ComplianceResult = 'COMPLIES' | 'DEVIATES' | 'UNCLEAR';

export type AnalysisRecord = {
  id: string;
  action: string;
  guideline: string;
  result: ComplianceResult;
  confidence: number;
  timestamp: string;
};
