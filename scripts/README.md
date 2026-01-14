# Forum Data Parser

This directory contains scripts for parsing and analyzing the LangChain forum data.

## parse-forum-data.ts

A comprehensive TypeScript script that recursively scans the `/forum` directory and parses all markdown files to extract structured metadata.

### Features

- **Recursive scanning**: Processes all markdown files in the forum directory structure
- **Metadata extraction**: Extracts topic ID, title, creation date, URL, tags, status, and post count
- **Tag detection**: Automatically identifies tags based on content keywords
- **Status determination**: Classifies posts as SOLVED or OPEN based on content analysis
- **Statistics generation**: Provides comprehensive summary statistics

### Usage

```bash
npm install
npm run parse-forum
```

Or run directly:

```bash
npx ts-node scripts/parse-forum-data.ts
```

### Output Format

The script generates `data/forum-parsed.json` with the following structure:

```json
{
  "posts": [
    {
      "topicId": "2094",
      "title": "Deployments failing",
      "created": "2025-11-05T10:42:54.000Z",
      "url": "https://forum.langchain.com/t/2094",
      "tags": ["deployment", "langgraph", "error"],
      "status": "SOLVED",
      "postCount": 9,
      "year": 2025,
      "month": 11
    }
  ],
  "totalPosts": 363,
  "dateRange": {
    "earliest": "2025-04-22T10:05:17.000Z",
    "latest": "2026-01-13T00:40:46.000Z"
  }
}
```

### Extracted Fields

| Field | Description | Example |
|-------|-------------|---------|
| `topicId` | Forum topic ID | "2094" |
| `title` | Post title | "Deployments failing" |
| `created` | ISO 8601 timestamp | "2025-11-05T10:42:54.000Z" |
| `url` | Forum URL | "https://forum.langchain.com/t/2094" |
| `tags` | Auto-detected tags | ["deployment", "langgraph"] |
| `status` | SOLVED or OPEN | "SOLVED" |
| `postCount` | Number of posts in thread | 9 |
| `year` | Year created | 2025 |
| `month` | Month created (1-12) | 11 |

### Tag Detection

Tags are automatically detected based on keywords found in the title and content:

- `langsmith`: langsmith, lang smith
- `langgraph`: langgraph, lang graph
- `langchain`: langchain, lang chain
- `deployment`: deployment, deploy, deploying
- `auth`: auth, authentication, authorization
- `tracing`: tracing, trace, traces
- `cloud`: cloud
- `api`: api
- `experiment`: experiment, evaluation, eval
- `agent`: agent, agents
- `middleware`: middleware
- `tool`: tool, tools
- `error`: error, errors, bug

### Status Detection

Posts are marked as `SOLVED` if they contain any of these keywords:
- solved
- resolved
- working
- fixed
- thank you (with context)
- our build is now working
- this is now working
- issue resolved
- problem solved

Otherwise, posts are marked as `OPEN`.

### Statistics

The script outputs comprehensive statistics including:

- **Total posts**: Count of successfully parsed posts
- **Date range**: Earliest and latest post dates
- **Status breakdown**: SOLVED vs OPEN percentage
- **Tag frequency**: Top 10 most common tags
- **Monthly breakdown**: Posts per month for the most recent 6 months

### Example Output

```
Starting forum data parsing...
Scanning directory: /Users/jihyunjeong/Documents/Github/langchain/forum
Found 363 markdown files

Parsing complete:
  Successfully parsed: 363
  Failed to parse: 0

Output written to: /Users/jihyunjeong/Documents/Github/langchain/data/forum-parsed.json

=== SUMMARY STATISTICS ===
Total posts: 363
Date range: 2025-04-22 to 2026-01-13

Status breakdown:
  SOLVED: 119 (32.8%)
  OPEN: 244 (67.2%)

Top tags:
  langchain: 363
  langsmith: 208
  langgraph: 170
  error: 163
  api: 136
  tracing: 128
  agent: 121
  deployment: 112
  cloud: 86
  tool: 64

Monthly breakdown (most recent 6 months):
  2026-01: 8 posts
  2025-12: 32 posts
  2025-11: 29 posts
  2025-10: 43 posts
  2025-09: 72 posts
  2025-08: 69 posts

Done!
```

### Error Handling

- Skips README.md files automatically
- Warns about files with missing required fields
- Reports parsing errors without stopping the entire process
- Continues processing even if individual files fail

### Requirements

- Node.js v18+
- TypeScript 5.3+
- ts-node 10.9+

### File Structure

```
scripts/
  parse-forum-data.ts       # Main parser script
  README.md                 # This file
data/
  forum-parsed.json         # Output file
forum/
  2025/
    07/, 08/, 09/, ...     # Monthly directories
  2026/
    01/                    # Monthly directories
```
