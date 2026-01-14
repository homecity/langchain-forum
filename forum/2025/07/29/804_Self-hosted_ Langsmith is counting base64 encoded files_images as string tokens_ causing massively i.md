# Self-hosted: Langsmith is counting base64 encoded files/images as string tokens, causing massively incorrect token costs

**Topic ID:** 804
**Created:** 2025-07-29 13:01:17
**URL:** https://forum.langchain.com/t/804

**Tags:** self-hosted

---

## Post #1 by @ssmithra
*Posted on 2025-07-29 13:01:17*

Self-hosted version 0.10.93

We are starting to get into multi-modal inputs. We’ve noticed that when using base64 encoded images in the content of messages (as an actual image input, not as string content) that Langsmith is incorrectly counting them as simple string tokens. This is leading to completely un-proportional costs in the UI which we rely on for cost management.

---
