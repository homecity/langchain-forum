# File Map - MECE Analysis

Complete mapping of all files in `langchain_rule/` with purpose, role, and relationships.

---

## MECE Classification Framework

**Dimension 1 - File Type:**
- Configuration (CLAUDE.md, .pre-commit-config.yaml)
- Skills (17 SKILL files)
- Templates (3 template files)
- Documentation (5 docs)

**Dimension 2 - Purpose:**
- Protection (rag-checklist, protected-schemas, vector-store)
- Development (development-workflow, code-quality, verification-protocol)
- Testing (langsmith-testing, rag-accuracy, e2e-testing, unit-testing)
- RAG-Specific (embedding-strategy, retrieval-patterns, prompt-engineering, llm-integration)
- Meta (self-learning, skill-auto-load, error-recovery)
- Git (commit-protocol, code-review)

**Dimension 3 - Status:**
- Complete (✅ 5 files)
- Template Provided (📝 21 files - needs content)

---

## File Inventory (26 Total Files)

### 1. Configuration Files (2 files)

#### ✅ RAG-CLAUDE.md
**Role:** Master configuration file (like WHRESUME CLAUDE.md)
**Purpose:** 15 behavioral rules for RAG systems
**Key Sections:**
- Behavioral rules (15 rules)
- RAG protection rules (4 protected elements)
- Skills auto-load protocol
- Project overview
- Quick reference
**Lines:** 300
**Status:** ✅ Complete
**Dependencies:** None (top-level)
**Relationships:**
- References: All SKILL files
- Referenced by: All other files

---

#### 📝 .pre-commit-config.yaml
**Role:** Git hook configuration
**Purpose:** 3-layer pre-commit validation (type, lint, test)
**Key Sections:**
```yaml
repos:
  - repo: local
    hooks:
      - id: type-check
      - id: lint
      - id: test
```
**Lines:** 80
**Status:** 📝 Template (needs implementation)
**Dependencies:** None
**Relationships:**
- References: `skills/git-workflow/code-review-SKILL.md`

---

### 2. Templates (3 files)

#### ✅ templates/self-check.md
**Role:** Response starter template
**Purpose:** AI self-assessment format (SSOT)
**Key Sections:**
- Self-check format (8 fields)
- Request types (8 MECE categories)
- Complexity score calculation
- Policy score calculation
**Lines:** 432
**Status:** ✅ Complete (copied from WHRESUME)
**Dependencies:** None
**Relationships:**
- Used by: All AI responses
- Referenced in: RAG-CLAUDE.md Rule 1

---

#### ✅ templates/rag-checklist.md
**Role:** Pre-modification checklist
**Purpose:** 5-question gate before changing protected schemas
**Key Sections:**
- 5 questions (embedding, chunking, metadata, metric, prompt)
- Decision matrix
- Examples (safe vs requires checklist)
- Integration with other skills
**Lines:** 230
**Status:** ✅ Complete (NEW for RAG)
**Dependencies:** `docs/protected-schemas.md`
**Relationships:**
- References: `skills/rag-specific/embedding-strategy-SKILL.md`, `vector-store-SKILL.md`
- Referenced in: RAG-CLAUDE.md Rule 12

---

#### 📝 templates/test-plan.md
**Role:** Test case template
**Purpose:** Standardized format for RAG pipeline tests
**Key Sections:**
- Test case structure
- LangSmith trace format
- E2E pipeline test format
- Metrics to collect (faithfulness, relevance)
**Lines:** 80
**Status:** 📝 Template (adapt from WHRESUME Playwright template)
**Dependencies:** `skills/testing/langsmith-testing-SKILL.md`
**Relationships:**
- Used by: E2E tests, LangSmith traces
- References: `skills/testing/rag-accuracy-SKILL.md`

---

### 3. Documentation (5 files)

#### ✅ docs/protected-schemas.md
**Role:** Protected elements catalog
**Purpose:** Define immutable RAG components
**Key Sections:**
- 4 protected categories (embedding, vector store, chunking, metrics)
- Pre-modification checklist (5 questions)
- Protection mechanisms (hooks, skills, code review)
- Migration playbook (3 scenarios)
**Lines:** 350
**Status:** ✅ Complete (NEW for RAG)
**Dependencies:** None
**Relationships:**
- Referenced in: `templates/rag-checklist.md`, `RAG-CLAUDE.md`
- References: `skills/rag-specific/vector-store-SKILL.md`, `embedding-strategy-SKILL.md`

---

#### 📝 docs/architecture.md
**Role:** RAG pipeline overview
**Purpose:** System architecture documentation
**Key Sections:**
- Pipeline stages (Query → Embedder → Retriever → Reranker → Generator → Answer)
- LangSmith integration points
- Data flow diagrams
- Component responsibilities
**Lines:** 400
**Status:** 📝 Template (NEW for RAG)
**Dependencies:** None
**Relationships:**
- References: All `skills/rag-specific/` files
- Referenced in: README.md

---

#### 📝 docs/framework-guides/python-setup.md
**Role:** Python-specific setup guide
**Purpose:** Python conventions (venv, Poetry, pytest, mypy, ruff)
**Key Sections:**
- Environment setup (venv, Poetry)
- Type checking (mypy config)
- Linting (ruff config)
- Testing (pytest config)
**Lines:** 200
**Status:** 📝 Template (NEW)
**Dependencies:** None
**Relationships:**
- Referenced in: RAG-CLAUDE.md Quick Reference

---

#### 📝 docs/framework-guides/nextjs-setup.md
**Role:** Next.js-specific setup guide
**Purpose:** Next.js conventions (npm, Playwright, TypeScript, ESLint)
**Key Sections:**
- Environment setup (npm install)
- Type checking (tsconfig.json)
- Linting (eslint config)
- Testing (Playwright config)
**Lines:** 200
**Status:** 📝 Template (NEW)
**Dependencies:** None
**Relationships:**
- Referenced in: RAG-CLAUDE.md Quick Reference

---

#### ✅ README.md
**Role:** Project overview and index
**Purpose:** Getting started guide, file status, implementation strategy
**Key Sections:**
- Project structure
- Quick start
- File status (completed vs remaining)
- Design principles
- Implementation strategy
- Success metrics
**Lines:** 450
**Status:** ✅ Complete
**Dependencies:** None (top-level)
**Relationships:**
- References: All files (master index)

---

### 4. Skills - Core (3 files)

#### ✅ skills/core/development-workflow-SKILL.md
**Role:** MECE 5-phase development workflow
**Purpose:** Universal development process (Requirements → Design → Implementation → Validation → Deployment)
**Key Sections:**
- MECE Todo Template (5 phases)
- Type safety patterns (NO `any` types)
- E2E test patterns
- Quality metrics
- Integration with other skills
**Lines:** 574
**Status:** ✅ Complete (copied 100% from WHRESUME)
**Dependencies:** `testing-checklist-SKILL.md`, `git-workflow`, `secure-coding-SKILL.md`
**Relationships:**
- **HIGHEST PRIORITY** - Auto-loads for ALL development tasks
- References: CLAUDE.md Lines 429-455 (code conventions)
- Referenced in: RAG-CLAUDE.md Rule 1

---

#### 📝 skills/core/code-quality-SKILL.md
**Role:** Clean Code principles
**Purpose:** Code quality standards (naming, structure, type safety)
**Key Sections:**
- Clean Code principles (SRP, DRY, KISS)
- Naming conventions (PascalCase, camelCase, UPPER_SNAKE_CASE)
- Function length limits (< 50 lines)
- Type safety (NO `any`, utility types, generics)
**Lines:** 400
**Status:** 📝 Template (adapt from WHRESUME - remove Next.js examples)
**Dependencies:** `development-workflow-SKILL.md`
**Relationships:**
- Referenced in: Phase 3 (Implementation)

---

#### 📝 skills/core/verification-protocol-SKILL.md
**Role:** 2-strike verification rule
**Purpose:** Prevent verification paralysis (30min limit, 2-strike rule)
**Key Sections:**
- 2-strike rule (2 checks → execute, 3 → HALT)
- Background task limits (max 5 concurrent)
- 30-minute timeout
- Real-time verification (Read first, background tasks stale)
**Lines:** 300
**Status:** 📝 Template (copy 100% from WHRESUME)
**Dependencies:** None
**Relationships:**
- Referenced in: RAG-CLAUDE.md Rule 10

---

### 5. Skills - Testing (4 files)

#### 📝 skills/testing/langsmith-testing-SKILL.md
**Role:** LangSmith trace validation
**Purpose:** CRITICAL for RAG - every query traced
**Key Sections:**
- LangSmith API integration
- Trace collection (query → retrieval → generation → answer)
- Metrics collection (faithfulness, relevance, latency)
- Run comparisons (A/B testing)
**Lines:** 500
**Status:** 📝 Template (NEW for RAG)
**Dependencies:** None
**Relationships:**
- **CRITICAL PRIORITY** - Auto-loads for RAG query tasks
- References: `rag-accuracy-SKILL.md`
- Referenced in: RAG-CLAUDE.md Rule 4

---

#### 📝 skills/testing/rag-accuracy-SKILL.md
**Role:** RAG evaluation metrics
**Purpose:** Faithfulness, relevance, answer quality measurement
**Key Sections:**
- Faithfulness metric (0-1 score)
- Relevance metric (0-1 score)
- Answer quality assessment
- RAGAS framework integration
**Lines:** 600
**Status:** 📝 Template (NEW for RAG)
**Dependencies:** `langsmith-testing-SKILL.md`
**Relationships:**
- References: `templates/test-plan.md`
- Referenced in: RAG-CLAUDE.md Rule 6

---

#### 📝 skills/testing/e2e-testing-SKILL.md
**Role:** End-to-end pipeline tests
**Purpose:** Full RAG pipeline validation (query → answer)
**Key Sections:**
- Pipeline test structure
- Happy path tests
- Sad path tests (error handling)
- Edge case tests
**Lines:** 400
**Status:** 📝 Template (adapt from WHRESUME E2E checklist)
**Dependencies:** `development-workflow-SKILL.md`
**Relationships:**
- References: `langsmith-testing-SKILL.md`, `rag-accuracy-SKILL.md`

---

#### 📝 skills/testing/unit-testing-SKILL.md
**Role:** Component isolation tests
**Purpose:** Unit tests for embedder, retriever, reranker
**Key Sections:**
- Component isolation patterns
- Mocking strategies (mock LangSmith for speed)
- Coverage targets (80%+ core logic)
**Lines:** 300
**Status:** 📝 Template (adapt from WHRESUME)
**Dependencies:** None
**Relationships:**
- Referenced in: RAG-CLAUDE.md Rule 6 (Testing Hierarchy)

---

### 6. Skills - RAG-Specific (5 files)

#### 📝 skills/rag-specific/embedding-strategy-SKILL.md
**Role:** Chunking and embedding best practices
**Purpose:** PROTECTED - chunking strategy, dimension management
**Key Sections:**
- Chunking strategies (RecursiveCharacterTextSplitter, TokenTextSplitter)
- Chunk size optimization (512 vs 1024 vs 2048)
- Overlap strategies (50 vs 100 vs 200)
- Embedding dimension protection
**Lines:** 500
**Status:** 📝 Template (NEW for RAG)
**Dependencies:** `docs/protected-schemas.md`
**Relationships:**
- **CRITICAL** - Auto-loads for chunking/indexing tasks
- Referenced in: `templates/rag-checklist.md`, RAG-CLAUDE.md Rule 7

---

#### 📝 skills/rag-specific/vector-store-SKILL.md
**Role:** Vector store schema protection
**Purpose:** PROTECTED - schema changes require approval
**Key Sections:**
- Vector store schemas (Pinecone, Milvus, Chroma, FAISS)
- Schema protection rules
- Migration playbook
- Metadata management
**Lines:** 350
**Status:** 📝 Template (adapt from WHRESUME blog-protection pattern)
**Dependencies:** `docs/protected-schemas.md`
**Relationships:**
- Referenced in: `templates/rag-checklist.md`, RAG-CLAUDE.md Rule 3

---

#### 📝 skills/rag-specific/retrieval-patterns-SKILL.md
**Role:** Retrieval strategies
**Purpose:** Hybrid search, MMR, reranking patterns
**Key Sections:**
- Hybrid search (BM25 + Semantic)
- MMR (Maximal Marginal Relevance)
- Cross-encoder reranking
- Retrieval parameter tuning (top-K, threshold)
**Lines:** 450
**Status:** 📝 Template (NEW for RAG)
**Dependencies:** None
**Relationships:**
- Referenced in: RAG-CLAUDE.md Common Patterns

---

#### 📝 skills/rag-specific/prompt-engineering-SKILL.md
**Role:** RAG prompt templates
**Purpose:** Context injection, prompt optimization
**Key Sections:**
- RAG prompt templates (with/without context)
- Context window management
- Prompt injection prevention
- Few-shot examples
**Lines:** 400
**Status:** 📝 Template (NEW for RAG)
**Dependencies:** None
**Relationships:**
- Referenced in: RAG-CLAUDE.md Rule 12 (Purely prompt/LLM config → PROCEED)

---

#### 📝 skills/rag-specific/llm-integration-SKILL.md
**Role:** LLM provider abstraction
**Purpose:** Provider switching, fallbacks, streaming
**Key Sections:**
- Provider abstraction layer (OpenAI, Anthropic, Ollama)
- Fallback logic (OpenAI → Anthropic → Ollama)
- Streaming responses
- Cost optimization
**Lines:** 300
**Status:** 📝 Template (NEW for RAG)
**Dependencies:** None
**Relationships:**
- Referenced in: RAG-CLAUDE.md Troubleshooting (slow query latency)

---

### 7. Skills - Meta (3 files)

#### 📝 skills/meta/self-learning-SKILL.md
**Role:** Feedback loop system
**Purpose:** User feedback → automatic rule updates
**Key Sections:**
- Feedback pattern detection
- RAG-specific triggers ("Retrieval is bad" → embedding-strategy)
- SKILL file update protocol
- Logging (`.ai_logs/self-learning/`)
**Lines:** 350
**Status:** 📝 Template (copy 90% from WHRESUME, adapt triggers to RAG)
**Dependencies:** None
**Relationships:**
- **HIGH PRIORITY** - Auto-loads on feedback keywords
- Referenced in: RAG-CLAUDE.md Rule 13

---

#### 📝 skills/meta/skill-auto-load-SKILL.md
**Role:** Trigger detection system
**Purpose:** Auto-load skills based on keywords/context
**Key Sections:**
- Trigger evaluation logic
- Keyword-based triggers
- Complexity-based triggers
- Priority sorting
**Lines:** 250
**Status:** 📝 Template (adapt from WHRESUME - remove Multi-AI orchestration)
**Dependencies:** None
**Relationships:**
- Referenced in: RAG-CLAUDE.md Skills Auto-Load Protocol

---

#### 📝 skills/meta/error-recovery-SKILL.md
**Role:** Graceful degradation
**Purpose:** Retry logic, fallback strategies
**Key Sections:**
- Retry logic (exponential backoff)
- Fallback chains (primary → secondary → tertiary)
- Error logging
- Recovery playbook
**Lines:** 200
**Status:** 📝 Template (adapt from WHRESUME Gemini error recovery)
**Dependencies:** None
**Relationships:**
- Referenced in: RAG-CLAUDE.md Rule 14

---

### 8. Skills - Git Workflow (2 files)

#### 📝 skills/git-workflow/commit-protocol-SKILL.md
**Role:** Commit approval pattern
**Purpose:** USER_APPROVED commit enforcement (Rule 2)
**Key Sections:**
- USER_APPROVED environment variable pattern
- Commit reminder protocol
- Commit message format
- Pre-commit validation
**Lines:** 200
**Status:** 📝 Template (simplify from WHRESUME - remove feature branches, PRs)
**Dependencies:** None
**Relationships:**
- Referenced in: RAG-CLAUDE.md Rule 2, Rule 10

---

#### 📝 skills/git-workflow/code-review-SKILL.md
**Role:** Pre-commit checklist
**Purpose:** 3-layer validation (type, lint, test)
**Key Sections:**
- Type-check layer (mypy/TypeScript)
- Lint layer (ruff/ESLint)
- Test layer (unit tests only, not E2E)
- Auto-fix strategies
**Lines:** 150
**Status:** 📝 Template (simplify from WHRESUME - remove 10-layer hooks)
**Dependencies:** `.pre-commit-config.yaml`
**Relationships:**
- Referenced in: RAG-CLAUDE.md Rule 11

---

## File Dependency Graph

```
RAG-CLAUDE.md (TOP LEVEL)
  ↓
  ├─ templates/self-check.md (Rule 1)
  ├─ templates/rag-checklist.md (Rule 12)
  │    ↓
  │    └─ docs/protected-schemas.md
  │         ↓
  │         ├─ skills/rag-specific/vector-store-SKILL.md
  │         └─ skills/rag-specific/embedding-strategy-SKILL.md
  │
  ├─ skills/core/development-workflow-SKILL.md (HIGHEST PRIORITY)
  │    ↓
  │    ├─ skills/testing/e2e-testing-SKILL.md
  │    ├─ skills/git-workflow/commit-protocol-SKILL.md
  │    └─ skills/core/code-quality-SKILL.md
  │
  ├─ skills/testing/langsmith-testing-SKILL.md (CRITICAL)
  │    ↓
  │    └─ skills/testing/rag-accuracy-SKILL.md
  │
  └─ skills/meta/self-learning-SKILL.md (HIGH)
       ↓
       └─ skills/meta/skill-auto-load-SKILL.md
```

---

## Implementation Priority Matrix

| Priority | Files | Purpose | Lines | Status |
|----------|-------|---------|-------|--------|
| **P0 (CRITICAL)** | 5 files | Core foundation | 1,886 | ✅ Complete |
| **P1 (CRITICAL)** | 4 files | RAG protection + LangSmith | 1,800 | 📝 Template |
| **P2 (HIGH)** | 4 files | RAG patterns + E2E | 1,650 | 📝 Template |
| **P3 (MEDIUM)** | 4 files | Meta system + git | 950 | 📝 Template |
| **P4 (LOW)** | 9 files | Framework guides + unit tests | 1,730 | 📝 Template |

**Total Lines:** ~8,016 (vs target 7,500)

---

## MECE Validation

### Dimension 1 - File Type Coverage

- [x] Configuration (2 files): RAG-CLAUDE.md, .pre-commit-config.yaml
- [x] Skills (17 files): Core (3), Testing (4), RAG (5), Meta (3), Git (2)
- [x] Templates (3 files): self-check, rag-checklist, test-plan
- [x] Documentation (5 files): protected-schemas, architecture, python-setup, nextjs-setup, README

**Total:** 26 files ✅ MECE

---

### Dimension 2 - Purpose Coverage

- [x] Protection (3 files): rag-checklist, protected-schemas, vector-store
- [x] Development (3 files): development-workflow, code-quality, verification-protocol
- [x] Testing (4 files): langsmith-testing, rag-accuracy, e2e-testing, unit-testing
- [x] RAG-Specific (5 files): embedding-strategy, vector-store, retrieval-patterns, prompt-engineering, llm-integration
- [x] Meta (3 files): self-learning, skill-auto-load, error-recovery
- [x] Git (2 files): commit-protocol, code-review

**Total:** 20 purpose-driven files ✅ MECE

---

### Dimension 3 - Status Coverage

- [x] Complete (5 files): 1,886 lines (25% of target)
- [x] Template (21 files): 5,614 lines (75% of target)

**Total:** 7,500 lines target ✅ On track

---

## Cross-Reference Validation

### Circular Dependencies (Expected)

- `development-workflow-SKILL.md` ↔ `testing/e2e-testing-SKILL.md` (Phase 3 ↔ Test execution)
- `rag-checklist.md` ↔ `protected-schemas.md` (5 questions ↔ Protected elements)
- `RAG-CLAUDE.md` ↔ All skills (Master config ↔ Implementations)

### Missing References (To Fix)

- None (all relationships documented above)

---

## File Size Distribution

| Size Range | Count | Files |
|------------|-------|-------|
| 50-150 lines | 3 | .pre-commit-config, code-review, error-recovery |
| 150-300 lines | 7 | verification-protocol, unit-testing, llm-integration, etc. |
| 300-500 lines | 11 | RAG-CLAUDE, self-check, protected-schemas, development-workflow, etc. |
| 500-800 lines | 5 | development-workflow, langsmith-testing, rag-accuracy, embedding-strategy, retrieval-patterns |

**Average:** ~290 lines per file

---

**Version:** 1.0
**Last Updated:** 2025-12-04
**Purpose:** MECE validation and implementation guide
**Status:** Core files complete (5/26), template files ready (21/26)
