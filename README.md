# LangChain RAG Development System

Framework-agnostic RAG (Retrieval-Augmented Generation) system with LangSmith observability.

## Overview

- **Language**: Python (LangServe backend) + Next.js (Frontend)
- **Vector Store**: FAISS (2,493 pre-embedded documents)
- **LLM**: OpenAI GPT-4 with cross-encoder reranking
- **Observability**: LangSmith tracing on all RAG queries

## Quick Start

### 1. Backend Setup (Python)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -e .

# Environment variables
cp .env.example .env
# Edit .env with your API keys:
# OPENAI_API_KEY=sk-...
# LANGSMITH_API_KEY=lsv2_...

# Start server
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Setup (Next.js)

```bash
cd app
npm install
npm run dev  # http://localhost:3000
```

### 3. Verify Installation

- Backend health: http://localhost:8000/docs
- LangServe playground: http://localhost:8000/langserve/chat/playground
- Frontend: http://localhost:3000

## Architecture

```
Next.js Frontend (port 3000)
        |
        v HTTP/SSE
Python LangServe Backend (port 8000)
        |
        v
    LCEL RAG Chain
    - Query embedding (OpenAI)
    - FAISS retrieval (top-10)
    - Cross-encoder reranking (top-5)
    - Answer generation (GPT-4)
        |
        v
  LangSmith Tracing (automatic)
```

## Project Structure

```
langchain/
├── app/                    # Next.js frontend
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   └── lib/               # API client, utilities
│
├── backend/               # Python LangServe backend
│   ├── app/
│   │   ├── chains/        # LCEL RAG chain
│   │   ├── components/    # Reranker, evaluator
│   │   ├── loaders/       # Embedding loader
│   │   ├── models/        # Pydantic schemas
│   │   └── routes/        # API endpoints
│   └── data/              # Embeddings (symlink)
│
├── skills/                # AI assistant skills
├── templates/             # Checklists, templates
└── docs/                  # Documentation
```

## API Endpoints

### Chat API

```bash
# POST /api/chat - RAG query
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "What is LangSmith?"}'

# Response
{
  "answer": "LangSmith is a platform for...",
  "sources": [...],
  "trace": {
    "embeddingDuration": 0.5,
    "retrievalDuration": 0.6,
    "rerankingDuration": 0.1,
    "generationDuration": 4.5,
    "totalDuration": 5.7
  }
}
```

### Evaluation API

```bash
# GET /api/evaluation - LangSmith metrics
curl "http://localhost:8000/api/evaluation?type=all&limit=20"

# Response includes:
# - summary: avgFaithfulness, avgRelevance, avgLatency
# - runs: Recent RAG query runs with metrics
# - traces: Individual query traces with scores
```

## Key Features

### 1. LCEL RAG Chain

```python
# backend/app/chains/rag_chain.py
chain = (
    RunnablePassthrough.assign(documents=retrieve)
    | RunnablePassthrough.assign(reranked_docs=rerank)
    | RunnablePassthrough.assign(
        context=format_context,
        sources=format_sources,
    )
    | RunnablePassthrough.assign(answer=prompt | llm | parser)
    | RunnableParallel(answer=..., sources=..., trace=...)
)
```

### 2. Cross-Encoder Reranking

- Model: `cross-encoder/ms-marco-MiniLM-L-6-v2`
- Retrieves top-10, reranks to top-5
- Significantly improves answer relevance

### 3. LangSmith Integration

- All RAG queries auto-traced as "RAG Query"
- Evaluation metrics: Faithfulness, Relevance, Coherence
- Feedback submitted asynchronously

### 4. Auto-Evaluation

```python
# Computed after each query
scores = {
    "faithfulness": 0.95,  # Is answer grounded in sources?
    "relevance": 0.92,     # Is context relevant to query?
    "coherence": 0.88,     # Is answer well-structured?
    "overall": 0.92
}
```

## Protected Schemas

**Never modify without approval + impact analysis:**

| Element | Impact | Recovery Time |
|---------|--------|---------------|
| Embedding Dimensions | All vectors invalid | Hours (re-index) |
| Chunking Strategy | Documents need reprocessing | Hours |
| Distance Metric | All rankings change | N/A (A/B test) |
| Metadata Schema | Query filters may fail | Minutes |

### Pre-Modification Checklist

1. **Embedding dimension change?** - HALT (requires full re-indexing)
2. **Chunking strategy change?** - HALT (requires document reprocessing)
3. **Metadata schema change?** - CAUTION (check backward compatibility)
4. **Distance metric change?** - HALT (affects all rankings)
5. **Prompt/LLM config only?** - PROCEED (safe experimentation)

## Testing

### Backend Tests

```bash
cd backend
pytest tests/                    # All tests
pytest tests/test_chain.py       # Chain tests
pytest --cov=app                 # Coverage report
```

### Frontend Tests

```bash
cd app
npm run type-check               # TypeScript check
npm run lint                     # ESLint
npm run build                    # Production build
```

### LangSmith Verification

1. Open https://smith.langchain.com
2. Navigate to project: `langchain-forum-rag`
3. Verify "RAG Query" traces appear
4. Check feedback scores for each run

## Environment Variables

### Backend (.env)

```bash
# Required
OPENAI_API_KEY=sk-...

# LangSmith (automatic tracing)
LANGSMITH_API_KEY=lsv2_...
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=langchain-forum-rag

# Optional
USE_MOCK_CHAT=false
RETRIEVAL_TOP_K=10
RERANK_TOP_K=5
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development Commands

### Backend

```bash
# Start development server
uvicorn app.main:app --reload --port 8000

# Type checking
python -m mypy app/

# Linting
ruff check app/
ruff format app/
```

### Frontend

```bash
# Development
npm run dev

# Type check
npm run type-check

# Build
npm run build
```

## Troubleshooting

### Poor Retrieval Quality

1. Check chunk strategy in `embedding_loader.py`
2. Verify embedding dimensions (should be 1536)
3. Try adjusting `RETRIEVAL_TOP_K` and `RERANK_TOP_K`

### Hallucinations in Answers

1. Check Faithfulness score in LangSmith
2. Review system prompt in `rag_chain.py`
3. Lower LLM temperature if needed

### Slow Query Latency

1. Check trace breakdown (embedding, retrieval, generation)
2. Consider async operations
3. Verify FAISS index is loaded (check startup logs)

### Evaluation Shows 0%

1. Verify RAG chain has `@traceable(name="RAG Query")` decorator
2. Check `evaluation.py` filters for "RAG Query" runs
3. Ensure LangSmith API key is valid

## Contributing

1. Read `CLAUDE.md` for AI assistant rules
2. Check `templates/rag-checklist.md` before schema changes
3. Run type-check and tests before commits
4. Use conventional commit format: `feat:`, `fix:`, `docs:`

## License

MIT License

---

**Version**: 2.0 (Python LangServe Backend)
**Last Updated**: 2025-01-15
**Status**: Production Ready
