---
title: "Delete Deployment"
url: "https://docs.langchain.com/api-reference/deployments-v2/delete-deployment"
section: "api-reference/deployments-v2"
last_modified: "2026-01-08T04:05:34.701Z"
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

Deployments (v2)

Delete Deployment

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
        
        -   [GET
            
            List Deployments
            
            
            
            ](/api-reference/deployments-v2/list-deployments)
        -   [POST
            
            Create Deployment
            
            
            
            ](/api-reference/deployments-v2/create-deployment)
        -   [GET
            
            Get Deployment
            
            
            
            ](/api-reference/deployments-v2/get-deployment)
        -   [DEL
            
            Delete Deployment
            
            
            
            ](/api-reference/deployments-v2/delete-deployment)
        -   [PATCH
            
            Patch Deployment
            
            
            
            ](/api-reference/deployments-v2/patch-deployment)
        -   [GET
            
            List Revisions
            
            
            
            ](/api-reference/deployments-v2/list-revisions)
        -   [GET
            
            Get Revision
            
            
            
            ](/api-reference/deployments-v2/get-revision)
        -   [POST
            
            Redeploy Revision
            
            
            
            ](/api-reference/deployments-v2/redeploy-revision)
    -   Listeners (v2)
        
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

Delete Deployment

cURL

Copy

```
curl --request DELETE \
  --url https://api.example.com/v2/deployments/{deployment_id}
```

404

422

Copy

```
{
  "detail": "Deployment ID {deployment_id} not found."
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Control Plane API](/langsmith/api-ref-control-plane)

[Deployments (v2)](/api-reference/deployments-v2/list-deployments)

# Delete Deployment

Copy page

Delete a deployment by ID.

Copy page

DELETE

/

v2

/

deployments

/

{deployment\_id}

Try it

Delete Deployment

cURL

Copy

```
curl --request DELETE \
  --url https://api.example.com/v2/deployments/{deployment_id}
```

404

422

Copy

```
{
  "detail": "Deployment ID {deployment_id} not found."
}
```

#### Path Parameters

[​

](#parameter-deployment-id)

deployment\_id

string<uuid>

required

#### Response

204

Successful Response

Was this page helpful?

YesNo

[

Get Deployment

Previous



](/api-reference/deployments-v2/get-deployment)[

Patch Deployment

Next



](/api-reference/deployments-v2/patch-deployment)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)