---
title: "List GitHub Integrations"
url: "https://docs.langchain.com/api-reference/integrations-v1/list-github-integrations"
section: "api-reference/integrations-v1"
last_modified: "2026-01-08T04:05:34.669Z"
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

Integrations (v1)

List GitHub Integrations

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
        
        -   [GET
            
            List GitHub Integrations
            
            
            
            ](/api-reference/integrations-v1/list-github-integrations)
        -   [GET
            
            List GitHub Repositories
            
            
            
            ](/api-reference/integrations-v1/list-github-repositories)
    -   Deployments (v2)
        
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

List GitHub Integrations

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v1/integrations/github/install
```

200

Copy

```
[
  {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "installation_id": 123,
    "name": "<string>"
  }
]
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Control Plane API](/langsmith/api-ref-control-plane)

[Integrations (v1)](/api-reference/integrations-v1/list-github-integrations)

# List GitHub Integrations

Copy page

List available GitHub integrations for LangGraph Platfom Cloud SaaS.

Copy page

GET

/

v1

/

integrations

/

github

/

install

Try it

List GitHub Integrations

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v1/integrations/github/install
```

200

Copy

```
[
  {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "installation_id": 123,
    "name": "<string>"
  }
]
```

#### Response

200 - application/json

Successful Response

[​

](#response-items-id)

id

string<uuid>

required

GitHub Integration ID.  
  
For example, in the `POST /v2/deployments` request body, set `integration_id` to the value of this field.

[​

](#response-items-installation-id)

installation\_id

integer

required

GitHub installation ID.

[​

](#response-items-name)

name

string

required

GitHub accout name.

Was this page helpful?

YesNo

[

Control plane API reference for LangSmith Deployment

Previous



](/langsmith/api-ref-control-plane)[

List GitHub Repositories

Next



](/api-reference/integrations-v1/list-github-repositories)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)