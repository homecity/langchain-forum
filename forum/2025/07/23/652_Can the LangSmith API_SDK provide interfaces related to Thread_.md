# Can the LangSmith API/SDK provide interfaces related to Thread?

**Topic ID:** 652
**Created:** 2025-07-23 09:50:25
**URL:** https://forum.langchain.com/t/652

---

## Post #1 by @Starkay
*Posted on 2025-07-23 09:50:25*

In the [https://api.smith.langchain.com/redoc?_gl=1*uhs4uv*_gcl_au*MTM1MDIyMDE0MS4xNzQ4NDIxMDg5*_ga*MTQzNDg3MjUxOS4xNzQ1ODk3NjEw*_ga_47WX3HKKY2*czE3NTE4ODYzNzMkbzExJGcwJHQxNzUxODg2MzczJGo2MCRsMCRoMA..#tag/run](API documentation), I only found the interface at run granularity, but I want to get the Trace data of the conversation between the user and my Agent at Thread granularity.

If I get it at run granularity, I need to process it twice, which is especially troublesome. Can the LangSmith API/SDK provide interfaces related to Thread?

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-24 09:01:40*

LangSmith doesn’t currently have a direct Thread-level API endpoint. You need to use the runs API with thread filtering. Use the `list_runs()` method with the `filter` parameter to get all runs for a specific thread:


```
`from langsmith import Client

client = Client()
runs = client.list_runs(filter=f'eq(thread_id, "{thread_id}")')
`
```

This returns all runs for that thread in one call, avoiding the need to process individual runs separately. You can also add additional filters like date ranges or run types to narrow down the results. While not a dedicated thread endpoint, this approach gives you thread level trace data efficiently.

---
