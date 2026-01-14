# How to access langgraph_auth_user (RunnableConfig) inside a Middleware or Node?

**Topic ID:** 2464
**Created:** 2025-12-10 08:05:24
**URL:** https://forum.langchain.com/t/2464

---

## Post #1 by @kissycn
*Posted on 2025-12-10 08:05:24*

Hi everyone,

I am deploying an app using **LangGraph Platform** and have successfully implemented custom authentication following the **[https://www.google.com/url?sa=E&q=https%3A%2F%2Flangchain-ai.github.io%2Flanggraph%2Fconcepts%2Fauth%2F](official documentation)**.

**Current Situation:**

I can successfully access the authenticated user information inside my **Tools** using the runtime object.

However, I am struggling to access the same RunnableConfig (specifically langgraph_auth_user) inside my **Middleware** (or Nodes, e.g., in a @before_model hook).

**Code Example:**



**In Tools (Works Fine)**




```
`@tool
def my_tool(runtime: ToolRuntime):
    # This works perfectly
    user = runtime.config["configurable"].get("langgraph_auth_user")
`
```



**In Middleware/Nodes (The Issue)**




```
`@before_model
def check_message_limit(state: AgentState, runtime: Runtime):
    # ERROR: 'Runtime' object has no attribute 'get' or 'config'
    # I cannot easily reach the 'configurable' dictionary here.
    user_config = runtime.config.get("configurable", {}).get("langgraph_auth_user")
`
```

---

## Post #2 by @hsm207
*Posted on 2025-12-10 16:18:50*

Does this work?


```
` user_config = runtime.context.get("langgraph_auth_user")`
```

---

## Post #3 by @kissycn
*Posted on 2025-12-11 01:45:37*

kissycn:

`configurable`



It works fine in the Tool node, but it cannot obtain configurable information in the Middleware node.

---

## Post #4 by @wfh
*Posted on 2025-12-19 06:26:47*

I believe config should still be injectable:


```
`from langchain_core.runnables import RunnableConfig

@before_model
def check_message_limit(state: AgentState, config: RunnableConfig, runtime: Runtime):
    user_config = runtime.config.get("configurable", {}).get("langgraph_auth_user")

`
```

Though another tip is that the config is available in context, so should be able to do this anywhere:


```
`from langgraph.config import get_config

def some_func(state: AgentState):
    config = get_config()
    user_config = runtime.config.get("configurable", {}).get("langgraph_auth_user")

`
```

---
