---
title: "Set a sampling rate for traces"
url: "https://docs.langchain.com/langsmith/sample-traces"
section: "langsmith"
last_modified: "2025-12-16T22:07:24.678Z"
---
When working with high-volume applications, you may not want to log every trace to LangSmith. Sampling rates allow you to control what percentage of traces are logged, helping you balance observability needs with cost considerations.

## 

[​

](#set-a-global-sampling-rate)

Set a global sampling rate

This section is relevant for those using the LangSmith SDK or LangChain, not for those logging directly with the LangSmith API.

By default, all traces are logged to LangSmith. To down-sample the number of traces logged to LangSmith, set the `LANGSMITH_TRACING_SAMPLING_RATE` environment variable to any float between `0` (no traces) and `1` (all traces). For instance, setting the following environment variable will log 75% of the traces.

Copy

```
export LANGSMITH_TRACING_SAMPLING_RATE=0.75
```

This works for the `traceable` decorator and `RunTree` objects.

## 

[​

](#set-different-sampling-rates-per-client)

Set different sampling rates per client

You can also set sampling rates on specific `Client` instances and use the `tracing_context` context manager:

Copy

```
from langsmith import Client, tracing_context

# Create clients with different sampling rates
client_1 = Client(tracing_sampling_rate=0.5)  # 50% sampling
client_2 = Client(tracing_sampling_rate=0.25)  # 25% sampling
client_no_trace = Client(tracing_sampling_rate=0.0)  # No tracing

# Use different sampling rates for different operations
with tracing_context(client=client_1):
    # Your code here - will be traced with 50% sampling rate
    agent_1.invoke(...)

with tracing_context(client=client_2):
    # Your code here - will be traced with 25% sampling rate
    agent_1.invoke(...)

with tracing_context(client=client_no_trace):
    # Your code here - will not be traced
    agent_1.invoke(...)
```

This allows you to control sampling rates at the operation level.

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/sample-traces.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.