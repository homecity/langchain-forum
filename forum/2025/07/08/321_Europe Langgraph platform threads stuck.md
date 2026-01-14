# Europe Langgraph platform threads stuck

**Topic ID:** 321
**Created:** 2025-07-08 16:22:51
**URL:** https://forum.langchain.com/t/321

**Tags:** cloud

---

## Post #1 by @TomPaolo1
*Posted on 2025-07-08 16:22:51*

For the past few days, I’ve noticed that the deployment on the LangGraph platform in Europe can’t even run threads and doesn’t report any issues except that it’s in a busy state and continues running.

---

## Post #2 by @wfh
*Posted on 2025-07-09 04:52:56*

Please share a deployment ID and more information about what you are seeing if you’d like assistance. Thank you!

---

## Post #3 by @TomPaolo1
*Posted on 2025-07-09 06:52:50*

I have 2 deployments with the same problem (threads stuck)

Deployment 1: 05ef54c5-d243-4d4b-aef2-29bf08cf904f

Deployment 2: c9542e26-0d9c-4c8e-9aa5-6ba365059819

---

## Post #4 by @TomPaolo1
*Posted on 2025-07-09 09:44:43*

I solved the problem, but I noticed that a cascading issue occurred after the execution of a graph was busy doing a create_react_agent in synchronous mode inside an asynchronous node. All other graphs showed a busy state and I couldn’t get other graphs to execute in parallel.

---

## Post #5 by @Rainbow
*Posted on 2025-12-31 13:49:03*

TomPaolo1:

synchronous mode inside an asynchronous nod



Hi [/u/tompaolo1](@TomPaolo1) How you exactly fix it ? Thanks!

---
