# Question: Custom datasets inside LangGraph platform DBs

**Topic ID:** 1453
**Created:** 2025-09-04 12:03:43
**URL:** https://forum.langchain.com/t/1453

**Tags:** python-help, cloud, langsmith-studio

---

## Post #1 by @arturbagramyan1
*Posted on 2025-09-04 12:03:43*

Hi everyone,

I’m using LangGraph platform and I see it provides Postgres and Redis as part of the managed setup. My question is:

 Can I insert my own custom data (for example, a table with goods and their quantities like *Apples – 120, Oranges – 75*) directly into those managed databases, and then let my graph nodes query that data for validation or RAG use cases?

Or do I need to run a separate external database for this kind of use case?

Thanks!

---

## Post #2 by @hari
*Posted on 2025-09-07 15:11:31*

Hi [/u/arturbagramyan1](@arturbagramyan1) , we don’t provide a direct way to connect to the postgres db we manage for you. If you would like to insert/query your own custom data, I recommend using [https://docs.langchain.com/oss/python/langgraph/persistence#memory-store](stores).

---

## Post #3 by @arturbagramyan1
*Posted on 2025-09-07 15:30:49*

but if i manually use stores i need to self host right?

---

## Post #4 by @hari
*Posted on 2025-09-07 21:56:57*

You don’t need to self host to use stores, this is provided by default with LangGraph Platform. You can follow this guide to learn more: [https://docs.langchain.com/langgraph-platform/semantic-search](How to add semantic search to your LangGraph deployment - Docs by LangChain)

---

## Post #5 by @arturbagramyan1
*Posted on 2025-09-08 07:36:47*

but can i insert big amount of data there like i mentioned for example 10 thousands of products will it be ok?

---

## Post #6 by @wfh
*Posted on 2025-12-19 06:19:57*

Yes it should be OK. If you run into any issues, let us know your Deployment ID and other information so we can take a look.

---
