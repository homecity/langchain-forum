# Failing Deployment

**Topic ID:** 778
**Created:** 2025-07-28 18:25:47
**URL:** https://forum.langchain.com/t/778

**Tags:** cloud

---

## Post #1 by @dre
*Posted on 2025-07-28 18:25:48*

Hi!

I’ve been trying to create a new revision in my deployment but it is fails to start the server with the following error:


```
`  File "/usr/local/lib/python3.11/site-packages/langmem/reflection.py", line 15, in 
    from langgraph.constants import CONF, CONFIG_KEY_STORE
ImportError: cannot import name 'CONFIG_KEY_STORE' from 'langgraph.constants' (/usr/local/lib/python3.11/site-packages/langgraph/constants.py)
Could not import python module for graph:
`
```

I’ve tried creating a new revision based on the same commit that successfully deployed a few days ago, but it fails the same way.

Any ideas?

Thanks!

---

## Post #2 by @dre
*Posted on 2025-07-28 23:33:40*

Well… looks like doing a fresh deployment, instead of pushing a new revision, was the fix.

---
