# How to get last element in output in evaluator

**Topic ID:** 1641
**Created:** 2025-09-25 09:59:52
**URL:** https://forum.langchain.com/t/1641

---

## Post #1 by @severin
*Posted on 2025-09-25 09:59:52*

How can I get the last element of a list of messages in the output when selecting them as variable for an evaluator. I need to get the final message of an agent, so I would do `output.messages[-1]` but that does not work and is always undefined. Manually doing `output.messages[5]` works, but that is of course not feasible since we don’t know the amount of message the agent is going to produce ahead of time.

[/uploads/short-url/3tPrYo3HhQJ5U8LUrZ0xZDLt30z.png?dl=1](Screenshot 2025-09-25 at 11.56.242874×1760 496 KB)

---
