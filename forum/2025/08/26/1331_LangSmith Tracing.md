# LangSmith Tracing

**Topic ID:** 1331
**Created:** 2025-08-26 08:01:22
**URL:** https://forum.langchain.com/t/1331

---

## Post #1 by @daniel
*Posted on 2025-08-26 08:01:22*

Hi,

I am using `@traceable` and `wrap_openai(AsyncOpenAI())` in LangSmith to trace the traces.

I have a Rest API application and I managed to create a span tree which traces different functions under one trace. However I have a separate function called `title_generator` that is called by frontend when my backend processing ends.

How can I attach that `title_generator` span to the other ones ?

Currently I have two separate traces for the pipeline and the title_generator

[/uploads/short-url/h2TXeGhXMVkfQcd3TIpe9isK1nF.png?dl=1](image1676×272 32.1 KB)

---

## Post #2 by @eric-langchain
*Posted on 2025-08-27 18:50:37*

how come the backend call doesn’t just call the FE function if it happens immediately after?

you can try to use the thread_id grouping if these are parts of the same run.  [https://docs.smith.langchain.com/observability/how_to_guides/threads](Set up threads | 🦜️🛠️ LangSmith)

---
