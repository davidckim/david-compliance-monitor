import { AnalysisContainer } from '@/components/AnalysisContainer';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, #7c3aed, transparent)',
        }}
      />
      <div className="relative mx-auto max-w-2xl px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Compliance Monitor
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Evaluate whether an action complies with a guideline powered by
            Hugging Face.
          </p>
        </div>
        <AnalysisContainer />
      </div>
    </main>
  );
}
