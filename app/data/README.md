# Forum Data Directory

This directory contains processed forum data and statistics.

## Files

### forum-stats.json

Generated statistics from forum posts, including:

- **metrics**: Overall issue metrics (total, resolved, active, resolution rate, trends)
- **categoryDistribution**: Posts grouped by primary tag with percentages
- **monthlyVolume**: Post counts by month (last 12 months)
- **tagResolution**: Resolution rates per tag (top 10)
- **recentActivity**: Last 10 posts with status and dates

## Scripts

- **generate-stats.ts**: Parses forum markdown files and generates statistics
- **index-forum-data.ts**: Creates embeddings and indexes forum posts in vector store

## Usage

```bash
# Generate statistics
npx ts-node scripts/generate-stats.ts

# Index forum data
GEMINI_API_KEY=your_key npx ts-node scripts/index-forum-data.ts
```

## Data Source

Forum posts are located in `/forum/` directory with structure:
```
forum/
  2025/
    04/
      24/
        21_Post Identification and Tags.md
```

Each markdown file contains:
- Topic ID
- Title
- Created date
- URL
- Tags
- Post content with responses
