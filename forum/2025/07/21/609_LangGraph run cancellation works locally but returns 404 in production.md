# LangGraph run cancellation works locally but returns 404 in production

**Topic ID:** 609
**Created:** 2025-07-21 20:47:42
**URL:** https://forum.langchain.com/t/609

**Tags:** js-help, cloud

---

## Post #1 by @keenanberry
*Posted on 2025-07-21 20:47:42*

I’m experiencing an issue with the LangGraph run cancellation endpoint in my production environment. When I call


```
`client.runs.cancel(threadId, runId)
`
```

in local development, it correctly processes the request with a 204 status code, but it *does* have an interesting warning message about cancelling “non-pending” runs:


```
`info:    ▪  POST /threads/96e219b8-2e54-4708-8ecd-f840170dd1de/runs/bca9c0fa-cbc5-449e-b75f-e399328602cb/cancel?wait=0&action=interrupt 204
`
```

However, in production, the same code results in a 404 error:


```
`[INFO] POST /threads/befa782a-1585-449a-b9b2-0afa8a31c538/runs/1f066639-ef80-693c-815c-3879748b8c87/cancel 404 16ms
`
```

With the error message: “HTTP 404: Some runs were not found or not cancelable”

I’ve verified that I can successfully retrieve the run information using the GET endpoint


```
`/threads/{thread_id}/runs/{run_id}
`
```

so the run definitely exists in the system. This suggests there might be a difference in how the cancellation endpoint behaves between local and production environments.

Any insights on why this might be happening or how to resolve it would be greatly appreciated.

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-22 09:11:26*

The 404 error “Some runs were not found or not cancelable” suggests timing or state differences between environments. In production, the run might have already completed/failed by the time you try to cancel it, while in local development it’s still in a cancelable state when you make the call.

Check the run status before canceling:


```
`run = client.runs.get(threadId, runId)
if run.status in ['pending', 'running']:
    client.runs.cancel(threadId, runId)
`
```

The warning in local about “non-pending run” indicates you’re trying to cancel completed runs there too, but the local environment is more permissive. Production likely has stricter validation that only allows canceling active runs.

---

## Post #3 by @scrowder
*Posted on 2025-07-22 17:30:24*

I’ve reproduced what you’re seeing, and it does appear to be a bug. I’ve written a test script that cancels a run. It works when running the in-memory server implementation used by `langgraph dev`. It does, however, show the warning about cancelling non-pending runs that you are seeing locally.

When I run the same script against the containerized implementation using `langgraph up`, I experience the 404 that you are seeing.

As a meta-point, `langgraph up` is a faster and easier way to test the full dockerized server implementation as part of a dev workflow than deploying to LangGraph Platform. In any case, we will get back to you soon about a fix for this!

---

## Post #4 by @scrowder
*Posted on 2025-07-22 18:56:06*

Okay, there was no bug on the production side. The in-memory server that runs on `langgraph dev` should have been failing all along, as you are attempting to cancel a run that is no longer in a cancellable state (it is already completed).

We’ve patched the in-memory server implementation. Version 0.6.1 reflects this new behavior.

---
