---
title: "Get Assistant Graph"
url: "https://docs.langchain.com/langsmith/agent-server-api/assistants/get-assistant-graph"
section: "langsmith/agent-server-api/assistants"
last_modified: "2026-01-13T21:36:22.413Z"
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

Get Assistant Graph

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

Get Assistant Graph

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/assistants/{assistant_id}/graph
```

200

404

422

Copy

```
{}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[Assistants](/langsmith/agent-server-api/assistants/create-assistant)

# Get Assistant Graph

Copy page

Get an assistant by ID.

Copy page

GET

/

assistants

/

{assistant\_id}

/

graph

Try it

Get Assistant Graph

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/assistants/{assistant_id}/graph
```

200

404

422

Copy

```
{}
```

#### Path Parameters

[​

](#parameter-one-of-0)

assistant\_id

string<uuid>stringstring<uuid>string

required

The ID of the assistant.

#### Query Parameters

[​

](#parameter-one-of-0)

xray

booleanintegerbooleaninteger

default:false

Include graph representation of subgraphs. If an integer value is provided, only subgraphs with a depth less than or equal to the value will be included.

#### Response

200

application/json

Success

[​

](#response-additional-properties)

{key}

object\[\]

Was this page helpful?

YesNo

[

Patch Assistant

Previous



](/langsmith/agent-server-api/assistants/patch-assistant)[

Get Assistant Subgraphs

Next



](/langsmith/agent-server-api/assistants/get-assistant-subgraphs)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)