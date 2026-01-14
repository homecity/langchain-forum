# Access of Metadata from Middlewares

**Topic ID:** 2176
**Created:** 2025-11-12 12:31:29
**URL:** https://forum.langchain.com/t/2176

**Tags:** python-help

---

## Post #1 by @alpha-xone
*Posted on 2025-11-12 12:31:29*

Hi everyone 

First off — it’s awesome to see **middleware** introduced in LangGraph v1. We’ve started experimenting with it by building a small open-source package (`pip install langmiddle`) to explore its potential.

However, we’ve run into an issue:

 While we can access metadata from **callbacks** in `ToolRuntime`, it seems that the **Runtime inside middleware** doesn’t expose this information.

Has anyone found a way to access `metadata` (like `thread_id`, `user_id`, etc.) within middleware runtime?

Or could this possibly be considered for inclusion in a future release?

Any insights or workarounds would be greatly appreciated — we’d love to contribute back if there’s a viable pattern here.

---

## Post #2 by @KurtzOmer
*Posted on 2025-12-22 14:31:50*

Great question, facing the same issue. Will love to hear about a working solution

---
