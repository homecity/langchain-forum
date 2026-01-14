# LLM/Agent Structure Output in LangGraph Studio

**Topic ID:** 481
**Created:** 2025-07-15 16:14:41
**URL:** https://forum.langchain.com/t/481

---

## Post #1 by @jgomezve
*Posted on 2025-07-15 16:14:41*

Hi,

In my Agentic system we rely a lot on LLM/Agent structured outputs using Pydantic models. When executing my graph in LangGraph Studio I see temporarily the output of the LLM/ReAct agent parsed in those data structures.  However, once the execution continues to another node, it disappears.  As of now the only place where this is saved is in LangSmith

Is this the defult behaviour or are we doing something wrong?

Regards,

Jorge

---

## Post #2 by @arjun
*Posted on 2025-07-24 18:59:30*

[/u/jgomezve](@jgomezve) to confirm – you’re seeing data streamed back when you run your graph, however when the execution proceeds to the next node you no longer see the data for the previous node? Can you confirm if that previous node is expanded or collapsed? There is a button next to the node name with a chevron to expand/collapse.

---
