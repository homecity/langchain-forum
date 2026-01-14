# How to update subgraph state outside of execution?

**Topic ID:** 1535
**Created:** 2025-09-15 12:39:36
**URL:** https://forum.langchain.com/t/1535

---

## Post #1 by @testcoder-ui
*Posted on 2025-09-15 12:39:36*

I have a LangGraph workflow where a sub-agent completes a process and stores results both in my own database and in the LangGraph database.

However, I also want to perform some operations on the same `thread_id` simultaneously, which requires updating the same field in the state at the same time. From my understanding, LangGraph currently doesn’t support this kind of concurrent state update. Is that correct?

So I am considering updating my own DB first via a separate API, and then syncing that state back to LangGraph. I saw the `update_state` method, but it seems like it doesn’t support subgraphs.

My questions are:



Is there any method to update subgraph state outside of execution?



If not, what’s the recommended way to keep my DB and LangGraph’s state in sync in this scenario?

---
