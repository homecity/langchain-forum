# Streaming bug in studio with new langgraph-api update

**Topic ID:** 1333
**Created:** 2025-08-26 11:53:13
**URL:** https://forum.langchain.com/t/1333

---

## Post #1 by @samgoos
*Posted on 2025-08-26 11:53:13*

After updating langgraph-api to the latesrt version, I get the following error message when invokin a node with LLM. There seems to be a bug where both run_id and thread_id are submitted but only one is accepted.

runs.py", line 104, in stream_run

sub = asyncio.create_task(Runs.Stream.subscribe(run_id, thread_id))

~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^

TypeError: Runs.Stream.subscribe() takes 1 positional argument but 2 were given

---

## Post #2 by @mayank776
*Posted on 2025-08-26 16:13:55*

i am also facing this issue, when i update langchain-api latest version, this issue is coming. can someone please help?

---

## Post #3 by @Isaac
*Posted on 2025-08-26 16:15:42*

Hi sorry this should be fixed now if you upgrade langgraph-api to 0.4.1, we apologize for the inconvenience.

---

## Post #4 by @mayank776
*Posted on 2025-08-26 16:21:58*

yes its working now. Thanks

---
