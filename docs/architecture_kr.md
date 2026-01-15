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

### 3. Reranker (Optional)
- Input: Query + Retrieved docs
- Output: Reranked docs
- Model: Cross-encoder

### 4. Generator
- Input: Query + Reranked docs
- Output: Answer
- Model: GPT-4 / Claude

### 5. Validator
- Input: Answer + Source docs
- Output: Metrics (faithfulness, relevance)
