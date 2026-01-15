# Protected Schemas - RAG System

## Purpose

Define immutable RAG system components that require user approval + full impact analysis before modification.

---

## Protected Elements (4 Categories)

### 1. Embedding Dimensions

**What:** Vector size from embedding models

**Examples:**
- OpenAI `text-embedding-ada-002`: **1536 dimensions**
- OpenAI `text-embedding-3-small`: **1536 dimensions**
- OpenAI `text-embedding-3-large`: **3072 dimensions**
- Cohere `embed-english-v3.0`: **1024 dimensions**
- HuggingFace `sentence-transformers/all-MiniLM-L6-v2`: **384 dimensions**

**Why Protected:**
- Changing dimension breaks ALL existing vectors
- Vector store indexes are dimension-specific
- No automatic migration path

**Impact of Change:**
- Full re-indexing required (hours to days)
- Downtime during migration
- Cost: Re-embed all documents
- Old vectors become unusable

**Protection Rule:**
- 🚫 **NEVER** change dimension without user approval
- 🚫 **ALWAYS** require full re-indexing plan
- ✅ **MUST** backup existing vectors before migration

---

### 2. Vector Store Schema

**What:** Database schema for vector storage

**Components:**
```python
# Example: Pinecone schema
{
  "dimension": 1536,              # IMMUTABLE
  "metric": "cosine",             # PROTECTED (affects rankings)
  "metadata_config": {            # CAUTION (migration needed)
    "indexed": ["category", "date"]
  }
}
```

**Why Protected:**
- Schema changes require data migration
- Incompatible schemas break queries
- Metadata changes affect filtering

**Impact of Change:**
- **Dimension change:** Full re-index
- **Metric change:** All rankings change
- **Metadata add:** Backward compatible (OK)
- **Metadata remove:** Break existing filters (BAD)

**Protection Rule:**
- 🚫 **HALT:** Dimension or metric changes
- ⚠️ **CAUTION:** Metadata schema changes
- ✅ **PROCEED:** Adding optional metadata fields

---

### 3. Chunking Strategy

**What:** How documents are split into chunks

**Parameters:**
```python
# Example: RecursiveCharacterTextSplitter
{
  "chunk_size": 512,              # PROTECTED (affects boundaries)
  "chunk_overlap": 50,            # PROTECTED (affects context)
  "separators": ["\n\n", "\n", " "],  # PROTECTED (affects splits)
  "length_function": len          # PROTECTED (char vs token)
}
```

**Why Protected:**
- Changes document boundaries
- Affects retrieval quality
- Mix of old/new chunks during migration

**Impact of Change:**
- Requires full document re-processing
- Old chunks become stale
- Retrieval quality degradation during migration

**Protection Rule:**
- 🚫 **HALT:** Chunk size or overlap changes
- 🚫 **HALT:** Separator logic changes
- ✅ **PROCEED:** Adding new splitter (if re-processing all docs)

---

### 4. Distance Metrics

**What:** Similarity measurement method

**Types:**
- **Cosine similarity:** Best for normalized vectors (most common)
- **Euclidean distance:** Best for absolute distances
- **Dot product:** Best for unnormalized vectors
- **Manhattan distance:** Best for sparse vectors

**Why Protected:**
- Changes ALL similarity scores
- Affects ranking completely
- No migration path (just switch)

**Impact of Change:**
- Top-K results completely different
- Retrieval quality may improve OR degrade
- Requires A/B testing before deployment

**Protection Rule:**
- 🚫 **HALT:** Always require A/B test
- 🚫 **MUST:** Compare metrics (Precision@K, Recall@K, MRR, NDCG)
- ✅ **PROCEED:** Only if metrics improve by >5%

---

## Pre-Modification Checklist

**See:** `templates/rag-checklist.md` for 5-question checklist

**Summary:**
1. Embedding dimension change? → HALT
2. Chunking strategy change? → HALT
3. Metadata schema change? → CAUTION
4. Distance metric change? → HALT
5. Purely prompt/LLM config? → PROCEED

---

## Protection Mechanisms

### 1. Pre-commit Hooks

**Check before commit:**
```bash
# In .pre-commit-config.yaml
- id: check-rag-schemas
  name: Check RAG protected schemas
  entry: scripts/check_protected_schemas.py
  language: python
  files: 'embeddings/|vector_store/|chunking/'
```

### 2. Skills Auto-Load

**Auto-load when:**
- User modifies files in: `embeddings/`, `vector_store/`, `chunking/`
- Keywords detected: "dimension", "chunk_size", "metadata", "distance metric"
- Triggers: `skills/rag-specific/vector-store-SKILL.md`

### 3. Code Review Checklist

**Phase 4 validation:**
- [ ] No embedding dimension changes
- [ ] No chunking strategy changes without re-processing plan
- [ ] Metadata changes backward compatible
- [ ] Distance metric changes have A/B test results

---

## Migration Playbook

### Scenario 1: Change Embedding Model

**Example:** OpenAI ada-002 (1536) → OpenAI 3-large (3072)

**Steps:**
1. **Backup:** Export existing vectors to JSON
2. **Create new index:** Pinecone/Milvus with dimension=3072
3. **Test:** Re-embed 10-20 sample documents
4. **Validate:** Query sample, compare results
5. **Migrate:** Re-embed all documents (batch job)
6. **Switch:** Point app to new index
7. **Monitor:** LangSmith traces for 7 days
8. **Cleanup:** Delete old index after 30 days

**Estimated Time:** 4-8 hours (1M documents)

---

### Scenario 2: Change Chunking Strategy

**Example:** chunk_size=512 → chunk_size=1024

**Steps:**
1. **Document:** Screenshot old config + code
2. **Test:** A/B test on 100 queries
   - Measure: Precision@5, Recall@5, MRR
3. **Compare:** Old vs new strategy metrics
4. **Approve:** Get user sign-off with metrics table
5. **Re-process:** Batch job to re-chunk documents
6. **Re-embed:** Generate new vectors
7. **Replace:** Swap old vectors with new
8. **Monitor:** Retrieval quality for 14 days

**Estimated Time:** 2-4 hours (1M documents)

---

### Scenario 3: Add Metadata Field

**Example:** Add `category: string` to vectors

**Steps:**
1. **Check compatibility:** Vector store supports metadata updates?
2. **Update schema:** Add `category` to metadata config
3. **Backfill:** Update existing vectors with `category` (if needed)
4. **Test:** Query with new filter `category="technical"`
5. **Deploy:** No downtime required
6. **Monitor:** Filter performance

**Estimated Time:** 30 minutes (if backfill not needed)

---

## Common Mistakes

### Mistake 1: Mixing Embedding Dimensions

**Problem:** Using 1536-dim vectors in 384-dim index

**Error:**
```
DimensionMismatch: Expected 384, got 1536
```

**Solution:** Always verify dimension matches before indexing

---

### Mistake 2: Changing Chunking Mid-Index

**Problem:** Half of documents use chunk_size=512, half use 1024

**Impact:** Retrieval quality degradation (inconsistent chunks)

**Solution:** Re-process ALL documents at once, not incrementally

---

### Mistake 3: Removing Required Metadata

**Problem:** Deleting `source` field that filters rely on

**Error:**
```
KeyError: 'source' not found in metadata
```

**Solution:** Check all query filters before removing metadata fields

---

## Related Files

- `templates/rag-checklist.md` - 5-question pre-modification checklist
- `skills/rag-specific/vector-store-SKILL.md` - Vector store best practices
- `skills/rag-specific/embedding-strategy-SKILL.md` - Chunking guidelines
- `RAG-CLAUDE.md` - Behavioral rules for RAG systems

---

**Version:** 1.0
**Last Updated:** 2025-12-04
**Maintainer:** RAG Demo Team
