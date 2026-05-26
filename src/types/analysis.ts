export type ComplianceResult = 'COMPLIES' | 'DEVIATES' | 'UNCLEAR';

export type AnalysisRecord = {
  id: string;
  action: string;
  guideline: string;
  result: ComplianceResult;
  confidence: number;
  timestamp: string;
};

export const resultStyles: Record<ComplianceResult, string> = {
  COMPLIES: 'text-green-400',
  DEVIATES: 'text-red-400',
  UNCLEAR: 'text-yellow-400',
};
