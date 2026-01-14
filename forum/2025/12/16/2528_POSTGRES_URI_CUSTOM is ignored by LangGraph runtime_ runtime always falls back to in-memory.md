# POSTGRES_URI_CUSTOM is ignored by LangGraph runtime; runtime always falls back to in-memory

**Topic ID:** 2528
**Created:** 2025-12-16 10:01:23
**URL:** https://forum.langchain.com/t/2528

**Tags:** python-help, langsmith-studio

---

## Post #1 by @bharathiselvan
*Posted on 2025-12-16 10:01:23*

I’m trying to configure LangGraph to use a custom PostgreSQL database for persistence, based on the documented environment variable `POSTGRES_URI_CUSTOM`.

According to the docs:

[https://docs.langchain.com/langsmith/env-var#postgres-uri-custom](https://docs.langchain.com/langsmith/env-var#postgres-uri-custom)


*Specify POSTGRES_URI_CUSTOM to use a custom Postgres instance instead of one provisioned by the platform.*


However, even when `POSTGRES_URI_CUSTOM` is set correctly, LangGraph continues to start with the in-memory runtime.

Example log:


```
`Using langgraph_runtime_inmem
Starting In-Memory runtime with langgraph-api=0.5.16

`
```

**This happens consistently in local development (`langgraph dev` / API server).**

---

## Post #2 by @wfh
*Posted on 2025-12-19 06:19:08*

Yes the dev server uses the in-mem “persistence” layer.  Setting a postgres env var would have no effect.

You’ll have to use `langgraph up` to use the postgres persistence implementation, at which point you can customize the URI.

---
