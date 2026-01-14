# Any examples for instrumenting autogen apps?

**Topic ID:** 317
**Created:** 2025-07-08 13:46:36
**URL:** https://forum.langchain.com/t/317

---

## Post #1 by @francisco.junior
*Posted on 2025-07-08 13:46:36*

I am trying to instrument an AutoGen app, but as I can add the @traceable in some functions, as I can not wrap the OpenAI client, what is the expected way to instrument an autogen app? The way I did it, it was not getting the llm calls and the token count and etc. Is there any way to do it?

---

## Post #2 by @angus
*Posted on 2025-07-09 16:20:34*

Hi [/u/francisco.junior](@francisco.junior), We have an OpenTelemetry integration you can use to trace AutoGen and other non-LangChain applications: [https://docs.smith.langchain.com/observability/how_to_guides/trace_with_opentelemetry#trace-a-non-langchain-application](Trace with OpenTelemetry | 🦜️🛠️ LangSmith)

---

## Post #3 by @francisco.junior
*Posted on 2025-07-09 20:08:10*

Hi Angus,

I will try this way. I got some traces flowing but not keeping the parent child structure. Got some isolated traces and not them in a call tree.

If I try using the traceable, it does not get the LLM calls made by the agents in Autogen.  That is the why I was looking for some code samples.

Thanks,

Francisco

---
