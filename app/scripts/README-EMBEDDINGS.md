# Embeddings Generation Script

This document describes the unified embeddings generation script that processes both forum posts and documentation.

## Overview

The `generate-embeddings.ts` script creates a single unified embeddings file that combines:
- Forum posts from `/forum/2025/` and `/forum/2026/`
- Documentation pages from `/app/data/docs/` (crawled from docs.langchain.com)

## Features

1. **Token-based chunking**: 512 tokens per chunk, 50 token overlap
2. **OpenAI embeddings**: Uses `text-embedding-3-small` (1536 dimensions)
3. **Batch processing**: Processes 100 chunks at a time for efficiency
4. **Progress tracking**: Real-time progress updates during generation
5. **Error handling**: Continues processing even if individual files fail
6. **Memory-efficient**: Streams output to JSON file

## Usage

### Prerequisites

1. Set `OPENAI_API_KEY` in `.env.local`:
```bash
OPENAI_API_KEY=sk-...
```

2. Ensure forum data exists:
```bash
/forum/2025/  # Forum posts from 2025
/forum/2026/  # Forum posts from 2026
```

3. (Optional) Crawl documentation first:
```bash
npm run crawl:docs
```

### Running the Script

#### Generate embeddings only
```bash
npm run embed:generate
```

#### Crawl docs + generate embeddings (full pipeline)
```bash
npm run embed:all
```

## Output Format

The script generates `/app/data/embeddings.json` with the following structure:

```json
{
  "metadata": {
    "total_documents": 1500,
    "total_chunks": 3200,
    "embedding_model": "text-embedding-3-small",
    "dimensions": 1536,
    "sources": {
      "forum": 364,
      "docs": 1136
    },
    "chunk_size": 512,
    "chunk_overlap": 50,
    "generated_at": "2026-01-14T12:34:56.789Z"
  },
  "documents": [
    {
      "id": "forum_langsmith_issue_chunk_0",
      "content": "Question about LangSmith tracing...",
      "metadata": {
        "source": "forum",
        "source_type": "forum_post",
        "title": "LangSmith Tracing Not Working",
        "url": "https://forum.langchain.com/t/123",
        "tags": ["langsmith", "tracing", "cloud"],
        "chunk_index": 0,
        "total_chunks": 3
      },
      "embedding": [0.037, -0.021, ...]
    },
    {
      "id": "docs_modules_agents_chunk_0",
      "content": "# Agents\n\nAgents use an LLM...",
      "metadata": {
        "source": "docs",
        "source_type": "documentation",
        "title": "Agents",
        "url": "https://docs.langchain.com/modules/agents",
        "tags": [],
        "section": "modules",
        "chunk_index": 0,
        "total_chunks": 5
      },
      "embedding": [0.012, 0.045, ...]
    }
  ]
}
```

## Metadata Fields

### Common Fields
- `source`: `"forum"` or `"docs"`
- `source_type`: `"forum_post"` or `"documentation"`
- `title`: Document title
- `url`: Original URL
- `tags`: Array of tags (forum posts only, empty for docs)
- `chunk_index`: Chunk position within document (0-based)
- `total_chunks`: Total number of chunks for this document

### Forum-specific Fields
- `tags`: Tags from the forum post (e.g., `["langsmith", "cloud"]`)

### Docs-specific Fields
- `section`: Documentation section path (e.g., `"modules/agents"`)

## ID Generation

Document IDs are generated as follows:

### Forum Posts
Format: `forum_{title_slug}_chunk_{index}`

Example: `forum_langsmith_tracing_not_working_chunk_0`

### Documentation
Format: `docs_{section_slug}_chunk_{index}`

Example: `docs_modules_agents_chunk_0`

## Chunking Strategy

The script uses **character-based approximation** for token counting:
- **Assumption**: 1 token ≈ 4 characters (average for English text)
- **Chunk size**: 512 tokens ≈ 2048 characters
- **Overlap**: 50 tokens ≈ 200 characters

This ensures:
- Semantic continuity between chunks
- Efficient retrieval (chunks not too large/small)
- Compatibility with OpenAI embedding limits (8191 tokens)

## Error Handling

The script handles errors gracefully:

1. **Missing directories**: Skips with warning if forum/docs directories don't exist
2. **Invalid files**: Logs error and continues with next file
3. **Embedding failures**: Logs error and skips batch, continues with next batch
4. **API rate limits**: Batch processing helps avoid rate limits

## Performance

Estimated processing time:
- **Forum posts** (364 files): ~2-3 minutes
- **Documentation** (1000+ pages): ~10-15 minutes
- **Total**: ~15-20 minutes for full dataset

Cost estimate (OpenAI API):
- ~3200 chunks × $0.00002/1K tokens × 512 tokens = **~$0.03**

## Troubleshooting

### Error: OPENAI_API_KEY not set
**Solution**: Add your OpenAI API key to `.env.local`:
```bash
OPENAI_API_KEY=sk-...
```

### Error: Cannot find module '@/lib/rag/embedder/openai-embedder'
**Solution**: Ensure you're running from the app directory:
```bash
cd /path/to/app
npm run embed:generate
```

### Error: Rate limit exceeded
**Solution**: The script uses batch processing to avoid rate limits. If you still hit limits:
1. Reduce `BATCH_SIZE` in the script (default: 100)
2. Add delay between batches
3. Upgrade your OpenAI API tier

### Memory issues
**Solution**: The script processes in batches to minimize memory usage. If you still run out of memory:
1. Process forum and docs separately
2. Reduce `BATCH_SIZE`
3. Increase Node.js heap size: `NODE_OPTIONS="--max-old-space-size=4096" npm run embed:generate`

## Next Steps

After generating embeddings:

1. **Load into vector store**:
```typescript
import embeddings from '@/data/embeddings.json'
// Load into Pinecone, Milvus, etc.
```

2. **Build retrieval pipeline**:
```typescript
const retriever = new Retriever(vectorStore)
const results = await retriever.retrieve(queryVector, k=5)
```

3. **Test retrieval quality**:
```bash
npm run test:rag
```

## Related Scripts

- `crawl-langchain-docs.ts`: Crawls documentation from docs.langchain.com
- `index-forum-data.ts`: (Deprecated) Old forum-only indexing script
- `generate-stats.ts`: Generates dataset statistics

## References

- [OpenAI Embeddings API](https://platform.openai.com/docs/guides/embeddings)
- [RAG Pipeline Documentation](/docs/rag-pipeline.md)
- [Chunking Strategy Guide](/docs/chunking-strategy.md)
