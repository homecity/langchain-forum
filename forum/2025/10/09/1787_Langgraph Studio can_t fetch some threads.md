# Langgraph Studio can't fetch some threads

**Topic ID:** 1787
**Created:** 2025-10-09 00:15:01
**URL:** https://forum.langchain.com/t/1787

**Tags:** cloud

---

## Post #1 by @TomPaolo1
*Posted on 2025-10-09 00:15:01*

This week I noticed that some threads are no longer being displayed by langgraph studio, showing ‘TypeError: Failed to fetch’. However, I am able to view the errors that occurred from the thread trace.

[/uploads/short-url/i0anMg7V7w2fQhaun7LTCS3XecO.png?dl=1](Screenshot 2025-10-09 alle 02.14.192030×1644 98.5 KB)

Edit: I noticed that the threads experiencing this issue contain an interrupt. I also tried to replicate the error shown by the platform with the backend hosted on my machine, and it returns 500 in the response " POST /threads/611b081b-3eaf-4ef9-a0a9-75436221fb79/history 500 24ms [langgraph_api.server] latency_ms=24 method=POST path=/threads/611b081b-3eaf-4ef9-a0a9-75436221fb79/history path_params={‘thread_id’: ‘611b081b-3eaf-4ef9-a0a9-75436221fb79’} proto=1.1 query_string= req_header={} res_header={} route=/threads/{thread_id}/history status=500 (http_logger.py:93)

---
