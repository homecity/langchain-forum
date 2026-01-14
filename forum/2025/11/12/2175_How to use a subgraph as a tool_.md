# How to use a subgraph as a tool?

**Topic ID:** 2175
**Created:** 2025-11-12 12:14:34
**URL:** https://forum.langchain.com/t/2175

**Tags:** python-help

---

## Post #1 by @fluxe
*Posted on 2025-11-12 12:14:34*

I’m currently developing a multi-agent system. The main agent is a ReAct agent which can call a number of tools. I want one of these tools to be a subgraph, which will retrieve a large amount of data and summarise with a different LLM, but I couldn’t find anything on best practices for conditional routing to subgraphs. I did see this GitHub discussion linked [https://github.com/langchain-ai/langgraph/discussions/5624](https://github.com/langchain-ai/langgraph/discussions/5624), but it’s unfortunately been deleted since. What would the best approach be to expose my subgraph as a tool?

---

## Post #2 by @pawel-twardziak
*Posted on 2025-11-12 15:03:05*

hi [/u/fluxe](@fluxe)

You have two solid, first-class patterns in LangGraph for this. Pick based on how tightly you want to integrate the subgraph with graph execution (checkpoints, interrupts, navigation).



Option A - Embed the subgraph as a node and route to it conditionally (tightest integration)



Option B - Expose the subgraph as a tool so the ReAct agent can select it (LLM-driven selection)



Both are supported and commonly used; the docs call the first “subgraphs” and the second “tool calling” via `ToolNode` or prebuilt agents.

[#p-4107-option-a-add-the-subgraph-as-a-node-and-conditionally-route-1]()Option A: Add the subgraph as a node and conditionally route

Build your subgraph and `compile()` it.
Add it as a node in the parent graph: `builder.add_node("my_subgraph", subgraph)`.
Use `add_conditional_edges` from a triage node to route into it when needed.

This gives you:


Integrated checkpoints and time-travel across parent/subgraph
Propagation of interrupts
Ability for the subgraph to update parent state via normal node returns


```
`from langgraph.graph import StateGraph, START, END

# Build the subgraph (e.g., fetch + summarize with a different LLM)
sub = StateGraph(State)
sub.add_node("fetch", fetch_large_dataset)
sub.add_node("summarize", summarize_with_special_llm)
sub.add_edge(START, "fetch")
sub.add_edge("fetch", "summarize")
subgraph = sub.compile()

# Parent graph with conditional routing
parent = StateGraph(State)
parent.add_node("triage", triage_router)  # returns "subgraph" or END
parent.add_node("subgraph", subgraph)
parent.add_edge(START, "triage")
parent.add_conditional_edges("triage", lambda s: "subgraph" if should_run(s) else END, ["subgraph", END])
graph = parent.compile()
`
```

When schemas differ between parent and subgraph, call the subgraph inside a node and map inputs/outputs there.

[#p-4107-option-b-expose-the-subgraph-as-a-tool-for-react-agents-2]()Option B: Expose the subgraph as a tool (for ReAct agents)
Compiled graphs are Runnables, so you can wrap them as a `BaseTool` and let your ReAct agent pick it like any other tool.


Wrap with `RunnableLambda(...).as_tool(...)` to adapt the subgraph’s input/output cleanly.


```
`from pydantic import BaseModel, Field
from langchain_core.runnables import RunnableLambda

class SubgraphArgs(BaseModel):
    query: str = Field(..., description="What to retrieve and summarize")

def run_subgraph(args: SubgraphArgs) -> str:
    out = subgraph.invoke({"query": args.query})
    return out["summary"]

subgraph_tool = RunnableLambda(run_subgraph).as_tool(
    name="retrieve_and_summarize",
    args_schema=SubgraphArgs,
    description="Retrieve large data and summarize with a specialized model."
)
`
```


Or define a tool that calls the subgraph and returns a ToolMessage via `Command` (keeps parent message/state updates explicit):


```
`from typing import Annotated
from langchain_core.tools import tool, InjectedToolCallId
from langchain_core.messages import ToolMessage
from langgraph.types import Command

@tool("retrieve_and_summarize")
def retrieve_and_summarize(
    query: str,
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    out = subgraph.invoke({"query": query})
    summary = out["summary"]
    return Command(update={"messages": [ToolMessage(summary, tool_call_id=tool_call_id)]})
`
```

Hook the tool into your ReAct flow with either `create_agent|create_react_agent(..., tools=[...])`, or if building your own graph, via `ToolNode([subgraph_tool, ...])` and `add_conditional_edges(..., tools_condition, {"tools":"tools", "__end__": "__end__"})`.

---

## Post #3 by @fluxe
*Posted on 2025-11-12 16:31:57*

Thanks for the response, I’m guessing this was AI generated though? I did ask an LLM as well and it gave me similar output before asking here  - my question is what would be an idiomatic way to handle this? I did consider both option A and B, but A is undefined (my question is on how `should_run(s)`should be implemented) and B feels a bit hacky to me. For `should_run(s)`, the only approach I can think of is defining a dummy `@tool` and detecting the name in function calls for the conditional edge but I assume there’s a smarter way?

---

## Post #4 by @pawel-twardziak
*Posted on 2025-11-12 17:44:45*

Yes, the content is 50/50 AI generated, since the input comes from my current knowledge and the examples come from AI - I am too lazy to provide examples on my own in the AI era 

So your AI was actually right  

Those two approaches are actually idiomatic in LangGraph ecosystem - AFAIK  The examples I gave are general, so the implementation details depend on your case.

Might be that option A doesn’t fit your case I dunno   Provide some more details about what you want to achieve so I can give you a more accurate answer.

---

## Post #5 by @pawel-twardziak
*Posted on 2025-11-12 18:09:50*

Check the swarm doc there [https://docs.langchain.com/oss/python/langchain/multi-agent#swarm](Multi-agent - Docs by LangChain) and [https://medium.com/@caldasdcardoso/swarm-architecture-agents-in-langgraph-b8b1b53c61b3](Swarm Architecture Agents in LangGraph | by Duarte Caldas Cardoso | Medium)

---

## Post #6 by @pawel-twardziak
*Posted on 2025-11-12 18:15:15*

And the official swarm project [https://github.com/langchain-ai/langgraph-swarm-py/blob/main/langgraph_swarm/handoff.py](langgraph-swarm-py/langgraph_swarm/handoff.py at main · langchain-ai/langgraph-swarm-py · GitHub)

---

## Post #7 by @system
*Posted on 2025-11-13 09:34:58*

This topic was automatically closed 12 hours after the last reply. New replies are no longer allowed.

---
