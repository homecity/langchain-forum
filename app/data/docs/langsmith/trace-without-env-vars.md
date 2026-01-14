---
title: "Trace without setting environment variables"
url: "https://docs.langchain.com/langsmith/trace-without-env-vars"
section: "langsmith"
last_modified: "2025-12-16T22:07:25.010Z"
---
As mentioned in other guides, the following environment variables allow you to configure tracing enabled, the api endpoint, the api key, and the tracing project:

-   `LANGSMITH_TRACING`
-   `LANGSMITH_API_KEY`
-   `LANGSMITH_ENDPOINT`
-   `LANGSMITH_PROJECT`

If you need to trace runs with a custom configuration, are working in an environment that doesn’t support typical environment variables (such as Cloudflare Workers), or would simply prefer not to rely on environment variables, LangSmith allows you to configure tracing programmatically.

Due to a number of asks for finer-grained control of tracing using the `trace` context manager, **we changed the behavior** of `with trace` to honor the `LANGSMITH_TRACING` environment variable in version **0.1.95** of the Python SDK. You can find more details in the [release notes](https://github.com/langchain-ai/langsmith-sdk/releases/tag/v0.1.95). The recommended way to disable/enable tracing without setting environment variables is to use the `with tracing_context` context manager, as shown in the example below.

-   Python: The recommended way to do this in Python is to use the `tracing_context` context manager. This works for both code annotated with `traceable` and code within the `trace` context manager.
-   TypeScript: You can pass in both the client and the `tracingEnabled` flag to the `traceable` decorator.

Python

TypeScript

Copy

```
import openai
from langsmith import Client, tracing_context, traceable
from langsmith.wrappers import wrap_openai

langsmith_client = Client(
  api_key="YOUR_LANGSMITH_API_KEY",  # This can be retrieved from a secrets manager
  api_url="https://api.smith.langchain.com",  # Update appropriately for self-hosted installations or the EU region
  workspace_id="YOUR_WORKSPACE_ID", # Must be specified for API keys scoped to multiple workspaces
)

client = wrap_openai(openai.Client())

@traceable(run_type="tool", name="Retrieve Context")
def my_tool(question: str) -> str:
  return "During this morning's meeting, we solved all world conflict."

@traceable
def chat_pipeline(question: str):
  context = my_tool(question)
  messages = [
      { "role": "system", "content": "You are a helpful assistant. Please respond to the user's request only based on the given context." },
      { "role": "user", "content": f"Question: {question}\nContext: {context}"}
  ]
  chat_completion = client.chat.completions.create(
      model="gpt-4o-mini", messages=messages
  )
  return chat_completion.choices[0].message.content

# Can set to False to disable tracing here without changing code structure
with tracing_context(enabled=True):
  # Use langsmith_extra to pass in a custom client
  chat_pipeline("Can you summarize this morning's meetings?", langsmith_extra={"client": langsmith_client})
```

If you prefer a video tutorial, check out the [Alternative Ways to Trace video](https://academy.langchain.com/pages/intro-to-langsmith-preview) from the Introduction to LangSmith Course.

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/trace-without-env-vars.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.