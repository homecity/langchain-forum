# Hot reloading deleting the Thread in Langgraph studio

**Topic ID:** 1644
**Created:** 2025-09-25 11:12:45
**URL:** https://forum.langchain.com/t/1644

**Tags:** python-help

---

## Post #1 by @bernatsampera
*Posted on 2025-09-25 11:12:45*

Every time I make a change in the langgraph graph, the thread in langgraph studio keep being lost and is not possible to rerun and test a specific node where the changes have been made.

This was working yesterday, I doubt that anything has changes in the platform but I am also not sure what change could I even have done to cause this.

Any idea?

---

## Post #2 by @bernatsampera
*Posted on 2025-09-25 20:22:58*

Found the problem.

This happens when you do changes in a node that has a call to with_structured_output.

If I do a normal call to the llm it works and I can do the changes without the thread being lost, with with_structured_output it deletes the state every time it hot reloads

---
