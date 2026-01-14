---
title: "List Runs"
url: "https://docs.langchain.com/langsmith/agent-server-api/thread-runs/list-runs"
section: "langsmith/agent-server-api/thread-runs"
last_modified: "2026-01-13T21:36:22.602Z"
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

List Runs

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

List Runs

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/threads/{thread_id}/runs
```

200

404

422

Copy

```
[
  {
    "run_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "created_at": "2023-11-07T05:31:56Z",
    "updated_at": "2023-11-07T05:31:56Z",
    "status": "pending",
    "metadata": {},
    "kwargs": {},
    "multitask_strategy": "reject"
  }
]
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Thread Runs](/langsmith/agent-server-api/thread-runs/list-runs)

# List Runs

Copy page

List runs for a thread.

Copy page

GET

/

threads

/

{thread\_id}

/

runs

Try it

List Runs

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/threads/{thread_id}/runs
```

200

404

422

Copy

```
[
  {
    "run_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "created_at": "2023-11-07T05:31:56Z",
    "updated_at": "2023-11-07T05:31:56Z",
    "status": "pending",
    "metadata": {},
    "kwargs": {},
    "multitask_strategy": "reject"
  }
]
```

#### Path Parameters

[​

](#parameter-thread-id)

thread\_id

string<uuid>

required

The ID of the thread.

#### Query Parameters

[​

](#parameter-limit)

limit

integer

default:10

[​

](#parameter-offset)

offset

integer

default:0

[​

](#parameter-status)

status

enum<string>

Available options:

`pending`,

`error`,

`success`,

`timeout`,

`interrupted`

[​

](#parameter-select)

select

enum<string>\[\]

Specify which fields to return. If not provided, all fields are returned.

Available options:

`run_id`,

`thread_id`,

`assistant_id`,

`created_at`,

`updated_at`,

`status`,

`metadata`,

`kwargs`,

`multitask_strategy`

#### Response

200

application/json

Success

[​

](#response-items-run-id)

run\_id

string<uuid>

required

The ID of the run.

[​

](#response-items-thread-id)

thread\_id

string<uuid>

required

The ID of the thread.

[​

](#response-items-assistant-id)

assistant\_id

string<uuid>

required

The assistant that was used for this run.

[​

](#response-items-created-at)

created\_at

string<date-time>

required

The time the run was created.

[​

](#response-items-updated-at)

updated\_at

string<date-time>

required

The last time the run was updated.

[​

](#response-items-status)

status

enum<string>

required

The status of the run. One of 'pending', 'running', 'error', 'success', 'timeout', 'interrupted'.

Available options:

`pending`,

`running`,

`error`,

`success`,

`timeout`,

`interrupted`

[​

](#response-items-metadata)

metadata

Metadata · object

required

The run metadata.

[​

](#response-items-kwargs)

kwargs

Kwargs · object

required

[​

](#response-items-multitask-strategy)

multitask\_strategy

enum<string>

required

Strategy to handle concurrent runs on the same thread.

Available options:

`reject`,

`rollback`,

`interrupt`,

`enqueue`

Was this page helpful?

YesNo

[

Join Thread Stream

Previous



](/langsmith/agent-server-api/threads/join-thread-stream)[

Create Background Run

Next



](/langsmith/agent-server-api/thread-runs/create-background-run)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)