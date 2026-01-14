---
title: "Create Thread"
url: "https://docs.langchain.com/langsmith/agent-server-api/threads/create-thread"
section: "langsmith/agent-server-api/threads"
last_modified: "2026-01-13T21:36:22.471Z"
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

Create Thread

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

Create Thread

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/threads \
  --header 'Content-Type: application/json' \
  --data '
{
  "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "metadata": {},
  "if_exists": "raise",
  "ttl": {
    "strategy": "delete",
    "ttl": 123
  },
  "supersteps": [
    {
      "updates": [
        {
          "as_node": "<string>",
          "values": [
            {}
          ],
          "command": {
            "update": {},
            "resume": {},
            "goto": {
              "node": "<string>",
              "input": {}
            }
          }
        }
      ]
    }
  ]
}
'
```

200

409

422

Copy

```
{
  "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "created_at": "2023-11-07T05:31:56Z",
  "updated_at": "2023-11-07T05:31:56Z",
  "metadata": {},
  "status": "idle",
  "config": {},
  "values": {},
  "interrupts": {},
  "ttl": {
    "strategy": "delete",
    "ttl_minutes": 123,
    "expires_at": "2023-11-07T05:31:56Z"
  }
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Threads](/langsmith/agent-server-api/threads/create-thread)

# Create Thread

Copy page

Create a thread.

Copy page

POST

/

threads

Try it

Create Thread

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/threads \
  --header 'Content-Type: application/json' \
  --data '
{
  "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "metadata": {},
  "if_exists": "raise",
  "ttl": {
    "strategy": "delete",
    "ttl": 123
  },
  "supersteps": [
    {
      "updates": [
        {
          "as_node": "<string>",
          "values": [
            {}
          ],
          "command": {
            "update": {},
            "resume": {},
            "goto": {
              "node": "<string>",
              "input": {}
            }
          }
        }
      ]
    }
  ]
}
'
```

200

409

422

Copy

```
{
  "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "created_at": "2023-11-07T05:31:56Z",
  "updated_at": "2023-11-07T05:31:56Z",
  "metadata": {},
  "status": "idle",
  "config": {},
  "values": {},
  "interrupts": {},
  "ttl": {
    "strategy": "delete",
    "ttl_minutes": 123,
    "expires_at": "2023-11-07T05:31:56Z"
  }
}
```

#### Body

application/json

Payload for creating a thread.

[​

](#body-thread-id)

thread\_id

string<uuid>

The ID of the thread. If not provided, a random UUID will be generated.

[​

](#body-metadata)

metadata

Metadata · object

Metadata to add to thread.

[​

](#body-if-exists)

if\_exists

enum<string>

default:raise

How to handle duplicate creation. Must be either 'raise' (raise error if duplicate), or 'do\_nothing' (return existing thread).

Available options:

`raise`,

`do_nothing`

[​

](#body-ttl)

ttl

TTL · object

The time-to-live for the thread.

Show child attributes

[​

](#body-supersteps)

supersteps

object\[\]

Show child attributes

#### Response

200

application/json

Success

[​

](#response-thread-id)

thread\_id

string<uuid>

required

The ID of the thread.

[​

](#response-created-at)

created\_at

string<date-time>

required

The time the thread was created.

[​

](#response-updated-at)

updated\_at

string<date-time>

required

The last time the thread was updated.

[​

](#response-metadata)

metadata

Metadata · object

required

The thread metadata.

[​

](#response-status)

status

enum<string>

required

The status of the thread.

Available options:

`idle`,

`busy`,

`interrupted`,

`error`

[​

](#response-config)

config

Config · object

The thread config.

[​

](#response-values)

values

Values · object

The current state of the thread.

[​

](#response-interrupts)

interrupts

Interrupts · object

The current interrupts of the thread.

[​

](#response-ttl)

ttl

TTL Info · object

TTL information if set for this thread. Only present when ?include=ttl is passed.

Show child attributes

Was this page helpful?

YesNo

[

Set Latest Assistant Version

Previous



](/langsmith/agent-server-api/assistants/set-latest-assistant-version)[

Search Threads

Next



](/langsmith/agent-server-api/threads/search-threads)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)