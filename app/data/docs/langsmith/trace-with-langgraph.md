---
title: "Trace with LangGraph"
url: "https://docs.langchain.com/langsmith/trace-with-langgraph"
section: "langsmith"
last_modified: "2025-12-16T22:07:24.970Z"
---
LangSmith smoothly integrates with LangGraph (Python and JS) to help you trace agents, whether you’re using LangChain modules or other SDKs.

## 

[​

](#with-langchain)

With LangChain

If you are using LangChain modules within LangGraph, you only need to set a few environment variables to enable tracing. This guide will walk through a basic example. For more detailed information on configuration, see the [Trace With LangChain](/langsmith/trace-with-langchain) guide.

### 

[​

](#1-installation)

1\. Installation

Install the LangGraph library and the OpenAI integration for Python and JS (we use the OpenAI integration for the code snippets below). For a full list of packages available, see the [LangChain Python docs](https://python.langchain.com/docs/integrations/platforms/) and [LangChain JS docs](https://js.langchain.com/docs/integrations/platforms/).

pip

yarn

npm

pnpm

Copy

```
pip install langchain_openai langgraph
```

### 

[​

](#2-configure-your-environment)

2\. Configure your environment

Copy

```
export LANGSMITH_TRACING=true
export LANGSMITH_API_KEY=<your-api-key>
# This example uses OpenAI, but you can use any LLM provider of choice
export OPENAI_API_KEY=<your-openai-api-key>
# For LangSmith API keys linked to multiple workspaces, set the LANGSMITH_WORKSPACE_ID environment variable to specify which workspace to use.
export LANGSMITH_WORKSPACE_ID=<your-workspace-id>
```

If you are using LangChain.js with LangSmith and are not in a serverless environment, we also recommend setting the following explicitly to reduce latency:`export LANGCHAIN_CALLBACKS_BACKGROUND=true`If you are in a serverless environment, we recommend setting the reverse to allow tracing to finish before your function ends:`export LANGCHAIN_CALLBACKS_BACKGROUND=false`See [this LangChain.js guide](https://js.langchain.com/docs/how_to/callbacks_serverless) for more information.

### 

[​

](#3-log-a-trace)

3\. Log a trace

Once you’ve set up your environment, you can call LangChain runnables as normal. LangSmith will infer the proper tracing config:

Python

TypeScript

Copy

```
from typing import Literal
from langchain.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain.tools import tool
from langgraph.prebuilt import ToolNode
from langgraph.graph import StateGraph, MessagesState

@tool
def search(query: str):
    """Call to surf the web."""
    if "sf" in query.lower() or "san francisco" in query.lower():
        return "It's 60 degrees and foggy."
    return "It's 90 degrees and sunny."

tools = [search]
tool_node = ToolNode(tools)

model = ChatOpenAI(model="gpt-4o", temperature=0).bind_tools(tools)

def should_continue(state: MessagesState) -> Literal["tools", "__end__"]:
    messages = state['messages']
    last_message = messages[-1]
    if last_message.tool_calls:
        return "tools"
    return "__end__"

def call_model(state: MessagesState):
    messages = state['messages']
    # Invoking `model` will automatically infer the correct tracing context
    response = model.invoke(messages)
    return {"messages": [response]}

workflow = StateGraph(MessagesState)
workflow.add_node("agent", call_model)
workflow.add_node("tools", tool_node)
workflow.add_edge("__start__", "agent")
workflow.add_conditional_edges(
    "agent",
    should_continue,
)
workflow.add_edge("tools", 'agent')

app = workflow.compile()

final_state = app.invoke(
    {"messages": [HumanMessage(content="what is the weather in sf")]},
    config={"configurable": {"thread_id": 42}}
)

final_state["messages"][-1].content
```

An example trace from running the above code [looks like this](https://smith.langchain.com/public/10863294-ee79-484a-927f-0558230f1547/r): ![Trace tree for a LangGraph run with LangChain](https://mintcdn.com/langchain-5e9cc07a/4kN8yiLrZX_amfFn/langsmith/images/langgraph-with-langchain-trace.png?fit=max&auto=format&n=4kN8yiLrZX_amfFn&q=85&s=a589f14351fb48e721205d1e363753ea)

## 

[​

](#without-langchain)

Without LangChain

If you are using other SDKs or custom functions within LangGraph, you will need to [wrap or decorate them appropriately](/langsmith/annotate-code#use-traceable--traceable) (with the `@traceable` decorator in Python or the `traceable` function in JS, or something like e.g. `wrap_openai` for SDKs). If you do so, LangSmith will automatically nest traces from those wrapped methods. Here’s an example. You can also see this page for more information.

### 

[​

](#1-installation-2)

1\. Installation

Install the LangGraph library and the OpenAI SDK for Python and JS (we use the OpenAI integration for the code snippets below).

pip

yarn

npm

pnpm

Copy

```
pip install openai langsmith langgraph
```

### 

[​

](#2-configure-your-environment-2)

2\. Configure your environment

Copy

```
export LANGSMITH_TRACING=true
export LANGSMITH_API_KEY=<your-api-key>
# This example uses OpenAI, but you can use any LLM provider of choice
export OPENAI_API_KEY=<your-openai-api-key>
```

If you are using LangChain.js with LangSmith and are not in a serverless environment, we also recommend setting the following explicitly to reduce latency:`export LANGCHAIN_CALLBACKS_BACKGROUND=true`If you are in a serverless environment, we recommend setting the reverse to allow tracing to finish before your function ends:`export LANGCHAIN_CALLBACKS_BACKGROUND=false`See [this LangChain.js guide](https://js.langchain.com/docs/how_to/callbacks_serverless) for more information.

### 

[​

](#3-log-a-trace-2)

3\. Log a trace

Once you’ve set up your environment, [wrap or decorate the custom functions/SDKs](/langsmith/annotate-code#use-traceable--traceable) you want to trace. LangSmith will then infer the proper tracing config:

Python

TypeScript

Copy

```
import json
import openai
import operator
from langsmith import traceable
from langsmith.wrappers import wrap_openai
from typing import Annotated, Literal, TypedDict
from langgraph.graph import StateGraph

class State(TypedDict):
    messages: Annotated[list, operator.add]

tool_schema = {
    "type": "function",
    "function": {
        "name": "search",
        "description": "Call to surf the web.",
        "parameters": {
            "type": "object",
            "properties": {"query": {"type": "string"}},
            "required": ["query"],
        },
    },
}

# Decorating the tool function will automatically trace it with the correct context
@traceable(run_type="tool", name="Search Tool")
def search(query: str):
    """Call to surf the web."""
    if "sf" in query.lower() or "san francisco" in query.lower():
        return "It's 60 degrees and foggy."
    return "It's 90 degrees and sunny."

tools = [search]

def call_tools(state):
    function_name_to_function = {"search": search}
    messages = state["messages"]
    tool_call = messages[-1]["tool_calls"][0]
    function_name = tool_call["function"]["name"]
    function_arguments = tool_call["function"]["arguments"]
    arguments = json.loads(function_arguments)
    function_response = function_name_to_function[function_name](**arguments)
    tool_message = {
        "tool_call_id": tool_call["id"],
        "role": "tool",
        "name": function_name,
        "content": function_response,
    }
    return {"messages": [tool_message]}

wrapped_client = wrap_openai(openai.Client())

def should_continue(state: State) -> Literal["tools", "__end__"]:
    messages = state["messages"]
    last_message = messages[-1]
    if last_message["tool_calls"]:
        return "tools"
    return "__end__"

def call_model(state: State):
    messages = state["messages"]
    # Calling the wrapped client will automatically infer the correct tracing context
    response = wrapped_client.chat.completions.create(
        messages=messages, model="gpt-4o-mini", tools=[tool_schema]
    )
    raw_tool_calls = response.choices[0].message.tool_calls
    tool_calls = [tool_call.to_dict() for tool_call in raw_tool_calls] if raw_tool_calls else []
    response_message = {
        "role": "assistant",
        "content": response.choices[0].message.content,
        "tool_calls": tool_calls,
    }
    return {"messages": [response_message]}

workflow = StateGraph(State)
workflow.add_node("agent", call_model)
workflow.add_node("tools", call_tools)
workflow.add_edge("__start__", "agent")
workflow.add_conditional_edges(
    "agent",
    should_continue,
)
workflow.add_edge("tools", 'agent')

app = workflow.compile()

final_state = app.invoke(
    {"messages": [{"role": "user", "content": "what is the weather in sf"}]}
)

final_state["messages"][-1]["content"]
```

An example trace from running the above code [looks like this](https://smith.langchain.com/public/353f27da-c221-4b67-b9ec-ede3777f3271/r): ![Trace tree for a LangGraph run without LangChain](https://mintcdn.com/langchain-5e9cc07a/4kN8yiLrZX_amfFn/langsmith/images/langgraph-without-langchain-trace.png?fit=max&auto=format&n=4kN8yiLrZX_amfFn&q=85&s=abe0ae173d182563c343f6596e0ce4e2)

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/trace-with-langgraph.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.