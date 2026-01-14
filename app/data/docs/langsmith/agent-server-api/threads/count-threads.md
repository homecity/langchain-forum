---
title: "Count Threads"
url: "https://docs.langchain.com/langsmith/agent-server-api/threads/count-threads"
section: "langsmith/agent-server-api/threads"
last_modified: "2026-01-13T21:36:22.490Z"
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

Threads

Count Threads

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
        
        -   [POST
            
            Create Thread
            
            
            
            ](/langsmith/agent-server-api/threads/create-thread)
        -   [POST
            
            Search Threads
            
            
            
            ](/langsmith/agent-server-api/threads/search-threads)
        -   [POST
            
            Count Threads
            
            
            
            ](/langsmith/agent-server-api/threads/count-threads)
        -   [POST
            
            Prune Threads
            
            
            
            ](/langsmith/agent-server-api/threads/prune-threads)
        -   [GET
            
            Get Thread State
            
            
            
            ](/langsmith/agent-server-api/threads/get-thread-state)
        -   [POST
            
            Update Thread State
            
            
            
            ](/langsmith/agent-server-api/threads/update-thread-state)
        -   [GET
            
            Get Thread State At Checkpoint
            
            
            
            ](/langsmith/agent-server-api/threads/get-thread-state-at-checkpoint)
        -   [POST
            
            Get Thread State At Checkpoint
            
            
            
            ](/langsmith/agent-server-api/threads/get-thread-state-at-checkpoint-1)
        -   [GET
            
            Get Thread History
            
            
            
            ](/langsmith/agent-server-api/threads/get-thread-history)
        -   [POST
            
            Get Thread History Post
            
            
            
            ](/langsmith/agent-server-api/threads/get-thread-history-post)
        -   [POST
            
            Copy Thread
            
            
            
            ](/langsmith/agent-server-api/threads/copy-thread)
        -   [GET
            
            Get Thread
            
            
            
            ](/langsmith/agent-server-api/threads/get-thread)
        -   [DEL
            
            Delete Thread
            
            
            
            ](/langsmith/agent-server-api/threads/delete-thread)
        -   [PATCH
            
            Patch Thread
            
            
            
            ](/langsmith/agent-server-api/threads/patch-thread)
        -   [GET
            
            Join Thread Stream
            
            
            
            ](/langsmith/agent-server-api/threads/join-thread-stream)
    -   Thread Runs
        
    -   Crons (Plus tier)
        
    -   Stateless Runs
        
    -   Store
        
    -   A2A
        
    -   MCP
        
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

Count Threads

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/threads/count \
  --header 'Content-Type: application/json' \
  --data '
{
  "metadata": {},
  "values": {},
  "status": "idle"
}
'
```

200

404

422

Copy

```
123
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Threads](/langsmith/agent-server-api/threads/create-thread)

# Count Threads

Copy page

Get the count of threads matching the specified criteria.

Copy page

POST

/

threads

/

count

Try it

Count Threads

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/threads/count \
  --header 'Content-Type: application/json' \
  --data '
{
  "metadata": {},
  "values": {},
  "status": "idle"
}
'
```

200

404

422

Copy

```
123
```

#### Body

application/json

Payload for counting threads.

[​

](#body-metadata)

metadata

Metadata · object

Thread metadata to filter on.

[​

](#body-values)

values

Values · object

State values to filter on.

[​

](#body-status)

status

enum<string>

Thread status to filter on.

Available options:

`idle`,

`busy`,

`interrupted`,

`error`

#### Response

200

application/json

Success

The response is of type `integer`.

Was this page helpful?

YesNo

[

Search Threads

Previous



](/langsmith/agent-server-api/threads/search-threads)[

Prune Threads

Next



](/langsmith/agent-server-api/threads/prune-threads)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)