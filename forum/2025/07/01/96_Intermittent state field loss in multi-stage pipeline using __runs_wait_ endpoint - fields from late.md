# Intermittent state field loss in multi-stage pipeline using `/runs/wait` endpoint - fields from later stages randomly disappear

**Topic ID:** 96
**Created:** 2025-07-01 00:06:58
**URL:** https://forum.langchain.com/t/96

---

## Post #1 by @jasonhatton
*Posted on 2025-07-01 00:06:58*

I’m experiencing an intermittent issue with state persistence in a 7-stage LangGraph pipeline where fields from later stages randomly disappear from the state. The LangGraph deployment is deployed in SaaS mode. LangGraph is hosting this deployment at a `us.langgraph.app` sub-domain.

**Problem Description:**


Pipeline has 7 sequential stages
State values from stages 1-4 persist reliably
Fields output from stages 5-7 intermittently vanish from state
Pattern: 5-10 consecutive API requests will be missing the later fields, then they’ll suddenly reappear
No obvious trigger for when this occurs

**Current Behavior:**


```
`Request 1-5: Has fields from stages 1-4 only
Request 6-10: Has fields from stages 1-4 only  
Request 11: Suddenly has all fields from stages 1-7
Request 12-15: Has all fields from stages 1-7
Request 16-20: Back to stages 1-4 only
`
```

**Environment:**


```
`requires-python = ">=3.11"
dependencies = [
    "aiofiles>=24.1.0",
    "langchain>=0.3.25",
    "langchain-openai>=0.3.19",
    "langgraph>=0.4.8",
    "langgraph-supervisor>=0.0.27",
    "pydantic>=2.0.0",
    "python-dotenv>=1.1.0",
    "types-aiofiles>=24.1.0.20250606",
]
`
```

**Questions:**


Is this a known issue with state management in longer pipelines?
Are there state size limits or memory pressure issues that could cause this?
Any debugging approaches to identify why later stage outputs are being dropped?

The inconsistency makes it difficult to rely on the full pipeline output in API requests. I know it is only a problem that shows up when called by API. When viewed in the tracing project for the deployment, the model completes and populates the later stage fields. Any insights into potential causes or debugging strategies would be appreciated.

---

## Post #2 by @wfh
*Posted on 2025-07-01 01:23:02*

Hi [/u/jasonhatton](@jasonhatton) , could you share your deployment ID with us (the UUID available in your deployment UI) to help debug?

There are no known bugs in checkpointing or state management at the moment, so checking the logs would help us confirm whether there is any issue with your deployment.

Thanks!

---

## Post #3 by @jasonhatton
*Posted on 2025-07-01 13:49:32*

dd011052-9aae-40e5-b9f0-af68574aec6a

---
