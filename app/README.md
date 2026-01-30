# LangChain Forum RAG Dashboard — Frontend

> See [root README](../README.md) for full project documentation.

Next.js 15 frontend application for the LangChain Forum RAG system.

## Tech Stack

- **Framework**: Next.js 15 + App Router
- **UI**: shadcn UI + Tailwind CSS
- **Charts**: Recharts
- **AI**: Gemini 3.0 Flash + Gemini Embedding (768-dim)
- **RAG**: Hybrid Retrieval (BM25 + Semantic)
- **Testing**: Vitest (UI) + Jest (RAG) + Playwright (E2E)

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript type check
npm run test:ui      # UI unit tests (Vitest)
npm run test:rag     # RAG unit tests (Jest)
npm run test:e2e     # E2E tests (Playwright)
```

## Project Structure

```
app/
├── app/              # Next.js App Router pages & API routes
├── components/       # UI components (shadcn, chat, analytics, forum)
├── lib/              # RAG pipeline & utilities
├── tests/            # Unit & E2E tests
└── public/           # Static assets
```
