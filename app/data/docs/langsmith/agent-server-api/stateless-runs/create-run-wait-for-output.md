---
title: "Create Run, Wait for Output"
url: "https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-run-wait-for-output"
section: "langsmith/agent-server-api/stateless-runs"
last_modified: "2026-01-13T21:36:22.730Z"
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

Stateless Runs

Create Run, Wait for Output

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
        
        -   [POST
            
            Create Run, Stream Output
            
            
            
            ](/langsmith/agent-server-api/stateless-runs/create-run-stream-output)
        -   [POST
            
            Create Run, Wait for Output
            
            
            
            ](/langsmith/agent-server-api/stateless-runs/create-run-wait-for-output)
        -   [POST
            
            Create Background Run
            
            
            
            ](/langsmith/agent-server-api/stateless-runs/create-background-run)
        -   [POST
            
            Create Run Batch
            
            
            
            ](/langsmith/agent-server-api/stateless-runs/create-run-batch)
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

Create Run, Wait for Output

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/runs/wait \
  --header 'Content-Type: application/json' \
  --data '
{
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
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
  "stream_mode": [
    "values"
  ],
  "feedback_keys": [
    "<string>"
  ],
  "stream_subgraphs": false,
  "stream_resumable": false,
  "on_completion": "delete",
  "on_disconnect": "continue",
  "after_seconds": 123,
  "checkpoint_during": false,
  "durability": "async"
}
'
```

404

409

422

Copy

```
{
  "detail": "<string>"
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Stateless Runs](/langsmith/agent-server-api/stateless-runs/create-run-stream-output)

# Create Run, Wait for Output

Copy page

Create a run, wait for the final output and then return it.

Copy page

POST

/

runs

/

wait

Try it

Create Run, Wait for Output

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/runs/wait \
  --header 'Content-Type: application/json' \
  --data '
{
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
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
  "stream_mode": [
    "values"
  ],
  "feedback_keys": [
    "<string>"
  ],
  "stream_subgraphs": false,
  "stream_resumable": false,
  "on_completion": "delete",
  "on_disconnect": "continue",
  "after_seconds": 123,
  "checkpoint_during": false,
  "durability": "async"
}
'
```

404

409

422

Copy

```
{
  "detail": "<string>"
}
```

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

](#body-feedback-keys)

feedback\_keys

string\[\]

Feedback keys to assign to run.

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

](#body-on-completion)

on\_completion

enum<string>

default:delete

Whether to delete or keep the thread created for a stateless run. Must be one of 'delete' or 'keep'.

Available options:

`delete`,

`keep`

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

Was this page helpful?

YesNo

[

Create Run, Stream Output

Previous



](/langsmith/agent-server-api/stateless-runs/create-run-stream-output)[

Create Background Run

Next



](/langsmith/agent-server-api/stateless-runs/create-background-run)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)