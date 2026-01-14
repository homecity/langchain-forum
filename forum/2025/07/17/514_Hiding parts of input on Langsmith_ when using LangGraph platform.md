# Hiding parts of input on Langsmith, when using LangGraph platform

**Topic ID:** 514
**Created:** 2025-07-17 10:52:57
**URL:** https://forum.langchain.com/t/514

---

## Post #1 by @lukanarrative
*Posted on 2025-07-17 10:52:57*

Hi,

We want to not log some parts of input to Langsmith. Is it possible wit this setup:

We are deploying our app to LangGraph platform. We are using LangGraph to define graphs. We are using langchain’s libraries to invoke LLMs (`ChatOpenAI`, `ChatAnthropic` etc.).

When running the graphs, every node’s input and output get stored in Langsmith.

This is a sample of what our code looks like:


```
`# State definitions
class GraphInput(TypeDict):
    text: str
    big_text: str # a larger input


class GraphOutput(TypeDict):
    verdict: str


class GraphState(GraphInput, GraphOutput):
    hidden_text: str




# Example of a node
async def example_node(state, config):
   chain = ChatOpenAI() | StrOutputParser()

   res = await chain.ainvoke(state["text"] + state["big_text"])

   return {"hidden_text": res}

`
```

For this example, I’m interested in hiding in Langsmith traces the values (or entire keys) of `big_text` and `hidden_text`.

How to do that? I don’t want to hide all inputs and outputs, just some of these keys.

I’ve found these docs ([https://docs.smith.langchain.com/observability/how_to_guides/mask_inputs_outputs](Prevent logging of sensitive data in traces | 🦜️🛠️ LangSmith)), but there are no examples of using this for LangGraph platform + langchain libraries, which have tracing automatically failing.

Thanks

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-17 16:15:03*

For LangGraph Platform, there’s currently no built-in way to selectively hide specific keys from traces while keeping others visible. The platform doesn’t support custom serializers or tracer configurations that work locally. The environment variables `LANGCHAIN_HIDE_INPUTS=true` and `LANGCHAIN_HIDE_OUTPUTS=true` hide everything, not specific keys. Your only option is to sanitize sensitive data at the source in your nodes - either remove sensitive fields from your state schema entirely, or overwrite them with placeholder values like `"[REDACTED]"` before returning state updates. You could create wrapper functions that strip sensitive keys before logging, but this requires manually managing what gets stored in state versus what gets passed to your LLM calls.

---

## Post #3 by @lukanarrative
*Posted on 2025-07-17 20:04:37*

there’s currently no built-in way to selectively hide specific keys from traces while keeping others visible

Is it on the roadmap?


Thanks

---

## Post #4 by @austinmw
*Posted on 2025-09-23 17:46:29*

[/u/abdulbasit](@AbdulBasit) Any updates on this?

I’d like to selectively hide a specific LangGraph state key from being traced by LangSmith, while retaining its availability for other downstream tools to access it.

For context, I’m currently converting Pandas dataframes to dictionaries and saving them in LangGraph state via a sql_query tool, and then allowing other tools to access the dataframe results later on if needed. The dataframes. We don’t want that particular state key traced since it is too large:


Failed to send compressed multipart ingest: langsmith.utils.LangSmithError: Failed to POST [https://api.smith.langchain.com/runs/multipart](https://api.smith.langchain.com/runs/multipart) in LangSmith API. HTTPError(‘422 Client Error: unknown for url: [https://api.smith.langchain.com/runs/multipart](https://api.smith.langchain.com/runs/multipart)’, ‘{“error”:“Unprocessable entity: invalid Content-Length or length parameter for patch.da6609f3-b6ba-4b81-aac5-08489f417722.outputs: field size 214889244 exceeds maximum allowed size of 209715200 bytes”}\n’)

---
