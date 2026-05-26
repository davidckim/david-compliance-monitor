import { NextResponse } from 'next/server';

const CANDIDATE_LABELS = ['complies', 'deviates', 'unclear'];

type HuggingFaceResult = {
  label: string;
  score: number;
};

export async function POST(request: Request) {
  if (!process.env.HUGGING_FACE_API_URL || !process.env.HUGGING_FACE_API_TOKEN) {
    return NextResponse.json(
      { error: 'Missing Hugging Face API configuration' },
      { status: 500 }
    );
  }

  const { action, guideline } = await request.json();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}`,
  };

  if (!action || !guideline) {
    return NextResponse.json(
      { error: 'Missing action or guideline' },
      { status: 400 }
    );
  }

  const response = await fetch(process.env.HUGGING_FACE_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      inputs: `Action: ${action}. Guideline: ${guideline}.`,
      parameters: { candidate_labels: CANDIDATE_LABELS },
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Hugging Face API error' },
      { status: 502 }
    );
  }

  const [topResult] = (await response.json()) as HuggingFaceResult[];

  return NextResponse.json({
    id: crypto.randomUUID(),
    action,
    guideline,
    result: topResult.label.toUpperCase(),
    confidence: topResult.score,
    timestamp: new Date().toISOString(),
  });
}
