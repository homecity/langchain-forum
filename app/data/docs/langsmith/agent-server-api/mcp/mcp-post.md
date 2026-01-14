---
title: "MCP Post"
url: "https://docs.langchain.com/langsmith/agent-server-api/mcp/mcp-post"
section: "langsmith/agent-server-api/mcp"
last_modified: "2026-01-13T21:36:22.827Z"
---
 

[Skip to main content](#content-area)

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

LangSmith

Search...

⌘K

-   [Support](https://support.langchain.com/)
-   [GitHub](https://github.com/langchain-ai)
-   [Try LangSmith](https://smith.langchain.com/)
-   [
    
    Try LangSmith
    
    ](https://smith.langchain.com/)

Search...

Navigation

MCP

MCP Post

[Get started

](/langsmith/home)[Observability

](/langsmith/observability)[Evaluation

](/langsmith/evaluation)[Prompt engineering

](/langsmith/prompt-engineering)[Deployment

](/langsmith/deployments)[Platform setup

](/langsmith/platform-setup)[Reference

](/langsmith/reference)

-   [
    
    Overview
    
    
    
    ](/langsmith/reference)

-   [
    
    LangSmith Python SDK
    
    
    
    ](https://reference.langchain.com/python/langsmith/observability/sdk/)

-   [
    
    LangSmith JS/TS SDK
    
    
    
    ](https://reference.langchain.com/javascript/modules/langsmith.html)

-   [
    
    LangGraph Python SDK
    
    
    
    ](https://reference.langchain.com/python/langgraph/)

-   [
    
    LangGraph JS/TS SDK
    
    
    
    ](https://reference.langchain.com/javascript/modules/_langchain_langgraph-sdk.html)

-   [
    
    LangSmith API
    
    
    
    ](https://api.smith.langchain.com/redoc)

##### LangSmith Deployment

-   Agent Server API
    
    -   [
        
        Overview
        
        
        
        ](/langsmith/server-api-ref)
    -   Assistants
        
    -   Threads
        
    -   Thread Runs
        
    -   Crons (Plus tier)
        
    -   Stateless Runs
        
    -   Store
        
    -   A2A
        
    -   MCP
        
        -   [GET
            
            MCP Get
            
            
            
            ](/langsmith/agent-server-api/mcp/mcp-get)
        -   [POST
            
            MCP Post
            
            
            
            ](/langsmith/agent-server-api/mcp/mcp-post)
        -   [DEL
            
            Terminate Session
            
            
            
            ](/langsmith/agent-server-api/mcp/terminate-session)
    -   System
        
-   Control Plane API
    
-   [
    
    LangGraph CLI
    
    
    
    ](/langsmith/cli)
-   [
    
    RemoteGraph
    
    
    
    ](https://reference.langchain.com/python/langsmith/deployment/remote_graph/)
-   [
    
    Agent Server environment variables
    
    
    
    ](/langsmith/env-var)

##### Releases

-   [
    
    Agent Server changelog
    
    
    
    ](/langsmith/agent-server-changelog)
-   [
    
    Self-hosted changelog
    
    
    
    ](/langsmith/self-hosted-changelog)
-   [
    
    Release versions
    
    
    
    ](/langsmith/release-versions)

MCP Post

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/mcp/ \
  --header 'Accept: <accept>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "initialize",
  "params": {
    "clientInfo": {
      "name": "test_client",
      "version": "1.0.0"
    },
    "protocolVersion": "2024-11-05",
    "capabilities": {}
  }
}
'
```

200

Copy

```
{}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[MCP](/langsmith/agent-server-api/mcp/mcp-get)

# MCP Post

Copy page

Implemented according to the Streamable HTTP Transport specification. Sends a JSON-RPC 2.0 message to the server.

-   **Request**: Provide an object with `jsonrpc`, `id`, `method`, and optional `params`.
-   **Response**: Returns a JSON-RPC response or acknowledgment.

**Notes:**

-   Stateless: Sessions are not persisted across requests.

Copy page

POST

/

mcp

Try it

MCP Post

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/mcp/ \
  --header 'Accept: <accept>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "initialize",
  "params": {
    "clientInfo": {
      "name": "test_client",
      "version": "1.0.0"
    },
    "protocolVersion": "2024-11-05",
    "capabilities": {}
  }
}
'
```

200

Copy

```
{}
```

#### Headers

[​

](#parameter-accept)

Accept

enum<string>

required

Accept header must include both 'application/json' and 'text/event-stream' media types.

Available options:

`application/json, text/event-stream`

#### Body

application/json

A JSON-RPC 2.0 request, notification, or response object.

#### Response

200

application/json

Successful JSON-RPC response.

The response is of type `object`.

Was this page helpful?

YesNo

[

MCP Get

Previous



](/langsmith/agent-server-api/mcp/mcp-get)[

Terminate Session

Next



](/langsmith/agent-server-api/mcp/terminate-session)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)