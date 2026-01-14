---
title: "Trace with OpenAI Agents SDK"
url: "https://docs.langchain.com/langsmith/trace-with-openai-agents-sdk"
section: "langsmith"
last_modified: "2026-01-08T16:42:32.476Z"
---
The OpenAI Agents SDK allows you to build agentic applications powered by OpenAI’s models. Learn how to trace your LLM applications using the OpenAI Agents SDK with LangSmith.

## 

[​

](#installation)

Installation

Requires Python SDK version `langsmith>=0.3.15`.

Install LangSmith with OpenAI Agents support:

pip

uv

Copy

```
pip install "langsmith[openai-agents]"
```

This will install both the LangSmith library and the OpenAI Agents SDK.

## 

[​

](#quick-start)

Quick start

You can integrate LangSmith tracing with the OpenAI Agents SDK by using the `OpenAIAgentsTracingProcessor` class.

Copy

```
import asyncio
from agents import Agent, Runner, set_trace_processors
from langsmith.integrations.openai_agents_sdk import OpenAIAgentsTracingProcessor

async def main():
    agent = Agent(
        name="Captain Obvious",
        instructions="You are Captain Obvious, the world's most literal technical support agent.",
    )

    question = "Why is my code failing when I try to divide by zero? I keep getting this error message."
    result = await Runner.run(agent, question)
    print(result.final_output)

if __name__ == "__main__":
    set_trace_processors([OpenAIAgentsTracingProcessor()])
    asyncio.run(main())
```

The agent’s execution flow, including all spans and their details, will be logged to LangSmith. ![OpenAI Agents SDK Trace in LangSmith](https://mintcdn.com/langchain-5e9cc07a/E8FdemkcQxROovD9/langsmith/images/agent-trace.png?fit=max&auto=format&n=E8FdemkcQxROovD9&q=85&s=7544fc0deb9c6279a9848da17d70bf8b)

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/trace-with-openai-agents-sdk.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.