---
title: "How to add TTLs to your application"
url: "https://docs.langchain.com/langsmith/configure-ttl"
section: "langsmith"
last_modified: "2026-01-09T21:09:21.525Z"
---
**Prerequisites** This guide assumes familiarity with [LangSmith](/langsmith/home), [Persistence](/oss/python/langgraph/persistence), and [Cross-thread persistence](/oss/python/langgraph/persistence#memory-store) concepts.

LangSmith persists both [checkpoints](/oss/python/langgraph/persistence#checkpoints) (thread state) and [cross-thread memories](/oss/python/langgraph/persistence#memory-store) (store items). Configure Time-to-Live (TTL) policies in `langgraph.json` to automatically manage the lifecycle of this data, preventing indefinite accumulation.

## 

[​

](#configuring-thread-and-checkpoint-ttl)

Configuring thread and checkpoint TTL

Checkpoints capture the state of conversation threads. Setting a TTL ensures old checkpoints and thread metadata are automatically deleted. Add a `checkpointer.ttl` configuration to your `langgraph.json` file:

Copy

```
{
  "dependencies": ["."],
  "graphs": {
    "agent": "./agent.py:graph"
  },
  "checkpointer": {
    "ttl": {
      "strategy": "delete",
      "sweep_interval_minutes": 60,
      "default_ttl": 43200
    }
  }
}
```

-   `strategy`: Specifies the action taken on expiration. Currently, only `"delete"` is supported, which deletes all checkpoints in the thread upon expiration.
-   `sweep_interval_minutes`: Defines how often, in minutes, the system checks for expired checkpoints.
-   `default_ttl`: Sets the default lifespan of threads (and corresponding checkpoints) in minutes (e.g., 43200 minutes = 30 days). Applies only to checkpoints created after this configuration is deployed; existing checkpoints/threads are not changed. To clear older data, delete it explicitly.

## 

[​

](#configuring-store-item-ttl)

Configuring store item TTL

Store items allow cross-thread data persistence. Configuring TTL for store items helps manage memory by removing stale data. Add a `store.ttl` configuration to your `langgraph.json` file:

Copy

```
{
  "dependencies": ["."],
  "graphs": {
    "agent": "./agent.py:graph"
  },
  "store": {
    "ttl": {
      "refresh_on_read": true,
      "sweep_interval_minutes": 120,
      "default_ttl": 10080
    }
  }
}
```

-   `refresh_on_read`: (Optional, default `true`) If `true`, accessing an item via `get` or `search` resets its expiration timer. If `false`, TTL only refreshes on `put`.
-   `sweep_interval_minutes`: (Optional) Defines how often, in minutes, the system checks for expired items. If omitted, no sweeping occurs.
-   `default_ttl`: (Optional) Sets the default lifespan of store items in minutes (e.g., 10080 minutes = 7 days). Applies only to items created after this configuration is deployed; existing items are not changed. If you need to clear older items, delete them manually. If omitted, items do not expire by default.

## 

[​

](#combining-ttl-configurations)

Combining TTL configurations

You can configure TTLs for both checkpoints and store items in the same `langgraph.json` file to set different policies for each data type. Here is an example:

Copy

```
{
  "dependencies": ["."],
  "graphs": {
    "agent": "./agent.py:graph"
  },
  "checkpointer": {
    "ttl": {
      "strategy": "delete",
      "sweep_interval_minutes": 60,
      "default_ttl": 43200
    }
  },
  "store": {
    "ttl": {
      "refresh_on_read": true,
      "sweep_interval_minutes": 120,
      "default_ttl": 10080
    }
  }
}
```

## 

[​

](#configure-per-thread-ttl)

Configure per-thread TTL

You can apply [TTL configurations per-thread](https://reference.langchain.com/python/langsmith/deployment/sdk/#langgraph_sdk.client.ThreadsClient.create).

Copy

```
thread = await client.threads.create(
    ttl={
        "strategy": "delete",
        "ttl": 43200  # 30 days in minutes
    }
)
```

Thread-level TTLs will also delete all associated checkpoints. As a result, you can set a thread-level TTL and avoid setting a separate TTL for checkpoints.

## 

[​

](#runtime-overrides)

Runtime overrides

The default `store.ttl` settings from `langgraph.json` can be overridden at runtime by providing specific TTL values in SDK method calls like `get`, `put`, and `search`.

## 

[​

](#deployment-process)

Deployment process

After configuring TTLs in `langgraph.json`, deploy or restart your LangGraph application for the changes to take effect. Use `langgraph dev` for local development or `langgraph up` for Docker deployment. See the [langgraph.json CLI reference](https://langchain-ai.github.io/langgraph/reference/configuration/#configuration-file) for more details on the other configurable options.

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/configure-ttl.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.