# Deployment Error: OpenAIEmbedding Attribute Error

**Topic ID:** 2588
**Created:** 2025-12-23 02:33:09
**URL:** https://forum.langchain.com/t/2588

**Tags:** cloud

---

## Post #1 by @Ren
*Posted on 2025-12-23 02:33:09*

I am writing to you regarding a deployment issue we are facing on the LangSmith Platform.

When attempting a deployment on the LangSmith platform, we have been encountering an `Attribute Error` related to `OpenAIEmbedding`, which is preventing the deployment from completing.

The details of the development environment where the issue is occurring are as follows:


**Development ID**: **7af5187a-6cdb-4d1b-b6b9-250eaf6f72ac**
**Representative Revision with the Issue**: a31470e6-5b72-4100-9004-c29e7b401109

logs:


```
`2025/12/23 11:30:13
[INFO] AttributeError: 'OpenAIEmbeddings' object has no attribute 'strip'
2025/12/23 11:30:13
[INFO]     raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
2025/12/23 11:30:13
[INFO]   File "/usr/lib/python3.11/site-packages/pydantic/main.py", line 1026, in __getattr__
2025/12/23 11:30:13
[INFO]            ^^^^^^^^^^^
2025/12/23 11:30:13
[INFO]     if not model.strip():
2025/12/23 11:30:13
[INFO]   File "/usr/lib/python3.11/site-packages/langchain/embeddings/base.py", line 86, in _infer_model_and_provider
2025/12/23 11:30:13
[INFO]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2025/12/23 11:30:13
[INFO]     provider, model_name = _infer_model_and_provider(model, provider=provider)
2025/12/23 11:30:13
[INFO]   File "/usr/lib/python3.11/site-packages/langchain/embeddings/base.py", line 188, in init_embeddings
2025/12/23 11:30:13
[INFO]   File "/api/langgraph_api/graph.py", line 708, in resolve_embeddings
2025/12/23 11:30:13
[INFO]   File "/api/langgraph_api/timing/timer.py", line 101, in wrapper
2025/12/23 11:30:13
[INFO]                                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2025/12/23 11:30:13
[INFO]     _STORE_CONFIG["index"]["embed"] = resolve_embeddings(_STORE_CONFIG["index"])
2025/12/23 11:30:13
[INFO]   File "/usr/lib/python3.11/site-packages/langgraph_runtime_postgres/store.py", line 130, in set_store_config
2025/12/23 11:30:13
[INFO]     lg_store.set_store_config(config_)
2025/12/23 11:30:13
[INFO]   File "/usr/lib/python3.11/site-packages/langgraph_runtime_postgres/database.py", line 209, in migrate_vector_index
2025/12/23 11:30:13
[INFO]     await migrate_vector_index()
2025/12/23 11:30:13
[INFO]   File "/usr/lib/python3.11/site-packages/langgraph_runtime_postgres/database.py", line 237, in start_pool
2025/12/23 11:30:13
[INFO]     await database.start_pool()
2025/12/23 11:30:13
[INFO]   File "/usr/lib/python3.11/site-packages/langgraph_runtime_postgres/lifespan.py", line 68, in lifespan
2025/12/23 11:30:13
[INFO]            ^^^^^^^^^^^^^^^^^^^^^
2025/12/23 11:30:13
[INFO]     return await anext(self.gen)
2025/12/23 11:30:13
[INFO]   File "/usr/lib/python3.11/contextlib.py", line 210, in __aenter__
2025/12/23 11:30:13
[INFO]              ^^^^^^^^^^^^^^^^
2025/12/23 11:30:13
[INFO]     result = await _enter(cm)
2025/12/23 11:30:13
[INFO]   File "/usr/lib/python3.11/contextlib.py", line 650, in enter_async_context
2025/12/23 11:30:13
[INFO]   File "/api/langgraph_api/timing/timer.py", line 227, in combined_lifespan
2025/12/23 11:30:13
[INFO]            ^^^^^^^^^^^^^^^^^^^^^
2025/12/23 11:30:13
[INFO]     return await anext(self.gen)
2025/12/23 11:30:13
[INFO]   File "/usr/lib/python3.11/contextlib.py", line 210, in __aenter__
2025/12/23 11:30:13
[INFO]              ^^^^^^^^^^^^^^^^
2025/12/23 11:30:13
[INFO]     result = await _enter(cm)
2025/12/23 11:30:13
[INFO] Traceback (most recent call last):
  File "/usr/lib/python3.11/site-packages/langgraph_runtime_postgres/lifespan.py", line 168, in lifespan
    yield
  File "/api/langgraph_api/timing/timer.py", line 227, in combined_lifespan
  File "/usr/lib/python3.11/contextlib.py", line 650, in enter_async_context
`
```

For the `langgraph.json` file, we are currently using the following settings:


```
`"store": {
  "index": {
    "embed": "openai:text-embedding-3-small",
    "dims": 1536,
    "fields": ["content"]
  }
},
`
```

For your reference, I will also add the response from Codex based on the logs:

**Root Cause Analysis from Internal Investigation (Response from Codex):**

The definitive cause is that an OpenAIEmbeddings object, rather than a string (e.g., “openai:text-embedding-3-small”), is present in `_STORE_CONFIG["index"]["embed"]` at the time `langgraph_runtime_postgres.store.set_store_config()` is executed. This leads to an AttributeError when `model.strip()` is called inside `langchain.embeddings.base._infer_model_and_provider()` , as the `strip()` method does not exist for the OpenAIEmbeddings object. This issue is unrelated to the application’s graph execution and occurs during the Platform’s startup Store initialization.

---

## Post #2 by @wfh
*Posted on 2025-12-23 02:37:50*

Thanks for flagging - will look into this

---

## Post #3 by @wfh
*Posted on 2025-12-23 08:47:01*

[/u/ren](@Ren) , do you still have issues if you re-deploy? Agent server version `0.6.12` should address the issue you’re seeing.

---

## Post #5 by @Ren
*Posted on 2025-12-23 11:14:14*

[/u/wfh](@wfh)

Thanks a lot for the fast fix!

I tried redeploying and it worked perfectly.

The issue is all cleared up. I’m impressed that you handled this in only a few hours.

Did you guys update the langgraph-api version to 0.6.12 to fix this?

Regardless, thanks a million for the help!

---

## Post #6 by @wfh
*Posted on 2025-12-25 09:33:36*

Yes exactly !

---
