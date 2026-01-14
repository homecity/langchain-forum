# Langgraph studio "submit" button is not async supported

**Topic ID:** 1414
**Created:** 2025-08-30 10:28:57
**URL:** https://forum.langchain.com/t/1414

---

## Post #1 by @sohamroy2538
*Posted on 2025-08-30 10:28:57*

I have async func/nodes which are part of the grapn and in the py file I have to run the *await* `graph.ainvoke()` to invoke the graph, when I run the studio and click the submit button it throws a **Blocing Error** . I assume that it is invoking the graph via the invoke fn but I need to run it using ainvoke. What is the solution or workaround of this issue.

Thanks

---

## Post #2 by @wfh
*Posted on 2025-08-30 11:34:19*

No the graph is not invoked synchronously. It is invoked asynchronously.

The block by error is in your code. If you look at the error message, it should tell you which call is triggering it.

---
