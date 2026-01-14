---
title: "List GitHub Repositories"
url: "https://docs.langchain.com/api-reference/integrations-v1/list-github-repositories"
section: "api-reference/integrations-v1"
last_modified: "2026-01-08T04:05:34.676Z"
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

List GitHub Repositories

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

List GitHub Repositories

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v1/integrations/github/{integration_id}/repos
```

200

422

Copy

```
[
  {
    "host_integration_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "id": 123,
    "name": "<string>",
    "owner": "<string>",
    "url": "<string>",
    "default_branch": "<string>"
  }
]
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Control Plane API](/langsmith/api-ref-control-plane)

[Integrations (v1)](/api-reference/integrations-v1/list-github-integrations)

# List GitHub Repositories

Copy page

List available GitHub repositories for an integration that are available to deploy to LangSmith Deployment.

Copy page

GET

/

v1

/

integrations

/

github

/

{integration\_id}

/

repos

Try it

List GitHub Repositories

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v1/integrations/github/{integration_id}/repos
```

200

422

Copy

```
[
  {
    "host_integration_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "id": 123,
    "name": "<string>",
    "owner": "<string>",
    "url": "<string>",
    "default_branch": "<string>"
  }
]
```

#### Path Parameters

[​

](#parameter-integration-id)

integration\_id

string<uuid>

required

GitHub integration ID.

#### Response

200

application/json

Successful Response

[​

](#response-items-host-integration-id)

host\_integration\_id

string<uuid>

required

GitHub Integration ID.  
  
For example, in the `POST /v2/deployments` request body, set `integration_id` to the value of this field.

[​

](#response-items-id)

id

integer

required

GitHub repository ID.

[​

](#response-items-name)

name

string

required

GitHub repository name.

[​

](#response-items-owner)

owner

string

required

GitHub repository owner.

[​

](#response-items-url)

url

string

required

GitHub repository URL.  
  
For example, in the `POST /v2/deployments` request body, set `source_config.repo_url` to the value of this field.

[​

](#response-items-default-branch)

default\_branch

string

required

GitHub repository default branch.  
  
For example, in the `POST /v2/deployments` request body, set `source_revision_config.repo_ref` to the value of this field.

Was this page helpful?

YesNo

[

List GitHub Integrations

Previous



](/api-reference/integrations-v1/list-github-integrations)[

List Deployments

Next



](/api-reference/deployments-v2/list-deployments)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)