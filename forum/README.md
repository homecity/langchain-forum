# LangChain Forum Archive - Help Section

This directory contains an archive of all posts from the LangChain Help Forum (https://forum.langchain.com/c/help/9).

## Archive Statistics

- **Total Posts:** 363
- **Date Range:** April 2025 - January 2026
- **Source:** LangChain Help Forum Category (ID: 9)
- **Fetched:** January 14, 2026

## Directory Structure

Posts are organized by creation date:
```
forum/
├── YYYY/
│   ├── MM/
│   │   ├── DD/
│   │   │   ├── {topic_id}_{title}.md
```

## Post Distribution by Month (2025)

- **April:** 2 posts
- **June:** 2 posts  
- **July:** 106 posts
- **August:** 69 posts
- **September:** 72 posts
- **October:** 43 posts
- **November:** 29 posts
- **December:** 32 posts
- **January 2026:** 8 posts

## Markdown File Format

Each markdown file contains:
- Topic title
- Topic ID and URL
- Creation date
- Tags (if available)
- All posts in the thread with:
  - Post number
  - Author username
  - Timestamp
  - Full content (converted from HTML to Markdown)

## Usage

You can search through posts using standard tools:
```bash
# Search for specific topics
grep -r "keyword" forum/

# Find posts by date
ls forum/2025/07/01/

# Count posts
find forum -name "*.md" | wc -l
```

## Data Source

All data was fetched from the Discourse API at https://forum.langchain.com using the official JSON endpoints.
