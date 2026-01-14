# Deployment fails

**Topic ID:** 1324
**Created:** 2025-08-23 21:18:10
**URL:** https://forum.langchain.com/t/1324

**Tags:** python-help, cloud

---

## Post #1 by @tezer
*Posted on 2025-08-23 21:18:10*

Hi

I am trying to deploy my code, but it fails with the error (from the log).

I have no idea what might be wrong with my code and what I need to fix.

Please, help.

`8/24/2025, 12:00:38 AM`

`[INFO] Using auth of type=langsmith`

`8/24/2025, 12:00:38 AM`

`[INFO] Using langgraph_runtime_postgres`

`8/24/2025, 12:00:34 AM`

`[ERROR] Application startup failed. Exiting.`

`8/24/2025, 12:00:34 AM`

`[ERROR] Traceback (most recent call last):`

`File “/usr/local/lib/python3.11/site-packages/starlette/routing.py”, line 694, in lifespan`

`async with self.lifespan_context(app) as maybe_state:`

`File “/usr/local/lib/python3.11/contextlib.py”, line 210, in `**`aenter`**

`return await anext(self.gen)`

`^^^^^^^^^^^^^^^^^^^^^`

`File “/storage/langgraph_runtime_postgres/lifespan.py”, line 57, in lifespan`

`File “/storage/langgraph_runtime_postgres/database.py”, line 224, in start_pool`

`File “/storage/langgraph_runtime_postgres/database.py”, line 206, in migrate_vector_index`

`File “/storage/langgraph_runtime_postgres/store.py”, line 132, in set_store_config`

`File “/api/langgraph_api/graph.py”, line 662, in resolve_embeddings`

`ValueError: Could not load LangChain embeddings ‘openai:text-embedding-3-small’. Loading embeddings by provider:identifier requires the langchain package (>=0.3.9). Install it with: pip install ‘langchain>=0.3.9’ or specify ‘embed’ as a path to a variable in a Python file instead.`

`8/24/2025, 12:00:34 AM`

`[INFO] Applied database migration`

Here is my langgraph.json file:

`{   "python_version": "3.11",   "dependencies": [     "./eaia"   ],   "graphs": {     "main": "./eaia/main/graph.py:graph",     "cron": "./eaia/cron_graph.py:graph",     "general_reflection_graph": "./eaia/reflection_graphs.py:general_reflection_graph",     "multi_reflection_graph": "./eaia/reflection_graphs.py:multi_reflection_graph"   },   "env": "./.env",   "store": {     "index": {       "embed": "openai:text-embedding-3-small",       "dims": 1536     }   } }`

---
