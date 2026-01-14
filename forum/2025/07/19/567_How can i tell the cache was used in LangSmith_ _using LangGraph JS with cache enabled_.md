# How can i tell the cache was used in LangSmith? (using LangGraph JS with cache enabled)

**Topic ID:** 567
**Created:** 2025-07-19 10:13:52
**URL:** https://forum.langchain.com/t/567

---

## Post #1 by @hgoona
*Posted on 2025-07-19 10:13:52*

Where can I look to identify when a cache was used or not used in LangSmith?

I once saw it somewhere in the traces but now I can’t for the life of me seem to see it in the UI.

??

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-22 10:18:08*

In LangSmith traces for LangGraph JS, cache hits appear as a “Cache Hit” badge on individual LLM call spans in the trace view, or look for `ls_cache_hit: true` in the span metadata. Cached calls will also show significantly reduced execution times compared to non cached calls.

---
