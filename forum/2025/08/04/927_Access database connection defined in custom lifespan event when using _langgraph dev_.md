# Access database connection defined in custom lifespan event when using `langgraph dev`

**Topic ID:** 927
**Created:** 2025-08-04 11:02:28
**URL:** https://forum.langchain.com/t/927

---

## Post #1 by @srjalan
*Posted on 2025-08-04 11:02:28*

LangGraph newbie here.

I am following the doc here: [https://docs.langchain.com/langgraph-platform/custom-lifespan](https://docs.langchain.com/langgraph-platform/custom-lifespan)

How do i access for example `app.state.db_session` when using with `langgraph dev` (i.e. local server) if I need to use the `db_session` within a graph node?

---

## Post #2 by @AbdulBasit
*Posted on 2025-08-04 14:39:17*

In `langgraph dev`, you can’t access `app.state.db_session` directly from node `config` since LangGraph nodes run in isolation from the FastAPI app instance. You need to either:

**Option 1: Inject into graph input**


```
`# Pass db_session when invoking the graph
graph.invoke({"messages": [...], "db_session": app.state.db_session})

def my_node(state, config):
    db_session = state["db_session"]
    return state
`
```

**Option 2: Use a service locator/global utility**


```
`# Create a global service
class DatabaseService:
    db_session = None

# Set in lifespan, access in nodes
def my_node(state, config):
    db_session = DatabaseService.db_session
    return state
`
```

Lifespan objects must be explicitly passed or stored globally since nodes can’t access the FastAPI app state directly.

---
