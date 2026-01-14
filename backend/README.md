# LangChain Forum RAG Backend

Python backend using **LangServe** for the LangChain Forum RAG system.

## Quick Start

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -e .

# Copy environment variables
cp .env.example .env
# Edit .env with your API keys

# Run the server
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | RAG query endpoint |
| `/api/chat/stream` | POST | Streaming RAG endpoint |
| `/api/evaluation` | GET | LangSmith evaluation data |
| `/langserve/chat/playground` | GET | LangServe interactive playground |

## Environment Variables

```bash
OPENAI_API_KEY=sk-...          # Required: OpenAI API key
LANGSMITH_API_KEY=lsv2_...     # Optional: LangSmith tracing
LANGCHAIN_TRACING_V2=true      # Enable tracing
LANGCHAIN_PROJECT=langchain-forum-rag
USE_MOCK_CHAT=false            # Use mock responses for testing
```

## Architecture

```
Next.js Frontend (port 3000)
        ↓
Python LangServe Backend (port 8000)
        ↓
    LCEL RAG Chain
    (Embed → Retrieve → Rerank → Generate)
        ↓
    LangSmith Tracing
```

## Key Components

- **LCEL Chain** (`app/chains/rag_chain.py`) - LangChain Expression Language RAG pipeline
- **Vector Retriever** (`app/components/retriever.py`) - FAISS-based similarity search
- **Cross-Encoder Reranker** (`app/components/reranker.py`) - Rerank by query-document relevance
- **RAG Evaluator** (`app/components/evaluator.py`) - Faithfulness/relevance scoring

## Interview Talking Points

1. **LCEL (LangChain Expression Language)**
   - Composable chains with `|` operator
   - `RunnablePassthrough`, `RunnableParallel` for data flow

2. **LangServe Benefits**
   - Auto-generated `/playground` for testing
   - Built-in streaming support

3. **Vector Store Choice (FAISS)**
   - Efficient for 2493 documents
   - Pre-computed embeddings

4. **LangSmith Integration**
   - Automatic tracing (no code changes)
