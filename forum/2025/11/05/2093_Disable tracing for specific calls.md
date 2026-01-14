# Disable tracing for specific calls

**Topic ID:** 2093
**Created:** 2025-11-05 10:15:15
**URL:** https://forum.langchain.com/t/2093

**Tags:** js-help

---

## Post #1 by @hesamzkr
*Posted on 2025-11-05 10:15:15*

[https://github.com/langchain-ai/langchain/issues/14189](https://github.com/langchain-ai/langchain/issues/14189)

is there a workaround for this issue (using TS)?

I want to disable tracing for certain calls. it feels odd for this to not be possible.

I tried creating a traceable and set tracingEnabled: false but not working.

setup:

langsmith: 0.3.75

LANGCHAIN_TRACING_V2=true

LANGCHAIN_CALLBACKS_BACKGROUND=true

---

## Post #2 by @hesamzkr
*Posted on 2025-11-25 15:27:12*

to fix it should set the LANGCHAIN_TRACING_V2=false and then attach tracers to the runs you want traced like

callbacks: [tracer]

---

## Post #3 by @system
*Posted on 2025-11-26 03:27:33*

This topic was automatically closed 12 hours after the last reply. New replies are no longer allowed.

---
