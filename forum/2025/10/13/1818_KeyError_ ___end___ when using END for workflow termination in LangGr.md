# KeyError: '__end__' when using END for workflow termination in LangGr

**Topic ID:** 1818
**Created:** 2025-10-13 19:10:55
**URL:** https://forum.langchain.com/t/1818

**Tags:** python-help, intro-to-langgraph

---

## Post #1 by @bharatipatil2308
*Posted on 2025-10-13 19:10:55*

Hi LangGraph team,

I am encountering a persistent `KeyError: '__end__'` when running a workflow that uses the recommended `END` constant for terminal transitions. The error occurs inside the library, specifically at:


```
`File ".../langgraph/graph/_branch.py", line 205, in _finish
    r if isinstance(r, Send) else self.ends[r] for r in result
KeyError: '__end__'
`
```

Minimal reproducible example:


```
`from langgraph.graph import StateGraph, END

def node_a(state):
    return state

def router(state):
    return END

workflow = StateGraph(dict)
workflow.add_node("a", node_a)
workflow.set_entry_point("a")
workflow.add_conditional_edges("a", router, {})
workflow.add_edge("a", END)
app = workflow.compile()
for state in app.stream({"input": "test"}):
    print(state)
`
```

Expected behavior:

The workflow should terminate cleanly when returning `END`, without raising a KeyError.

Actual behavior:

A `KeyError: '__end__'` is raised inside the library.

Environment:


LangGraph version: (e.g., 0.6.8, 0.6.10, latest)
Python version: (your version)
OS: (your OS)

Additional context:


I have tried both the latest and previous versions.
The error occurs regardless of the workflow complexity.
The issue appears to be internal to LangGraph’s handling of the END state.

Please advise if there is a workaround or if a fix is planned. Thank you!

---

## Post #2 by @pawel-twardziak
*Posted on 2025-10-13 20:04:08*

bharatipatil2308:

`workflow.add_conditional_edges("a", router, {})`



Hi [/u/bharatipatil2308](@bharatipatil2308)

most probably it should be like this:

`workflow.add_conditional_edges("a", router, {END: END})`

---

## Post #3 by @heisenberg-7
*Posted on 2025-10-14 07:39:34*

Tried the minimal reproducible example, it seems to work, but yes, as [/u/pawel-twardziak](@pawel-twardziak) mentioned, try that or try removing {} from the conditional edge

[/uploads/short-url/fxA28N7l6ASL44p18lF4PCGgs6E.jpeg?dl=1](image1481×669 114 KB)

---
