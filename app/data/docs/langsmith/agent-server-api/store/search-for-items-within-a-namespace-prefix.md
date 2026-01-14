---
title: "Search for items within a namespace prefix."
url: "https://docs.langchain.com/langsmith/agent-server-api/store/search-for-items-within-a-namespace-prefix"
section: "langsmith/agent-server-api/store"
last_modified: "2026-01-13T21:36:22.788Z"
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

Search for items within a namespace prefix.

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

Search for items within a namespace prefix.

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/store/items/search \
  --header 'Content-Type: application/json' \
  --data '
{
  "namespace_prefix": [
    "<string>"
  ],
  "filter": {},
  "limit": 10,
  "offset": 0,
  "query": "<string>"
}
'
```

200

422

Copy

```
{
  "items": [
    {
      "namespace": [
        "<string>"
      ],
      "key": "<string>",
      "value": {},
      "created_at": "2023-11-07T05:31:56Z",
      "updated_at": "2023-11-07T05:31:56Z"
    }
  ]
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Store](/langsmith/agent-server-api/store/retrieve-a-single-item)

# Search for items within a namespace prefix.

Copy page

Copy page

POST

/

store

/

items

/

search

Try it

Search for items within a namespace prefix.

cURL

Copy

```
curl --request POST \
  --url https://api.example.com/store/items/search \
  --header 'Content-Type: application/json' \
  --data '
{
  "namespace_prefix": [
    "<string>"
  ],
  "filter": {},
  "limit": 10,
  "offset": 0,
  "query": "<string>"
}
'
```

200

422

Copy

```
{
  "items": [
    {
      "namespace": [
        "<string>"
      ],
      "key": "<string>",
      "value": {},
      "created_at": "2023-11-07T05:31:56Z",
      "updated_at": "2023-11-07T05:31:56Z"
    }
  ]
}
```

#### Body

application/json

Request to search for items within a namespace prefix.

[​

](#body-namespace-prefix-one-of-0)

namespace\_prefix

string\[\] | null

List of strings representing the namespace prefix.

[​

](#body-filter-one-of-0)

filter

Filter · object

Optional dictionary of key-value pairs to filter results.

[​

](#body-limit)

limit

integer

default:10

Maximum number of items to return (default is 10).

[​

](#body-offset)

offset

integer

default:0

Number of items to skip before returning results (default is 0).

[​

](#body-query-one-of-0)

query

string | null

Query string for semantic/vector search.

#### Response

200

application/json

Success

[​

](#response-items)

items

object\[\]

required

Show child attributes

Was this page helpful?

YesNo

[

Delete an item.

Previous



](/langsmith/agent-server-api/store/delete-an-item)[

List namespaces with optional match conditions.

Next



](/langsmith/agent-server-api/store/list-namespaces-with-optional-match-conditions)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)