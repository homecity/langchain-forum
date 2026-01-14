# Issues with Logging Traces in LangSmith using A2A Protocol – Broken Traces & Incomplete Logs

**Topic ID:** 452
**Created:** 2025-07-14 19:22:31
**URL:** https://forum.langchain.com/t/452

**Tags:** intro-to-langsmith

---

## Post #1 by @Bitcot_Kajol
*Posted on 2025-07-14 19:22:31*

I’m facing issues while logging traces in **LangSmith** with a setup that involves a **Host Agent built using ADK** and a **Remote Agent built using LangGraph**. These agents communicate via the **Agent-to-Agent (A2A)** protocol.

**Problems observed:**


**Broken traces between Host Agent (ADK) and Remote Agent (LangGraph):**


When the Host Agent (implemented using the **Agent Development Kit - ADK**) calls the Remote Agent (implemented in **LangGraph**) through A2A, the traces are broken.
Instead of a single end-to-end trace, I see fragmented traces for the Host Agent and the Remote Agent separately, making it hard to correlate the full chain of execution.


**Subsequent API calls result in incomplete traces:**


The first time I hit the API, the trace logs correctly and shows up in LangSmith as expected.
However, on any subsequent calls, the request keeps loading and the trace remains *incomplete* in LangSmith — it never finalizes.

**Additional context:**


When I run similar traces **entirely within LangGraph** (end-to-end), the traces log perfectly.
So this issue seems specific to the **ADK Host → LangGraph Remote** scenario when connected via the **A2A protocol**.

**Expected behavior:**


Traces should be continuous and automatically linked between the Host Agent (ADK) and Remote Agent (LangGraph).
Every API call should produce a complete trace consistently, not just the first call.

---
