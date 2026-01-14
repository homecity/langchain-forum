# Not found error in LangSmith Studio playground

**Topic ID:** 1769
**Created:** 2025-10-07 15:22:02
**URL:** https://forum.langchain.com/t/1769

**Tags:** cloud, self-hosted, product-feedback, intro-to-langsmith

---

## Post #1 by @eric-burel
*Posted on 2025-10-07 15:22:02*

Hi, I am using the LangSmith Studio playground to debug toy projects deployed on Render, using “langgraph dev” command. However I often hit “Not found” errors when the studio tries to connect to the API URL.

Render takes some time to load, because free instances are sleeping when not used for a while, and it seems that then LangSmith Studio caches the “Not found” response that is sent while the agent/server is warming up. So it stays in this Not found state for a while.

It might be a bug/quirk in the way LangSmith Studio loads external URL ?

I feel like this happens when I enter a wrong URL with a slash at the end, while the URL is without a trailing slash, but then studio seems to cache the wrong URL somehow.

---
