# Recently started facing errors in deployment

**Topic ID:** 713
**Created:** 2025-07-25 11:56:58
**URL:** https://forum.langchain.com/t/713

---

## Post #1 by @atharv-honestly
*Posted on 2025-07-25 11:56:58*

Hi LangChain team,

I’m seeing a few issues and would appreciate any clarification:


**Unexpected Turn Split in LangSmith:** in one trace, a run suddenly stopped and a new turn started within the same thread (screenshot + metadata attached). Why would this happen, and what does it indicate?
**Intermittent 404s from LangGraph Endpoint** Calls to our deployment api sometimes return `404 Not Found` randomly and sometime *Server disconnected without sending a response* and also : Server error ‘502 Bad Gateway’

I have emailed as well.

TIA

---

## Post #2 by @gregorio.ferrer
*Posted on 2025-07-28 18:35:22*

Hi LangChain team,

I’m experiencing a similar issue with LangGraph endpoint calls, where I intermittently receive 404 errors or sometimes a “Server disconnected without sending a response” message as described before.

This seems to happen randomly during calls to our deployment API, and I’m unsure whether it’s related to the API server or the LangGraph deployment itself.

Any guidance or suggestions on troubleshooting this would be greatly appreciated.

Thanks in advance!

---

## Post #3 by @scrowder
*Posted on 2025-07-29 16:58:39*

Hi, the 404 errors seem to be a dup of this issue: [https://forum.langchain.com/t/websocket-stream-connection-keeps-disconnecting-on-langgraph-platform/805](WebSocket + Stream Connection Keeps Disconnecting on LangGraph Platform) . We are actively looking into this and will report back with anything that we find.

For the unexpected turn split, did you send the metadata and screenshot as you described? I’m sorry if I missed that, but I’m not seeing anything.

---
