# `checkpoint_during=False` causes LangGraph Studio to crash

**Topic ID:** 562
**Created:** 2025-07-18 22:30:45
**URL:** https://forum.langchain.com/t/562

---

## Post #1 by @lukanarrative
*Posted on 2025-07-18 22:30:45*

I have a graph, and in one of the nodes I’m invoking another graph.

I don’t need to have checkpoints for that other graph, so I added `checkpoint_during=False` when invoking it:


```
`async def some_node(state, config):
    res = await subgraph.ainvoke(
        state, config, checkpoint_during=False
    )

    return {
        "a": res,
    }
`
```

The graph is executing correctly, I get the output I want. Do I actually need to specify `False` to prevent checkpointing of intermediate steps?

However, this is the error I get in the studio:

[/uploads/short-url/iaGjGn51ga0E1NsFemRKBL1PYdN.png?dl=1](image594×466 21 KB)

When I reload the page, I can see the graph again, and it works.

---

## Post #2 by @wfh
*Posted on 2025-07-18 23:45:49*

Thanks for flagging! Raised to the studio dev.

You can still set that when creating the parent run and it should propagate down, but this definitely looks like a UI bug.

---

## Post #3 by @arjun
*Posted on 2025-07-25 19:17:45*

Hi [/u/lukanarrative](@lukanarrative), thanks for flagging this issue! Just wanted to raise that I’ve been able to reproduce and am working on a fix. Should have this resolved shortly.

---
