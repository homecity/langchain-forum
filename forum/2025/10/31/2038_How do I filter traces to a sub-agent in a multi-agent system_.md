# How do I filter traces to a sub-agent in a multi-agent system?

**Topic ID:** 2038
**Created:** 2025-10-31 19:38:54
**URL:** https://forum.langchain.com/t/2038

---

## Post #1 by @aerickson-clt
*Posted on 2025-10-31 19:38:54*

I want an Online Custom Code Evaluation to run once on the top level of the `planner_expert`.  The `planner_expert` is configured as a react agent (with the now deprecated `create_react_agent` built-in).

[/uploads/short-url/uguKgBynn9jrM9HiExDmEAPL0C8.png?dl=1](image868×673 64 KB)

I found that I can add a custom tag in the source code of my graph, and then filter on the custom tag as well as Metadata `langgraph_node == planner_expert`.  But is there a better way than this?


```
`# Create the react agent for planning
_planner_agent_graph = create_react_agent(
    model=LLM,
    tools=PLANNER_TOOLS,
    state_schema=MyState,
    prompt=build_planner_agent_prompt,
    name="planner_expert",
).with_config(
    tags=["my_custom_tag"]
)

`
```

---

## Post #2 by @jacoblee9315
*Posted on 2025-11-01 16:04:04*

Nope that’s a fine way to do it!

---
