# How to reconnect to stream after <class 'httpx.TransportError'> Exceeded maximum SSE reconnection attempts

**Topic ID:** 2407
**Created:** 2025-12-03 17:33:41
**URL:** https://forum.langchain.com/t/2407

**Tags:** python-help, cloud

---

## Post #1 by @sasharosca
*Posted on 2025-12-03 17:33:41*

When running a langgraph agent for a long time I eventually get:

 Exceeded maximum SSE reconnection attempts

This comes from a loop using this:

async for chunk in client.runs.stream

How do I reconnect to the run without dropping output? (join_stream docs say it doesnt buffer output)

Docs also mention:

A background run can execute for longer than 1 hour, but a client must reconnect to the server (e.g. join stream via **`POST /threads/{thread_id}/runs/{run_id}/stream`**) to retrieve output from the run if the run is taking longer than 1 hour.

`join_stream` uses GET but `stream` doesn’t take a run_id argument

Edit: I set **BG_JOB_TIMEOUT_SECS** to 10 hours, this disconnection happens long before that and I can see the run continuing in the langsmith trace

---

## Post #2 by @pjrule
*Posted on 2025-12-06 01:28:04*

[/u/sasharosca](@sasharosca) To clarify—what is “a long time”, typically? Are you typically seeing the `Exceeded maximum SSE reconnection attempts`error before the 1-hour maximum duration mentioned in the docs you cited?

In any case, you should be able to resume a stream after it disconnects by calling `join_stream()` again with `last_event_id`(the stream must be resumable for this to work properly).

---
