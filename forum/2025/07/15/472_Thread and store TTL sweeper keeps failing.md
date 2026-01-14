# Thread and store TTL sweeper keeps failing

**Topic ID:** 472
**Created:** 2025-07-15 11:43:47
**URL:** https://forum.langchain.com/t/472

---

## Post #1 by @advandenoord
*Posted on 2025-07-15 11:43:47*

Hi,

The Thread and store TTL sweeper keeps failing. It also appears that the server is instantiating multiple sweepers at more or less the same time.

**The server logs displays the following errors:**

7/14/2025, 6:03:23 PM

[ERROR] Sweep iteration failed

Traceback (most recent call last):

File “/usr/lib/python3.13/site-packages/langgraph_runtime_postgres/queue.py”, line 124, in sweep_loop

async with database.connect() as conn:

~~~~~~~~~~~~~~~~^^

File “/usr/lib/python3.13/contextlib.py”, line 214, in **aenter**

return await anext(self.gen)

^^^^^^^^^^^^^^^^^^^^^

File “/usr/lib/python3.13/site-packages/langgraph_runtime_postgres/database.py”, line 61, in connect

async with _pg_pool.connection() as conn:

~~~~~~~~~~~~~~~~~~~^^

File “/usr/lib/python3.13/contextlib.py”, line 214, in **aenter**

return await anext(self.gen)

^^^^^^^^^^^^^^^^^^^^^

File “/usr/lib/python3.13/site-packages/psycopg_pool/pool_async.py”, line 195, in connection

conn = await self.getconn(timeout=timeout)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/usr/lib/python3.13/site-packages/psycopg_pool/pool_async.py”, line 230, in getconn

raise PoolTimeout(

f"couldn’t get a connection after {timeout:.2f} sec"

) from None

psycopg_pool.PoolTimeout: couldn’t get a connection after 15.00 sec

7/14/2025, 6:01:08 PM

[ERROR] Sweep iteration failed

Traceback (most recent call last):

File “/usr/lib/python3.13/site-packages/langgraph_runtime_postgres/queue.py”, line 125, in sweep_loop

run_ids = await ops.Runs.sweep(conn)

^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/usr/lib/python3.13/site-packages/langgraph_runtime_postgres/ops.py”, line 1683, in sweep

cur = await conn.execute(

^^^^^^^^^^^^^^^^^^^

……

)

^

File “/usr/lib/python3.13/site-packages/psycopg/connection_async.py”, line 276, in execute

raise ex.with_traceback(None)

psycopg.errors.AdminShutdown: terminating connection due to administrator command

**Multiple instantiations of the sweepers**

7/14/2025, 5:33:43 PM

[INFO] Starting thread TTL sweeper with interval 60 minutes

7/14/2025, 5:33:43 PM

[INFO] Starting store TTL sweeper with interval 120.0 minutes

7/14/2025, 5:31:04 PM

[INFO] Starting thread TTL sweeper with interval 60 minutes

7/14/2025, 5:31:04 PM

[INFO] Starting store TTL sweeper with interval 120.0 minutes

7/14/2025, 5:05:08 PM

[INFO] Starting thread TTL sweeper with interval 60 minutes

7/14/2025, 5:05:08 PM

[INFO] Starting store TTL sweeper with interval 120.0 minutes

**The project’s TTL settings are as follows:**

“store”: {

“index”: {

“embed”: “openai:text-embedding-3-small”,

“dims”: 1536,

“fields”: [

“content”,

“summary”,

“topics”

]

},

“ttl”: {

“refresh_on_read”: true,

“sweep_interval_minutes”: 120

}

},

“checkpointer”: {

“ttl”: {

“strategy”: “delete”,

“sweep_interval_minutes”: 60,

“default_ttl”: 43200

}

},

Any help would be greatly appreciated.

Best regards,

Ad

---

## Post #2 by @victor
*Posted on 2025-07-15 12:29:47*

Hi [/u/advandenoord](@advandenoord) could you share or message me the deployment ID?

---

## Post #3 by @advandenoord
*Posted on 2025-07-15 12:38:24*

Hi Victor,

The deployment id is: 816f2466-9340-4e92-9943-a4eba69d40f2

Many thanks in advance,

Ad

ps: Copying the deployment ID was not easy, because I could not find it anywhere as on the deployments overview page and as soon as you click on it, you go to a new page.

---

## Post #4 by @wfh
*Posted on 2025-07-15 13:16:07*

[/u/advandenoord](@advandenoord)

Thanks for writing! This looks like a “`dev_free`”-tier deployment, which runs on [https://langchain-ai.github.io/langgraph/concepts/langgraph_control_plane/?h=preemp#development](pre-emptible infrastructure) (see [https://langchain-ai.github.io/langgraph/concepts/langgraph_control_plane/?h=preemp#development](infra docs)) .

This is done to save on costs for free `dev`-environment deployments. If you wish to avoid similar errors from occurring, you could use a `prod`-type deployment.

---

## Post #5 by @advandenoord
*Posted on 2025-07-15 14:30:39*

Thanks for your reply, that makes sense.

I must have missed that part of the documentation because I mainly focused on the data plane

---

## Post #6 by @wfh
*Posted on 2025-07-16 14:52:11*

Regarding the deployment ID, it’s copyable if you hover on the link icon.

[/uploads/short-url/9v2hrvPGOtFLuMxNABUs2IWfXN8.jpeg?dl=1](image3678×780 179 KB)

---

## Post #7 by @advandenoord
*Posted on 2025-07-17 07:04:11*

Thanks, that helps a lot

---
