---
title: "Get Revision"
url: "https://docs.langchain.com/api-reference/deployments-v2/get-revision"
section: "api-reference/deployments-v2"
last_modified: "2026-01-08T04:05:34.723Z"
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

Get Revision

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

Get Revision

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v2/deployments/{deployment_id}/revisions/{revision_id}
```

200

404

422

Copy

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "created_at": "2023-11-07T05:31:56Z",
  "updated_at": "2023-11-07T05:31:56Z",
  "status": "CREATING",
  "source": "github",
  "source_revision_config": {
    "repo_ref": "<string>",
    "langgraph_config_path": "<string>",
    "image_uri": "<string>",
    "repo_commit_sha": "<string>"
  }
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Control Plane API](/langsmith/api-ref-control-plane)

[Deployments (v2)](/api-reference/deployments-v2/list-deployments)

# Get Revision

Copy page

Get a revision by ID for a deployment.

Copy page

GET

/

v2

/

deployments

/

{deployment\_id}

/

revisions

/

{revision\_id}

Try it

Get Revision

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v2/deployments/{deployment_id}/revisions/{revision_id}
```

200

404

422

Copy

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "created_at": "2023-11-07T05:31:56Z",
  "updated_at": "2023-11-07T05:31:56Z",
  "status": "CREATING",
  "source": "github",
  "source_revision_config": {
    "repo_ref": "<string>",
    "langgraph_config_path": "<string>",
    "image_uri": "<string>",
    "repo_commit_sha": "<string>"
  }
}
```

#### Path Parameters

[​

](#parameter-deployment-id)

deployment\_id

string<uuid>

required

[​

](#parameter-revision-id)

revision\_id

string<uuid>

required

#### Response

200

application/json

Successful Response

Revision resource.

[​

](#response-id)

id

string<uuid>

required

The ID of the revision.  
  
This is a read-only field.

[​

](#response-created-at)

created\_at

string<date-time>

required

The creation time of the revision.  
  
This is a read-only field.

[​

](#response-updated-at)

updated\_at

string<date-time>

required

The last update time of the revision.  
  
This is a read-only field.

[​

](#response-status)

status

enum<string>

required

The status of the revision.  
  
This is a read-only field.

Available options:

`CREATING`,

`QUEUED`,

`AWAITING_BUILD`,

`BUILDING`,

`AWAITING_DEPLOY`,

`DEPLOYING`,

`CREATE_FAILED`,

`BUILD_FAILED`,

`DEPLOY_FAILED`,

`DEPLOYED`,

`SKIPPED`,

`INTERRUPTED`,

`UNKNOWN`

[​

](#response-source)

source

enum<string>

required

Deploy from a GitHub repository (`github`) or a Docker image (`external_docker`).  
  
Deploying from GitHub is only available for Cloud SaaS deployments. Deploying from a Docker image is only available for self-hosted deployments. This cannot be changed once the deployment is created.

Available options:

`github`,

`external_docker`

[​

](#response-source-revision-config)

source\_revision\_config

SourceRevisionConfig · object

required

Source revision configuration.  
  
For a `Deployment` resource, the field values refer to the latest revision of the `Deployment`. For a `Revision` resource, the field values refer to the `Revision` itself.

Show child attributes

Was this page helpful?

YesNo

[

List Revisions

Previous



](/api-reference/deployments-v2/list-revisions)[

Redeploy Revision

Next



](/api-reference/deployments-v2/redeploy-revision)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)