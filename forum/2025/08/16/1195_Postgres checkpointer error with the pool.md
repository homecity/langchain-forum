# Postgres checkpointer error with the pool

**Topic ID:** 1195
**Created:** 2025-08-16 16:04:07
**URL:** https://forum.langchain.com/t/1195

**Tags:** self-hosted

---

## Post #1 by @akbindal
*Posted on 2025-08-16 16:04:07*

I’m running into an issue with the **Postgres connection pool** when using `langgraph-postgres-checkpointer`. After fewer than 10 runs of a graph, the server starts failing with the following error pattern:


Background run fails, then retries a few times (3–4 retries).
After that, it permanently fails for all future graph runs.
The only way to recover is to restart the LangGraph server, which allows a few more runs before the same errors repeat.

I’m attaching the server logs from one such error sequence. Here’s my current pool configuration:


```
`async def create_graph(config: RunnableConfig):
    pool = AsyncConnectionPool(
        conninfo=str("postgresql://postgres:postgres@localhost:5432/postgres"),
        max_size=30,
        min_size=2,
        kwargs={
            "autocommit": True,
            "row_factory": dict_row,
            "prepare_threshold": 0
        },
        open=False,
    )
    checkpointer = AsyncPostgresSaver(pool)
    app = await create_agent(
        config, checkpointer=checkpointer
    )
    app.name = "Agent"
    return app

`
```



Server Logs (click to see)

```
`2025-08-14T13:31:55.914395283Z 2025-08-14 13:31:55.914 | INFO     | app.agents.xyz_graph.agent:create_graph:75 - Creating graph
2025-08-14T13:31:55.931159544Z 2025-08-14 13:31:55.930 | INFO     | app.agents.xyz_graph.agent:create_graph:100 - graph created successfully
2025-08-14T13:31:55.936675368Z 2025-08-14T13:31:55.936451Z [warning  ] discarding closed connection:  [psycopg.pool] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=1 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=bg-loop-5_0
2025-08-14T13:31:55.943662668Z 2025-08-14T13:31:55.943373Z [warning  ] /usr/local/lib/python3.11/site-packages/structlog/stdlib.py:1160: UserWarning: Remove `format_exc_info` from your processor chain if you want pretty exceptions.
2025-08-14T13:31:55.943705578Z   ed = p(logger, meth_name, ed)  # type: ignore[arg-type]
2025-08-14T13:31:55.943716299Z  [py.warnings] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=1 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=bg-loop-5_0
2025-08-14T13:31:55.943722390Z 2025-08-14T13:31:55.941630Z [error    ] Run encountered an error in graph: (consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:55.943727800Z 	This probably means the server terminated abnormally
2025-08-14T13:31:55.943732559Z 	before or while processing the request.) [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=1 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=bg-loop-5_0
2025-08-14T13:31:55.943737609Z Traceback (most recent call last):
2025-08-14T13:31:55.943747549Z   File "/api/langgraph_api/worker.py", line 137, in wrap_user_errors
2025-08-14T13:31:55.943753530Z   File "/api/langgraph_api/stream.py", line 426, in consume
2025-08-14T13:31:55.943761134Z   File "/api/langgraph_api/stream.py", line 411, in consume
2025-08-14T13:31:55.943765592Z   File "/api/langgraph_api/stream.py", line 322, in astream_state
2025-08-14T13:31:55.943769138Z   File "/api/langgraph_api/asyncio.py", line 91, in wait_if_not_done
2025-08-14T13:31:55.943774319Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py", line 2883, in astream
2025-08-14T13:31:55.943779999Z     async with AsyncPregelLoop(
2025-08-14T13:31:55.943785119Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/_loop.py", line 1186, in __aenter__
2025-08-14T13:31:55.943793324Z     saved = await self.checkpointer.aget_tuple(self.checkpoint_config)
2025-08-14T13:31:55.943807090Z             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2025-08-14T13:31:55.943812129Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 262, in aget_tuple
2025-08-14T13:31:55.943819213Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 209, in aget_iter
2025-08-14T13:31:55.943822970Z   File "/usr/local/lib/python3.11/site-packages/psycopg/connection_async.py", line 276, in execute
2025-08-14T13:31:55.943827047Z     raise ex.with_traceback(None)
2025-08-14T13:31:55.943831486Z psycopg.OperationalError: consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:55.943835944Z 	This probably means the server terminated abnormally
2025-08-14T13:31:55.943839871Z 	before or while processing the request.
2025-08-14T13:31:55.955972159Z 2025-08-14T13:31:55.955311Z [warning  ] Background run failed, will retry. Exception: (consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:55.955991936Z 	This probably means the server terminated abnormally
2025-08-14T13:31:55.956006233Z 	before or while processing the request.) [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=1 run_completed_in_ms=268 run_created_at=2025-08-14T13:31:55.676521+00:00 run_ended_at=2025-08-14T13:31:55.943539+00:00 run_exec_ms=258 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 run_started_at=2025-08-14T13:31:55.684600+00:00 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_1
2025-08-14T13:31:55.970040524Z 2025-08-14T13:31:55.967087Z [warning  ] RETRYING                       [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=1 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_3
2025-08-14T13:31:55.970060371Z Traceback (most recent call last):
2025-08-14T13:31:55.970065401Z   File "/api/langgraph_api/worker.py", line 192, in worker
2025-08-14T13:31:55.970073796Z   File "/usr/local/lib/python3.11/asyncio/tasks.py", line 489, in wait_for
2025-08-14T13:31:55.970076651Z     return fut.result()
2025-08-14T13:31:55.970079046Z            ^^^^^^^^^^^^
2025-08-14T13:31:55.970081661Z   File "/api/langgraph_api/worker.py", line 137, in wrap_user_errors
2025-08-14T13:31:55.970086500Z   File "/api/langgraph_api/stream.py", line 426, in consume
2025-08-14T13:31:55.970089025Z   File "/api/langgraph_api/stream.py", line 411, in consume
2025-08-14T13:31:55.970092160Z   File "/api/langgraph_api/stream.py", line 322, in astream_state
2025-08-14T13:31:55.970095878Z   File "/api/langgraph_api/asyncio.py", line 91, in wait_if_not_done
2025-08-14T13:31:55.970098513Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py", line 2883, in astream
2025-08-14T13:31:55.970104444Z     async with AsyncPregelLoop(
2025-08-14T13:31:55.970107860Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/_loop.py", line 1186, in __aenter__
2025-08-14T13:31:55.970110675Z     saved = await self.checkpointer.aget_tuple(self.checkpoint_config)
2025-08-14T13:31:55.970113050Z             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2025-08-14T13:31:55.970114984Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 262, in aget_tuple
2025-08-14T13:31:55.970118450Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 209, in aget_iter
2025-08-14T13:31:55.970120684Z   File "/usr/local/lib/python3.11/site-packages/psycopg/connection_async.py", line 276, in execute
2025-08-14T13:31:55.970123790Z     raise ex.with_traceback(None)
2025-08-14T13:31:55.970125703Z psycopg.OperationalError: consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:55.970128800Z 	This probably means the server terminated abnormally
2025-08-14T13:31:55.970135041Z 	before or while processing the request.
2025-08-14T13:31:55.978998687Z 2025-08-14T13:31:55.978557Z [info     ] Starting background run        [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 resumable=False run_attempt=2 run_creation_ms=1 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 run_queue_ms=299 run_started_at=2025-08-14T13:31:55.975599+00:00 run_stream_start_ms=0 temporary=False thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_1
2025-08-14T13:31:55.982375703Z 2025-08-14T13:31:55.982025Z [info     ] Listening for cancellation     [langgraph_runtime_postgres.ops] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=2 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_0
2025-08-14T13:31:56.068121524Z 2025-08-14T13:31:56.067655Z [info     ] Background worker called webhook [langgraph_api.webhook] api_revision=6d541e5 api_variant=licensed langgraph_api_version=0.2.129 run_id=UUID('1f079130-bbcf-68f4-9d07-488a9c098419') thread_name=ThreadPoolExecutor-2_2 webhook=WEBHOOK
2025-08-14T13:31:56.207996898Z 2025-08-14 13:31:56.207 | INFO     | app.agents.xyz_graph.agent:create_graph:75 - Creating graph
2025-08-14T13:31:56.231503267Z 2025-08-14 13:31:56.231 | INFO     | app.agents.xyz_graph.agent:create_graph:100 - graph created successfully
2025-08-14T13:31:56.240145938Z 2025-08-14T13:31:56.239886Z [warning  ] discarding closed connection:  [psycopg.pool] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=2 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=bg-loop-8_0
2025-08-14T13:31:56.246578746Z 2025-08-14T13:31:56.246389Z [warning  ] /usr/local/lib/python3.11/site-packages/structlog/stdlib.py:1160: UserWarning: Remove `format_exc_info` from your processor chain if you want pretty exceptions.
2025-08-14T13:31:56.246600667Z   ed = p(logger, meth_name, ed)  # type: ignore[arg-type]
2025-08-14T13:31:56.246608501Z  [py.warnings] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=2 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=bg-loop-8_0
2025-08-14T13:31:56.246616626Z 2025-08-14T13:31:56.244332Z [error    ] Run encountered an error in graph: (consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:56.246625042Z 	This probably means the server terminated abnormally
2025-08-14T13:31:56.246628789Z 	before or while processing the request.) [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=2 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=bg-loop-8_0
2025-08-14T13:31:56.246643446Z Traceback (most recent call last):
2025-08-14T13:31:56.246648426Z   File "/api/langgraph_api/worker.py", line 137, in wrap_user_errors
2025-08-14T13:31:56.246652584Z   File "/api/langgraph_api/stream.py", line 426, in consume
2025-08-14T13:31:56.246655719Z   File "/api/langgraph_api/stream.py", line 411, in consume
2025-08-14T13:31:56.246659436Z   File "/api/langgraph_api/stream.py", line 322, in astream_state
2025-08-14T13:31:56.246662642Z   File "/api/langgraph_api/asyncio.py", line 91, in wait_if_not_done
2025-08-14T13:31:56.246667612Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py", line 2883, in astream
2025-08-14T13:31:56.246671980Z     async with AsyncPregelLoop(
2025-08-14T13:31:56.246675417Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/_loop.py", line 1186, in __aenter__
2025-08-14T13:31:56.246679424Z     saved = await self.checkpointer.aget_tuple(self.checkpoint_config)
2025-08-14T13:31:56.246683832Z             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2025-08-14T13:31:56.246691847Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 262, in aget_tuple
2025-08-14T13:31:56.246696235Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 209, in aget_iter
2025-08-14T13:31:56.246699742Z   File "/usr/local/lib/python3.11/site-packages/psycopg/connection_async.py", line 276, in execute
2025-08-14T13:31:56.246702727Z     raise ex.with_traceback(None)
2025-08-14T13:31:56.246706244Z psycopg.OperationalError: consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:56.246709320Z 	This probably means the server terminated abnormally
2025-08-14T13:31:56.246713177Z 	before or while processing the request.
2025-08-14T13:31:56.256262531Z 2025-08-14T13:31:56.255716Z [warning  ] Background run failed, will retry. Exception: (consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:56.256276468Z 	This probably means the server terminated abnormally
2025-08-14T13:31:56.256281207Z 	before or while processing the request.) [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=2 run_completed_in_ms=571 run_created_at=2025-08-14T13:31:55.676521+00:00 run_ended_at=2025-08-14T13:31:56.246528+00:00 run_exec_ms=270 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 run_started_at=2025-08-14T13:31:55.975599+00:00 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_1
2025-08-14T13:31:56.264318119Z 2025-08-14T13:31:56.262131Z [warning  ] RETRYING                       [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=2 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_0
2025-08-14T13:31:56.264340140Z Traceback (most recent call last):
2025-08-14T13:31:56.264344918Z   File "/api/langgraph_api/worker.py", line 192, in worker
2025-08-14T13:31:56.264348766Z   File "/usr/local/lib/python3.11/asyncio/tasks.py", line 489, in wait_for
2025-08-14T13:31:56.264369004Z     return fut.result()
2025-08-14T13:31:56.264372030Z            ^^^^^^^^^^^^
2025-08-14T13:31:56.264374364Z   File "/api/langgraph_api/worker.py", line 137, in wrap_user_errors
2025-08-14T13:31:56.264376468Z   File "/api/langgraph_api/stream.py", line 426, in consume
2025-08-14T13:31:56.264378652Z   File "/api/langgraph_api/stream.py", line 411, in consume
2025-08-14T13:31:56.264384123Z   File "/api/langgraph_api/stream.py", line 322, in astream_state
2025-08-14T13:31:56.264386036Z   File "/api/langgraph_api/asyncio.py", line 91, in wait_if_not_done
2025-08-14T13:31:56.264389342Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py", line 2883, in astream
2025-08-14T13:31:56.264393039Z     async with AsyncPregelLoop(
2025-08-14T13:31:56.264396185Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/_loop.py", line 1186, in __aenter__
2025-08-14T13:31:56.264399251Z     saved = await self.checkpointer.aget_tuple(self.checkpoint_config)
2025-08-14T13:31:56.264401424Z             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2025-08-14T13:31:56.264404080Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 262, in aget_tuple
2025-08-14T13:31:56.264407607Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 209, in aget_iter
2025-08-14T13:31:56.264410602Z   File "/usr/local/lib/python3.11/site-packages/psycopg/connection_async.py", line 276, in execute
2025-08-14T13:31:56.264415191Z     raise ex.with_traceback(None)
2025-08-14T13:31:56.264417565Z psycopg.OperationalError: consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:56.264420080Z 	This probably means the server terminated abnormally
2025-08-14T13:31:56.264423366Z 	before or while processing the request.
2025-08-14T13:31:56.272879616Z 2025-08-14T13:31:56.272464Z [info     ] Starting background run        [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 resumable=False run_attempt=3 run_creation_ms=1 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 run_queue_ms=592 run_started_at=2025-08-14T13:31:56.269352+00:00 run_stream_start_ms=0 temporary=False thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_2
2025-08-14T13:31:56.276678053Z 2025-08-14T13:31:56.276273Z [info     ] Listening for cancellation     [langgraph_runtime_postgres.ops] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=3 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_0
2025-08-14T13:31:56.351716305Z 2025-08-14T13:31:56.351316Z [info     ] Background worker called webhook [langgraph_api.webhook] api_revision=6d541e5 api_variant=licensed langgraph_api_version=0.2.129 run_id=UUID('1f079130-bbcf-68f4-9d07-488a9c098419') thread_name=ThreadPoolExecutor-2_0 webhook=WEBHOOK
2025-08-14T13:31:56.499577955Z 2025-08-14 13:31:56.499 | INFO     | app.agents.xyz_graph.agent:create_graph:75 - Creating graph
2025-08-14T13:31:56.514627815Z 2025-08-14 13:31:56.514 | INFO     | app.agents.xyz_graph.agent:create_graph:100 - graph created successfully
2025-08-14T13:31:56.520940056Z 2025-08-14T13:31:56.520700Z [warning  ] discarding closed connection:  [psycopg.pool] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=3 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=bg-loop-4_0
2025-08-14T13:31:56.525985537Z 2025-08-14T13:31:56.525781Z [warning  ] /usr/local/lib/python3.11/site-packages/structlog/stdlib.py:1160: UserWarning: Remove `format_exc_info` from your processor chain if you want pretty exceptions.
2025-08-14T13:31:56.526010473Z   ed = p(logger, meth_name, ed)  # type: ignore[arg-type]
2025-08-14T13:31:56.526016254Z  [py.warnings] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=3 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=bg-loop-4_0
2025-08-14T13:31:56.526022757Z 2025-08-14T13:31:56.524097Z [error    ] Run encountered an error in graph: (consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:56.526026614Z 	This probably means the server terminated abnormally
2025-08-14T13:31:56.526029038Z 	before or while processing the request.) [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=3 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=bg-loop-4_0
2025-08-14T13:31:56.526035671Z Traceback (most recent call last):
2025-08-14T13:31:56.526040459Z   File "/api/langgraph_api/worker.py", line 137, in wrap_user_errors
2025-08-14T13:31:56.526061459Z   File "/api/langgraph_api/stream.py", line 426, in consume
2025-08-14T13:31:56.526063884Z   File "/api/langgraph_api/stream.py", line 411, in consume
2025-08-14T13:31:56.526066318Z   File "/api/langgraph_api/stream.py", line 322, in astream_state
2025-08-14T13:31:56.526069013Z   File "/api/langgraph_api/asyncio.py", line 91, in wait_if_not_done
2025-08-14T13:31:56.526071628Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py", line 2883, in astream
2025-08-14T13:31:56.526075074Z     async with AsyncPregelLoop(
2025-08-14T13:31:56.526078992Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/_loop.py", line 1186, in __aenter__
2025-08-14T13:31:56.526082238Z     saved = await self.checkpointer.aget_tuple(self.checkpoint_config)
2025-08-14T13:31:56.526085614Z             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2025-08-14T13:31:56.526088841Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 262, in aget_tuple
2025-08-14T13:31:56.526092859Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 209, in aget_iter
2025-08-14T13:31:56.526095604Z   File "/usr/local/lib/python3.11/site-packages/psycopg/connection_async.py", line 276, in execute
2025-08-14T13:31:56.526097477Z     raise ex.with_traceback(None)
2025-08-14T13:31:56.526099651Z psycopg.OperationalError: consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:56.526102868Z 	This probably means the server terminated abnormally
2025-08-14T13:31:56.526105122Z 	before or while processing the request.
2025-08-14T13:31:56.534508061Z 2025-08-14T13:31:56.534060Z [warning  ] Background run failed, will retry. Exception: (consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:56.534527027Z 	This probably means the server terminated abnormally
2025-08-14T13:31:56.534532267Z 	before or while processing the request.) [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=3 run_completed_in_ms=850 run_created_at=2025-08-14T13:31:55.676521+00:00 run_ended_at=2025-08-14T13:31:56.525951+00:00 run_exec_ms=256 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 run_started_at=2025-08-14T13:31:56.269352+00:00 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_2
2025-08-14T13:31:56.546280522Z 2025-08-14T13:31:56.544087Z [warning  ] RETRYING                       [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=3 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_0
2025-08-14T13:31:56.546323423Z Traceback (most recent call last):
2025-08-14T13:31:56.546328993Z   File "/api/langgraph_api/worker.py", line 192, in worker
2025-08-14T13:31:56.546339472Z   File "/usr/local/lib/python3.11/asyncio/tasks.py", line 489, in wait_for
2025-08-14T13:31:56.546343560Z     return fut.result()
2025-08-14T13:31:56.546346917Z            ^^^^^^^^^^^^
2025-08-14T13:31:56.546352146Z   File "/api/langgraph_api/worker.py", line 137, in wrap_user_errors
2025-08-14T13:31:56.546373718Z   File "/api/langgraph_api/stream.py", line 426, in consume
2025-08-14T13:31:56.546376673Z   File "/api/langgraph_api/stream.py", line 411, in consume
2025-08-14T13:31:56.546380631Z   File "/api/langgraph_api/stream.py", line 322, in astream_state
2025-08-14T13:31:56.546383947Z   File "/api/langgraph_api/asyncio.py", line 91, in wait_if_not_done
2025-08-14T13:31:56.546389728Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py", line 2883, in astream
2025-08-14T13:31:56.546395619Z     async with AsyncPregelLoop(
2025-08-14T13:31:56.546400618Z   File "/usr/local/lib/python3.11/site-packages/langgraph/pregel/_loop.py", line 1186, in __aenter__
2025-08-14T13:31:56.546404465Z     saved = await self.checkpointer.aget_tuple(self.checkpoint_config)
2025-08-14T13:31:56.546407281Z             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2025-08-14T13:31:56.546410908Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 262, in aget_tuple
2025-08-14T13:31:56.546416118Z   File "/usr/local/lib/python3.11/site-packages/langgraph_runtime_postgres/checkpoint.py", line 209, in aget_iter
2025-08-14T13:31:56.546419324Z   File "/usr/local/lib/python3.11/site-packages/psycopg/connection_async.py", line 276, in execute
2025-08-14T13:31:56.546423801Z     raise ex.with_traceback(None)
2025-08-14T13:31:56.546426778Z psycopg.OperationalError: consuming input failed: server closed the connection unexpectedly
2025-08-14T13:31:56.546431135Z 	This probably means the server terminated abnormally
2025-08-14T13:31:56.546435013Z 	before or while processing the request.
2025-08-14T13:31:56.550038353Z 2025-08-14T13:31:56.549755Z [info     ] Starting background run        [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 resumable=False run_attempt=4 run_creation_ms=1 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 run_queue_ms=872 run_started_at=2025-08-14T13:31:56.549239+00:00 run_stream_start_ms=0 temporary=False thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_2
2025-08-14T13:31:56.552523663Z 2025-08-14T13:31:56.552246Z [error    ] Run exceeded max attempts      [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=4 run_completed_in_ms=876 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_3
2025-08-14T13:31:56.552660711Z 2025-08-14T13:31:56.552473Z [info     ] Listening for cancellation     [langgraph_runtime_postgres.ops] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=4 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_3
2025-08-14T13:31:56.553386956Z 2025-08-14T13:31:56.553123Z [error    ] Background run failed. Exception: (Run 1f079130-bbcf-68f4-9d07-488a9c098419 exceeded max attempts (3).
2025-08-14T13:31:56.553404619Z 
2025-08-14T13:31:56.553408687Z This may happen if your code blocks the event loop with synchronous I/O bound calls (network requests, database queries, etc.).
2025-08-14T13:31:56.553412474Z 
2025-08-14T13:31:56.553414838Z If that is the case, your issues may be resolved by converting synchronous operations to async (e.g., use aiohttp instead of requests).
2025-08-14T13:31:56.553417734Z 
2025-08-14T13:31:56.553420659Z ) [langgraph_api.worker] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=4 run_completed_in_ms=877 run_created_at=2025-08-14T13:31:55.676521+00:00 run_ended_at=2025-08-14T13:31:56.552739+00:00 run_exec_ms=3 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 run_started_at=2025-08-14T13:31:56.549239+00:00 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=ThreadPoolExecutor-3_0
2025-08-14T13:31:56.554812455Z 2025-08-14T13:31:56.554582Z [warning  ] discarding closed connection:  [psycopg.pool] api_revision=6d541e5 api_variant=licensed assistant_id=dfb9acab-bbd4-5067-aefd-570ee7b96cff graph_id=xyz_graph langgraph_api_version=0.2.129 request_id=418a8eba-0307-48d2-ab9d-b9ea9064cd77 run_attempt=4 run_id=1f079130-bbcf-68f4-9d07-488a9c098419 thread_id=3b513eed-6eb6-40c2-99c3-6f57ea623b79 thread_name=bg-loop-1_0
2025-08-14T13:31:56.611231910Z 2025-08-14T13:31:56.610869Z [info     ] Background worker called webhook [langgraph_api.webhook] api_revision=6d541e5 api_variant=licensed langgraph_api_version=0.2.129 run_id=UUID('1f079130-bbcf-68f4-9d07-488a9c098419') thread_name=ThreadPoolExecutor-2_0 webhook=WEBHOOK
2025-08-14T13:31:56.653483994Z 2025-08-14T13:31:56.653064Z [info     ] Background worker called webhook [langgraph_api.webhook] api_revision=6d541e5 api_variant=licensed langgraph_api_version=0.2.129 run_id=UUID('1f079130-bbcf-68f4-9d07-488a9c098419') thread_name=ThreadPoolExecutor-2_2 webhook=WEBHOOK
2025-08-14T13:32:17.649876227Z 2025-08-14T13:32:17.649487Z [info     ] Postgres pool stats            [langgraph_runtime_postgres.database] api_revision=6d541e5 api_variant=licensed langgraph_api_version=0.2.129 pool_available=2 pool_max=150 pool_min=1 pool_size=2 requests_num=27 requests_waiting=0 thread_name=MainThread usage_ms=162
2025-08-14T13:32:17.725761207Z 2025-08-14T13:32:17.725340Z [info     ] Redis pool stats               [langgraph_runtime_postgres.redis] api_revision=6d541e5 api_variant=licensed idle_connections=3 in_use_connections=2 langgraph_api_version=0.2.129 max_connections=2000 thread_name=ThreadPoolExecutor-2_1
2025-08-14T13:32:18.975599825Z 2025-08-14T13:32:18.975183Z [info     ] Worker stats                   [langgraph_runtime_postgres.queue] active=0 api_revision=6d541e5 api_variant=licensed available=10 langgraph_api_version=0.2.129 max=10 thread_name=ThreadPoolExecutor-2_0
`
```

---

## Post #2 by @rahul-langchain
*Posted on 2025-08-19 17:38:10*

Hi! I notice you have “open” set to “False”. Are you opening the pool at any point?

---

## Post #3 by @akbindal
*Posted on 2025-08-20 14:56:31*

[/u/rahul-langchain](@rahul-langchain) The pool instance passed to the checkpointer isn’t opened in our code, hoping LangGraph server to manage it.

FYI: This works fine in LangGraph dev but errors occur when running on the LangGraph server

---

## Post #4 by @rahul-langchain
*Posted on 2025-08-20 20:24:33*

Can you try setting “open” to True and letting me know if it works?

---

## Post #5 by @akbindal
*Posted on 2025-08-21 17:30:49*

[/u/rahul-langchain](@rahul-langchain) still the same errors with `open` set to true

---

## Post #6 by @akbindal
*Posted on 2025-08-22 10:44:15*

any updates or workaround on this?

---

## Post #7 by @rahul-langchain
*Posted on 2025-08-22 12:58:13*

Hi, this looks like an error with the Postgres connection, not with LangGraph. One place you might want to look is how you’re handling async tasks. If something is blocked too long while holding one of the connections from the pool, it can lead to errors like the ones in the logs you shared.

---

## Post #8 by @wfh
*Posted on 2025-08-22 15:43:32*

This seems to be langgraph OSS rather than langgraph platform, correct? (since in the platform, you wouldn’t be creating a custom checkpointer)

---

## Post #9 by @akbindal
*Posted on 2025-08-22 17:27:21*

[/u/rahul-langchain](@rahul-langchain)

A run/task can take long and isn’t fully async due to underlying dependencies, which is why I’m running server with `BG_JOB_ISOLATED_LOOPS=true`. Shouldn’t `langgraph-checkpointer` be managing the pool here, or is this expected to be tuned via Postgres settings? Also unclear why subsequent runs hit the same connection issue if the pool is managed via checkpointer.

[/u/wfh](@wfh) running on langgraph stand-alone selfhosted server

---

## Post #10 by @wfh
*Posted on 2025-08-22 17:47:44*

In general the checkpointer would be ignored if you’re running this in the LGP server, which is why an exception saying as such is raised in `langgraph dev`.

It looks like you have connection issues though.


  
      

      [https://langchain-ai.github.io/langgraph/concepts/persistence/](langchain-ai.github.io)
  

  
    

[https://langchain-ai.github.io/langgraph/concepts/persistence/](Overview)

  Build reliable, stateful AI systems, without giving up control



  

  
    
    
  

  

[/uploads/short-url/wylg1jkoR4jgeHiEAFFsGAEKWtJ.png?dl=1](image550×107 7.5 KB)

---
