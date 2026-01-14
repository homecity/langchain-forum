# How to delete traces or runs?

**Topic ID:** 199
**Created:** 2025-07-02 11:36:24
**URL:** https://forum.langchain.com/t/199

---

## Post #1 by @joe
*Posted on 2025-07-02 11:36:24*

When a user deletes their account I want to delete all the user data on langsmith.

I have run ids stored in my db. How do I delete all traces/runs of that user based on these run ids?

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-02 18:34:18*

LangSmith doesn’t have a direct bulk delete API for runs. You’ll need to delete runs individually using the LangSmith SDK:


```
`from langsmith import Client

client = Client()
for run_id in user_run_ids:
    try:
        client.delete_run(run_id)
    except Exception as e:
        # Handle errors (run might not exist)
        continue
`
```

For large datasets, batch this operation and add rate limiting to avoid API limits. Alternatively, contact LangSmith support for bulk deletion assistance if you have thousands of runs. Note that deleted runs may still appear in aggregated metrics but individual trace data will be removed.

---

## Post #3 by @Isaac
*Posted on 2025-07-03 20:17:53*

There is a batch delete endpoint that you can access through the API [https://api.smith.langchain.com/redoc?_gl=1*nh57vr*_gcl_au*OTY4ODQwOTQ3LjE3NDc4NzE0MjM.*_ga*MjIzNTc2NzkuMTc1MTU3MzI1Nw..*_ga_47WX3HKKY2*czE3NTE1NzMyNTckbzEkZzEkdDE3NTE1NzM3NzckajYwJGwwJGgw#tag/run/operation/delete_runs_api_v1_runs_delete_post](here)

---

## Post #4 by @joe
*Posted on 2025-07-08 06:39:31*

Thanks!

---

## Post #6 by @mariana
*Posted on 2025-10-15 10:03:06*

I tried using this and I get asked for a session_id that does not exist for my traces, why can’t I delete just using the trace_id?

---

## Post #7 by @angus
*Posted on 2025-10-16 16:08:19*

Hi [/u/mariana](@mariana)

session_id is just the project ID for the trace you are trying to delete. You can find it on the tracer project page

[/uploads/short-url/xQ6mQdmRlHdEz4jsXvqmdjomH1Y.png?dl=1](Screenshot 2025-10-16 at 9.07.52 AM1438×548 72 KB)

---

## Post #8 by @mariana
*Posted on 2025-10-17 09:26:26*

thank you! I used session_id before, but it was related to threads

---

## Post #9 by @mariana
*Posted on 2025-10-17 12:36:39*

Isaac:

here



Even though I have done this I get “Run deletes queued", but nothing gets deleted. I have no way to debug because even if I pass a wrong id it still says the same

---

## Post #10 by @angus
*Posted on 2025-10-17 16:33:48*

[https://docs.smith.langchain.com/administration/how_to_guides/organization_management/data_purging_compliance#trace-deletes](docs.smith.langchain.com)
  

  
    

[https://docs.smith.langchain.com/administration/how_to_guides/organization_management/data_purging_compliance#trace-deletes](Data Purging for Compliance | 🦜️🛠️ LangSmith)

  This guide covers the various features available after data reaches LangSmith Cloud servers to help you achieve your privacy goals.



  

  
    
    
  

  



Trace deletions are processed during non-peak usage times and are not instant, usually within a few hours. There is no confirmation of deletion - you’ll need to query the data again to verify it has been removed.


We process these deletions over the weekend now

---

## Post #11 by @tefrati
*Posted on 2025-11-17 20:09:53*

Hello there,

Adding to what Mariana said above. The response status and messages are misleading. We’re getting “Run deletes queued” 202 response whether the metadata matched to actual traces or not. Same thing for trace_ids.

We need to have a better way to know if the request body matches actual traces in our projects. We also need a better way to know if traces were actually deleted. Asking us to check on Monday to see if it was deleted is not good enough. What if traces were not deleted? Should we try again, week after week?

Thank you

---
