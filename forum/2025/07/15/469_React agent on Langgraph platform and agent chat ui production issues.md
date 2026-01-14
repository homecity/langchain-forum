# React agent on Langgraph platform and agent chat ui production issues

**Topic ID:** 469
**Created:** 2025-07-15 07:59:00
**URL:** https://forum.langchain.com/t/469

---

## Post #1 by @rohan
*Posted on 2025-07-15 07:59:01*

Tech Setup Overview

Agent Backend

• Built using LangGraph’s create_react_agent, currently configured as TaskAgent — integrates multiple tools (mostly other agents).

• Hosted on the LangGraph platform.

Frontend (UI)

• Powered by LangChain’s open-source Agent Chat UI.

• Deployed on Google Cloud Run.

Auth & Routing

• UI secured with Google Cloud IAP.

• UI ↔️ Agent communication routed via proxy (Next.js api). LangGraph API is not directly exposed to users.

 Usage

• ~10 daily active users

⸻

 Agent Initialization Code

def create_task_agent():

“”“Create the TaskAgent. Call this function to initialize the agent.”“”

reasoning_cfg = {“effort”: “high”, “summary”: “auto”}  # optional

llm = ChatOpenAI(

model=“o3”,  # any Responses-ready model (o4-mini, gpt-4o, …)

use_responses_api=True,  # forces the new endpoint

output_version=“responses/v1”,  # keeps block format stable

reasoning=reasoning_cfg,  # returns reasoning summaries

store=True,

)


```
`# Create the LangGraph agent
return create_react_agent(
    name="agent",  # Agent name in LangGraph
    model=llm,
    tools=[
        tool1,
        tool2,
        tool3,
        tool4,
        # ...
        {
            "type": "web_search_preview",
            "user_location": {"type": "approximate"},
            "search_context_size": "medium"
        }
    ],
    prompt=task_agent_react_sys_prompt,
)
`
```

agent = create_task_agent()

⸻

 Current Issues

1.  Recursion Limit Exceeded

→ Hitting the default recursion limit (seems to be 25).

 Any tips on how to increase this safely in LangGraph?

2.  Frequent Task Cancellations (Critical)

→ Getting repeated task cancellation errors — hard to debug.

 Need a permanent fix or robust mitigation strategy.

⸻

---

## Post #2 by @victor
*Posted on 2025-07-15 12:21:41*

Hey [/u/rohan](@rohan) regrading recursion limit, you can set the limit in the config when invoking your agent: [https://langchain-ai.github.io/langgraph/troubleshooting/errors/GRAPH_RECURSION_LIMIT/](GRAPH_RECURSION_LIMIT)

I would recommend adding langsmith tracing to help debug what’s going on with your tool calls and task cancellations! [https://docs.smith.langchain.com/observability](Observability Quick Start | 🦜️🛠️ LangSmith)

---

## Post #3 by @rohan
*Posted on 2025-07-16 10:29:24*

My LangGraph setup looks like this:



**Backend**: agent.py, which have create_react_agent and reads settings from langgraph.json.



**Frontend**: the Agent Chat UI.

Note: I haven’t write any graph invocation logic.

I need to set the graph_recursion_limit, but create_react_agent doesn’t expose a parameter with that name. Tracing is already enabled, so this is the only configuration gap I’m trying to solve.

Here is the Cancellation issue(that is being popped up without any user activity on client side]

====

CancelledError(UserInterrupt(‘User interrupted the run’))Traceback (most recent call last):

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/**init**.py”, line 2776, in astream

async for _ in runner.atick(

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/runner.py”, line 368, in atick

done, inflight = await asyncio.wait(

^^^^^^^^^^^^^^^^^^^

File “/usr/local/lib/python3.11/asyncio/tasks.py”, line 428, in wait

return await _wait(fs, timeout, return_when, loop)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File “/usr/local/lib/python3.11/asyncio/tasks.py”, line 535, in _wait

await waiter

===

Also there isn’t any asyncio.run or .loop.. in my codebases.

---

## Post #4 by @rohan
*Posted on 2025-07-17 18:19:29*

[/u/victor](@victor) can you help here asap, it will be very very appreciated.

---
