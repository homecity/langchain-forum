---
title: "Search Assistants"
url: "https://docs.langchain.com/langsmith/agent-server-api/assistants/search-assistants"
section: "langsmith/agent-server-api/assistants"
last_modified: "2026-01-13T21:36:22.366Z"
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

Assistants

Search Assistants

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
        
        -   [POST
            
            Create Assistant
            
            
            
            ](/langsmith/agent-server-api/assistants/create-assistant)
        -   [POST
            
            Search Assistants
            
            
            
            ](/langsmith/agent-server-api/assistants/search-assistants)
        -   [POST
            
            Count Assistants
            
            
            
            ](/langsmith/agent-server-api/assistants/count-assistants)
        -   [GET
            
            Get Assistant
            
            
            
            ](/langsmith/agent-server-api/assistants/get-assistant)
        -   [DEL
            
            Delete Assistant
            
            
            
            ](/langsmith/agent-server-api/assistants/delete-assistant)
        -   [PATCH
            
            Patch Assistant
            
            
            
            ](/langsmith/agent-server-api/assistants/patch-assistant)
        -   [GET
            
            Get Assistant Graph
            
            
            
            ](/langsmith/agent-server-api/assistants/get-assistant-graph)
        -   [GET
            
            Get Assistant Subgraphs
            
            
            
            ](/langsmith/agent-server-api/assistants/get-assistant-subgraphs)
        -   [GET
            
            Get Assistant Subgraphs by Namespace
            
            
            
            ](/langsmith/agent-server-api/assistants/get-assistant-subgraphs-by-namespace)
        -   [GET
            
            Get Assistant Schemas
            
            
            
            ](/langsmith/agent-server-api/assistants/get-assistant-schemas)
        -   [POST
            
            Get Assistant Versions
            
            
            
            ](/langsmith/agent-server-api/assistants/get-assistant-versions)
        -   [POST
            
            Set Latest Assistant Version
            
            
            
            ](/langsmith/agent-server-api/assistants/set-latest-assistant-version)
    -   Threads
        
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

Search Assistants

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/assistants/search \
  --header 'Content-Type: application/json' \
  --data '
{
  "metadata": {},
  "graph_id": "<string>",
  "name": "<string>",
  "limit": 10,
  "offset": 0,
  "sort_by": "assistant_id",
  "sort_order": "asc",
  "select": [
    "assistant_id"
  ]
}
'
```

200

404

422

Copy

```
[
  {
    "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "graph_id": "<string>",
    "config": {
      "tags": [
        "<string>"
      ],
      "recursion_limit": 123,
      "configurable": {}
    },
    "created_at": "2023-11-07T05:31:56Z",
    "updated_at": "2023-11-07T05:31:56Z",
    "metadata": {},
    "context": {},
    "version": 123,
    "name": "<string>",
    "description": "<string>"
  }
]
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Assistants](/langsmith/agent-server-api/assistants/create-assistant)

# Search Assistants

Copy page

Search for assistants.

This endpoint also functions as the endpoint to list all assistants.

Copy page

POST

/

assistants

/

search

Try it

Search Assistants

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/assistants/search \
  --header 'Content-Type: application/json' \
  --data '
{
  "metadata": {},
  "graph_id": "<string>",
  "name": "<string>",
  "limit": 10,
  "offset": 0,
  "sort_by": "assistant_id",
  "sort_order": "asc",
  "select": [
    "assistant_id"
  ]
}
'
```

200

404

422

Copy

```
[
  {
    "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "graph_id": "<string>",
    "config": {
      "tags": [
        "<string>"
      ],
      "recursion_limit": 123,
      "configurable": {}
    },
    "created_at": "2023-11-07T05:31:56Z",
    "updated_at": "2023-11-07T05:31:56Z",
    "metadata": {},
    "context": {},
    "version": 123,
    "name": "<string>",
    "description": "<string>"
  }
]
```

#### Body

application/json

Payload for listing assistants.

[​

](#body-metadata)

metadata

Metadata · object

Metadata to filter by. Exact match filter for each KV pair.

[​

](#body-graph-id)

graph\_id

string

The ID of the graph to filter by. The graph ID is normally set in your langgraph.json configuration.

[​

](#body-name)

name

string

Name of the assistant to filter by. The filtering logic will match (case insensitive) assistants where 'name' is a substring of the assistant name.

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

The field to sort by.

Available options:

`assistant_id`,

`created_at`,

`updated_at`,

`name`,

`graph_id`

[​

](#body-sort-order)

sort\_order

enum<string>

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

`assistant_id`,

`graph_id`,

`name`,

`description`,

`config`,

`context`,

`created_at`,

`updated_at`,

`metadata`,

`version`

#### Response

200

application/json

Success

[​

](#response-items-assistant-id)

assistant\_id

string<uuid>

required

The ID of the assistant.

[​

](#response-items-graph-id)

graph\_id

string

required

The ID of the graph.

[​

](#response-items-config)

config

Config · object

required

The assistant config.

Show child attributes

[​

](#response-items-created-at)

created\_at

string<date-time>

required

The time the assistant was created.

[​

](#response-items-updated-at)

updated\_at

string<date-time>

required

The last time the assistant was updated.

[​

](#response-items-metadata)

metadata

Metadata · object

required

The assistant metadata.

[​

](#response-items-context)

context

Context · object

Static context added to the assistant.

[​

](#response-items-version)

version

integer

The version of the assistant

[​

](#response-items-name)

name

string

The name of the assistant

[​

](#response-items-description-one-of-0)

description

string | null

The description of the assistant

Was this page helpful?

YesNo

[

Create Assistant

Previous



](/langsmith/agent-server-api/assistants/create-assistant)[

Count Assistants

Next



](/langsmith/agent-server-api/assistants/count-assistants)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)