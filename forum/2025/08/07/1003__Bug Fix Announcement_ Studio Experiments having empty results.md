# [Bug Fix Announcement] Studio Experiments having empty results

**Topic ID:** 1003
**Created:** 2025-08-07 15:55:27
**URL:** https://forum.langchain.com/t/1003

**Tags:** langsmith-studio

---

## Post #1 by @arjun
*Posted on 2025-08-07 15:55:27*

Hey Folks,

We recently had an issue where experiments that were initiated in Studio were showing up without any results. This was a regression, but has been fixed as of `langgraph-api` version **`0.2.125`.**  If you are experiencing this issue please run **`pip install -U langgraph-api`**if running your server locally, or create a new revision if deployed and this will be resolved.

Thanks,

Arjun

---
