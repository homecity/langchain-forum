# Evaluators Stopped Running - No Feedback

**Topic ID:** 1480
**Created:** 2025-09-08 23:22:32
**URL:** https://forum.langchain.com/t/1480

---

## Post #1 by @rohseh303
*Posted on 2025-09-08 23:22:32*

I’m seeing my runs being sent to LangSmith and successfully populated into my tracing project. However, the feedback/evaluator I’ve enabled — called **`missing_tool_call`** — has stopped running. Up until around 12pm 9/8, the feedback was working fine. After that, no logs are showing up and I can’t see any related errors.

Error message: **{‘error’: ‘Evaluator failed to batch invoke {“detail”:“Service unavailable”}’}’**

Happy to attach some runs as well.

---

## Post #2 by @marco
*Posted on 2025-09-12 10:23:52*

Hi [/u/rohseh303](@rohseh303) ! We had an incident at that time, could you try rerunning the evaluators? Thanks! [https://status.smith.langchain.com/](https://status.smith.langchain.com/)

---
