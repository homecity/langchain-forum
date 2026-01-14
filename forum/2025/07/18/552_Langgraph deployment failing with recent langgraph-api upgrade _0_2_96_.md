# Langgraph deployment failing with recent langgraph-api upgrade (0.2.96)

**Topic ID:** 552
**Created:** 2025-07-18 15:05:00
**URL:** https://forum.langchain.com/t/552

**Tags:** self-hosted

---

## Post #1 by @akbindal
*Posted on 2025-07-18 15:05:00*

With the recent update to `langgraph-api=0.2.96` , has anything broken in the underlying assistant, run, or thread tables? we started to receive following errors in our deployment → 


```
`File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/lifespan.py", line 100, in lifespan
  File "/api/langgraph_api/graph.py", line 405, in collect_graphs_from_env
  File "/api/langgraph_api/graph.py", line 86, in register_graph
  File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/retry.py", line 39, in wrapper
  File "/api/langgraph_api/graph.py", line 75, in register_graph_db
  File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/ops.py", line 347, in put
  File "/usr/local/lib/python3.11/site-packages/psycopg/connection_async.py", line 276, in execute
    raise ex.with_traceback(None)
psycopg.errors.UndefinedTable: relation "assistant" does not exist
LINE 2:             INSERT INTO assistant (assistant_id, graph_id, c...
                                ^
 [uvicorn.error] api_revision=f524839 api_variant=licensed langgraph_api_version=0.2.96 thread_name=MainThread
2025-07-18T14:02:46.924761Z [error    ] Application startup failed. Exiting. [uvicorn.error] api_revision=f524839 api_variant=licensed langgraph_api_version=0.2.96 thread_name=MainThread
2025-07-18T14:03:01.725159Z [info     ] Using langgraph_runtime_postgres [langgraph_runtime] api_revision=f524839 api_variant=licensed langgraph_api_version=0.2.96 thread_name=MainThread
2025-07-18T14:03:01.735621Z [info     ] Using auth of type=noop        [langgraph_api.auth.middleware] api_revision=f524839 api_variant=licensed langgraph_api_version=0.2.96 thread_name=MainThread
`
```

---

## Post #2 by @akbindal
*Posted on 2025-07-18 15:05:50*

shouldn’t langgraph-api be setting up or migrating these underlying tables itself?

---

## Post #3 by @wfh
*Posted on 2025-07-18 17:04:31*

Does the issue persist if you re-deploy?

We’ll make an update to avoid race conditions here.

---

## Post #4 by @akbindal
*Posted on 2025-07-18 19:08:45*

Not sure if race condition is the only root cause here as the issue persist across many redeployment attempts.

---

## Post #5 by @akbindal
*Posted on 2025-07-22 11:53:15*

wondering if there is any update? This is blocking us to push updates on prod. Thanks

---

## Post #6 by @akbindal
*Posted on 2025-07-22 20:50:24*

Migration of the table wasn’t happening, so manually adding description column in older assistant_version table I was able to make it work.

Error log from deployment of latest langgraph api


```
`2025-07-22T20:43:58.898810295Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/ops.py", line 347, in put
2025-07-22T20:43:58.898812178Z   File "/usr/local/lib/python3.11/site-packages/psycopg/connection_async.py", line 276, in execute
2025-07-22T20:43:58.898815445Z     raise ex.with_traceback(None)
2025-07-22T20:43:58.898817879Z psycopg.errors.UndefinedColumn: column "description" of relation "assistant_versions" does not exist
2025-07-22T20:43:58.898832356Z LINE 8: ...nt_id, graph_id, config, metadata, version, name, descriptio...
`
```

---

## Post #7 by @scrowder
*Posted on 2025-08-06 18:49:36*

Are you still experiencing this issue? Since your last post, we have pushed many new versions of the LangGraph Server image, and I’m wondering if this issue may have resolved itself. Please let us know if you continue to experience it.

---

## Post #8 by @sumukha
*Posted on 2025-10-08 19:49:24*

Did you find a solution? [/u/wfh](@wfh) [/u/akbindal](@akbindal)

I am getting the same error!

I am running it through self hosted langgraph api,

here’s my docker-compose

```

langgraph-server:


```
`build:
`
```

context: .

dockerfile: Dockerfile.langgraph

profiles: [ “langgraph” ]

env_file:


```
`  - .env.local
`
```

environment:

# Point server to our graph code when supported; adjust as needed.


```
`  - PYTHONPATH=/workspace

  - GRAPH_REGISTRY=app.graph.server_registry:GRAPH_REGISTRY

  - ASSISTANTS_REGISTRY=app.graph.server_registry:GRAPH_REGISTRY

  - LANGGRAPH_GRAPH_REGISTRY=app.graph.server_registry:GRAPH_REGISTRY

  - LANGGRAPH_ASSISTANTS_REGISTRY=app.graph.server_registry:GRAPH_REGISTRY

  - LANGGRAPH_JSON=/workspace/langgraph.json

  - LANGSERVE_GRAPHS={"creative_strategist_core":"app.graph.server_registry:CREATIVE_STRATEGIST_CORE_GRAPH"}

  - LANGSMITH_API_KEY=${LANGCHAIN_API_KEY}

  - LANGSMITH_TRACING_V2=${LANGCHAIN_TRACING_V2}

  - DATABASE_URI=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:${POSTGRES_PORT:-5432}/${POSTGRES_DB}

  - REDIS_URI=${REDIS_URL}

  - LANGGRAPH_GATEWAY_TOKEN=${LANGGRAPH_GATEWAY_TOKEN}
`
```

ports:


```
`  - "8123:8000"
`
```

volumes:


```
`  - .:/workspace
`
```

depends_on:


```
`  - db

  - redis
`
```

``

`When i looked into db tables related to langgraph-checkpoint-postgres (checkpoints, checkpoint_write, checkpoint_blob) getting created. But other tables like threads, assistant, run e.t.c is missing!`

`In the container i am seeing errors saying those tables doesn’t exists!`

`i am using `langchain/langgraph-api:3.12` image.

---
