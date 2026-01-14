# PoolTimeout using a simple map reducer

**Topic ID:** 1332
**Created:** 2025-08-26 11:16:24
**URL:** https://forum.langchain.com/t/1332

**Tags:** python-help

---

## Post #1 by @TomPaolo1
*Posted on 2025-08-26 11:16:24*

When running my graph with multiple nodes derived from a simple map reducer, I encounter the following error, with the trace not specifying the exact point where the problem occurs inside the nodes.

PoolTimeout(“couldn’t get a connection after 15.00 sec”)

Traceback (most recent call last):

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py”, line 2939, in astream

async for _ in runner.atick(

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/_runner.py”, line 295, in atick

await arun_with_retry(

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/_retry.py”, line 137, in arun_with_retry

return await task.proc.ainvoke(task.input, config)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/usr/local/lib/python3.11/site-packages/langgraph/_internal/_runnable.py”, line 706, in ainvoke

input = await asyncio.create_task(

^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/usr/local/lib/python3.11/site-packages/langgraph/_internal/_runnable.py”, line 474, in ainvoke

ret = await self.afunc(*args, **kwargs)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/deps/erik/src/utils/error_handler.py”, line 54, in async_wrapper

raise error

File “/deps/erik/src/utils/error_handler.py”, line 33, in async_wrapper

return await func(*args, **kwargs)

^^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/deps/erik/src/orchestrator/nodes.py”, line 693, in subgraph_caller

response = await graph_instance.ainvoke(

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py”, line 3112, in ainvoke

async for chunk in self.astream(

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py”, line 2939, in astream

async for _ in runner.atick(

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/_runner.py”, line 401, in atick

_panic_or_proceed(

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/_runner.py”, line 511, in _panic_or_proceed

raise exc

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/_retry.py”, line 137, in arun_with_retry

return await task.proc.ainvoke(task.input, config)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/usr/local/lib/python3.11/site-packages/langgraph/_internal/_runnable.py”, line 706, in ainvoke

input = await asyncio.create_task(

^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py”, line 3112, in ainvoke

async for chunk in self.astream(

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py”, line 2883, in astream

async with AsyncPregelLoop(

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/_loop.py”, line 1186, in **aenter**

saved = await self.checkpointer.aget_tuple(self.checkpoint_config)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/storage/langgraph_runtime_postgres/checkpoint.py”, line 269, in aget_tuple

File “/storage/langgraph_runtime_postgres/checkpoint.py”, line 215, in aget_iter

File “/usr/local/lib/python3.11/contextlib.py”, line 210, in **aenter**

return await anext(self.gen)

^^^^^^^^^^^^^^^^^^^^^

File “/storage/langgraph_runtime_postgres/checkpoint.py”, line 157, in _connect

File “/usr/local/lib/python3.11/contextlib.py”, line 210, in **aenter**

return await anext(self.gen)

^^^^^^^^^^^^^^^^^^^^^

File “/storage/langgraph_runtime_postgres/database.py”, line 63, in connect

File “/usr/local/lib/python3.11/contextlib.py”, line 210, in **aenter**

return await anext(self.gen)

^^^^^^^^^^^^^^^^^^^^^

File “/usr/local/lib/python3.11/site-packages/psycopg_pool/pool_async.py”, line 195, in connection

conn = await self.getconn(timeout=timeout)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/usr/local/lib/python3.11/site-packages/psycopg_pool/pool_async.py”, line 230, in getconn

raise PoolTimeout(

psycopg_pool.PoolTimeout: couldn’t get a connection after 15.00 sec

---
