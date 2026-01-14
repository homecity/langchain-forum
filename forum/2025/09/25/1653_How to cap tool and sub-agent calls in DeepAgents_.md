# How to cap tool and sub-agent calls in DeepAgents?

**Topic ID:** 1653
**Created:** 2025-09-25 17:00:34
**URL:** https://forum.langchain.com/t/1653

---

## Post #1 by @valtahomes
*Posted on 2025-09-25 17:00:34*

In DeepAgents, when I register multiple tools and sub-agents, I want to prevent the loop from running indefinitely. How can I enforce hard limits—e.g., maximum tool calls, maximum sub-agent invocations, or a recursion/depth cap—similar to how Create React Agent lets you configure recursion limits? Pointers to config flags, code samples, or best practices for step/token budgeting would be great.

Thanks!

V

---

## Post #2 by @pawel-twardziak
*Posted on 2025-09-29 14:08:59*

Hi [/u/valtahomes](@valtahomes)

good to see your engagement here!  Sorry you’ve been waiting a few days for an answer 

Let me think a bit and I will reply to your post.

---

## Post #3 by @pawel-twardziak
*Posted on 2025-10-04 18:27:32*

Hi [/u/valtahomes](@valtahomes)

Sorry for the long wait.

I have investigated a little and:


DeepAgents’ README states that the agent created with `create_deep_agent` “is just a LangGraph graph,” which means you can use LangGraph’s run configuration and graph controls to bound execution (including recursion/step limits) and to add termination logic. [https://github.com/langchain-ai/deepagents](DeepAgents README)
Also, when LangGraph exceeds its configured recursion limit, you’ll see an error similar to “Recursion limit reached without hitting a stop condition,” which you can catch or avoid by setting an appropriate limit. [https://github.com/langchain-ai/langchain/discussions/22184](LangChain discussion)

[#p-3093-example-1-hard-cap-with-recursion-limit-python-1]()Example 1 - Hard cap with recursion limit (Python)
Use a hard global cap via the run `config`. If the limit is hit, LangGraph will raise a recursion error.


```
`from deepagents import create_deep_agent
# from langgraph.errors import GraphRecursionError  # optional: catch explicitly if available in your version

agent = create_deep_agent(tools=[...], instructions="...")

try:
    # Hard cap for the entire run
    result = agent.invoke({"messages": [{"role": "user", "content": "..."}]}, config={"recursion_limit": 12})
except Exception as e:
    # Handle recursion-limit error (e.g., GraphRecursionError) gracefully
    result = {"error": str(e)}
`
```

Notes:



The `recursion_limit` in the run `config` caps total super-steps across the graph (parent + any subgraphs).



When exceeded, LangGraph raises an error (see discussion). [https://github.com/langchain-ai/langchain/discussions/22184](Discussion)



DeepAgents’ agent being a LangGraph graph makes this directly applicable. [https://github.com/langchain-ai/deepagents](DeepAgents README)



[#p-3093-example-2-cap-toolsub-agent-counts-with-explicit-counters-langgraph-2]()Example 2 - Cap tool/sub-agent counts with explicit counters (LangGraph)
In addition to a global recursion cap, add explicit counters in graph state and terminate early via conditional edges.


```
`class State(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]
    tool_calls: int
    subagent_calls: int
    max_tool_calls: int
    max_subagent_calls: int

def check_budgets(state: State):
    if state["tool_calls"] >= state["max_tool_calls"]:
        return END
    if state["subagent_calls"] >= state["max_subagent_calls"]:
        return END
    return "work"

def work(state: State) -> State:
    # ... perform one unit of work
    # increment either tool_calls or subagent_calls when you execute them
    return state

builder = StateGraph(State)
builder.add_node("work", work)
builder.add_conditional_edges(START, check_budgets, {END: END, "work": "work"})
builder.add_conditional_edges("work", check_budgets, {END: END, "work": "work"})
graph = builder.compile()

out = graph.invoke({
    "messages": [],
    "tool_calls": 0,
    "subagent_calls": 0,
    "max_tool_calls": 5,
    "max_subagent_calls": 2,
}, config={"recursion_limit": 20})
`
```

This gives you belt-and-suspenders: a global recursion cap plus explicit limits on tools and sub-agents.

References: [https://github.com/langchain-ai/deepagents](DeepAgents README), [https://github.com/langchain-ai/langchain/discussions/22184](LangChain discussion).

[#p-3093-example-3-cap-sub-agent-invocations-locally-and-globally-3]()Example 3 - Cap sub-agent invocations locally and globally
If a sub-agent is itself a graph (common with DeepAgents), you can:


Set a lower `recursion_limit` when calling the sub-agent.
Increment a parent-level `subagent_calls` counter to enforce a global ceiling.


```
`def call_subagent(parent_state: State, subagent_graph):
    if parent_state["subagent_calls"] >= parent_state["max_subagent_calls"]:
        return parent_state  # refuse to delegate
    parent_state["subagent_calls"] += 1
    sub_out = subagent_graph.invoke(parent_state, config={"recursion_limit": 6})
    # merge results as needed
    return {**parent_state, **sub_out}
`
```

References: [https://github.com/langchain-ai/deepagents](DeepAgents README).

[#p-3093-example-4-classic-langchain-agent-loop-cap-if-applicable-4]()Example 4 - Classic LangChain agent loop cap (if applicable)
If you’re using a classic LangChain ReAct-style agent loop instead of a LangGraph graph, set a max-iteration cap so the tool-calling loop can’t run indefinitely.


```
`from langchain.agents import AgentExecutor

executor = AgentExecutor(
    agent=agent,
    tools=tools,
    max_iterations=3,  # stop after N tool iterations
)
`
```

Docs: [https://python.langchain.com/api_reference/langchain/agents/langchain.agents.agent.AgentExecutor.html](AgentExecutor).

[#p-3093-practical-budgeting-tips-steps-tokens-time-5]()Practical budgeting tips (steps, tokens, time)

**Use a hard global cap**: Always set `recursion_limit`/`recursionLimit` on runs, especially when sub-agents are involved.
**Counters + stop edges**: Keep `tool_calls`/`subagent_calls` in state. End early using conditional edges.
**Model-level caps**: Configure reasonable `max_tokens` for generations and timeouts per call.
**Trim context**: Summarize/trim messages to stay within context limits and reduce step pressure.
**Instrument**: Log tool/sub-agent counts and recursion errors; fail gracefully with a helpful message to the user.

---

## Post #4 by @valtahomes
*Posted on 2025-10-09 18:33:13*

Thank you. this is quite helpful.

Let me try some experiments.

---
