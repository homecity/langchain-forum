---
title: "Call agents from code"
url: "https://docs.langchain.com/langsmith/agent-builder-code"
section: "langsmith"
last_modified: "2026-01-06T20:30:18.350Z"
---
You can invoke Agent Builder agents from your applications using the [LangGraph SDK](/langsmith/sdk). Agent Builder agents run on [Agent Server](/langsmith/agent-server), so you can use the same API methods as any other [LangSmith deployment](/langsmith/deployments).

## 

[​

](#prerequisites)

Prerequisites

-   A LangSmith account with an Agent Builder agent
-   A [Personal Access Token (PAT)](/langsmith/create-account-api-key) for authentication
-   The [LangGraph SDK](/langsmith/sdk) installed:

Python

TypeScript

Copy

```
pip install langgraph-sdk python-dotenv
```

## 

[​

](#authentication)

Authentication

To authenticate with your agent’s Agent Builder deployment, provide a LangSmith [Personal Access Token (PAT)](/langsmith/create-account-api-key) to the `api_key` argument when instantiating the LangGraph SDK client, or via the `X-API-Key` header. If using `X-API-Key`, you must also set the `X-Auth-Scheme` header to `langsmith-api-key`. If the PAT you pass is not tied to the owner of the agent, your request will be rejected with a `404 Not Found` error. If the agent you’re trying to invoke is a workspace agent and you’re not the owner, you can perform all the same operations as you would in the UI (read-only).

## 

[​

](#example)

Example

To get your agent’s `agent_id` and `api_url`:

1.  Navigate to the agent in Agent Builder.
2.  Click the settings icon in the top right corner.
3.  Click **View code snippets** to see pre-populated values for your agent.

Copy the code below and replace `agent_id` and `api_url` with the values from your agent’s code snippets. Create a `.env` file in your project root with your [Personal Access Token](/langsmith/create-account-api-key):

.env

Copy

```
LANGGRAPH_API_KEY=your-personal-access-token
```

-   Python
    
-   TypeScript
    

Copy

```
import os
from dotenv import load_dotenv
from langgraph_sdk.client import get_client

load_dotenv()

agent_id = "your-agent-id"

# This must be a PAT tied to your LangSmith account
api_key = os.getenv("LANGGRAPH_API_KEY")
api_url = "https://prod-agent-builder-5ccea139413e5ef289ab8e5d04688e11.us.langgraph.app"

client = get_client(
    url=api_url,
    api_key=api_key,
    headers={
        "X-Auth-Scheme": "langsmith-api-key",
    },
)

async def get_assistant(agent_id: str):
    agent = await client.assistants.get(agent_id)
    print(agent)

if __name__ == "__main__":
    import asyncio
    asyncio.run(get_assistant(agent_id))
```

Copy

```
import "dotenv/config";
import { Client } from "@langchain/langgraph-sdk";

const agentId = "your-agent-id";

// This must be a PAT tied to your LangSmith account
const apiKey = process.env.LANGGRAPH_API_KEY;
const apiUrl = "https://prod-agent-builder-5ccea139413e5ef289ab8e5d04688e11.us.langgraph.app";

const client = new Client({
  apiUrl,
  apiKey,
  defaultHeaders: {
    "X-Auth-Scheme": "langsmith-api-key",
  },
});

async function main(agentId: string) {
  const agent = await client.assistants.get(agentId);
  console.log(agent);
}

main(agentId).catch(console.error);
```

Use a [Personal Access Token (PAT)](/langsmith/create-account-api-key) tied to your LangSmith account. Set the `X-Auth-Scheme` header to `langsmith-api-key` for authentication. If you implemented custom authentication, pass the user’s token in headers so the agent can use user-scoped tools. See [Add custom authentication](/langsmith/custom-auth).

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/agent-builder-code.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.