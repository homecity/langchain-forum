---
title: "Create Assistant"
url: "https://docs.langchain.com/langsmith/agent-server-api/assistants/create-assistant"
section: "langsmith/agent-server-api/assistants"
last_modified: "2026-01-13T21:36:22.357Z"
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

Create Assistant

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

Create Assistant

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/assistants \
  --header 'Content-Type: application/json' \
  --data '
{
  "graph_id": "<string>",
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "config": {},
  "context": {},
  "metadata": {},
  "if_exists": "raise",
  "name": "<string>",
  "description": "<string>"
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
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Assistants](/langsmith/agent-server-api/assistants/create-assistant)

# Create Assistant

Copy page

Create an assistant.

An initial version of the assistant will be created and the assistant is set to that version. To change versions, use the `POST /assistants/{assistant_id}/latest` endpoint.

Copy page

POST

/

assistants

Try it

Create Assistant

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/assistants \
  --header 'Content-Type: application/json' \
  --data '
{
  "graph_id": "<string>",
  "assistant_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "config": {},
  "context": {},
  "metadata": {},
  "if_exists": "raise",
  "name": "<string>",
  "description": "<string>"
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
```

#### Body

application/json

Payload for creating an assistant.

[​

](#body-graph-id)

graph\_id

string

required

The ID of the graph the assistant should use. The graph ID is normally set in your langgraph.json configuration.

[​

](#body-assistant-id)

assistant\_id

string<uuid>

The ID of the assistant. If not provided, a random UUID will be generated.

[​

](#body-config)

config

Config · object

Configuration to use for the graph. Useful when graph is configurable and you want to create different assistants based on different configurations.

[​

](#body-context)

context

Context · object

Static context added to the assistant.

[​

](#body-metadata)

metadata

Metadata · object

Metadata to add to assistant.

[​

](#body-if-exists)

if\_exists

enum<string>

default:raise

How to handle duplicate creation. Must be either 'raise' (raise error if duplicate), or 'do\_nothing' (return existing assistant).

Available options:

`raise`,

`do_nothing`

[​

](#body-name)

name

string

The name of the assistant. Defaults to 'Untitled'.

[​

](#body-description-one-of-0)

description

string | null

The description of the assistant. Defaults to null.

#### Response

200

application/json

Success

[​

](#response-assistant-id)

assistant\_id

string<uuid>

required

The ID of the assistant.

[​

](#response-graph-id)

graph\_id

string

required

The ID of the graph.

[​

](#response-config)

config

Config · object

required

The assistant config.

Show child attributes

[​

](#response-created-at)

created\_at

string<date-time>

required

The time the assistant was created.

[​

](#response-updated-at)

updated\_at

string<date-time>

required

The last time the assistant was updated.

[​

](#response-metadata)

metadata

Metadata · object

required

The assistant metadata.

[​

](#response-context)

context

Context · object

Static context added to the assistant.

[​

](#response-version)

version

integer

The version of the assistant

[​

](#response-name)

name

string

The name of the assistant

[​

](#response-description-one-of-0)

description

string | null

The description of the assistant

Was this page helpful?

YesNo

[

Agent Server API reference for LangSmith Deployment

Previous



](/langsmith/server-api-ref)[

Search Assistants

Next



](/langsmith/agent-server-api/assistants/search-assistants)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)