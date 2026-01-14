# ReAct Agent astream_events: Possible to separate tool call data and response?

**Topic ID:** 1477
**Created:** 2025-09-07 03:47:58
**URL:** https://forum.langchain.com/t/1477

---

## Post #1 by @skye0402
*Posted on 2025-09-07 03:47:58*

I started streaming from a ReAct agent and that brought the tool call data back into the response. I was able to separate it now for the response streaming but I would also like to get hold of the tool data.

For that I would need to get a tool event, which I don’t get.

**Events LangGraph Actually Emits:**



**`on_chat_model_start/stream/end`** - LLM execution 



**`on_chain_start/end`** - Agent workflow steps 



**`on_chain_stream`** - Chain execution updates 



**Missing Events:**


**`on_tool_start/end`** - These don’t exist from the ReAct agent’s event model 

Any idea how that can be achieved?

---
