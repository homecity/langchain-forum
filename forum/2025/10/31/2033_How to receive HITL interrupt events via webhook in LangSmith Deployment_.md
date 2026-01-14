# How to receive HITL interrupt events via webhook in LangSmith Deployment?

**Topic ID:** 2033
**Created:** 2025-10-31 07:01:50
**URL:** https://forum.langchain.com/t/2033

---

## Post #1 by @dudiradosezki
*Posted on 2025-10-31 07:01:50*

Hi everyone,

I have a LangGraph assistant running on LangSmith Deployment (Langgraph Platform).

I’m triggering runs successfully from a lambda, providing webhook url and receiving regular `status: success` webhooks at my endpoint, but I never get the `__interrupt__` (human-in-the-loop) payloads.

Is there a specific way to configure a **HITL webhook** for interrupt events (like `email_approval`) — either in the UI or via API?

Would appreciate any example or guidance — thanks!

---

## Post #2 by @Isaac
*Posted on 2025-11-05 22:43:20*

Hi [/u/dudiradosezki](@dudiradosezki) - currently we only support triggering webhooks on run success, but this does seem like a good feature request and I can add it to our roadmap, thank you for bringing it to our attention.

---
