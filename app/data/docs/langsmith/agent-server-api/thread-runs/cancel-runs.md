---
title: "Cancel Runs"
url: "https://docs.langchain.com/langsmith/agent-server-api/thread-runs/cancel-runs"
section: "langsmith/agent-server-api/thread-runs"
last_modified: "2026-01-13T21:36:22.721Z"
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

Cancel Runs

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

Cancel Runs

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/runs/cancel \
  --header 'Content-Type: application/json' \
  --data '
{
  "status": "pending",
  "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "run_ids": [
    "3c90c3cc-0d44-4b50-8888-8dd25736052a"
  ]
}
'
```

404

422

Copy

```
{
  "detail": "<string>"
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Thread Runs](/langsmith/agent-server-api/thread-runs/list-runs)

# Cancel Runs

Copy page

Cancel one or more runs. Can cancel runs by thread ID and run IDs, or by status filter.

Copy page

POST

/

runs

/

cancel

Try it

Cancel Runs

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/runs/cancel \
  --header 'Content-Type: application/json' \
  --data '
{
  "status": "pending",
  "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "run_ids": [
    "3c90c3cc-0d44-4b50-8888-8dd25736052a"
  ]
}
'
```

404

422

Copy

```
{
  "detail": "<string>"
}
```

#### Query Parameters

[​

](#parameter-action)

action

enum<string>

default:interrupt

Action to take when cancelling the run. Possible values are `interrupt` or `rollback`. `interrupt` will simply cancel the run. `rollback` will cancel the run and delete the run and associated checkpoints afterwards.

Available options:

`interrupt`,

`rollback`

#### Body

application/json

-   RunsCancel
    
-   RunsCancel
    

Payload for cancelling runs.

[​

](#body-one-of-0-status)

status

enum<string>

required

Filter runs by status to cancel. Must be one of 'pending', 'running', or 'all'.

Available options:

`pending`,

`running`,

`all`

[​

](#body-one-of-0-thread-id)

thread\_id

string<uuid>

The ID of the thread containing runs to cancel.

[​

](#body-one-of-0-run-ids)

run\_ids

string<uuid>\[\]

List of run IDs to cancel.

#### Response

204

Success - Runs cancelled

Was this page helpful?

YesNo

[

Cancel Run

Previous



](/langsmith/agent-server-api/thread-runs/cancel-run)[

Create Thread Cron

Next



](/langsmith/agent-server-api/crons-plus-tier/create-thread-cron)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)