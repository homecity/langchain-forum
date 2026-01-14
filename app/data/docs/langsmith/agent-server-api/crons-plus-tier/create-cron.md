---
title: "Create Cron"
url: "https://docs.langchain.com/langsmith/agent-server-api/crons-plus-tier/create-cron"
section: "langsmith/agent-server-api/crons-plus-tier"
last_modified: "2026-01-13T21:36:22.687Z"
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

Crons (Plus tier)

Create Cron

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
        
        -   [POST
            
            Create Thread Cron
            
            
            
            ](/langsmith/agent-server-api/crons-plus-tier/create-thread-cron)
        -   [POST
            
            Create Cron
            
            
            
            ](/langsmith/agent-server-api/crons-plus-tier/create-cron)
        -   [POST
            
            Search Crons
            
            
            
            ](/langsmith/agent-server-api/crons-plus-tier/search-crons)
        -   [POST
            
            Count Crons
            
            
            
            ](/langsmith/agent-server-api/crons-plus-tier/count-crons)
        -   [DEL
            
            Delete Cron
            
            
            
            ](/langsmith/agent-server-api/crons-plus-tier/delete-cron)
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

Create Cron

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/runs/crons \
  --header 'Content-Type: application/json' \
  --data '
{
  "schedule": "<string>",
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "end_time": "2023-11-07T05:31:56Z",
  "input": [
    {}
  ],
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
  "on_run_completed": "delete"
}
'
```

200

404

422

Copy

```
{
  "cron_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "end_time": "2023-11-07T05:31:56Z",
  "schedule": "<string>",
  "created_at": "2023-11-07T05:31:56Z",
  "updated_at": "2023-11-07T05:31:56Z",
  "payload": {},
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "user_id": "<string>",
  "next_run_date": "2023-11-07T05:31:56Z",
  "metadata": {}
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Crons (Plus tier)](/langsmith/agent-server-api/crons-plus-tier/create-thread-cron)

# Create Cron

Copy page

Create a cron to schedule runs on new threads.

Copy page

POST

/

runs

/

crons

Try it

Create Cron

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/runs/crons \
  --header 'Content-Type: application/json' \
  --data '
{
  "schedule": "<string>",
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "end_time": "2023-11-07T05:31:56Z",
  "input": [
    {}
  ],
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
  "on_run_completed": "delete"
}
'
```

200

404

422

Copy

```
{
  "cron_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "end_time": "2023-11-07T05:31:56Z",
  "schedule": "<string>",
  "created_at": "2023-11-07T05:31:56Z",
  "updated_at": "2023-11-07T05:31:56Z",
  "payload": {},
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "user_id": "<string>",
  "next_run_date": "2023-11-07T05:31:56Z",
  "metadata": {}
}
```

#### Body

application/json

Payload for creating a stateless cron job (creates a new thread for each execution).

[​

](#body-schedule)

schedule

string

required

The cron schedule to execute this job on.

[​

](#body-assistant-id-one-of-0)

assistant\_id

string<uuid>stringstring<uuid>string

required

The assistant ID or graph name to run. If using graph name, will default to the assistant automatically created from that graph by the server.

[​

](#body-end-time)

end\_time

string<date-time>

The end date to stop running the cron.

[​

](#body-input)

input

object

-   Input · object\[\]
    
-   Input · object
    

[​

](#body-metadata)

metadata

Metadata · object

Metadata to assign to the cron job runs.

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

](#body-on-run-completed)

on\_run\_completed

enum<string>

default:delete

What to do with the thread after the run completes. 'delete' removes the thread after execution. 'keep' creates a new thread for each execution but does not clean them up.

Available options:

`delete`,

`keep`

#### Response

200

application/json

Success

Represents a scheduled task.

[​

](#response-cron-id)

cron\_id

string<uuid>

required

The ID of the cron.

[​

](#response-thread-id)

thread\_id

string<uuid>

required

The ID of the thread.

[​

](#response-end-time)

end\_time

string<date-time>

required

The end date to stop running the cron.

[​

](#response-schedule)

schedule

string

required

The schedule to run, cron format.

[​

](#response-created-at)

created\_at

string<date-time>

required

The time the cron was created.

[​

](#response-updated-at)

updated\_at

string<date-time>

required

The last time the cron was updated.

[​

](#response-payload)

payload

Payload · object

required

The run payload to use for creating new run.

[​

](#response-assistant-id-one-of-0)

assistant\_id

string<uuid> | null

The ID of the assistant.

[​

](#response-user-id-one-of-0)

user\_id

string | null

The ID of the user.

[​

](#response-next-run-date-one-of-0)

next\_run\_date

string<date-time> | null

The next run date of the cron.

[​

](#response-metadata)

metadata

Metadata · object

The cron metadata.

Was this page helpful?

YesNo

[

Create Thread Cron

Previous



](/langsmith/agent-server-api/crons-plus-tier/create-thread-cron)[

Search Crons

Next



](/langsmith/agent-server-api/crons-plus-tier/search-crons)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)