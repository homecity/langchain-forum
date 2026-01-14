"""
Forum Data Embedding Generator

Process: Parse → Chunk → Embed → Save
Output: data/embeddings.json (50-70 MB, 2500+ chunks)
"""

import os
import json
import time
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any
from dotenv import load_dotenv
from tqdm import tqdm
from langchain_openai import OpenAIEmbeddings
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Configuration
FORUM_DIR = Path("/Users/jihyunjeong/Documents/Github/langchain/forum")
OUTPUT_FILE = Path("../../app/data/embeddings.json")
CHUNK_SIZE = 512  # tokens
CHUNK_OVERLAP = 50  # tokens
BATCH_SIZE = 10  # API rate limiting
CHAR_PER_TOKEN = 4  # Approximation

def find_markdown_files(directory: Path) -> List[Path]:
    """Find all .md files recursively"""
    return sorted(directory.rglob("*.md"))

def parse_forum_post(file_path: Path) -> Dict[str, Any]:
    """Parse markdown file to extract metadata"""
    content = file_path.read_text(encoding='utf-8')
    lines = content.split('\n')

    # Extract metadata
    title = lines[0].replace('#', '').strip() if lines else 'Untitled'
    topic_id_match = [l for l in lines[:10] if 'Topic ID:' in l]
    created_match = [l for l in lines[:10] if 'Created:' in l]
    url_match = [l for l in lines[:10] if 'URL:' in l]

    topic_id = topic_id_match[0].split(':')[-1].strip() if topic_id_match else 'unknown'
    created_at = created_match[0].split(':', 1)[-1].strip() if created_match else ''
    url = url_match[0].split(':', 1)[-1].strip() if url_match else ''

    # Extract tags from title
    tags = []
    lower_title = title.lower()
    if 'langsmith' in lower_title: tags.append('langsmith')
    if 'langgraph' in lower_title: tags.append('langgraph')
    if 'deployment' in lower_title or 'deploy' in lower_title: tags.append('deployment')
    if 'auth' in lower_title or 'login' in lower_title: tags.append('auth')
    if not tags: tags.append('general')

    return {
        'topic_id': topic_id,
        'title': title,
        'created_at': created_at,
        'url': url,
        'content': content,
        'tags': tags,
        'file_path': str(file_path)
    }

def chunk_post(post: Dict[str, Any], splitter) -> List[Dict[str, Any]]:
    """Chunk post content with metadata"""
    # Skip metadata header (first 7 lines)
    lines = post['content'].split('\n')
    content_text = '\n'.join(lines[7:])

    # Split into chunks
    chunks = splitter.create_documents([content_text])

    result = []
    for i, chunk in enumerate(chunks):
        issue_category = 'langsmith_issue' if 'langsmith' in post['tags'] else 'general_issue'

        result.append({
            'id': f"{post['topic_id']}_chunk_{i}",
            'content': chunk.page_content,
            'metadata': {
                'source': 'forum',
                'source_type': 'forum_post',
                'topic_id': post['topic_id'],
                'title': post['title'],
                'created_at': post['created_at'],
                'tags': post['tags'],
                'issue_category': issue_category,
                'url': post['url'],
                'chunk_index': i,
                'total_chunks': len(chunks)
            }
        })

    return result

def main():
    print("🚀 Forum Data Embedding Generator\n")

    # Load environment
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in .env")

    # Initialize embedder
    print("📦 Initializing OpenAI embedder (text-embedding-3-small, 1536-dim)...")
    embedder = OpenAIEmbeddings(
        model="text-embedding-3-small",
        openai_api_key=api_key
    )

    # Initialize text splitter
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE * CHAR_PER_TOKEN,
        chunk_overlap=CHUNK_OVERLAP * CHAR_PER_TOKEN,
        length_function=len
    )

    # Find forum posts
    print(f"\n📂 Scanning {FORUM_DIR}...")
    files = find_markdown_files(FORUM_DIR)
    print(f"✅ Found {len(files)} forum posts\n")

    # Process all posts
    all_documents = []

    for file_path in tqdm(files, desc="Processing posts"):
        # Parse post
        post = parse_forum_post(file_path)

        # Chunk content
        chunks = chunk_post(post, splitter)

        # Generate embeddings in batches
        for i in range(0, len(chunks), BATCH_SIZE):
            batch = chunks[i:i+BATCH_SIZE]
            texts = [c['content'] for c in batch]

            try:
                embeddings = embedder.embed_documents(texts)

                for chunk, embedding in zip(batch, embeddings):
                    chunk['embedding'] = embedding
                    all_documents.append(chunk)

                time.sleep(1)  # Rate limiting

            except Exception as e:
                print(f"\n⚠️  Error processing batch: {e}")
                continue

    # Prepare output
    output_data = {
        'metadata': {
            'total_documents': len(files),
            'total_chunks': len(all_documents),
            'embedding_model': 'text-embedding-3-small',
            'dimensions': 1536,
            'chunk_size': CHUNK_SIZE,
            'chunk_overlap': CHUNK_OVERLAP,
            'generated_at': datetime.now().isoformat()
        },
        'documents': all_documents
    }

    # Save to file
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    print(f"\n💾 Saving {len(all_documents)} chunks to {OUTPUT_FILE}...")

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False)

    file_size_mb = OUTPUT_FILE.stat().st_size / (1024 * 1024)
    print(f"✅ Saved {file_size_mb:.1f} MB\n")
    print(f"🎉 Embedding generation complete!")
    print(f"   - Documents: {len(files)}")
    print(f"   - Chunks: {len(all_documents)}")
    print(f"   - Model: text-embedding-3-small (1536-dim)")

if __name__ == "__main__":
    main()
