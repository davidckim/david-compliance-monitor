# Compliance Monitor

A small Next.js app that uses AI to evaluate whether a reported action complies with a given guideline. Built as a take-home exercise for Ease.io.

## How it works

You enter an action (what someone did) and a guideline (the rule they were supposed to follow). The app sends both to a `/api/analyze` endpoint, which calls the Hugging Face `facebook/bart-large-mnli` zero-shot classification model with three candidate labels: `complies`, `deviates`, and `unclear`. The top result is returned along with a confidence score.

Past analyses are saved to `localStorage` so your history persists across page refreshes. You can click any history item to re-fill the form and resubmit.

## Setup

**Prerequisites**

- Node.js 18+
- A free [Hugging Face](https://huggingface.co) account with a Read token

**Steps**

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```
HUGGING_FACE_API_TOKEN=your_token_here
HUGGING_FACE_API_URL=https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli
```

3. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Running tests

The E2E tests use Playwright and call the live Hugging Face API, so make sure your dev server is running and your `.env.local` is set up before running them.

```bash
npm test
```

The test suite covers the main compliance outcomes (COMPLIES, DEVIATES, UNCLEAR) and verifies that results are saved to history.

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (Base Nova)
- Hugging Face Inference API
- Playwright (E2E tests)
