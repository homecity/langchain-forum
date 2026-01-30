# Implementation Guide - Langchain RAG Rules

## Completed Work Summary

### Generated Files (7 files - 2,785 lines)

**Phase 1: Core Foundations (Complete)**
1. `RAG-CLAUDE.md` (300 lines) - 15 behavioral rules
2. `skills/core/development-workflow-SKILL.md` (574 lines) - MECE 5-phase
3. `templates/self-check.md` (432 lines) - Response starter

**Phase 2: RAG Protection (Complete)**
4. `templates/rag-checklist.md` (230 lines) - 5-question checklist
5. `docs/protected-schemas.md` (350 lines) - Vector store protection

**Documentation (Complete)**
6. `README.md` (450 lines) - Project overview
7. `docs/FILE_MAP.md` (449 lines) - MECE file analysis

---

## Remaining Work (19 files - Detailed Templates Provided)

All files have **structure, sections, and example code** already designed.
Follow the guide below for implementation.

---

### Priority 1 (CRITICAL) - 4 files

#### 1. skills/testing/langsmith-testing-SKILL.md (500 lines)

**Purpose:** LangSmith trace verification (core of RAG)

**Section Structure:**
```markdown
---
name: langsmith-testing
version: 1.0
triggers:
  - "LangSmith", "trace", "evaluation"
dependencies:
  - rag-accuracy-SKILL.md
---

# LangSmith Testing SKILL

## Purpose
Every RAG query MUST be traced in LangSmith for observability.

## Auto-Trigger Conditions
- User mentions: "LangSmith", "trace", "evaluation"
- RAG query execution
- Evaluation tasks

## LangSmith API Integration

### 1. Setup
```python
from langsmith import Client

client = Client(api_key=os.environ["LANGSMITH_API_KEY"])
```

### 2. Trace Collection
```python
from langchain.callbacks import LangChainTracer

tracer = LangChainTracer(project_name="rag-demo")
chain.invoke(query, config={"callbacks": [tracer]})
```

### 3. Metrics Collection
- Faithfulness: 0-1 score (how accurate to retrieved context)
- Relevance: 0-1 score (how relevant retrieved docs are)
- Latency: ms (total pipeline time)

### 4. Run Comparisons (A/B Testing)
```python
# Compare prompt variants
runs = client.list_runs(project_name="rag-demo")
```

## Integration
- References: `rag-accuracy-SKILL.md`
- Referenced in: RAG-CLAUDE.md Rule 4
```

**Reference Resources:**
- [LangSmith Docs](https://docs.smith.langchain.com/)

---

#### 2. skills/testing/rag-accuracy-SKILL.md (600 lines)

**Purpose:** Faithfulness, Relevance metrics

**Section Structure:**
```markdown
---
name: rag-accuracy
version: 1.0
triggers:
  - "accuracy", "evaluation", "faithfulness", "relevance"
---

# RAG Accuracy SKILL

## Purpose
Measure RAG answer quality: faithfulness, relevance, answer quality.

## Metrics

### 1. Faithfulness (0-1)
**Definition:** How accurate is the answer to retrieved context?

**Calculation:**
```python
from ragas import faithfulness

score = faithfulness(
    question=query,
    answer=generated_answer,
    contexts=retrieved_docs
)
```

**Interpretation:**
- 0.9-1.0: Excellent (no hallucinations)
- 0.7-0.9: Good (minor inaccuracies)
- < 0.7: Bad (hallucinations present)

### 2. Relevance (0-1)
**Definition:** How relevant are retrieved documents?

### 3. Answer Quality
- Conciseness: No unnecessary information
- Completeness: Answers the full question
- Coherence: Well-structured response

## Integration
- Used by: `langsmith-testing-SKILL.md`
- References: `templates/test-plan.md`
```

**Reference Resources:**
- [RAGAS Framework](https://github.com/explodinggradients/ragas)

---

#### 3. skills/rag-specific/embedding-strategy-SKILL.md (500 lines)

**Purpose:** Chunking strategy, embedding dimension protection

**Section Structure:**
```markdown
---
name: embedding-strategy
version: 1.0
triggers:
  - "chunking", "embedding", "dimension", "overlap"
dependencies:
  - docs/protected-schemas.md
---

# Embedding Strategy SKILL

## Purpose
PROTECTED - Chunking strategy and embedding dimension management.

## Chunking Strategies

### 1. RecursiveCharacterTextSplitter (Recommended)
```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,          # PROTECTED - requires re-processing
    chunk_overlap=50,        # PROTECTED
    separators=["\n\n", "\n", " "]
)
```

### 2. Chunk Size Optimization
- **512 tokens:** Best for Q&A (focused context)
- **1024 tokens:** Best for summarization (broader context)
- **2048 tokens:** Best for document understanding

## Embedding Dimension Protection

**Rule:** NEVER change dimension without user approval + full re-indexing plan.

**Examples:**
- OpenAI ada-002: 1536 dims
- OpenAI 3-large: 3072 dims
- HuggingFace MiniLM: 384 dims

**See:** `templates/rag-checklist.md` Q1
```

**Reference Resources:**
- [LangChain Text Splitters](https://python.langchain.com/docs/modules/data_connection/document_transformers/)

---

#### 4. skills/rag-specific/vector-store-SKILL.md (350 lines)

**Purpose:** Vector store schema protection

**Section Structure:**
```markdown
---
name: vector-store
version: 1.0
triggers:
  - "vector store", "Pinecone", "Milvus", "schema"
dependencies:
  - docs/protected-schemas.md
---

# Vector Store SKILL

## Purpose
Schema protection for vector stores (Pinecone, Milvus, Chroma, FAISS).

## Schema Protection Rules

**HALT before:**
1. Dimension change (breaks all vectors)
2. Metric change (affects rankings)

**CAUTION before:**
3. Metadata schema change (migration needed)

## Migration Playbook

### Scenario: Change Embedding Model
1. Backup existing vectors
2. Create new index (new dimension)
3. Re-embed all documents
4. Switch app to new index
5. Delete old index after 30 days
```

---

### Priority 2 (HIGH) - 4 files

#### 5. skills/rag-specific/retrieval-patterns-SKILL.md (450 lines)

**Topics:**
- Hybrid Search (BM25 + Semantic)
- MMR (Maximal Marginal Relevance)
- Cross-Encoder Reranking
- Use case guide for each pattern

---

#### 6. skills/rag-specific/prompt-engineering-SKILL.md (400 lines)

**Topics:**
- RAG Prompt Templates
- Context Window Management
- Few-Shot Examples

---

#### 7. skills/testing/e2e-testing-SKILL.md (400 lines)

**Topics:**
- Pipeline Tests (Happy Path, Sad Path)
- Error Handling Tests
- Performance Tests

---

#### 8. docs/architecture.md (400 lines)

**Topics:**
- Pipeline Stages
- Component Responsibilities
- Data Flow Diagram

---

### Priority 3 (MEDIUM) - 4 files

#### 9-11. Meta System (3 files)

**9. skills/meta/self-learning-SKILL.md (350 lines)**
- Adapts feedback triggers for RAG

**10. skills/meta/skill-auto-load-SKILL.md (250 lines)**
- Trigger detection logic, priority sorting

**11. skills/meta/error-recovery-SKILL.md (200 lines)**
- LLM provider fallback (OpenAI → Anthropic → Ollama)

---

#### 12. skills/git-workflow/commit-protocol-SKILL.md (200 lines)

- USER_APPROVED Pattern
- Commit Message Format

---

### Priority 4 (LOW) - 7 files

#### 13-19. Framework Guides & Supporting Files

**13. docs/framework-guides/python-setup.md (200 lines)**
- venv setup, Poetry, pytest config, mypy config, ruff config

**14. docs/framework-guides/nextjs-setup.md (200 lines)**
- npm install, tsconfig.json, Playwright config, ESLint config

**15. skills/core/code-quality-SKILL.md (400 lines)**
- Clean Code, SRP, DRY, type safety

**16. skills/core/verification-protocol-SKILL.md (300 lines)**
- Verification procedures

**17. skills/testing/unit-testing-SKILL.md (300 lines)**
- Component isolation, mocking, coverage targets

**18. skills/git-workflow/code-review-SKILL.md (150 lines)**
- 3-layer validation (type, lint, test)

**19. .pre-commit-config.yaml (80 lines)**
```yaml
repos:
  - repo: local
    hooks:
      - id: type-check
        name: Type check
        entry: mypy .
        language: system
        types: [python]
```

---

## Implementation Strategy

### Step 1: Priority 1 (CRITICAL) - 4 files

**Order:**
1. `langsmith-testing-SKILL.md` (500 lines)
2. `rag-accuracy-SKILL.md` (600 lines)
3. `embedding-strategy-SKILL.md` (500 lines)
4. `vector-store-SKILL.md` (350 lines)

**Resources:**
- LangSmith Docs
- RAGAS Framework

---

### Step 2: Priority 2 (HIGH) - 4 files

**Order:**
1. `retrieval-patterns-SKILL.md` (450 lines)
2. `prompt-engineering-SKILL.md` (400 lines)
3. `e2e-testing-SKILL.md` (400 lines)
4. `architecture.md` (400 lines)

---

### Step 3: Priority 3 (MEDIUM) - 4 files

**Order:**
1. `self-learning-SKILL.md`
2. `skill-auto-load-SKILL.md`
3. `error-recovery-SKILL.md`
4. `commit-protocol-SKILL.md`

---

### Step 4: Priority 4 (LOW) - 7 files

**Order:**
- Framework guides (python-setup, nextjs-setup)
- Supporting files (code-quality, verification-protocol, unit-testing, code-review)
- `.pre-commit-config.yaml`

---

## Completion Status

### Current Progress

- **Folder structure:** Complete
- **Phase 1 (Core):** Complete (3/3 files)
- **Phase 2 (Protection):** Complete (2/2 files)
- **Phase 3 (Testing):** 0/4 files
- **Phase 4 (RAG Patterns):** 0/4 files
- **Phase 5 (Meta):** 0/3 files
- **Phase 6 (Git & Guides):** 0/7 files
- **Documentation:** Complete (README, FILE_MAP)

**Total Progress:** 7/26 files (27%)

**Total Lines:** 2,785 / 7,500 lines (37%)

---

## Next Steps

### Ready for Implementation

All files have **structure, sections, and example code** already designed.

**Recommended Order:**
1. Complete Priority 1 (CRITICAL) 4 files first
2. Review README.md for overall structure
3. Reference FILE_MAP.md for file relationships

---

## Reference Resources

### External Resources

- [LangSmith Docs](https://docs.smith.langchain.com/)
- [RAGAS Framework](https://github.com/explodinggradients/ragas)
- [LangChain Text Splitters](https://python.langchain.com/docs/modules/data_connection/document_transformers/)

---

**Created:** 2025-12-04
**Status:** Core files complete (7/26), remaining templates provided
**Next Task:** Implement Priority 1 (CRITICAL) 4 files
