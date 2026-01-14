# Stream stops midway to backend, but completes on LangSmith

**Topic ID:** 493
**Created:** 2025-07-16 11:38:17
**URL:** https://forum.langchain.com/t/493

**Tags:** python-help, self-hosted

---

## Post #1 by @kundanRao8507
*Posted on 2025-07-16 11:38:17*

[#p-807-description-1]()Description

**Affects version**: langgraph 0.4.8
**Symptom**: When streaming a graph run, streaming to my backend client stops midway. However, when I inspect the run on LangSmith, the stream is shown as complete. It usually stops in two points, one while streaming the last run of my subgraph or last run of my entire graph
**Expectation**: The stream to my backend should complete as it does on LangSmith.
**Environment**: I have set up 2 langgraph deployments, one in cloud run, another one in self hosted cloud run
**Backend**: We are using client.stream to receive the streaming chunks


```
`async for chunk in client.runs.stream(
                    thread_id,
                    assistant_id=assistants[0]["assistant_id"],
                    input=input_data,
                    stream_mode=["events"],
                    stream_subgraphs=True,
                    },
                ):
`
```

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-17 16:18:40*

This is a known issue that can occur when streaming runs using `stream_subgraphs=True`, particularly with `stream_mode=["events"]`. LangGraph sometimes fails to emit the final few chunks when subgraphs complete, even though the full output is correctly registered in LangSmith. This isn’t typically a network issue, but a limitation in how the stream cursor is managed internally for nested runs.

To work around this:


Try switching to `stream_mode=["values"]` to see if the final state is delivered correctly.
Alternatively, avoid `stream_subgraphs=True` if you don’t need per-subgraph updates.
Check if the issue persists with the latest version of LangGraph, as streaming has been actively evolving.

Also verify that your backend doesn’t close the connection too early, but given that LangSmith shows full output, the issue is likely upstream. Hope it Helps.

---

## Post #3 by @hash3liZer
*Posted on 2025-07-21 16:43:04*

Hey [/u/abdulbasit](@AbdulBasit) . Did you get to to solve the issue? For me the issue happens in langsmith UI. For example, i’ve a subagent like you mentioned and the subagent returns response from LLM. If i expand on the node thats generating the response of LLM on the way, it sometimes hangs in the middle. Altough i can see the agent has progressed further in the langsmith traces.

---

## Post #4 by @kundanRao8507
*Posted on 2025-07-25 17:59:19*

Tried all of the methods mentioned, yet the issue isnt still mitigated

---

## Post #5 by @scrowder
*Posted on 2025-07-29 17:35:43*

If you are just using LangGraph and running on cloud run, that could be a question for the `LangGraph` category as opposed to `LangGraph Platform`.

If you are using the LangGraph Server container and deploying to cloud run, it should be noted that LangGraph Platform was not designed for serverless environments and will not function in this kind of environment. More docs on that here: [https://langchain-ai.github.io/langgraph/concepts/langgraph_standalone_container/?h=serverless#overview](Standalone Container)

---
