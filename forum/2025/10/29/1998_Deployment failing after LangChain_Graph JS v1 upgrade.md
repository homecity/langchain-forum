# Deployment failing after LangChain/Graph JS v1 upgrade

**Topic ID:** 1998
**Created:** 2025-10-29 09:46:17
**URL:** https://forum.langchain.com/t/1998

**Tags:** js-help

---

## Post #1 by @lihbr
*Posted on 2025-10-29 09:46:17*

Hi there,

We’re in the process of upgrading to LangChain/Graph JS v1 and Zod v4. The code part is done, and we can develop with LangGraph CLI v1 locally fine.

Our issue happens when trying to deploy on LangSmith platform. My understanding is that the build image doesn’t seem to support the LangChain/Graph JS v1 suite (tried with `wolfi` and `bookworm`):


```
`[INFO] Step #17: 1.208 - @langchain/langgraph-checkpoint@1.0.0 is not up to date. Required: ~0.0.16 || ^0.1.0
[INFO] Step #17: 1.208 - @langchain/langgraph@1.0.1 is not up to date. Required: ^0.2.57 || ^0.3.0 || ^0.4.0
`
```

Here’s a deployment/revision ID pair illustrating such issue: `e758727f-e229-4415-a647-827c3abe4a09` / `cebcf2bd-f16b-4d0c-9e2f-2d3c2f025514`

If I’m right about my assumption, is there a build image supporting LangChain/Graph JS v1 we could use? If not, if there a timeline for it?

Else, what could we try? I’m confused because the example projet for Python was updated but not the JavaScript one: [https://docs.langchain.com/langsmith/deployment-quickstart#1-create-a-repository-on-github](Deploy your app to Cloud - Docs by LangChain)

Thanks,

---

## Post #2 by @JUSTINMKAUFMAN
*Posted on 2025-10-30 02:46:32*

Same issue here: [https://forum.langchain.com/t/langgraph-platform-deployment-failing/443/5](LangGraph Platform deployment failing - #5 by JUSTINMKAUFMAN)

---

## Post #4 by @Isaac
*Posted on 2025-11-03 18:16:54*

lihbr:

e758727f-e229-4415-a647-827c3abe4a09



Hi [/u/lihbr](@lihbr) -  I can’t find a deployment with this ID, can you double check that you copied the right ID (should be under the copy button in the top right of your deployment - see the attached screenshot)

[/uploads/short-url/3mKRDugMeampRgtOJaKpeDrrgqb.png?dl=1](Screenshot 2025-11-03 at 10.15.31 AM3436×1950 462 KB)

---

## Post #5 by @lihbr
*Posted on 2025-11-04 09:21:23*

Hi Isaac, sorry, we had to delete the deployment to free up our pipeline. Find below the logs of that deployment:


```
`10/30/2025, 9:16:42 AM Application startup failed. Exiting.
10/30/2025, 9:16:42 AM Traceback (most recent call last):
  File "/usr/lib/python3.12/site-packages/starlette/routing.py", line 694, in lifespan
    async with self.lifespan_context(app) as maybe_state:
               ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/contextlib.py", line 210, in __aenter__
    return await anext(self.gen)
           ^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/site-packages/langgraph_runtime_postgres/lifespan.py", line 67, in lifespan
    await database.start_pool()
  File "/usr/lib/python3.12/site-packages/langgraph_runtime_postgres/database.py", line 221, in start_pool
    await _pg_pool.open(wait=True)
  File "/usr/lib/python3.12/site-packages/psycopg_pool/pool_async.py", line 385, in open
    await self.wait(timeout=timeout)
  File "/usr/lib/python3.12/site-packages/psycopg_pool/pool_async.py", line 173, in wait
    raise PoolTimeout(f"pool initialization incomplete after {timeout} sec")
psycopg_pool.PoolTimeout: pool initialization incomplete after 30.0 sec

10/30/2025, 9:16:27 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:16:19 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:16:15 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:16:13 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:16:12 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:16:12 AM Starting Postgres runtime with langgraph-api=0.4.47
10/30/2025, 9:16:12 AM Waiting for application startup.
10/30/2025, 9:16:12 AM Started server process [1]
10/30/2025, 9:16:12 AM Using auth of type=langsmith
10/30/2025, 9:16:12 AM Using langgraph_runtime_postgres
10/30/2025, 9:15:57 AM psycopg_pool.PoolTimeout: pool initialization incomplete after 30.0 sec
10/30/2025, 9:15:57 AM     raise PoolTimeout(f"pool initialization incomplete after {timeout} sec")
10/30/2025, 9:15:57 AM   File "/usr/lib/python3.12/site-packages/psycopg_pool/pool_async.py", line 173, in wait
10/30/2025, 9:15:57 AM     await self.wait(timeout=timeout)
10/30/2025, 9:15:57 AM   File "/usr/lib/python3.12/site-packages/psycopg_pool/pool_async.py", line 385, in open
10/30/2025, 9:15:57 AM     await _pg_pool.open(wait=True)
10/30/2025, 9:15:57 AM   File "/usr/lib/python3.12/site-packages/langgraph_runtime_postgres/database.py", line 221, in start_pool
10/30/2025, 9:15:57 AM     await database.start_pool()
10/30/2025, 9:15:57 AM   File "/usr/lib/python3.12/site-packages/langgraph_runtime_postgres/lifespan.py", line 67, in lifespan
10/30/2025, 9:15:57 AM            ^^^^^^^^^^^^^^^^^^^^^
10/30/2025, 9:15:57 AM     return await anext(self.gen)
10/30/2025, 9:15:57 AM   File "/usr/lib/python3.12/contextlib.py", line 210, in __aenter__
10/30/2025, 9:15:57 AM   File "/api/langgraph_api/queue_entrypoint.py", line 177, in combined_lifespan
10/30/2025, 9:15:57 AM            ^^^^^^^^^^^^^^^^^^^^^
10/30/2025, 9:15:57 AM     return await anext(self.gen)
10/30/2025, 9:15:57 AM   File "/usr/lib/python3.12/contextlib.py", line 210, in __aenter__
10/30/2025, 9:15:57 AM   File "/api/langgraph_api/queue_entrypoint.py", line 190, in entrypoint
10/30/2025, 9:15:57 AM   File "/api/langgraph_api/queue_entrypoint.py", line 226, in main
10/30/2025, 9:15:57 AM   File "uvloop/loop.pyx", line 1518, in uvloop.loop.Loop.run_until_complete
10/30/2025, 9:15:57 AM            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
10/30/2025, 9:15:57 AM     return self._loop.run_until_complete(task)
10/30/2025, 9:15:57 AM   File "/usr/lib/python3.12/asyncio/runners.py", line 118, in run
10/30/2025, 9:15:57 AM            ^^^^^^^^^^^^^^^^
10/30/2025, 9:15:57 AM     return runner.run(main)
10/30/2025, 9:15:57 AM Traceback (most recent call last):
  File "", line 198, in _run_module_as_main
  File "", line 88, in _run_code
  File "/api/langgraph_api/queue_entrypoint.py", line 258, in 
  File "/usr/lib/python3.12/asyncio/runners.py", line 195, in run
10/30/2025, 9:15:57 AM Cancelling queue entrypoint task
10/30/2025, 9:15:44 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:15:35 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:15:30 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:15:28 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:15:27 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:15:27 AM Starting Postgres runtime with langgraph-api=0.4.47
10/30/2025, 9:13:18 AM Application startup failed. Exiting.
10/30/2025, 9:13:18 AM Traceback (most recent call last):
  File "/usr/lib/python3.12/site-packages/starlette/routing.py", line 694, in lifespan
    async with self.lifespan_context(app) as maybe_state:
               ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/contextlib.py", line 210, in __aenter__
    return await anext(self.gen)
           ^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/site-packages/langgraph_runtime_postgres/lifespan.py", line 67, in lifespan
    await database.start_pool()
  File "/usr/lib/python3.12/site-packages/langgraph_runtime_postgres/database.py", line 221, in start_pool
    await _pg_pool.open(wait=True)
  File "/usr/lib/python3.12/site-packages/psycopg_pool/pool_async.py", line 385, in open
    await self.wait(timeout=timeout)
  File "/usr/lib/python3.12/site-packages/psycopg_pool/pool_async.py", line 173, in wait
    raise PoolTimeout(f"pool initialization incomplete after {timeout} sec")
psycopg_pool.PoolTimeout: pool initialization incomplete after 30.0 sec

10/30/2025, 9:13:18 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:13:03 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:12:55 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:12:51 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:12:49 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:12:48 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:12:48 AM Starting Postgres runtime with langgraph-api=0.4.47
10/30/2025, 9:12:48 AM Waiting for application startup.
10/30/2025, 9:12:48 AM Started server process [1]
10/30/2025, 9:12:48 AM Using auth of type=langsmith
10/30/2025, 9:12:48 AM Using langgraph_runtime_postgres
10/30/2025, 9:12:39 AM psycopg_pool.PoolTimeout: pool initialization incomplete after 30.0 sec
10/30/2025, 9:12:39 AM     raise PoolTimeout(f"pool initialization incomplete after {timeout} sec")
10/30/2025, 9:12:39 AM   File "/usr/lib/python3.12/site-packages/psycopg_pool/pool_async.py", line 173, in wait
10/30/2025, 9:12:39 AM     await self.wait(timeout=timeout)
10/30/2025, 9:12:39 AM   File "/usr/lib/python3.12/site-packages/psycopg_pool/pool_async.py", line 385, in open
10/30/2025, 9:12:39 AM     await _pg_pool.open(wait=True)
10/30/2025, 9:12:39 AM   File "/usr/lib/python3.12/site-packages/langgraph_runtime_postgres/database.py", line 221, in start_pool
10/30/2025, 9:12:39 AM     await database.start_pool()
10/30/2025, 9:12:39 AM   File "/usr/lib/python3.12/site-packages/langgraph_runtime_postgres/lifespan.py", line 67, in lifespan
10/30/2025, 9:12:39 AM            ^^^^^^^^^^^^^^^^^^^^^
10/30/2025, 9:12:39 AM     return await anext(self.gen)
10/30/2025, 9:12:39 AM   File "/usr/lib/python3.12/contextlib.py", line 210, in __aenter__
10/30/2025, 9:12:39 AM   File "/api/langgraph_api/queue_entrypoint.py", line 177, in combined_lifespan
10/30/2025, 9:12:39 AM            ^^^^^^^^^^^^^^^^^^^^^
10/30/2025, 9:12:39 AM     return await anext(self.gen)
10/30/2025, 9:12:39 AM   File "/usr/lib/python3.12/contextlib.py", line 210, in __aenter__
10/30/2025, 9:12:39 AM   File "/api/langgraph_api/queue_entrypoint.py", line 190, in entrypoint
10/30/2025, 9:12:39 AM   File "/api/langgraph_api/queue_entrypoint.py", line 226, in main
10/30/2025, 9:12:39 AM   File "uvloop/loop.pyx", line 1518, in uvloop.loop.Loop.run_until_complete
10/30/2025, 9:12:39 AM            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
10/30/2025, 9:12:39 AM     return self._loop.run_until_complete(task)
10/30/2025, 9:12:39 AM   File "/usr/lib/python3.12/asyncio/runners.py", line 118, in run
10/30/2025, 9:12:39 AM            ^^^^^^^^^^^^^^^^
10/30/2025, 9:12:39 AM     return runner.run(main)
10/30/2025, 9:12:39 AM Traceback (most recent call last):
  File "", line 198, in _run_module_as_main
  File "", line 88, in _run_code
  File "/api/langgraph_api/queue_entrypoint.py", line 258, in 
  File "/usr/lib/python3.12/asyncio/runners.py", line 195, in run
10/30/2025, 9:12:39 AM Cancelling queue entrypoint task
10/30/2025, 9:12:25 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:12:17 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:12:12 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:12:10 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:12:09 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:12:09 AM Starting Postgres runtime with langgraph-api=0.4.47
10/30/2025, 9:11:17 AM Application startup failed. Exiting.
10/30/2025, 9:11:17 AM Traceback (most recent call last):
  File "/usr/lib/python3.12/site-packages/starlette/routing.py", line 694, in lifespan
    async with self.lifespan_context(app) as maybe_state:
               ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/contextlib.py", line 210, in __aenter__
    return await anext(self.gen)
           ^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/site-packages/langgraph_runtime_postgres/lifespan.py", line 67, in lifespan
    await database.start_pool()
  File "/usr/lib/python3.12/site-packages/langgraph_runtime_postgres/database.py", line 221, in start_pool
    await _pg_pool.open(wait=True)
  File "/usr/lib/python3.12/site-packages/psycopg_pool/pool_async.py", line 385, in open
    await self.wait(timeout=timeout)
  File "/usr/lib/python3.12/site-packages/psycopg_pool/pool_async.py", line 173, in wait
    raise PoolTimeout(f"pool initialization incomplete after {timeout} sec")
psycopg_pool.PoolTimeout: pool initialization incomplete after 30.0 sec

10/30/2025, 9:11:17 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:11:02 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:10:54 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:10:50 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:10:48 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:10:47 AM error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres"
10/30/2025, 9:10:47 AM Starting Postgres runtime with langgraph-api=0.4.47
10/30/2025, 9:10:47 AM Waiting for application startup.
10/30/2025, 9:10:47 AM Started server process [1]
`
```

We managed to temporarily fix it by deploying using “production” deployment, which is a bit counterproductive given the pricing difference and the purpose: being able to QA a deployment from a branch before merging it.

---

## Post #6 by @Isaac
*Posted on 2025-11-05 21:29:13*

Is there any chance you could reproduce the issue on a dev deployment and send me the ID? There are other logs in our backend I’d like to investigate. Sorry for the inonvenience.

---

## Post #7 by @lihbr
*Posted on 2025-11-06 08:58:17*

Hi Isaac, sure,

I wasn’t able to reproduce the timeout, but I almost reached it in this deployment: `ce678f13-b894-4b8a-8a7d-666201ee575d`


You can see that it built the artifact relatively fast (~4 minutes)
Then it did nothing for about 5 minutes (at least that we could see in the logs). It’s quite painful for us, as our CI has to wait for the LangGraph deployment to complete before continuing with our e2e tests.
And then it took ages (sorry for the rough wording, but I don’t understand what’s taking it so much time to proceed) to deploy the LangGraph server for almost 10 minutes, closing in on the 20m timeout, you can see in the logs the same kinds of errors logged above.

Let me know if any other details could help

---

## Post #8 by @Isaac
*Posted on 2025-11-06 16:21:04*

Will take a look today, thank you for providing the new deployment and sorry for the inconvenience.

---

## Post #9 by @david.asamu
*Posted on 2025-11-13 01:39:01*

[/u/lihbr](@lihbr) following up on the this

`error connecting in 'pool-1': connection failed: connection to server at "172.26.64.123", port 5432 failed: FATAL:  password authentication failed for user "postgres`

This should be resolved now. The issue was caused because deployments were re-using the same deployment name. We pushed a fixed for that last week.

Also, I checked the last deployment id shared,  `ce678f13-b894-4b8a-8a7d-666201ee575d`

The build took around 4mins as you mentioned, and then the deploy server stage took ~9 mins. For dev type deployments, the deploy server (time to provision db + start for containers to startup). Bulk of the time for the deploy server was spent provisioning the db, since this was the very first revision. Subsequent revisions of the same deployment would be faster.

Lastly, I can no longer see the build error relating to v1 (`@langchain/langgraph@1.0.1`) in the build logs for the deployment as well. Is that resolved now as well?

---

## Post #10 by @lihbr
*Posted on 2025-11-13 06:10:33*

Yes! The v1 build is resolved. Thanks for your insights!

---
