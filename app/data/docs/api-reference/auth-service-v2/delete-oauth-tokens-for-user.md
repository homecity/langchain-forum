---
title: "Delete Oauth Tokens For User"
url: "https://docs.langchain.com/api-reference/auth-service-v2/delete-oauth-tokens-for-user"
section: "api-reference/auth-service-v2"
last_modified: "2026-01-08T04:05:34.869Z"
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

Auth Service (v2)

Delete Oauth Tokens For User

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
        
    -   Auth Service (v2)
        
        -   [GET
            
            List Oauth Providers
            
            
            
            ](/api-reference/auth-service-v2/list-oauth-providers)
        -   [POST
            
            Create Oauth Provider
            
            
            
            ](/api-reference/auth-service-v2/create-oauth-provider)
        -   [GET
            
            Oauth Setup Callback
            
            
            
            ](/api-reference/auth-service-v2/oauth-setup-callback)
        -   [GET
            
            Oauth Callback Get
            
            
            
            ](/api-reference/auth-service-v2/oauth-callback-get)
        -   [POST
            
            Oauth Callback
            
            
            
            ](/api-reference/auth-service-v2/oauth-callback)
        -   [POST
            
            Authenticate
            
            
            
            ](/api-reference/auth-service-v2/authenticate)
        -   [GET
            
            Wait For Auth Completion
            
            
            
            ](/api-reference/auth-service-v2/wait-for-auth-completion)
        -   [POST
            
            Create Mcp Oauth Provider
            
            
            
            ](/api-reference/auth-service-v2/create-mcp-oauth-provider)
        -   [GET
            
            Get Oauth Provider
            
            
            
            ](/api-reference/auth-service-v2/get-oauth-provider)
        -   [DEL
            
            Delete Oauth Provider
            
            
            
            ](/api-reference/auth-service-v2/delete-oauth-provider)
        -   [PATCH
            
            Update Oauth Provider
            
            
            
            ](/api-reference/auth-service-v2/update-oauth-provider)
        -   [GET
            
            Check Oauth Token Exists
            
            
            
            ](/api-reference/auth-service-v2/check-oauth-token-exists)
        -   [DEL
            
            Delete Oauth Tokens For User
            
            
            
            ](/api-reference/auth-service-v2/delete-oauth-tokens-for-user)
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

Delete Oauth Tokens For User

cURL

Copy

```
curl --request DELETE \
  --url https://api.example.com/v2/auth/tokens
```

422

Copy

```
{
  "detail": [
    {
      "loc": [
        "<string>"
      ],
      "msg": "<string>",
      "type": "<string>"
    }
  ]
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Control Plane API](/langsmith/api-ref-control-plane)

[Auth Service (v2)](/api-reference/auth-service-v2/list-oauth-providers)

# Delete Oauth Tokens For User

Copy page

Delete all tokens for the current user for the given provider (across agents).

Copy page

DELETE

/

v2

/

auth

/

tokens

Try it

Delete Oauth Tokens For User

cURL

Copy

```
curl --request DELETE \
  --url https://api.example.com/v2/auth/tokens
```

422

Copy

```
{
  "detail": [
    {
      "loc": [
        "<string>"
      ],
      "msg": "<string>",
      "type": "<string>"
    }
  ]
}
```

#### Query Parameters

[​

](#parameter-provider-id)

provider\_id

string

required

OAuth provider ID to revoke for current user

#### Response

200

application/json

Successful Response

Was this page helpful?

YesNo

[

Check Oauth Token Exists

Previous



](/api-reference/auth-service-v2/check-oauth-token-exists)[

LangGraph CLI

Next



](/langsmith/cli)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)