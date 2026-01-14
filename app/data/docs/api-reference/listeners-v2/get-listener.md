---
title: "Get Listener"
url: "https://docs.langchain.com/api-reference/listeners-v2/get-listener"
section: "api-reference/listeners-v2"
last_modified: "2026-01-08T04:05:34.751Z"
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

Get Listener

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

Get Listener

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v2/listeners/{listener_id}
```

200

403

404

422

Copy

```
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
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Control Plane API](/langsmith/api-ref-control-plane)

[Listeners (v2)](/api-reference/listeners-v2/list-listeners)

# Get Listener

Copy page

Get a listener by ID.

Copy page

GET

/

v2

/

listeners

/

{listener\_id}

Try it

Get Listener

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v2/listeners/{listener_id}
```

200

403

404

422

Copy

```
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
```

#### Path Parameters

[​

](#parameter-listener-id)

listener\_id

string<uuid>

required

#### Response

200

application/json

Successful Response

Listener resource.

[​

](#response-compute-type)

compute\_type

string

required

The compute type of the listener.  
  
This cannot be changed (`PUT`) once the listener is created.

Allowed value: `"k8s"`

[​

](#response-compute-id)

compute\_id

string

required

User assigned unique ID of the compute infrastructure for the listener.  
  
For example, if `compute_type` is `k8s`, then the user may set this field to the Kubernetes cluster name. This cannot be changed (`PUT`) once the listener is created.

[​

](#response-compute-config)

compute\_config

ListenerComputeConfig · object

required

Fields for a listener that are specific to `compute_type`.  
  
All fields are nullable, but are validated based on `compute_type`.

Show child attributes

[​

](#response-id)

id

string<uuid>

required

System assigned ID of the listener.  
  
This is a read-only field.

[​

](#response-created-at)

created\_at

string<date-time>

required

The creation time of the listener.  
  
This is a read-only field.

[​

](#response-updated-at)

updated\_at

string<date-time>

required

The last update time of the listener.  
  
This is a read-only field.

[​

](#response-version-one-of-0)

version

string | null

The version of the listener.

Was this page helpful?

YesNo

[

Create Listener

Previous



](/api-reference/listeners-v2/create-listener)[

Delete Listener

Next



](/api-reference/listeners-v2/delete-listener)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)