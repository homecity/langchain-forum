# RAG-CLAUDE.md

This file provides guidance for AI assistants working with Langchain RAG demo projects.

---

## Behavioral Rules (15 rules)

1. **Self-check first** (MANDATORY - use templates/self-check.md)
2. **USER_APPROVED commits** (NEVER auto-commit without explicit approval)
3. **Protected schemas HALT** (embedding dimensions, vector store - use templates/rag-checklist.md)
4. **LangSmith tracing** (Every RAG query auto-traced for observability)
5. **Framework-agnostic** (Core principles work for Python OR Next.js)
6. **Testing hierarchy** (LangSmith > E2E > Unit - prioritize observability)
7. **Embedding dimensions immutable** (NEVER change without user approval)
8. **Chunking strategy documented** (Document before changes - affects retrieval)
9. **Response efficiency** (20-300 lines, concise and actionable)
10. **No auto-commits** (ALWAYS ask user first)
11. **Type-check before commits** (Pre-commit gate - mypy/TypeScript)
12. **RAG checklist** (5 questions before modifying embeddings/vector store)
13. **Self-learning** (User feedback → skill file updates)
14. **Error recovery** (Graceful degradation, retry logic)
15. **Code quality** (Clean Code, type safety, SOLID principles)

---

## RAG Protection Rules (CRITICAL)

### Protected Elements

**NEVER modify these without user approval + full impact analysis:**

1. **Embedding Dimensions** (1536, 768, 3072, etc.)
   - Why: Changing breaks ALL existing vectors
   - Impact: Requires full re-indexing of knowledge base

2. **Vector Store Schema** (metadata fields, index types)
   - Why: Schema changes affect backward compatibility
   - Impact: May require data migration

3. **Chunking Strategy** (chunk_size, overlap, splitting logic)
   - Why: Changes document boundaries, affects retrieval quality
   - Impact: Requires document re-processing

4. **Distance Metrics** (cosine, euclidean, dot product)
   - Why: Changes ALL similarity scores and ranking
   - Impact: Top-K results completely different

### Pre-Modification Checklist (5 Questions)

**Before modifying ANY RAG component, ask:**

1. **Embedding dimension change?** → 🚫 **HALT** (requires full re-indexing)
2. **Chunking strategy change?** → 🚫 **HALT** (requires document re-processing)
3. **Metadata schema change?** → ⚠️ **CAUTION** (check backward compatibility)
4. **Distance metric change?** → 🚫 **HALT** (affects all rankings)
5. **Purely prompt/LLM config?** → ✅ **PROCEED** (safe experimentation)

**Full checklist:** `templates/rag-checklist.md`

---

## Skills Auto-Load Protocol

Skills auto-load based on task type and keywords:

1. **development-workflow** - ALL code tasks (HIGHEST PRIORITY)
   - Triggers: "개발", "구현", "코드 작성", "API"
   - Provides: MECE 5-phase workflow (Requirements → Design → Implementation → Validation → Deployment)

2. **langsmith-testing** - RAG query tasks
   - Triggers: "테스트", "추적", "trace", "evaluation"
   - Provides: LangSmith trace validation, metrics collection

3. **rag-accuracy** - Evaluation tasks
   - Triggers: "정확도", "평가", "faithfulness", "relevance"
   - Provides: Faithfulness, relevance, answer quality metrics

4. **embedding-strategy** - Chunking/indexing tasks
   - Triggers: "임베딩", "chunking", "indexing", "vector"
   - Provides: Chunking best practices, dimension management

5. **self-learning** - Feedback keywords
   - Triggers: "너무 길어", "중복", "개선", user feedback
   - Provides: Automatic skill file updates based on feedback

**Full list:** `skills/README.md`

---

## Project Overview

**Purpose:** Framework-agnostic RAG demo with Langchain

**Tech Stack (Flexible):**
- **Language:** Python OR Next.js (choose based on preference)
- **Vector DB:** Any (Pinecone, Milvus, Chroma, FAISS)
- **LLM:** Any (Claude, GPT-4, Gemini)
- **Observability:** LangSmith (CRITICAL for RAG)

**Core Philosophy:**
- **Development Excellence:** MECE, TDD, SOLID (inherited from WHRESUME)
- **Testing First:** LangSmith traces before E2E tests
- **Protection:** Vector store schemas treated like database tables
- **Flexibility:** Any vector DB, any LLM, any framework

**Focus Areas:**
1. **Retrieval Quality:** Hybrid search, reranking, MMR
2. **Answer Accuracy:** Faithfulness, relevance, source attribution
3. **Observability:** LangSmith tracing at every step
4. **Development Workflow:** MECE 5-phase, type safety, Clean Code

---

## Quick Reference

### Essential Commands

**Python:**
```bash
pytest tests/                # Unit + E2E tests
python -m mypy .             # Type checking
ruff check .                 # Linting
ruff format .                # Code formatting
```

**Next.js:**
```bash
npm run type-check           # TypeScript check
npx playwright test          # E2E tests
npm run lint                 # ESLint
npm run build                # Production build
```

### Architecture

```
Query → Embedder → Retriever → Reranker → Generator → Answer
         ↓           ↓           ↓           ↓         ↓
         LangSmith traces at each step (CRITICAL)
```

**Pipeline Stages:**
1. **Query Processing:** Embed user query (384-1536 dims)
2. **Retrieval:** Fetch top-K documents (hybrid search)
3. **Reranking:** Cross-encoder scoring (optional)
4. **Context Injection:** Format retrieved docs into prompt
5. **Generation:** LLM produces answer
6. **Validation:** Check faithfulness, relevance

---

## Git Workflow

**Simple commits only** (no branches for local demo):

1. Make changes
2. Run: `npm run type-check` or `pytest` (auto-triggered)
3. Ask user: "커밋할까요? (수정 파일: X개)"
4. If yes: `USER_APPROVED=yes git commit -m "..."`
5. No push needed (local demo)

**Commit Format:**
```
<type>: <description>

Examples:
feat: Add hybrid search retriever
fix: Correct embedding dimension mismatch
docs: Update RAG pipeline architecture
test: Add faithfulness metric tests
```

**Pre-commit Checks (3 layers only):**
1. Type-check (mypy/TypeScript)
2. Linting (ruff/ESLint)
3. Basic tests (unit tests only, not E2E)

---

## Testing Priority

### 1. LangSmith Traces (CRITICAL)
- **Every RAG query** must be traced
- **Metrics:** faithfulness (0-1), relevance (0-1), latency (ms)
- **Tools:** LangSmith API, trace comparison

### 2. E2E Pipeline Tests (HIGH)
- **Full pipeline:** query → retrieval → generation → answer
- **Test types:** Happy path, error handling, edge cases
- **Tools:** pytest (Python), Playwright (Next.js)

### 3. Unit Tests (MEDIUM)
- **Component isolation:** embedder, retriever, reranker
- **Mocking:** Mock LangSmith for speed
- **Coverage:** 80%+ for core logic

---

## Framework Guides

**Choose your framework:**
- **Python:** See `docs/framework-guides/python-setup.md`
- **Next.js:** See `docs/framework-guides/nextjs-setup.md`

**Core principles remain the same:**
- MECE development workflow (5 phases)
- Type safety (mypy or TypeScript)
- Testing hierarchy (LangSmith > E2E > Unit)
- Protected schemas (embedding dimensions, vector store)

---

## Common RAG Patterns

### 1. Hybrid Search (BM25 + Semantic)
```python
# Combine sparse (BM25) and dense (embedding) retrieval
from langchain.retrievers import EnsembleRetriever

bm25_retriever = BM25Retriever.from_documents(documents)
semantic_retriever = VectorStoreRetriever(vector_store)

ensemble = EnsembleRetriever(
    retrievers=[bm25_retriever, semantic_retriever],
    weights=[0.5, 0.5]
)
```

### 2. Reranking with Cross-Encoder
```python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CrossEncoderReranker

compressor = CrossEncoderReranker(model_name="cross-encoder/ms-marco-MiniLM-L-6-v2")
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=ensemble
)
```

### 3. MMR (Maximal Marginal Relevance)
```python
# Diversify results to reduce redundancy
retriever = vector_store.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 5, "lambda_mult": 0.5}
)
```

---

## Troubleshooting

### Issue: Poor retrieval quality
**Check:**
1. Chunking strategy (chunk_size, overlap)
2. Embedding model quality
3. Retrieval method (semantic only vs hybrid)

**Solution:** See `skills/rag-specific/embedding-strategy-SKILL.md`

### Issue: Hallucinations in answers
**Check:**
1. Prompt engineering (context injection)
2. Faithfulness metric (< 0.7 is bad)
3. LLM temperature (too high = creative)

**Solution:** See `skills/rag-specific/prompt-engineering-SKILL.md`

### Issue: Slow query latency
**Check:**
1. Vector store index type
2. Reranking overhead
3. LLM streaming enabled?

**Solution:** See `skills/rag-specific/llm-integration-SKILL.md`

---

## Key Files

| File | Purpose |
|------|---------|
| `skills/core/development-workflow-SKILL.md` | MECE 5-phase development |
| `skills/testing/langsmith-testing-SKILL.md` | LangSmith trace validation |
| `skills/rag-specific/embedding-strategy-SKILL.md` | Chunking, dimensions |
| `templates/rag-checklist.md` | Pre-modification checklist |
| `docs/protected-schemas.md` | Vector store protection rules |

**Full index:** `README.md`

---

**Last Updated:** 2025-12-04
**Version:** 1.0 (Initial RAG adaptation from WHRESUME)
**License:** MIT
