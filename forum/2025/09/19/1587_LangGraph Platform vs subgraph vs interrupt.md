# LangGraph Platform vs subgraph vs interrupt

**Topic ID:** 1587
**Created:** 2025-09-19 03:31:34
**URL:** https://forum.langchain.com/t/1587

**Tags:** intro-to-langgraph

---

## Post #1 by @Andrey_P
*Posted on 2025-09-19 03:31:34*

Hi!

There is a parent graph and a subgraph that have a common “messages”. When executing “interrupt” inside the subgraph in ‘Chat’ LangGraph Platform, the subgraph messages are overwritten and only the parent graph messages and the “interrupt” input window remain. An “interrupt” is transmitted from the subgraph to the parent graph, and the “Chat” window shows the state of the dialogue at the moment of entering the subgraph, even though they have shared “messages”. Is it possible to update the ‘messages’ of the parent graph before calling “interrupt” in the subgraph?

[/uploads/short-url/prPWGVvw3HWbFqAaeYpE0l4I8ZF.png?dl=1](image1496×2632 225 KB)

---

## Post #2 by @joezhoujinjing
*Posted on 2025-10-06 05:20:43*

Exactly the same problem here, anyone got an solution??

---

## Post #3 by @Jameskanyiri
*Posted on 2025-10-06 07:03:00*

Are you facing the same issue when using langgraph studio?

---

## Post #4 by @joezhoujinjing
*Posted on 2025-10-06 15:01:24*

yes, the problem persists with studio

---
