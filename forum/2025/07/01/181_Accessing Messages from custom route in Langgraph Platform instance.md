# Accessing Messages from custom route in Langgraph Platform instance

**Topic ID:** 181
**Created:** 2025-07-01 23:59:14
**URL:** https://forum.langchain.com/t/181

---

## Post #1 by @noahtheinformation
*Posted on 2025-07-01 23:59:15*

Hello folks!

I’m having trouble accessing messages based on a thread_id in a custom route attached to the Langgraph Platform deployment.

What is the best approach to doing this?

I’ve tried importing and compiling the graph with the thread_id, but I get no messages in a thread I’m confident messages exist. The documentation says that accessing the internal postgres DB is not recommended/allowed. Can someone point me in the right direction? Thanks!

---

## Post #2 by @wfh
*Posted on 2025-07-02 00:02:35*

I’d recommend using the API/SDK.


```
`from langgraph_sdk import get_client

sdk = get_client() # url can be None to connect to the loopback transport (current deployment)

async def my_route(...):
    await sdk.threads. get_state(thread_id)
    ...
`
```

---
