# Any Way to See Exact Error Line in LangGraph Cloud?

**Topic ID:** 286
**Created:** 2025-07-07 09:40:43
**URL:** https://forum.langchain.com/t/286

**Tags:** cloud

---

## Post #1 by @Petar
*Posted on 2025-07-07 09:40:43*

Is there any way to make LangGraph Cloud deployments show the exact line of code where an error occurred? Right now, it only gives me a generic message — for example: value error: expected AI message but got human message. That’s just one example, but it doesn’t tell me where exactly in the code it happened. Does anyone have suggestions or best practices for debugging this more effectively?

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-07 18:32:14*

LangGraph Cloud deployments don’t show detailed tracebacks by default for security reasons. To improve debugging, add explicit logging with line numbers in your code using Python’s `logging` module with `exc_info=True`, or wrap critical sections in try-catch blocks that log the specific location. You can also use LangSmith’s tracing to see the execution flow and identify where errors occur in your graph nodes. For development, run `langgraph dev` locally to get full stack traces, then add targeted logging to those problem areas before deploying to production.

---
