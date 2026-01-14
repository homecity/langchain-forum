// RAG Pipeline Test Setup
// Mock environment variables for testing
process.env.GEMINI_API_KEY = 'test-api-key'
process.env.LANGSMITH_API_KEY = 'test-langsmith-key'
process.env.LANGCHAIN_TRACING_V2 = 'false' // Disable tracing in tests

// Global test timeout (10 seconds for RAG tests)
jest.setTimeout(10000)
