---
title: "Retrieve a single item."
url: "https://docs.langchain.com/langsmith/agent-server-api/store/retrieve-a-single-item"
section: "langsmith/agent-server-api/store"
last_modified: "2026-01-13T21:36:22.763Z"
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

Store

Retrieve a single item.

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
        
    -   Store
        
        -   [GET
            
            Retrieve a single item.
            
            
            
            ](/langsmith/agent-server-api/store/retrieve-a-single-item)
        -   [PUT
            
            Store or update an item.
            
            
            
            ](/langsmith/agent-server-api/store/store-or-update-an-item)
        -   [DEL
            
            Delete an item.
            
            
            
            ](/langsmith/agent-server-api/store/delete-an-item)
        -   [POST
            
            Search for items within a namespace prefix.
            
            
            
            ](/langsmith/agent-server-api/store/search-for-items-within-a-namespace-prefix)
        -   [POST
            
            List namespaces with optional match conditions.
            
            
            
            ](/langsmith/agent-server-api/store/list-namespaces-with-optional-match-conditions)
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

Retrieve a single item.

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/store/items
```

200

400

422

Copy

```
{
  "namespace": [
    "<string>"
  ],
  "key": "<string>",
  "value": {},
  "created_at": "2023-11-07T05:31:56Z",
  "updated_at": "2023-11-07T05:31:56Z"
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Store](/langsmith/agent-server-api/store/retrieve-a-single-item)

# Retrieve a single item.

Copy page

Copy page

GET

/

store

/

items

Try it

Retrieve a single item.

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/store/items
```

200

400

422

Copy

```
{
  "namespace": [
    "<string>"
  ],
  "key": "<string>",
  "value": {},
  "created_at": "2023-11-07T05:31:56Z",
  "updated_at": "2023-11-07T05:31:56Z"
}
```

#### Query Parameters

[​

](#parameter-key)

key

string

required

[​

](#parameter-namespace)

namespace

string\[\]

#### Response

200

application/json

Success

Represents a single document or data entry in the graph's Store. Items are used to store cross-thread memories.

[​

](#response-namespace)

namespace

string\[\]

required

The namespace of the item. A namespace is analogous to a document's directory.

[​

](#response-key)

key

string

required

The unique identifier of the item within its namespace. In general, keys needn't be globally unique.

[​

](#response-value)

value

object

required

The value stored in the item. This is the document itself.

[​

](#response-created-at)

created\_at

string<date-time>

required

The timestamp when the item was created.

[​

](#response-updated-at)

updated\_at

string<date-time>

required

The timestamp when the item was last updated.

Was this page helpful?

YesNo

[

Create Run Batch

Previous



](/langsmith/agent-server-api/stateless-runs/create-run-batch)[

Store or update an item.

Next



](/langsmith/agent-server-api/store/store-or-update-an-item)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)