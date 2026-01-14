# Deployment silently crashes

**Topic ID:** 1733
**Created:** 2025-10-03 11:28:54
**URL:** https://forum.langchain.com/t/1733

**Tags:** cloud

---

## Post #1 by @rkauf
*Posted on 2025-10-03 11:28:54*

Hello,

Last week we started doing QA for our application on LangGraph Cloud and noticed the following consistent behavior, which does not happen when using langgraph dev locally: the LG server crashes at a random point mid-thread, restarts, and after 2-5 minutes (I guess after the Docker image is ready?) re-attempts the run.

Although the trace view shows two attempts for the same thread, it gives no indication of *why* the attempts fail. See the metadata for one example below.


```
`{"projectId":"cmgapts0f0001s601ko1zd0y9","created_by":"system","projectName":"[redacted]","assistant_id":"eab72ad3-4e42-599b-ad6d-c5fdb453a6f3","run_attempt":1,"langgraph_version":"0.6.8","langgraph_api_version":"0.4.34","langgraph_plan":"enterprise","langgraph_host":"saas","langgraph_api_url":null,"run_id":"0199a9ab-9fa3-7117-9521-3abbce47ae54","graph_id":"copilot","thread_id":"965e13b1-e85c-4784-a4b5-a65e992198ec","langgraph_request_id":"4eab4b7f3415e109081ac33aee164863","LANGSMITH_LANGGRAPH_API_VARIANT":"cloud","LANGSMITH_HOST_PROJECT_NAME":"primordia-main-orchestrator","LANGSMITH_LANGGRAPH_GIT_REF":"develop","LANGSMITH_TRACING":"true","LANGSMITH_LANGGRAPH_API_REVISION":"52ab87d","LANGSMITH_HOST_PROJECT_ID":"0463ae0d-b675-4648-866b-b303e66b3858","LANGSMITH_LANGGRAPH_GIT_REF_SHA":"afad7c7de62eff1104e83db132acb70c08e1dcdc","LANGSMITH_AUTH_VERIFY_TENANT_ID":"True","LANGSMITH_LANGGRAPH_GIT_REPO":"https://github.com/primordia-ai/orchestrator","LANGSMITH_HOST_REVISION_ID":"471c8cba-cdd1-4439-b766-1b914d77dac6","LANGSMITH_PROJECT":"primordia-main-orchestrator","LANGSMITH_TENANT_ID":"bf61d1a6-af3e-4ea3-a997-141e548f0d61","LANGCHAIN_CALLBACKS_BACKGROUND":"true","LANGSMITH_AUTH_ENDPOINT":"https://api.smith.langchain.com","revision_id":"afad7c7de62eff1104e83db132acb70c08e1dcdc","ls_run_depth":0}
`
```

Furthermore, these crashes are mostly **silent** in the logs; see the one below, which is only visible in the logs from the restart:


```
`10/3/2025, 11:56:49 AM
[INFO] Listening for cancellation
10/3/2025, 11:56:49 AM
[INFO] Starting background run
10/3/2025, 11:56:49 AM
[INFO] Swept runs
10/3/2025, 11:56:16 AM
[INFO] Successfully submitted metadata to LangSmith instance
10/3/2025, 11:56:16 AM
[INFO] HTTP Request: POST https://api.smith.langchain.com/v1/metadata/submit "HTTP/1.1 204 No Content"
10/3/2025, 11:54:49 AM
[INFO] Starting 10 background workers
10/3/2025, 11:54:49 AM
[INFO] Health and metrics server started at http://0.0.0.0:8000
10/3/2025, 11:54:49 AM
[INFO] Starting queue with shared loop
10/3/2025, 11:54:49 AM
[INFO] Registering graph with id 'copilot'
10/3/2025, 11:54:49 AM
[INFO] Running in LangGraph API mode with platform persistence
10/3/2025, 11:54:49 AM
[INFO] Using GCP service account credentials from environment variable.
10/3/2025, 11:54:43 AM
[INFO] The user provided project/location will take precedence over the Vertex AI API key from the environment variable.
10/3/2025, 11:54:32 AM
[INFO] NumExpr defaulting to 16 threads.
10/3/2025, 11:54:32 AM
[INFO] Note: NumExpr detected 32 cores but "NUMEXPR_MAX_THREADS" not set, so enforcing safe limit of 16.
10/3/2025, 11:54:13 AM
[INFO] Successfully submitted metadata to LangSmith instance
10/3/2025, 11:54:13 AM
[INFO] HTTP Request: POST https://api.smith.langchain.com/v1/metadata/submit "HTTP/1.1 204 No Content"
10/3/2025, 11:54:13 AM
[INFO] Starting long query monitor with 5min threshold, scanning every 600s
10/3/2025, 11:54:13 AM
[INFO] Starting thread TTL sweeper with interval 5 minutes
10/3/2025, 11:54:13 AM
[INFO] Starting store TTL sweeper with interval 5.0 minutes
10/3/2025, 11:54:13 AM
[INFO] Getting auth instance: None
10/3/2025, 11:54:13 AM
[INFO] Starting metadata loop
10/3/2025, 11:54:13 AM
[INFO] Starting checkpointer ingestion loop
10/3/2025, 11:54:12 AM
[INFO] Migration lock released
10/3/2025, 11:54:12 AM
[INFO] No LANGGRAPH_STORE configuration found, using default configuration
10/3/2025, 11:54:12 AM
[INFO] Migration lock acquired
10/3/2025, 11:54:12 AM
[INFO] Attempting to acquire migration lock
10/3/2025, 11:54:12 AM
[INFO] Starting Postgres runtime with langgraph-api=0.4.34
10/3/2025, 11:54:05 AM
[INFO] HTTP Request: GET https://vyzyccwimvdgmeundxmg.supabase.co/rest/v1/DocumentFamily?select=%2A&projectId=eq.cmgapts0f0001s601ko1zd0y9&uiPath=eq.%2Fartifacts%2F&displayName=eq.case_brief.md "HTTP/2 200 OK"
`
```

In other cases, we did see some errors, such as the below SSLError, but as these are not consistent, we are now suspecting these are actually *effects* of some underlying cause.

10/2/2025, 10:40:27 AM

[WARNING] Queue task cancelled. Shutting down workers. Will terminate after 180s

10/2/2025, 10:40:03 AM

[WARNING] Cancelling queue entrypoint task

10/2/2025, 10:40:00 AM

[WARNING] GET /threads/9f18e066-2841-43f1-bed5-ce3cb11cc55d/state 404 60ms

10/2/2025, 10:40:00 AM

[INFO] HTTP Request: GET [https://api.smith.langchain.com/auth/public](https://api.smith.langchain.com/auth/public) “HTTP/1.1 200 OK”

10/2/2025, 10:39:52 AM

[WARNING] Received termination signal, initiating graceful shutdown

10/2/2025, 10:38:06 AM

[WARNING] GET /threads/b29db48f-e382-4b36-95d2-779e35b13937/state 404 61ms

10/2/2025, 10:38:06 AM

[INFO] HTTP Request: GET [https://api.smith.langchain.com/auth/public](https://api.smith.langchain.com/auth/public) “HTTP/1.1 200 OK”

10/2/2025, 10:38:04 AM

[WARNING] Retrying (Retry(total=2, connect=None, read=None, redirect=None, status=None)) after connection broken by ‘SSLError(SSLEOFError(8, ‘[SSL: UNEXPECTED_EOF_WHILE_READING] EOF occurred in violation of protocol (_ssl.c:1010)’))’: /token

Any help would be greatly appreciated!

---

## Post #2 by @Josh
*Posted on 2025-10-03 17:19:21*

Thanks for reaching out with all the detail!

Servers in LangGraph Cloud can get restarted from time to time outside of deployments for a variety of reasons (e.g. maintenance, health, etc.). When this happens, you’ll see warnings like the one you did in the logs:


```
`[WARNING] Queue task cancelled. Shutting down workers. Will terminate after 180s
`
```

The queue worker that’s executing runs will wait a default 180s before shutting down the worker forcefully. If your run goes longer than this, it will be cancelled and then picked up later to rerun as you saw. This sweep for dead jobs runs every 2 minutes or so thus some of the delay you saw there.

If you know your runs typically go over 3 minutes, you can set the BG_JOB_SHUTDOWN_GRACE_PERIOD_SECS variable ( [https://docs.langchain.com/langgraph-platform/env-var#bg-job-shutdown-grace-period-secs](Environment variables - Docs by LangChain) ) to be a higher value so these runs don’t get preempted.

I’ll also make some changes on our end to better display when this is happening in the run itself so it’s more clear what’s going on behind the scenes.

---

## Post #3 by @rkauf
*Posted on 2025-10-03 19:23:23*

Thanks Josh, that definitely clarifies things! I’ll try to adjust the env variable. Couple of questions:


Our runs often take about 10 minutes, so we’d ideally set it to something like 900 to have a margin of error. Is that a suitable value?
Our runs are always composed of a specific, linear workflow. We would be easily able to make them shorter/more atomic by programmatically enqueuing a follow-up run once one ends instead of just progressing to the next step. Is run = client.runs.create(thread[“thread_id”], assistant_id, input=input) the right API to use, or would you recommend something else as we don’t need to await?
As I mentioned, this is happening very often, nearly on every single run. Is that normal? It doesn’t look like our jobs are unhealthy, and it sounds odd to kill healthy jobs with such a high frequency.

Thanks again!

---

## Post #4 by @Josh
*Posted on 2025-10-06 14:30:22*

Great questions! To answer:


900 should be completely fine. We set an upper bound for this value of 1 hour, although we’d recommend keeping it as low as possible given the constraints of the system to make deployments as quick as possible.
Yep that’s exactly the right API to use! You can kick off a run with that and it will be enqueued to the runs on the thread as you describe without waiting on it to run.
Ah, it looks like this is a `dev` deployment, which runs on [https://docs.langchain.com/langgraph-platform/control-plane#development](pre-emptible infrastructure.) These are primarily intended for testing or proof of concept workflows. I’d recommend using a prod-type deployment to have this setting applied properly and avoid these restarts happening so frequently.

Hope that helps and thanks again for raising!

---
