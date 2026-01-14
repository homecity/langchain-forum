# LangGraph deployment fail because of a Redis connection issue

**Topic ID:** 1728
**Created:** 2025-10-02 10:10:56
**URL:** https://forum.langchain.com/t/1728

---

## Post #1 by @srenault
*Posted on 2025-10-02 10:10:56*

LangGraph deployment fail because of a Redis connection issue/

02/10/2025, 11:51:50

[ERROR] Redis ping timed out Traceback (most recent call last):   File “/usr/local/lib/python3.12/asyncio/tasks.py”, line 520, in wait_for     return await fut            ^^^^^^^^^   File “/usr/local/lib/python3.12/site-packages/redis/asyncio/client.py”, line 672, in execute_command     conn = self.connection or await pool.get_connection()                               ^^^^^^^^^^^^^^^^^^^^^^^^^^^   File “/usr/local/lib/python3.12/site-packages/redis/asyncio/connection.py”, line 1149, in get_connection     await self.ensure_connection(connection)   File “/usr/local/lib/python3.12/site-packages/redis/asyncio/connection.py”, line 1182, in ensure_connection     await connection.connect()   File “/usr/local/lib/python3.12/site-packages/redis/asyncio/connection.py”, line 296, in connect     await self.connect_check_health(check_health=True)   File “/usr/local/lib/python3.12/site-packages/redis/asyncio/connection.py”, line 305, in connect_check_health     await self.retry.call_with_retry(   File “/usr/local/lib/python3.12/site-packages/redis/asyncio/retry.py”, line 50, in call_with_retry     return await do()            ^^^^^^^^^^   File “/usr/local/lib/python3.12/site-packages/redis/asyncio/connection.py”, line 760, in _connect     reader, writer = await asyncio.open_connection(                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   File “/usr/local/lib/python3.12/asyncio/streams.py”, line 48, in open_connection     transport, _ = await loop.create_connection(                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   File “uvloop/loop.pyx”, line 2033, in create_connection   File “uvloop/loop.pyx”, line 2020, in uvloop.loop.Loop.create_connection asyncio.exceptions.CancelledError  The above exception was the direct cause of the following exception:  Traceback (most recent call last):   File “/usr/local/lib/python3.12/site-packages/langgraph_runtime_postgres/redis.py”, line 172, in start_redis   File “/usr/local/lib/python3.12/asyncio/tasks.py”, line 519, in wait_for     async with timeouts.timeout(timeout):                ^^^^^^^^^^^^^^^^^^^^^^^^^   File “/usr/local/lib/python3.12/asyncio/timeouts.py”, line 115, in _*aexit*_     raise TimeoutError from exc_val TimeoutError

---

## Post #2 by @Josh
*Posted on 2025-10-02 13:46:37*

Hi - sorry to hear that! We’re investigating on our side right now. Could you share the deployment ID where you saw this?

---
