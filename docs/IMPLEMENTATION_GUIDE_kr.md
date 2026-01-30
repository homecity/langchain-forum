# Implementation Guide - Langchain RAG Rules

## ✅ 완료된 작업 요약

### 생성된 파일 (7개 - 2,785 lines)

**Phase 1: Core Foundations (완료)**
1. ✅ `RAG-CLAUDE.md` (300 lines) - 15 behavioral rules
2. ✅ `skills/core/development-workflow-SKILL.md` (574 lines) - MECE 5-phase
3. ✅ `templates/self-check.md` (432 lines) - Response starter

**Phase 2: RAG Protection (완료)**
4. ✅ `templates/rag-checklist.md` (230 lines) - 5-question checklist
5. ✅ `docs/protected-schemas.md` (350 lines) - Vector store protection

**Documentation (완료)**
6. ✅ `README.md` (450 lines) - Project overview
7. ✅ `docs/FILE_MAP.md` (449 lines) - MECE file analysis

---

## 📋 남은 작업 (19개 파일 - 상세 템플릿 제공)

모든 파일의 **구조, 섹션, 예시 코드**는 이미 설계되어 있습니다.
아래 가이드를 참고하여 생성하시면 됩니다.

---

### Priority 1 (CRITICAL) - 4 files

#### 1. skills/testing/langsmith-testing-SKILL.md (500 lines)

**목적:** LangSmith 추적 검증 (RAG의 핵심)

**섹션 구조:**
```markdown
---
name: langsmith-testing
version: 1.0
triggers:
  - "LangSmith", "trace", "evaluation", "추적"
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

**참고 리소스:**
- [LangSmith Docs](https://docs.smith.langchain.com/)
- WHRESUME `.skills/testing-checklist-SKILL.md` (테스트 구조 참고)

---

#### 2. skills/testing/rag-accuracy-SKILL.md (600 lines)

**목적:** Faithfulness, Relevance 메트릭

**섹션 구조:**
```markdown
---
name: rag-accuracy
version: 1.0
triggers:
  - "정확도", "평가", "faithfulness", "relevance"
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

**Calculation:**
```python
from ragas import context_relevance

score = context_relevance(
    question=query,
    contexts=retrieved_docs
)
```

### 3. Answer Quality
- Conciseness: No unnecessary information
- Completeness: Answers the full question
- Coherence: Well-structured response

## Integration
- Used by: `langsmith-testing-SKILL.md`
- References: `templates/test-plan.md`
```

**참고 리소스:**
- [RAGAS Framework](https://github.com/explodinggradients/ragas)

---

#### 3. skills/rag-specific/embedding-strategy-SKILL.md (500 lines)

**목적:** Chunking 전략, embedding dimension 보호

**섹션 구조:**
```markdown
---
name: embedding-strategy
version: 1.0
triggers:
  - "chunking", "임베딩", "dimension", "overlap"
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

**When to use:** General purpose (paragraphs, sentences)

### 2. TokenTextSplitter
```python
from langchain.text_splitter import TokenTextSplitter

splitter = TokenTextSplitter(chunk_size=512, chunk_overlap=50)
```

**When to use:** LLM context window management

### 3. Chunk Size Optimization
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

## Integration
- Referenced in: `templates/rag-checklist.md`, `RAG-CLAUDE.md` Rule 7
```

**참고 리소스:**
- [LangChain Text Splitters](https://python.langchain.com/docs/modules/data_connection/document_transformers/)

---

#### 4. skills/rag-specific/vector-store-SKILL.md (350 lines)

**목적:** Vector store 스키마 보호

**섹션 구조:**
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

## Vector Store Schemas

### Pinecone
```python
import pinecone

index = pinecone.Index("rag-demo")
# Schema: {dimension: 1536, metric: "cosine"}
```

### Milvus
```python
from pymilvus import Collection

collection = Collection("rag-demo")
# Schema: {dimension: 1536, metric_type: "IP"}
```

## Schema Protection Rules

**HALT before:**
1. Dimension change (breaks all vectors)
2. Metric change (affects rankings)

**CAUTION before:**
3. Metadata schema change (migration needed)

**See:** `templates/rag-checklist.md`

## Migration Playbook

### Scenario: Change Embedding Model
1. Backup existing vectors
2. Create new index (new dimension)
3. Re-embed all documents
4. Switch app to new index
5. Delete old index after 30 days

**See:** `docs/protected-schemas.md` Migration Playbook

## Integration
- Adapted from: WHRESUME `.skills/blog-protection-SKILL.md`
- Referenced in: `templates/rag-checklist.md` Q3
```

**참고 리소스:**
- WHRESUME `.skills/blog-protection-SKILL.md` (보호 패턴 참고)

---

### Priority 2 (HIGH) - 4 files

#### 5. skills/rag-specific/retrieval-patterns-SKILL.md (450 lines)

**섹션 구조:**
```markdown
# Retrieval Patterns SKILL

## 1. Hybrid Search (BM25 + Semantic)
```python
from langchain.retrievers import EnsembleRetriever

ensemble = EnsembleRetriever(
    retrievers=[bm25_retriever, semantic_retriever],
    weights=[0.5, 0.5]
)
```

## 2. MMR (Maximal Marginal Relevance)
```python
retriever = vector_store.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 5, "lambda_mult": 0.5}
)
```

## 3. Cross-Encoder Reranking
```python
from langchain.retrievers.document_compressors import CrossEncoderReranker

compressor = CrossEncoderReranker(model_name="cross-encoder/ms-marco-MiniLM-L-6-v2")
```

**When to use each pattern:** (유스케이스별 가이드)
```

---

#### 6. skills/rag-specific/prompt-engineering-SKILL.md (400 lines)

**섹션 구조:**
```markdown
# Prompt Engineering SKILL

## RAG Prompt Templates

### Template 1: With Context
```python
template = """
Use the following context to answer the question.
If you don't know, say "I don't know based on the provided context."

Context:
{context}

Question: {question}

Answer:
"""
```

### Template 2: Few-Shot
```python
template = """
Context: {context}

Examples:
Q: {example_q1}
A: {example_a1}

Q: {question}
A:
"""
```

## Context Window Management
- Max tokens: 4096 (Claude), 8192 (GPT-4)
- Context truncation strategies
```

---

#### 7. skills/testing/e2e-testing-SKILL.md (400 lines)

**섹션 구조:**
```markdown
# E2E Testing SKILL

## Pipeline Tests

### Happy Path
```python
def test_rag_pipeline():
    query = "What is retrieval augmented generation?"
    result = rag_chain.invoke(query)

    assert len(result["source_documents"]) > 0
    assert result["answer"] != ""
    assert faithfulness_score(result) > 0.7
```

### Sad Path (Error Handling)
```python
def test_empty_query():
    result = rag_chain.invoke("")
    assert "error" in result
```

**Adapted from:** WHRESUME `.skills/testing-checklist-SKILL.md`
```

---

#### 8. docs/architecture.md (400 lines)

**섹션 구조:**
```markdown
# RAG Architecture

## Pipeline Stages

```
Query → Embedder → Retriever → Reranker → Generator → Answer
         ↓           ↓           ↓           ↓         ↓
         LangSmith traces at each step
```

## Component Responsibilities

### 1. Embedder
- Input: User query (string)
- Output: Query vector (1536 dims)
- Model: OpenAI text-embedding-ada-002

### 2. Retriever
- Input: Query vector
- Output: Top-K documents
- Strategy: Hybrid (BM25 + Semantic)

(각 컴포넌트 상세 설명)
```

---

### Priority 3 (MEDIUM) - 4 files

#### 9-11. Meta System (3 files)

**9. skills/meta/self-learning-SKILL.md (350 lines)**
- **Source:** WHRESUME `.skills/self-learning-SKILL.md` (90% 복사)
- **Adapt:** RAG 피드백 트리거 추가
  - "Retrieval is bad" → `embedding-strategy-SKILL.md` 업데이트
  - "Answer hallucinates" → `prompt-engineering-SKILL.md` 업데이트

**10. skills/meta/skill-auto-load-SKILL.md (250 lines)**
- **Source:** WHRESUME (Multi-AI orchestration 부분 제거)
- **Keep:** 트리거 감지 로직, 우선순위 정렬

**11. skills/meta/error-recovery-SKILL.md (200 lines)**
- **Source:** WHRESUME `.skills/gemini-error-recovery-SKILL.md` 참고
- **Adapt:** LLM provider fallback (OpenAI → Anthropic → Ollama)

---

#### 12. skills/git-workflow/commit-protocol-SKILL.md (200 lines)

**섹션 구조:**
```markdown
# Commit Protocol SKILL

## USER_APPROVED Pattern

```bash
# CORRECT
USER_APPROVED=yes git commit -m "feat: Add hybrid search"

# WRONG (will fail pre-commit hook)
git commit -m "feat: Add hybrid search"
```

## Commit Message Format
```
<type>: <description>

Types: feat, fix, docs, test, refactor
```

**Simplified from:** WHRESUME (feature branch, PR 제거)
```

---

### Priority 4 (LOW) - 7 files

#### 13-19. Framework Guides & Supporting Files

**13. docs/framework-guides/python-setup.md (200 lines)**
- venv setup, Poetry, pytest config, mypy config, ruff config

**14. docs/framework-guides/nextjs-setup.md (200 lines)**
- npm install, tsconfig.json, Playwright config, ESLint config

**15. skills/core/code-quality-SKILL.md (400 lines)**
- **Source:** WHRESUME (Next.js 예시 제거)
- Clean Code, SRP, DRY, type safety

**16. skills/core/verification-protocol-SKILL.md (300 lines)**
- **Source:** WHRESUME 100% 복사

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

## 🎯 구현 전략

### 1단계: Priority 1 (CRITICAL) 완성 (4 files)

**예상 시간:** 4-6시간

**순서:**
1. `langsmith-testing-SKILL.md` (500 lines)
2. `rag-accuracy-SKILL.md` (600 lines)
3. `embedding-strategy-SKILL.md` (500 lines)
4. `vector-store-SKILL.md` (350 lines)

**리소스:**
- LangSmith Docs
- RAGAS Framework
- WHRESUME `.skills/blog-protection-SKILL.md` (vector-store 참고)

---

### 2단계: Priority 2 (HIGH) 완성 (4 files)

**예상 시간:** 3-4시간

**순서:**
1. `retrieval-patterns-SKILL.md` (450 lines)
2. `prompt-engineering-SKILL.md` (400 lines)
3. `e2e-testing-SKILL.md` (400 lines)
4. `architecture.md` (400 lines)

---

### 3단계: Priority 3 (MEDIUM) 완성 (4 files)

**예상 시간:** 2-3시간

**순서:**
1. `self-learning-SKILL.md` (90% 복사 from WHRESUME)
2. `skill-auto-load-SKILL.md` (adapt)
3. `error-recovery-SKILL.md` (adapt)
4. `commit-protocol-SKILL.md` (simplify)

---

### 4단계: Priority 4 (LOW) 완성 (7 files)

**예상 시간:** 2-3시간

**순서:**
- Framework guides (python-setup, nextjs-setup)
- Supporting files (code-quality, verification-protocol, unit-testing, code-review)
- `.pre-commit-config.yaml`

---

## 📊 완료 상태

### 현재 진행률

- ✅ **폴더 구조:** 완료
- ✅ **Phase 1 (Core):** 완료 (3/3 files)
- ✅ **Phase 2 (Protection):** 완료 (2/2 files)
- ⬜ **Phase 3 (Testing):** 0/4 files
- ⬜ **Phase 4 (RAG Patterns):** 0/4 files
- ⬜ **Phase 5 (Meta):** 0/3 files
- ⬜ **Phase 6 (Git & Guides):** 0/7 files
- ✅ **Documentation:** 완료 (README, FILE_MAP)

**총 진행률:** 7/26 files (27%)

**총 라인 수:** 2,785 / 7,500 lines (37%)

---

## ✅ 다음 단계

### 즉시 구현 가능

모든 파일의 **구조, 섹션, 예시 코드**가 이미 설계되어 있습니다.

**추천 작업 순서:**
1. Priority 1 (CRITICAL) 4개 파일 먼저 완성
2. README.md 확인하여 전체 구조 파악
3. FILE_MAP.md 참고하여 파일 간 관계 이해
4. WHRESUME `.skills/` 폴더에서 참고 패턴 확인

---

## 📚 참고 리소스

### WHRESUME 파일 (복사/참고용)

**100% 복사:**
- `.skills/development-workflow-SKILL.md` → ✅ 완료
- `.skills/verification-protocol-SKILL.md` → 📝 남음
- `.claude/templates/self-check.md` → ✅ 완료

**90% 복사, RAG 트리거 추가:**
- `.skills/self-learning-SKILL.md` → 📝 남음

**패턴 참고:**
- `.skills/blog-protection-SKILL.md` → Vector store 보호에 적용
- `.skills/testing-checklist-SKILL.md` → E2E 테스트 구조 참고

### 외부 리소스

- [LangSmith Docs](https://docs.smith.langchain.com/)
- [RAGAS Framework](https://github.com/explodinggradients/ragas)
- [LangChain Text Splitters](https://python.langchain.com/docs/modules/data_connection/document_transformers/)

---

**작성일:** 2025-12-04
**상태:** 핵심 파일 완료 (7/26), 나머지 템플릿 제공
**다음 작업:** Priority 1 (CRITICAL) 4개 파일 구현
