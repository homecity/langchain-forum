---
title: "Create Background Run"
url: "https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-background-run"
section: "langsmith/agent-server-api/thread-runs"
last_modified: "2026-01-13T21:36:22.612Z"
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

Create Background Run

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

Create Background Run

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/threads/{thread_id}/runs \
  --header 'Content-Type: application/json' \
  --data '
{
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "checkpoint": {
    "thread_id": "<string>",
    "checkpoint_ns": "<string>",
    "checkpoint_id": "<string>",
    "checkpoint_map": {}
  },
  "input": {},
  "command": {
    "update": {},
    "resume": {},
    "goto": {
      "node": "<string>",
      "input": {}
    }
  },
  "metadata": {},
  "config": {
    "tags": [
      "<string>"
    ],
    "recursion_limit": 123,
    "configurable": {}
  },
  "context": {},
  "webhook": "<string>",
  "interrupt_before": "*",
  "interrupt_after": "*",
  "stream_mode": [
    "values"
  ],
  "stream_subgraphs": false,
  "stream_resumable": false,
  "on_disconnect": "continue",
  "feedback_keys": [
    "<string>"
  ],
  "multitask_strategy": "enqueue",
  "if_not_exists": "reject",
  "after_seconds": 123,
  "checkpoint_during": false,
  "durability": "async"
}
'
```

200

404

409

422

Copy

```
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
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Thread Runs](/langsmith/agent-server-api/thread-runs/list-runs)

# Create Background Run

Copy page

Create a run in existing thread, return the run ID immediately. Don’t wait for the final run output.

Copy page

POST

/

threads

/

{thread\_id}

/

runs

Try it

Create Background Run

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/threads/{thread_id}/runs \
  --header 'Content-Type: application/json' \
  --data '
{
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "checkpoint": {
    "thread_id": "<string>",
    "checkpoint_ns": "<string>",
    "checkpoint_id": "<string>",
    "checkpoint_map": {}
  },
  "input": {},
  "command": {
    "update": {},
    "resume": {},
    "goto": {
      "node": "<string>",
      "input": {}
    }
  },
  "metadata": {},
  "config": {
    "tags": [
      "<string>"
    ],
    "recursion_limit": 123,
    "configurable": {}
  },
  "context": {},
  "webhook": "<string>",
  "interrupt_before": "*",
  "interrupt_after": "*",
  "stream_mode": [
    "values"
  ],
  "stream_subgraphs": false,
  "stream_resumable": false,
  "on_disconnect": "continue",
  "feedback_keys": [
    "<string>"
  ],
  "multitask_strategy": "enqueue",
  "if_not_exists": "reject",
  "after_seconds": 123,
  "checkpoint_during": false,
  "durability": "async"
}
'
```

200

404

409

422

Copy

```
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
```

#### Path Parameters

[​

](#parameter-thread-id)

thread\_id

string<uuid>

required

The ID of the thread.

#### Body

application/json

Payload for creating a run.

[​

](#body-assistant-id-one-of-0)

assistant\_id

string<uuid>stringstring<uuid>string

required

The assistant ID or graph name to run. If using graph name, will default to first assistant created from that graph.

[​

](#body-checkpoint)

checkpoint

Checkpoint · object

The checkpoint to resume from.

Show child attributes

[​

](#body-input-one-of-0)

input

Input · objectany\[\]stringnumberbooleanInput · objectany\[\]stringnumberboolean

The input to the graph.

[​

](#body-command-one-of-0)

command

Command · object

The command to run.

Show child attributes

[​

](#body-metadata)

metadata

Metadata · object

Metadata to assign to the run.

[​

](#body-config)

config

Config · object

The configuration for the assistant.

Show child attributes

[​

](#body-context)

context

Context · object

Static context added to the assistant.

[​

](#body-webhook)

webhook

string<uri-reference>

Webhook to call after LangGraph API call is done.

Required string length: `1 - 65536`

[​

](#body-interrupt-before-one-of-0)

interrupt\_before

enum<string>string\[\]enum<string>string\[\]

Nodes to interrupt immediately before they get executed.

Available options:

`*`

[​

](#body-interrupt-after-one-of-0)

interrupt\_after

enum<string>string\[\]enum<string>string\[\]

Nodes to interrupt immediately after they get executed.

Available options:

`*`

[​

](#body-stream-mode-one-of-0)

stream\_mode

enum<string>\[\]enum<string>enum<string>\[\]enum<string>

The stream mode(s) to use.

Available options:

`values`,

`messages`,

`messages-tuple`,

`tasks`,

`checkpoints`,

`updates`,

`events`,

`debug`,

`custom`

[​

](#body-stream-subgraphs)

stream\_subgraphs

boolean

default:false

Whether to stream output from subgraphs.

[​

](#body-stream-resumable)

stream\_resumable

boolean

default:false

Whether to persist the stream chunks in order to resume the stream later.

[​

](#body-on-disconnect)

on\_disconnect

enum<string>

default:continue

The disconnect mode to use. Must be one of 'cancel' or 'continue'.

Available options:

`cancel`,

`continue`

[​

](#body-feedback-keys)

feedback\_keys

string\[\]

Feedback keys to assign to run.

[​

](#body-multitask-strategy)

multitask\_strategy

enum<string>

default:enqueue

Multitask strategy to use. Must be one of 'reject', 'interrupt', 'rollback', or 'enqueue'.

Available options:

`reject`,

`rollback`,

`interrupt`,

`enqueue`

[​

](#body-if-not-exists)

if\_not\_exists

enum<string>

default:reject

How to handle missing thread. Must be either 'reject' (raise error if missing), or 'create' (create new thread).

Available options:

`create`,

`reject`

[​

](#body-after-seconds)

after\_seconds

number

The number of seconds to wait before starting the run. Use to schedule future runs.

[​

](#body-checkpoint-during)

checkpoint\_during

boolean

default:false

Whether to checkpoint during the run.

[​

](#body-durability)

durability

enum<string>

default:async

Durability level for the run. Must be one of 'sync', 'async', or 'exit'.

Available options:

`sync`,

`async`,

`exit`

#### Response

200

application/json

Success

[​

](#response-run-id)

run\_id

string<uuid>

required

The ID of the run.

[​

](#response-thread-id)

thread\_id

string<uuid>

required

The ID of the thread.

[​

](#response-assistant-id)

assistant\_id

string<uuid>

required

The assistant that was used for this run.

[​

](#response-created-at)

created\_at

string<date-time>

required

The time the run was created.

[​

](#response-updated-at)

updated\_at

string<date-time>

required

The last time the run was updated.

[​

](#response-status)

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

](#response-metadata)

metadata

Metadata · object

required

The run metadata.

[​

](#response-kwargs)

kwargs

Kwargs · object

required

[​

](#response-multitask-strategy)

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

List Runs

Previous



](/langsmith/agent-server-api/thread-runs/list-runs)[

Create Run, Stream Output

Next



](/langsmith/agent-server-api/thread-runs/create-run-stream-output)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)