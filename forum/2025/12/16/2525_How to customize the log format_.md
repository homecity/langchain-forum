# How to customize the log format?

**Topic ID:** 2525
**Created:** 2025-12-16 05:05:42
**URL:** https://forum.langchain.com/t/2525

---

## Post #1 by @k19810703
*Posted on 2025-12-16 05:05:42*

For the service started by “langgraph dev”。

Is that possible to customize the log format?

If yes , how to do that.

Currently log is like below. I want to add some business field such as user_id to the log

2025-12-16T05:02:55.235377Z [info     ] Worker stats                   [langgraph_runtime_inmem.queue] active=0 api_variant=local_dev available=1 langgraph_api_version=0.6.2 max=1 thread_name=ThreadPoolExecutor-1_0

2025-12-16T05:02:55.740911Z [info     ] Queue stats                    [langgraph_runtime_inmem.queue] api_variant=local_dev langgraph_api_version=0.6.2 n_pending=0 n_running=0 pending_runs_wait_time_max_secs=None pending_runs_wait_time_med_secs=None thread_name=ThreadPoolExecutor-1_0

2025-12-16T05:03:55.416902Z [info     ] Worker stats                   [langgraph_runtime_inmem.queue] active=0 api_variant=local_dev available=1 langgraph_api_version=0.6.2 max=1 thread_name=ThreadPoolExecutor-1_1

2025-12-16T05:03:55.923043Z [info     ] Queue stats                    [langgraph_runtime_inmem.queue] api_variant=local_dev langgraph_api_version=0.6.2 n_pending=0 n_running=0 pending_runs_wait_time_max_secs=None pending_runs_wait_time_med_secs=None thread_name=ThreadPoolExecutor-1_0

2025-12-16T05:04:55.592387Z [info     ] Worker stats                   [langgraph_runtime_inmem.queue] active=0 api_variant=local_dev available=1 langgraph_api_vers

---

## Post #2 by @wfh
*Posted on 2025-12-16 05:09:37*

If you do


```
`logger.info("foo", extra={"user_id": "bar"})
`
```

it will be picked up. Or if you use structlog.

Would that work?

You can sest `LOG_LEVEl=json`  in your environment to format as structured json logs

---
