# LangSmith traces not showing up when running a LangGraph in Jupyter Notebook

**Topic ID:** 1529
**Created:** 2025-09-14 04:45:51
**URL:** https://forum.langchain.com/t/1529

---

## Post #1 by @LuxuryMode
*Posted on 2025-09-14 04:45:51*

Hi everyone,

I’m trying to get traces into LangSmith from a graph I built with LangGraph, but nothing is showing up in the LangSmith dashboard. Here’s what I’ve done so far:


At the very top of my Jupyter notebook, I set the environment variables (I did this to be sure since I thought perhaps env vars from outside of the notebook weren’t getting picked up)


```
`import os
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_ENDPOINT"] ="https://api.smith.langchain.com"
os.environ["LANGSMITH_API_KEY"] = "my api key here"
os.environ["LANGSMITH_PROJECT"] = "pr-my-project here"
`
```


Then I import and build my graph with langgraph.
I run the graph, and everything executes correctly, but no traces appear in LangSmith.

I’ve tried restarting the notebook kernel and re-running everything top-to-bottom, but it still doesn’t work. I also read that earlier versions of LangChain used `LANGCHAIN_TRACING_V2` / `LANGCHAIN_API_KEY` instead of the `LANGSMITH_*` env vars, but I’m not sure if that’s outdated info…so I’m wondering if I might be on the wrong version?

My questions:


Do I need to use LANGCHAIN_* instead of LANGSMITH_* depending on the library version?
Is there something different about LangGraph that requires extra configuration for traces?

Here are my package versions for context:


```
`langchain_core = 0.3.75
langsmith = 0.4.27
`
```

---
