# How to view RunnableConfig state in LangGraph traces?

**Topic ID:** 1902
**Created:** 2025-10-22 18:28:44
**URL:** https://forum.langchain.com/t/1902

**Tags:** python-help

---

## Post #1 by @adeshmukh
*Posted on 2025-10-22 18:28:44*

I’m working with LangGraph’s prebuilt `create_react_agent` and using LangSmith for tracing. I invoke my workflow like this:


```
`result = await workflow.ainvoke(agent_input, config=config)
`
```

As expected, I can view the following in the trace:


LangGraph node executions
Tool calls and their inputs/outputs
Overall agent flow

However I wanted to know if there’s any way to **get visibility into the `RunnableConfig` object** that’s being passed through the workflow

**Questions:**


Does LangSmith currently capture config state in traces?
If not natively supported, are there recommended patterns for logging config at key points (e.g., custom callbacks, middleware)?

---
