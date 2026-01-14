# Forum Data Processing Scripts

This directory contains scripts for processing and analyzing forum data.

## Available Scripts

### 1. generate-stats.ts

Generates comprehensive statistics from forum markdown files.

**What it does:**
- Scans all forum markdown files in `/forum/` directory
- Parses metadata (title, topic ID, tags, dates)
- Infers status (SOLVED/OPEN) based on content analysis
- Calculates metrics, trends, and distributions
- Outputs to `data/forum-stats.json`

**Usage:**
```bash
# Via npm script (recommended)
npm run stats:generate

# Or directly with ts-node
npx ts-node scripts/generate-stats.ts
```

**Output Structure:**
```json
{
  "metrics": {
    "total": 363,
    "resolved": 156,
    "active": 207,
    "resolutionRate": 43,
    "avgResponseTime": 1.2,
    "trends": { "total": 39, "resolved": 12, ... }
  },
  "categoryDistribution": [...],
  "monthlyVolume": [...],
  "tagResolution": [...],
  "recentActivity": [...],
  "generatedAt": "2026-01-14T04:56:59.292Z"
}
```

### 2. validate-stats.ts

Validates the structure and integrity of generated statistics.

**What it does:**
- Checks file existence
- Validates JSON structure
- Verifies data integrity (totals, percentages, sorting)
- Displays summary statistics

**Usage:**
```bash
# Via npm script (recommended)
npm run stats:validate

# Or directly with ts-node
npx ts-node scripts/validate-stats.ts
```

**Validation Checks:**
- File exists
- Has all required properties
- Metrics are mathematically correct
- Resolution rate is within 0-100%
- Categories are sorted by frequency
- Data arrays are properly sized

### 3. index-forum-data.ts

Indexes forum posts into a vector store for RAG retrieval.

**What it does:**
- Parses forum markdown files
- Chunks content (512 tokens, 50 overlap)
- Generates embeddings using Gemini (768-dim)
- Stores in vector store (in-memory)
- Saves vector store metadata

**Usage:**
```bash
# Requires GEMINI_API_KEY environment variable
GEMINI_API_KEY=your_key npx ts-node scripts/index-forum-data.ts
```

**Configuration:**
- Chunk size: 512 tokens (~2048 chars)
- Chunk overlap: 50 tokens (~200 chars)
- Embedding model: gemini-embedding-001 (768 dimensions)
- Batch size: 10 documents at a time

### 4. test-indexing.ts

Tests the indexing pipeline with sample data.

**Usage:**
```bash
GEMINI_API_KEY=your_key npx ts-node scripts/test-indexing.ts
```

### 5. crawl-langchain-docs.ts

Crawls and downloads LangChain documentation from docs.langchain.com.

**What it does:**
- Fetches sitemap.xml from docs.langchain.com
- Extracts all documentation URLs
- Downloads each page and converts HTML to Markdown
- Extracts metadata (title, URL, section path, last_modified)
- Saves as markdown files with frontmatter
- Implements rate limiting (2-3 requests/second)
- Shows progress bar during crawling
- Handles errors with retry logic (3 attempts per URL)

**Usage:**
```bash
# Via npm script (recommended)
npm run crawl:docs

# Or directly with ts-node
npx ts-node scripts/crawl-langchain-docs.ts
```

**Output Structure:**
```
data/docs/
  getting-started/
    introduction.md
    installation.md
  modules/
    agents/
      agent-types.md
  ...
```

**Markdown File Format:**
```markdown
---
title: "Agent Types"
url: "https://docs.langchain.com/modules/agents/agent-types"
section: "modules/agents"
last_modified: "2026-01-10"
---

[Markdown content here]
```

**Features:**
- Rate limiting: 2.5 requests/second (400ms between requests)
- Max retries: 3 attempts per URL with exponential backoff
- Request timeout: 30 seconds
- Skips already downloaded files
- Organized directory structure based on URL paths
- Progress tracking: "Crawling 234/500 pages..."

## Workflow

### Standard Processing Pipeline

1. **Generate Statistics**
   ```bash
   npm run stats:generate
   ```
   This creates `data/forum-stats.json` with comprehensive metrics.

2. **Validate Statistics**
   ```bash
   npm run stats:validate
   ```
   Ensures data integrity before use.

3. **Index for RAG** (optional)
   ```bash
   GEMINI_API_KEY=your_key npx ts-node scripts/index-forum-data.ts
   ```
   Creates embeddings for semantic search.

## Output Files

| File | Description | Location |
|------|-------------|----------|
| `forum-stats.json` | Comprehensive statistics | `data/forum-stats.json` |
| `vector-store.json` | Vector store metadata | Root directory |

## Status Inference Logic

The `generate-stats.ts` script uses heuristics to infer post status:

**SOLVED Indicators:**
- Multiple responses (3+ posts)
- Contains: "solved", "thank you", "fixed", "worked", "resolved"
- Has discussion thread with resolution

**OPEN Indicators:**
- Single post or few responses
- Contains unanswered questions
- No resolution indicators

## Data Sources

Forum posts are organized by date:
```
forum/
  2025/
    07/
      15/
        123_Post Title.md
```

Each markdown file contains:
- Title (heading)
- Metadata (Topic ID, Created date, URL, Tags)
- Post content with conversation threads

## Error Handling

All scripts include:
- Input validation
- Graceful error messages
- Exit codes (0 = success, 1 = error)
- Progress indicators

## Performance

- **generate-stats.ts**: ~2 seconds for 363 posts
- **index-forum-data.ts**: ~5-10 minutes (depends on API rate limits)
- **validate-stats.ts**: <1 second

## Troubleshooting

### "No markdown files found"
- Check that `/forum/` directory exists
- Verify markdown files have `.md` extension
- Ensure files are not in `.gitignore`

### "GEMINI_API_KEY not set"
- Export environment variable: `export GEMINI_API_KEY=your_key`
- Or inline: `GEMINI_API_KEY=your_key npx ts-node script.ts`

### "Stats file not found"
- Run `npm run stats:generate` first
- Check `data/` directory exists
- Verify write permissions

## Development

### Adding New Metrics

1. Update types in `generate-stats.ts`
2. Add calculation function
3. Include in stats object
4. Update validation checks in `validate-stats.ts`
5. Update README documentation

### Testing

```bash
# Run validation after generating stats
npm run stats:generate && npm run stats:validate
```

## Related Files

- `/data/forum-stats.json` - Generated statistics
- `/data/README.md` - Data directory documentation
- `/forum/README.md` - Forum data source documentation
- `/tests/scripts/generate-stats.test.ts` - Unit tests (future)

## License

MIT
