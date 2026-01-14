---
title: "Search Crons"
url: "https://docs.langchain.com/langsmith/agent-server-api/crons-plus-tier/search-crons"
section: "langsmith/agent-server-api/crons-plus-tier"
last_modified: "2026-01-13T21:36:22.695Z"
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

Search Crons

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

Search Crons

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/runs/crons/search \
  --header 'Content-Type: application/json' \
  --data '
{
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "limit": 10,
  "offset": 0,
  "sort_by": "created_at",
  "sort_order": "desc",
  "select": [
    "cron_id"
  ]
}
'
```

200

422

Copy

```
[
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
]
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Crons (Plus tier)](/langsmith/agent-server-api/crons-plus-tier/create-thread-cron)

# Search Crons

Copy page

Search all active crons

Copy page

POST

/

runs

/

crons

/

search

Try it

Search Crons

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/runs/crons/search \
  --header 'Content-Type: application/json' \
  --data '
{
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "thread_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "limit": 10,
  "offset": 0,
  "sort_by": "created_at",
  "sort_order": "desc",
  "select": [
    "cron_id"
  ]
}
'
```

200

422

Copy

```
[
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
]
```

#### Body

application/json

Payload for listing crons

[​

](#body-assistant-id)

assistant\_id

string<uuid>

The assistant ID or graph name to filter by using exact match.

[​

](#body-thread-id)

thread\_id

string<uuid>

The thread ID to search for.

[​

](#body-limit)

limit

integer

default:10

The maximum number of results to return.

Required range: `1 <= x <= 1000`

[​

](#body-offset)

offset

integer

default:0

The number of results to skip.

Required range: `x >= 0`

[​

](#body-sort-by)

sort\_by

enum<string>

default:created\_at

The field to sort by.

Available options:

`cron_id`,

`assistant_id`,

`thread_id`,

`next_run_date`,

`end_time`,

`created_at`,

`updated_at`

[​

](#body-sort-order)

sort\_order

enum<string>

default:desc

The order to sort by.

Available options:

`asc`,

`desc`

[​

](#body-select)

select

enum<string>\[\]

Specify which fields to return. If not provided, all fields are returned.

Available options:

`cron_id`,

`assistant_id`,

`thread_id`,

`on_run_completed`,

`end_time`,

`schedule`,

`created_at`,

`updated_at`,

`user_id`,

`payload`,

`next_run_date`,

`metadata`

#### Response

200

application/json

Success

[​

](#response-items-cron-id)

cron\_id

string<uuid>

required

The ID of the cron.

[​

](#response-items-thread-id)

thread\_id

string<uuid>

required

The ID of the thread.

[​

](#response-items-end-time)

end\_time

string<date-time>

required

The end date to stop running the cron.

[​

](#response-items-schedule)

schedule

string

required

The schedule to run, cron format.

[​

](#response-items-created-at)

created\_at

string<date-time>

required

The time the cron was created.

[​

](#response-items-updated-at)

updated\_at

string<date-time>

required

The last time the cron was updated.

[​

](#response-items-payload)

payload

Payload · object

required

The run payload to use for creating new run.

[​

](#response-items-assistant-id-one-of-0)

assistant\_id

string<uuid> | null

The ID of the assistant.

[​

](#response-items-user-id-one-of-0)

user\_id

string | null

The ID of the user.

[​

](#response-items-next-run-date-one-of-0)

next\_run\_date

string<date-time> | null

The next run date of the cron.

[​

](#response-items-metadata)

metadata

Metadata · object

The cron metadata.

Was this page helpful?

YesNo

[

Create Cron

Previous



](/langsmith/agent-server-api/crons-plus-tier/create-cron)[

Count Crons

Next



](/langsmith/agent-server-api/crons-plus-tier/count-crons)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)