---
title: "Delete Listener"
url: "https://docs.langchain.com/api-reference/listeners-v2/delete-listener"
section: "api-reference/listeners-v2"
last_modified: "2026-01-08T04:05:34.758Z"
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

Delete Listener

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

Delete Listener

cURL

Copy

```
curl --request DELETE \
  --url https://api.example.com/v2/listeners/{listener_id}
```

403

404

422

Copy

```
{
  "detail": "Listeners cannot be created for LangSmith workspace ID '{workspace_id}'. Creating listeners is only allowed for LangSmith organizations with self-hosted enterprise plans."
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Control Plane API](/langsmith/api-ref-control-plane)

[Listeners (v2)](/api-reference/listeners-v2/list-listeners)

# Delete Listener

Copy page

Delete a listener by ID.

Copy page

DELETE

/

v2

/

listeners

/

{listener\_id}

Try it

Delete Listener

cURL

Copy

```
curl --request DELETE \
  --url https://api.example.com/v2/listeners/{listener_id}
```

403

404

422

Copy

```
{
  "detail": "Listeners cannot be created for LangSmith workspace ID '{workspace_id}'. Creating listeners is only allowed for LangSmith organizations with self-hosted enterprise plans."
}
```

#### Path Parameters

[​

](#parameter-listener-id)

listener\_id

string<uuid>

required

#### Response

204

Successful Response

Was this page helpful?

YesNo

[

Get Listener

Previous



](/api-reference/listeners-v2/get-listener)[

Patch Listener

Next



](/api-reference/listeners-v2/patch-listener)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)