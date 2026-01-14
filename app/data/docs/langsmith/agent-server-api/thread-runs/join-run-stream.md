---
title: "Join Run Stream"
url: "https://docs.langchain.com/langsmith/agent-server-api/thread-runs/join-run-stream"
section: "langsmith/agent-server-api/thread-runs"
last_modified: "2026-01-13T21:36:22.669Z"
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

Thread Runs

Join Run Stream

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
        
        -   [GET
            
            List Runs
            
            
            
            ](/langsmith/agent-server-api/thread-runs/list-runs)
        -   [POST
            
            Create Background Run
            
            
            
            ](/langsmith/agent-server-api/thread-runs/create-background-run)
        -   [POST
            
            Create Run, Stream Output
            
            
            
            ](/langsmith/agent-server-api/thread-runs/create-run-stream-output)
        -   [POST
            
            Create Run, Wait for Output
            
            
            
            ](/langsmith/agent-server-api/thread-runs/create-run-wait-for-output)
        -   [GET
            
            Get Run
            
            
            
            ](/langsmith/agent-server-api/thread-runs/get-run)
        -   [DEL
            
            Delete Run
            
            
            
            ](/langsmith/agent-server-api/thread-runs/delete-run)
        -   [GET
            
            Join Run
            
            
            
            ](/langsmith/agent-server-api/thread-runs/join-run)
        -   [GET
            
            Join Run Stream
            
            
            
            ](/langsmith/agent-server-api/thread-runs/join-run-stream)
        -   [POST
            
            Cancel Run
            
            
            
            ](/langsmith/agent-server-api/thread-runs/cancel-run)
        -   [POST
            
            Cancel Runs
            
            
            
            ](/langsmith/agent-server-api/thread-runs/cancel-runs)
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

Join Run Stream

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/threads/{thread_id}/runs/{run_id}/stream
```

200

404

422

Copy

```
"<string>"
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Thread Runs](/langsmith/agent-server-api/thread-runs/list-runs)

# Join Run Stream

Copy page

Join a run stream. This endpoint streams output in real-time from a run similar to the /threads/**THREAD\_ID**/runs/stream endpoint. If the run has been created with `stream_resumable=true`, the stream can be resumed from the last seen event ID.

Copy page

GET

/

threads

/

{thread\_id}

/

runs

/

{run\_id}

/

stream

Try it

Join Run Stream

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/threads/{thread_id}/runs/{run_id}/stream
```

200

404

422

Copy

```
"<string>"
```

#### Headers

[​

](#parameter-last-event-id)

Last-Event-ID

string

The ID of the last event received. Set to -1 if you want to stream all events. Requires `stream_resumable=true` to be set when creating the run.

#### Path Parameters

[​

](#parameter-thread-id)

thread\_id

string<uuid>

required

The ID of the thread.

[​

](#parameter-run-id)

run\_id

string<uuid>

required

The ID of the run.

#### Query Parameters

[​

](#parameter-stream-mode)

stream\_mode

string

The mode to stream the run in. If not provided, the default mode will be used.

[​

](#parameter-cancel-on-disconnect)

cancel\_on\_disconnect

boolean

default:false

If true, the run will be cancelled if the client disconnects.

#### Response

200

text/event-stream

Success

The server will send a stream of events in SSE format.

Example event:

id: 1

event: message

data: {}

Was this page helpful?

YesNo

[

Join Run

Previous



](/langsmith/agent-server-api/thread-runs/join-run)[

Cancel Run

Next



](/langsmith/agent-server-api/thread-runs/cancel-run)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)