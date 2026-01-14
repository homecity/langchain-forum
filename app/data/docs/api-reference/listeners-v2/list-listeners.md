---
title: "List Listeners"
url: "https://docs.langchain.com/api-reference/listeners-v2/list-listeners"
section: "api-reference/listeners-v2"
last_modified: "2026-01-08T04:05:34.737Z"
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

Listeners (v2)

List Listeners

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
    
-   Control Plane API
    
    -   [
        
        Overview
        
        
        
        ](/langsmith/api-ref-control-plane)
    -   Integrations (v1)
        
    -   Deployments (v2)
        
    -   Listeners (v2)
        
        -   [GET
            
            List Listeners
            
            
            
            ](/api-reference/listeners-v2/list-listeners)
        -   [POST
            
            Create Listener
            
            
            
            ](/api-reference/listeners-v2/create-listener)
        -   [GET
            
            Get Listener
            
            
            
            ](/api-reference/listeners-v2/get-listener)
        -   [DEL
            
            Delete Listener
            
            
            
            ](/api-reference/listeners-v2/delete-listener)
        -   [PATCH
            
            Patch Listener
            
            
            
            ](/api-reference/listeners-v2/patch-listener)
    -   Auth Service (v2)
        
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

List Listeners

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v2/listeners
```

200

422

Copy

```
{
  "resources": [
    {
      "compute_type": "<string>",
      "compute_id": "<string>",
      "compute_config": {
        "k8s_namespaces": [
          "<string>"
        ]
      },
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "created_at": "2023-11-07T05:31:56Z",
      "updated_at": "2023-11-07T05:31:56Z",
      "version": "<string>"
    }
  ],
  "offset": 123
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Control Plane API](/langsmith/api-ref-control-plane)

[Listeners (v2)](/api-reference/listeners-v2/list-listeners)

# List Listeners

Copy page

List all listeners.

Copy page

GET

/

v2

/

listeners

Try it

List Listeners

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v2/listeners
```

200

422

Copy

```
{
  "resources": [
    {
      "compute_type": "<string>",
      "compute_id": "<string>",
      "compute_config": {
        "k8s_namespaces": [
          "<string>"
        ]
      },
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "created_at": "2023-11-07T05:31:56Z",
      "updated_at": "2023-11-07T05:31:56Z",
      "version": "<string>"
    }
  ],
  "offset": 123
}
```

#### Query Parameters

[​

](#parameter-limit)

limit

integer

default:20

Maximum number of resources to return.

Required range: `1 <= x <= 100`

[​

](#parameter-offset)

offset

integer

default:0

Pagination offset. Pass this value to subsequent requests to fetch the next page of resources.

Required range: `x >= 0`

#### Response

200

application/json

Successful Response

[​

](#response-resources)

resources

Listener · object\[\]

required

Show child attributes

[​

](#response-offset)

offset

integer

required

Pagination offset. Pass this value to subsequent requests to fetch the next page.

Was this page helpful?

YesNo

[

Redeploy Revision

Previous



](/api-reference/deployments-v2/redeploy-revision)[

Create Listener

Next



](/api-reference/listeners-v2/create-listener)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)