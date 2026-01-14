---
title: "A2A JSON-RPC"
url: "https://docs.langchain.com/langsmith/agent-server-api/a2a/a2a-json-rpc"
section: "langsmith/agent-server-api/a2a"
last_modified: "2026-01-13T21:36:22.809Z"
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

A2A

A2A JSON-RPC

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
        
    -   A2A
        
        -   [POST
            
            A2A JSON-RPC
            
            
            
            ](/langsmith/agent-server-api/a2a/a2a-json-rpc)
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

cURL

message\_send

Copy

```
curl --request POST \
  --url https://api.example.com/a2a/{assistant_id} \
  --header 'Accept: <accept>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "message": {
      "role": "user",
      "parts": [
        {
          "kind": "text",
          "text": "Hello from A2A"
        },
        {
          "kind": "data",
          "data": {
            "locale": "en-US"
          }
        }
      ],
      "messageId": "msg-1",
      "contextId": "f5bd2a40-74b6-4f7a-b649-ea3f09890003"
    }
  }
}
'
```

200

task\_result

Copy

```
{  "jsonrpc": "2.0",  "id": "1",  "result": {    "kind": "task",    "id": "run-uuid",    "contextId": "f5bd2a40-74b6-4f7a-b649-ea3f09890003",    "status": {      "state": "completed"    },    "artifacts": [      {        "artifactId": "artifact-uuid",        "name": "Assistant Response",        "parts": [          {            "kind": "text",            "text": "Hello back"          }        ]      }    ]  }}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Agent Server API](/langsmith/server-api-ref)

[A2A](/langsmith/agent-server-api/a2a/a2a-json-rpc)

# A2A JSON-RPC

Copy page

Communicate with an assistant using the Agent-to-Agent (A2A) Protocol over JSON-RPC 2.0. This endpoint accepts a JSON-RPC envelope and dispatches based on `method`.

**Supported Methods:**

-   `message/send`: Send a message and wait for the final Task result.
-   `message/stream`: Send a message and receive Server-Sent Events (SSE) JSON-RPC responses.
-   `tasks/get`: Fetch the current state of a Task by ID.
-   `tasks/cancel`: Request cancellation (currently not supported; returns an error).

**LangGraph Mapping:**

-   `message.contextId` maps to LangGraph `thread_id`.

**Notes:**

-   Only `text` and `data` parts are supported; `file` parts are not.
-   If `message.contextId` is omitted, a new context is created.
-   Text parts require the assistant input schema to include a `messages` field.

Copy page

POST

/

a2a

/

{assistant\_id}

Try it

cURL

message\_send

Copy

```
curl --request POST \
  --url https://api.example.com/a2a/{assistant_id} \
  --header 'Accept: <accept>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "message": {
      "role": "user",
      "parts": [
        {
          "kind": "text",
          "text": "Hello from A2A"
        },
        {
          "kind": "data",
          "data": {
            "locale": "en-US"
          }
        }
      ],
      "messageId": "msg-1",
      "contextId": "f5bd2a40-74b6-4f7a-b649-ea3f09890003"
    }
  }
}
'
```

200

task\_result

Copy

```
{  "jsonrpc": "2.0",  "id": "1",  "result": {    "kind": "task",    "id": "run-uuid",    "contextId": "f5bd2a40-74b6-4f7a-b649-ea3f09890003",    "status": {      "state": "completed"    },    "artifacts": [      {        "artifactId": "artifact-uuid",        "name": "Assistant Response",        "parts": [          {            "kind": "text",            "text": "Hello back"          }        ]      }    ]  }}
```

#### Headers

[​

](#parameter-accept)

Accept

string

required

For `message/stream`, must include `text/event-stream`. For all other methods, use `application/json`.

#### Path Parameters

[​

](#parameter-assistant-id)

assistant\_id

string<uuid>

required

The ID of the assistant to communicate with

#### Body

application/json

[​

](#body-jsonrpc)

jsonrpc

enum<string>

required

JSON-RPC version

Available options:

`2.0`

[​

](#body-id)

id

string

required

Request identifier

[​

](#body-method)

method

enum<string>

required

The method to invoke

Available options:

`message/send`,

`message/stream`,

`tasks/get`,

`tasks/cancel`

[​

](#body-params)

params

Message Send/Stream Parameters · object

Method parameters; shape depends on the method.

-   Message Send/Stream Parameters
    
-   Task Get Parameters
    
-   Task Cancel Parameters
    

Show child attributes

#### Response

200

application/json

JSON-RPC response for non-streaming methods. For `message/stream`, the response is an SSE stream of JSON-RPC envelopes.

[​

](#response-jsonrpc)

jsonrpc

enum<string>

required

Available options:

`2.0`

[​

](#response-id)

id

string

required

[​

](#response-result)

result

object

Success result containing task information or task details

[​

](#response-error)

error

object

Error information if request failed

Show child attributes

Was this page helpful?

YesNo

[

List namespaces with optional match conditions.

Previous



](/langsmith/agent-server-api/store/list-namespaces-with-optional-match-conditions)[

MCP Get

Next



](/langsmith/agent-server-api/mcp/mcp-get)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)