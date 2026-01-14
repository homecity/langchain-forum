# LLM invoked in Tool streams to Main Chat Panel - Can not redirect or filter Next.js client

**Topic ID:** 889
**Created:** 2025-08-02 01:28:55
**URL:** https://forum.langchain.com/t/889

---

## Post #1 by @rdtiv
*Posted on 2025-08-02 01:28:55*

[#p-1449-llm-invoked-in-tool-streams-to-main-chat-panel-cannot-redirect-or-filter-1]()**LLM Invoked in Tool Streams to Main Chat Panel – Cannot Redirect or Filter**
**Purpose**: Document streaming issue for LangGraph development team

**Issue**: When invoking an LLM inside a tool with streaming enabled, the content streams directly to the main chat UI and cannot be intercepted, redirected, or filtered.

[#p-1449-executive-summary-2]()**Executive Summary**
We’re building a document creation tool that uses an LLM to generate content. When the LLM is invoked inside our tool with streaming enabled (disable_streaming=False), the generated content streams directly to the main chat panel in our UI. We’ve tried multiple approaches to intercept, redirect, or filter these tokens but have been unsuccessful.

**We need a way to prevent LLM content generated inside a tool from appearing in the main message stream.**

[#p-1449-system-architecture-3]()**System Architecture**
[#p-1449-stack-4]()**Stack**


**Backend**: LangGraph Platform with Python tools



**Frontend**: Next.js with LangGraph SDK



**LLM**: Claude (via langchain_anthropic)



**Stream Mode**: messages-tuple, updates, custom (configured), though server logs show values is also included



[#p-1449-tool-implementation-5]()**Tool Implementation**

```
`# /agent/tools/document.py

from langchain_core.tools import tool
from langchain_anthropic import ChatAnthropic
from langgraph.config import get_stream_writer, get_config
import os

def get_claude_client(enable_streaming=False):
    """Get Claude client with streaming configuration"""
    api_key = os.getenv("ANTHROPIC_API_KEY")
    return ChatAnthropic(
        model="claude-3-5-sonnet-20241022",
        api_key=api_key,
        temperature=0.7,
        max_tokens=4096,
        disable_streaming=not enable_streaming
    )

@tool(response_format="content_and_artifact")
def create_document(query: str, title: str = "") -> tuple[str, dict]:
    """Create a document using AI generation"""
    config = get_config()
    tool_call_id = config.get("tool_call_id", "unknown")
    writer = get_stream_writer()

    # Feature flag for streaming
    enable_streaming = os.getenv("FEATURE_DOCUMENT_STREAMING", "false").lower() == "true"

    # Generate document content
    claude = get_claude_client(enable_streaming=enable_streaming)

    # THIS IS WHERE THE PROBLEM OCCURS
    # When streaming is enabled, this content goes directly to the chat UI
    response = claude.invoke([
        {"role": "system", "content": "You are a document creator..."},
        {"role": "user", "content": query}
    ])

    document_content = response.content

    # Return tuple for LangGraph
    llm_content = f"I've created a document titled '{title}'"
    artifact = {
        "tool_name": "create_document",
        "result": {"content": document_content}
    }
    return (llm_content, artifact)
`
```

[#p-1449-the-problem-in-detail-6]()**The Problem in Detail**
[#p-1449-what-happens-7]()**What Happens**


User requests document creation



Tool is invoked by LangGraph



Tool calls claude.invoke() with streaming enabled



**Content streams directly to the chat UI** (undesired behavior)



Content also appears in the tool’s artifact result



[#p-1449-what-we-want-8]()**What We Want**


User requests document creation



Tool is invoked by LangGraph



Tool generates content with LLM



**Content streams ONLY to a document panel** (not main chat)



Only the summary message appears in chat



[#p-1449-attempted-solutions-9]()**Attempted Solutions**
[#p-1449-h-1-message-filtering-failed-10]()**1. Message Filtering (Failed)**

```
`// /client/src/hooks/useChat.ts
const filteredMessages = rawMessages.filter((message) => {
  if (message.type === 'ai' && activeDocuments.has(message.metadata?.tool_call_id)) {
    // Try to filter out document content
    return false;
  }
  return true;
});
`
```

**Result**: Filtering happens too late — UI has already rendered the content.

[#p-1449-h-2-onmessage-handler-failed-11]()**2. onMessage Handler (Failed)**

```
`const { messages } = useChat({
  onMessage: (message, metadata) => {
    if (metadata?.tool_name === 'create_document') {
      // Try to intercept and redirect
      return; // This doesn’t prevent rendering
    }
  }
});
`
```

**Result**: onMessage is not called when using messages-tuple stream mode.

[#p-1449-h-3-custom-events-approach-partially-working-12]()**3. Custom Events Approach (Partially Working)**

```
`# Emit custom events alongside normal streaming
if enable_streaming and writer:
    writer({
        "type": "document_token",
        "data": {
            "document_id": doc_id,
            "content": chunk
        }
    })
`
```

**Result**:



 Custom events are received by client



 We may handle them in a separate UI component (TBD)



 Content *still* appears in main chat (duplicate display)



[#p-1449-h-4-stream-method-instead-of-invoke-failed-13]()**4. .stream() Method Instead of  .invoke() (Failed)**

```
`# Attempt to use stream() to control output
stream = claude.stream(messages)
for chunk in stream:
    # Emit only as custom events
    writer({"type": "document_token", "data": {"content": chunk.content}})
`
```

**Result**: Same issue — content still goes to message stream.

[#p-1449-core-issue-14]()**Core Issue**
The fundamental problem is that when an LLM is invoked inside a LangGraph tool with streaming enabled, the tokens are **automatically** added to the message stream. There doesn’t appear to be a way to:



Prevent tokens from entering the message stream



Redirect tokens to custom events only



Filter tokens before they reach the UI



Mark tokens as “internal” or “hidden”



[#p-1449-what-we-need-15]()**What We Need**
[#p-1449-option-1-prevent-stream-injection-16]()**Option 1: Prevent Stream Injection**

```
`# Hypothetical API
response = claude.invoke(messages, add_to_stream=False)
`
```

[#p-1449-option-2-stream-interception-17]()**Option 2: Stream Interception**

```
`# Hypothetical API
response = claude.invoke(messages, stream_handler=custom_handler)
`
```

[#p-1449-questions-for-langgraph-team-18]()**Questions for LangGraph Team**


Is there a recommended pattern for using LLMs inside tools without streaming to the main chat?



Can we intercept or redirect the stream before it reaches the message stream?



Are we missing a configuration option or API that would solve this?



[#p-1449-reproduction-steps-19]()**Reproduction Steps**


Create a tool that invokes an LLM with streaming enabled



Use the tool in a LangGraph agent



Connect a client with messages-tuple stream mode



Observe that LLM content streams to the main chat UI



[#p-1449-environment-20]()**Environment**

```
`{
  "langgraph": "^0.2.0",
  "langchain": "^0.3.0",
  "langchain_anthropic": "^0.2.0",
  "@langchain/langgraph-sdk": "^0.0.21"
}
`
```

[#p-1449-related-issues-21]()**Related Issues**

Streaming content to specific UI components (not main chat)


However, we haven’t found any working solutions or official guidance on this pattern.


[#p-1449-contact-22]()**Contact**
We’re happy to provide more code examples, test different approaches, or work with the team to find a solution. This is a critical feature for our document creation workflow, where we want to show document content in a dedicated panel — **not** mixed with the conversation.


Let me know if you’d like this converted to a PDF, integrated into a GitHub issue template, or sent as part of an email.

---
