# Disable Langsmith tracing for custom routes in Langgraph server

**Topic ID:** 1036
**Created:** 2025-08-08 17:57:47
**URL:** https://forum.langchain.com/t/1036

---

## Post #1 by @tienanh
*Posted on 2025-08-08 17:57:47*

Hello, i added custom routes to langgraph server by following this document [https://docs.langchain.com/langgraph-platform/custom-routes](How to add custom routes - Docs by LangChain), i’m also using Langsmith tracing to tracing my graph. Unfortunately, Langsmith also tracing these custom routes and make my data like username, password, credit card info are not secure. How can i disable tracing for these custom routes, and enable tracing my graph only?

---

## Post #2 by @wfh
*Posted on 2025-08-08 18:41:47*

Langsmith doesn’t trace custom routes…  It just traces langgraph or traceable decorated code.

You’ll have to share more information about how you’re instrumenting your app if you want more help.

---

## Post #3 by @tienanh
*Posted on 2025-08-08 19:13:20*

Oh, I got a bit confused — it turns out that what was traced wasn’t the custom routes themselves, but rather a tool that LangSmith automatically traced because I invoked it within the route logic. Could you please help me figure out how to disable tracing for a tool created with the `@tool` decorator?

I’ve referred to this documentation, but it doesn’t seem to work for a function that already has the `@tool` decorator applied. [https://docs.smith.langchain.com/observability/how_to_guides/mask_inputs_outputs](Prevent logging of sensitive data in traces |  LangSmith)

This solution doesn’t work.


```
`def process_rKey(inputs: dict) -> dict:
    return {"rKey": ""}

@tool("check_rKey")
@traceable(run_type="tool", process_inputs=process_rKey)
def check_rKey(rKey: str) -> bool:
`
```

---
