# RAG Pre-Modification Checklist

## Purpose

5-question checklist to prevent breaking changes to RAG system components (embedding dimensions, vector store schemas, chunking strategies).

---

## When to Use

**Auto-trigger when modifying:**
- Files in: `embeddings/`, `vector_store/`, `chunking/`, `retrieval/`
- Keywords detected: "dimension", "chunk_size", "metadata", "distance metric", "vector store"

---

## 5-Question Checklist

### Question 1: Embedding Dimension Change?

**Are you changing embedding dimensions?** (e.g., 1536 → 768, 384 → 1536)

**If YES:** 🚫 **HALT**

**Reason:**
- Breaks ALL existing vectors
- Incompatible with current vector store index

**Impact:**
- Requires full re-indexing of entire knowledge base
- Downtime during re-indexing (could be hours for large datasets)
- Cost: Re-embedding all documents

**Action:**
1. Get user approval
2. Backup existing vectors (export to JSON)
3. Create new vector store index with new dimension
4. Schedule re-indexing job
5. Test with sample documents first
6. Migrate incrementally

**If NO:** Continue to Q2

---

### Question 2: Chunking Strategy Change?

**Are you modifying chunking parameters or logic?**
- `chunk_size` (e.g., 512 → 1024)
- `chunk_overlap` (e.g., 50 → 100)
- Splitting logic (sentence vs paragraph vs fixed-size)

**If YES:** 🚫 **HALT**

**Reason:**
- Changes document boundaries
- Affects retrieval quality (chunks may miss context)

**Impact:**
- Requires document re-processing
- Old chunks become stale (mix of old/new strategies)
- Retrieval quality degradation during migration

**Action:**
1. Document old strategy (screenshot + code)
2. Test new strategy on 10-20 sample documents
3. Compare retrieval quality (A/B test)
4. Get user approval with metrics
5. Re-process documents incrementally
6. Monitor retrieval quality after migration

**If NO:** Continue to Q3

---

### Question 3: Metadata Schema Change?

**Are you adding/removing/renaming metadata fields in vector embeddings?**
- Adding: `author`, `date`, `category`
- Removing: deprecated fields
- Renaming: `source` → `document_id`

**If YES:** ⚠️ **CAUTION**

**Reason:**
- May break backward compatibility
- Depends on vector store (Pinecone: yes, FAISS: no)

**Impact:**
- Query filters may fail (if relying on old field names)
- Mixed metadata schema (old vectors without new fields)

**Action:**
1. Check vector store migration documentation
2. Test metadata filtering with new schema
3. Create migration script for existing vectors
4. Test on copy of vector store first
5. Get user approval for migration plan
6. Monitor query performance after migration

**If NO:** Continue to Q4

---

### Question 4: Distance Metric Change?

**Are you switching similarity metrics?**
- cosine → euclidean
- euclidean → dot product
- dot product → cosine

**If YES:** 🚫 **HALT**

**Reason:**
- Changes ALL similarity scores
- Affects ranking order completely

**Impact:**
- Top-K results will be completely different
- Retrieval quality may improve OR degrade
- No migration path (need to re-evaluate)

**Action:**
1. Create A/B test on evaluation dataset
2. Compare retrieval metrics:
   - Precision@K
   - Recall@K
   - MRR (Mean Reciprocal Rank)
   - NDCG (Normalized Discounted Cumulative Gain)
3. Get user approval with comparison table
4. If approved, update vector store config
5. Monitor production metrics for 7 days

**If NO:** Continue to Q5

---

### Question 5: Purely Prompt/LLM Config?

**Are you ONLY changing:**
- Prompt templates
- LLM model (OpenAI → Anthropic)
- Generation parameters (temperature, max_tokens)
- System instructions

**If YES:** ✅ **PROCEED**

**Reason:**
- Safe to experiment
- Doesn't affect retrieval pipeline
- Easy to rollback

**Impact:**
- Only changes final answer quality
- No re-indexing needed
- No vector store changes

**Action:**
1. Test with LangSmith traces
2. Compare old vs new outputs (5-10 queries)
3. Iterate freely
4. Monitor faithfulness/relevance metrics

**If NO:** Return to Q1 (something was missed)

---

## Decision Matrix

| Change Type | Action | Reason | Recovery Time |
|-------------|--------|--------|---------------|
| Embedding dimension | **HALT** | Breaks all vectors | Hours (full re-index) |
| Chunking strategy | **HALT** | Requires re-processing | Hours (re-chunk) |
| Metadata schema | **CAUTION** | Depends on vector store | Minutes (migration) |
| Distance metric | **HALT** | Changes all rankings | N/A (A/B test) |
| Prompt/LLM config | **PROCEED** | Safe experimentation | Seconds (rollback) |

---

## Examples

### ✅ SAFE (No checklist needed)

- Changing prompt templates
- Switching LLM providers (OpenAI → Anthropic)
- Adjusting temperature (0.7 → 0.3)
- Modifying max_tokens (500 → 1000)
- Adding logging/monitoring
- Updating system instructions

### 🚫 REQUIRES CHECKLIST

- Changing embedding model (`text-embedding-ada-002` → `text-embedding-3-large`)
  - **Why:** Different dimensions (1536 → 3072)

- Modifying chunk_size (512 → 1024)
  - **Why:** Affects document boundaries

- Adding metadata field (`category: string`)
  - **Why:** Schema change

- Switching vector store (Pinecone → Milvus)
  - **Why:** Migration required

- Changing distance metric (cosine → euclidean)
  - **Why:** Affects all rankings

---

## Integration with Other Skills

**Auto-loads when:**
1. User modifies protected RAG files
2. Keywords detected in user message
3. Before git commit (pre-commit hook check)

**Related Skills:**
- `skills/rag-specific/embedding-strategy-SKILL.md` - Chunking best practices
- `skills/rag-specific/vector-store-SKILL.md` - Vector store schema protection
- `skills/testing/rag-accuracy-SKILL.md` - Metrics for A/B testing
- `docs/protected-schemas.md` - Full list of protected elements

---

**Version:** 1.0
**Last Updated:** 2025-12-04
**Auto-trigger:** Embedding/chunking/vector store modifications
