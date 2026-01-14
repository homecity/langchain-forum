# LangSmith Client.list_runs() - Log Retrieval Limits

**Topic ID:** 296
**Created:** 2025-07-07 20:57:30
**URL:** https://forum.langchain.com/t/296

---

## Post #1 by @malkarsaidheeraj
*Posted on 2025-07-07 20:57:30*

I am  using Langsmith to retrieve traces from one of our projects. I had a question regarding the retrieval of logs: specifically, I wanted to know how many logs can be fetched in a single request to Langsmith.

I’ve gone through the documentation but couldn’t find any information about the exact number of logs or the default limit per request. I noticed that the client.list_runs method allows a limit argument, but I’m curious—if I don’t specify this argument, what is the default number of logs returned?

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-09 16:32:09*

The `client.list_runs()` method does **not have a fixed default limit**, if you don’t specify the `limit` parameter, it will return all matching runs via pagination. The LangSmith client handles pagination automatically, so you can iterate through the results without setting a limit unless you want to restrict the number of runs manually.

If you do set the `limit` argument, it will return up to that number of runs in total. There is no hard-coded maximum like 1000 enforced at the SDK level, but if you’re retrieving a very large number of runs, consider batching or filtering by `start_time`, `end_time`, or `project_name` to optimize performance.

---
