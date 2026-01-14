# React agent into langgraph workflow

**Topic ID:** 1685
**Created:** 2025-09-29 15:36:55
**URL:** https://forum.langchain.com/t/1685

**Tags:** python-help

---

## Post #1 by @riccardofresi
*Posted on 2025-09-29 15:36:55*

Hi Experts!

hi create a workflow based on react agent and i just testing with mock tools


```
`##sample agent function
def DecisionAgent(model=None):
    if model is None:
        model = get_llm()
    agent = create_react_agent(
        model=model,
        tools=tools,
        prompt=prompt
    )
    return agent
`
```


```
`#main graph definition

class State(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    remaining_steps: NotRequired[RemainingSteps]
    
graph_builder = StateGraph(State)

def conditional_edge(state: State) -> Literal["Scenario", "Promotion"]:
    last_message = state["messages"][-1].content if state["messages"] else ""
    if last_message == "retry":
        return "Scenario"
    return "Promotion"

#EVERY NODE IS A REACT AGENT
graph_builder.add_node("Scenario", ScenarioAgent)
graph_builder.add_node("Execution", ExecutionAgent)
graph_builder.add_node("Analysis", AnalysisAgent)
graph_builder.add_node("Decision", DecisionAgent)
graph_builder.add_node("Promotion", PromotionAgent)

graph_builder.add_edge(START, "Scenario")
graph_builder.add_edge("Scenario", "Execution")
graph_builder.add_edge("Execution", "Analysis")
graph_builder.add_edge("Analysis", "Decision")

graph_builder.add_conditional_edges("Decision", conditional_edge)
graph_builder.add_edge("Promotion", END)


app = graph_builder.compile()
`
```

from output seems that every node react just to the human message

Human

hi, how’s going?

AI

Hi, This is the Scenario agent. I used the following tool:


None And this is my Answer: I’m just a program, but I’m here to help you! How can I assist you today?

AI

Hi, This is the Execution agent. I used the following tool:


None And this is my Answer: I’m doing well, thank you! How can I assist you today?

AI

Hi, This is the Analysis agent. I used the following tool:


None And this is my Answer: I’m just a program, but I’m here to help you! How can I assist you today?

…..

it’s just an impression? There is something wrong on agent or workflow definition?

---

## Post #2 by @heisenberg-7
*Posted on 2025-09-30 15:01:24*

Hi [/u/riccardofresi](@riccardofresi) , What is the expectation here?

I tried your graph, Below is compiled state graph where each node is a react agent (also a compiled state graph which can make multiple LLM calls, until it feels that a valid response is available ). This seems like a simple parent-subgraph architecture.

[/uploads/short-url/niogUgDttPuY25VuWx55igReXlu.png?dl=1](image991×598 34.1 KB)

Code:


```
`from typing import NotRequired, TypedDict, Literal, Annotated, Sequence
from langgraph.graph import START, END, StateGraph, add_messages
from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.prebuilt import create_react_agent

def DecisionAgent(model=None, tools=[]):
    if model is None:
        model = llm
    agent = create_react_agent(
        model=model,
        tools=tools,
    )
    return agent

def ScenarioAgent(model=None, tools=[]):
    if model is None:
        model = llm
    agent = create_react_agent(
        model=model,
        tools=tools,
    )
    return agent

def ExecutionAgent(model=None, tools=[]):
    if model is None:
        model = llm
    agent = create_react_agent(
        model=model,
        tools=tools,
    )
    return agent

def AnalysisAgent(model=None, tools=[]):
    if model is None:
        model = llm
    agent = create_react_agent(
        model=model,
        tools=tools,
    )
    return agent

def PromotionAgent(model=None, tools=[]):
    if model is None:
        model = llm
    agent = create_react_agent(
        model=model,
        tools=tools,
    )
    return agent

class State(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    
graph_builder = StateGraph(State)

def conditional_edge(state: State) -> Literal["Scenario", "Promotion"]:
    last_message = state["messages"][-1].content if state["messages"] else ""
    print("last_message in conditional_edge:", last_message)
    if last_message == "retry":
        return "Scenario"
    return "Promotion"

#EVERY NODE IS A REACT AGENT
graph_builder.add_node("Scenario", ScenarioAgent())
graph_builder.add_node("Execution", ExecutionAgent())
graph_builder.add_node("Analysis", AnalysisAgent())
graph_builder.add_node("Decision", DecisionAgent())
graph_builder.add_node("Promotion", PromotionAgent())

graph_builder.add_edge(START, "Scenario")
graph_builder.add_edge("Scenario", "Execution")
graph_builder.add_edge("Execution", "Analysis")
graph_builder.add_edge("Analysis", "Decision")

graph_builder.add_conditional_edges("Decision", conditional_edge)
graph_builder.add_edge("Promotion", END)


app = graph_builder.compile()
`
```

On executing below


```
`for msg in app.stream({"messages": [HumanMessage(content="hi, how’s going?")]}, stream_mode="updates"):
    print(msg)
`
```

Response (As expected), it followed path Scenario → Execution → Analysis → Decision → Promotion

At each node, 1 LLM call was made and AIMessage added to the state passed to next agent in graph execution flow, Each Node have 1 additional AIMessage than previous in response.

**It checked for last message at decision, since it was not “retry” it forwarded to Promotion agent**


```
`--- Node: Scenario ---
================================ Human Message =================================

hi, how’s going?
================================== Ai Message ==================================

Hello! I’m doing well, thanks for asking. How can I help you today?


--- Node: Execution ---
================================ Human Message =================================

hi, how’s going?
================================== Ai Message ==================================

Hello! I’m doing well, thanks for asking. How can I help you today?
================================== Ai Message ==================================

I’m here and ready to help! What can I do for you today?


--- Node: Analysis ---
================================ Human Message =================================

hi, how’s going?
================================== Ai Message ==================================

Hello! I’m doing well, thanks for asking. How can I help you today?
================================== Ai Message ==================================

I’m here and ready to help! What can I do for you today?
================================== Ai Message ==================================

Hi there! I’d love to help—could you tell me a bit more about what you need? For example, I can help with:

• Writing or editing emails, essays, reports  
• Summarizing or explaining documents or articles  
• Translating text between languages  
• Brainstorming ideas or outlining plans  
• Answering questions or doing research  
• Writing or debugging code  

Just let me know what you’re looking for, and we’ll get started!


last_message in conditional_edge: Hi there! I’m doing well—thanks for asking. What can I help you with today?  
Here are a few examples of what I can do:  
• Write, edit or proofread emails, essays, reports, etc.  
• Summarize or explain articles and documents  
• Translate text between languages  
• Brainstorm ideas or outline plans  
• Research topics and answer questions  
• Write or debug code in various programming languages  

Feel free to tell me more about your needs, and we’ll get started!
--- Node: Decision ---
================================ Human Message =================================

hi, how’s going?
================================== Ai Message ==================================

Hello! I’m doing well, thanks for asking. How can I help you today?
================================== Ai Message ==================================

I’m here and ready to help! What can I do for you today?
================================== Ai Message ==================================

Hi there! I’d love to help—could you tell me a bit more about what you need? For example, I can help with:

• Writing or editing emails, essays, reports  
• Summarizing or explaining documents or articles  
• Translating text between languages  
• Brainstorming ideas or outlining plans  
• Answering questions or doing research  
• Writing or debugging code  

Just let me know what you’re looking for, and we’ll get started!
================================== Ai Message ==================================

Hi there! I’m doing well—thanks for asking. What can I help you with today?  
Here are a few examples of what I can do:  
• Write, edit or proofread emails, essays, reports, etc.  
• Summarize or explain articles and documents  
• Translate text between languages  
• Brainstorm ideas or outline plans  
• Research topics and answer questions  
• Write or debug code in various programming languages  

Feel free to tell me more about your needs, and we’ll get started!


--- Node: Promotion ---
================================ Human Message =================================

hi, how’s going?
================================== Ai Message ==================================

Hello! I’m doing well, thanks for asking. How can I help you today?
================================== Ai Message ==================================

I’m here and ready to help! What can I do for you today?
================================== Ai Message ==================================

Hi there! I’d love to help—could you tell me a bit more about what you need? For example, I can help with:

• Writing or editing emails, essays, reports  
• Summarizing or explaining documents or articles  
• Translating text between languages  
• Brainstorming ideas or outlining plans  
• Answering questions or doing research  
• Writing or debugging code  

Just let me know what you’re looking for, and we’ll get started!
================================== Ai Message ==================================

Hi there! I’m doing well—thanks for asking. What can I help you with today?  
Here are a few examples of what I can do:  
• Write, edit or proofread emails, essays, reports, etc.  
• Summarize or explain articles and documents  
• Translate text between languages  
• Brainstorm ideas or outline plans  
• Research topics and answer questions  
• Write or debug code in various programming languages  

Feel free to tell me more about your needs, and we’ll get started!
================================== Ai Message ==================================

Hi there! I’m doing well, thanks for asking. What can I help you with today?

`
```

---

## Post #3 by @riccardofresi
*Posted on 2025-09-30 16:40:04*

heisenberg-7:

At each node, 1 LLM call was made and AIMessage added to the state passed to next agent in graph execution flow, Each Node have 1 additional AIMessage then previous in response.



i can live with that, but i have a doubt, each node responde based on last aimessage only or based on all messages? cause i think if the last node take all messages could (maybe) have wrong beavoiur

sample: I add same tool to each node (moltiple a number by 2)

i expect ehac node take the user input and moltiply last node result x2. some times it get correct but majority of the times it make wrong guess, taking maybe the user message again

---

## Post #4 by @heisenberg-7
*Posted on 2025-10-01 04:36:38*

I think it depends on the Prompt you are invoking your graph with. Also if you want more control how each Node behave add them as a function maybe → Do other preprocessing then use agent in same function and return state to next node.

Something like below:


```
`agent = create_react_agent(
    model=llm,
    tools=[add, multiply],
    name="test_agent",
    prompt="You are a test agent. Always use one tool at a time."
)

class State(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]

def graph_node_1(state: State):
    global agent
    response = agent.invoke(state)
    print(f"response: {response}")
    return Command(update={"messages": response}, goto="graph_node_2")

def graph_node_2(state: State):
    print("state in node 2", state)
    return state


builder = StateGraph(State)
builder.add_node(graph_node_1)
builder.add_node(graph_node_2)
builder.add_edge(START, "graph_node_1")
builder.add_edge("graph_node_1", "graph_node_2")
graph = builder.compile(name="test_graph")

graph.invoke({"messages": [HumanMessage(content="Hello")]})
`
```

---

## Post #5 by @riccardofresi
*Posted on 2025-10-02 09:33:25*

heisenberg-7:

`graph.invoke({"messages": [HumanMessage(content="Hello")]})`



i just want to concatenate agent as subgraph, to test capabilities.as final test


```
`def add_numbers(a: int, b: int) -> int:
    """Add two numbers together"""
    return a + b

agent1 = create_agent(
    model = llm,
    tools = [add_numbers],
    prompt = "Take last message, use number result and add 10, use tool ONCE THEN COME BACK TO USER"
)

agent2 = create_agent(
    model = llm,
    tools = [add_numbers],
    prompt = "Take last message, use number result and add 10, use tool ONCE THEN COME BACK TO USER"
)

agent3 = create_agent(
    model = llm,
    tools = [add_numbers],
    prompt = "Take last message, use number result and add 10, use tool ONCE THEN COME BACK TO USER"
)
`
```


```
`class State(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    
graph_builder = StateGraph(State)

graph_builder.add_node("Scenario", agent1)
graph_builder.add_node("Execution", agent2)
graph_builder.add_node("Analysis", agent3)

graph_builder.add_edge(START, "Scenario")
graph_builder.add_edge("Scenario", "Execution")
graph_builder.add_edge("Execution", "Analysis")
graph_builder.add_edge("Analysis", END)

app = graph_builder.compile()

`
```


```
`

Update from subgraph Scenario:
Update from node agent:
================================== Ai Message ==================================
Tool Calls:
  add_numbers (call_Jh3sMdfpw8DZFrrkyx7ZAC4f)
 Call ID: call_Jh3sMdfpw8DZFrrkyx7ZAC4f
  Args:
    a: 2
    b: 10


Update from subgraph Scenario:
Update from node tools:
================================= Tool Message =================================
Name: add_numbers

12


Update from subgraph Scenario:
Update from node agent:
================================== Ai Message ==================================

2 + 10 = 12.


Update from subgraph Execution:
Update from node agent:
================================== Ai Message ==================================

Starting number 2; after adding 10 the result is 12. Would you like to add another number or do a different operation?


Update from subgraph Analysis:
Update from node agent:
================================== Ai Message ==================================

Starting with 2, adding 10 gives 12. What would you like to do next — add another number, use a different operation, or something else?
`
```

it works 3 out of 10 times…i don’t get the reason

---

## Post #6 by @heisenberg-7
*Posted on 2025-10-03 06:26:39*

I believe what you are trying to achieve could be done in multiple ways, I have tried like below:

Code: (Worked 5/5)


```
`from langchain_core.messages import SystemMessage

@tool(return_direct=True)
def add_numbers(a: int, b: int) -> int:
    """Add two numbers together"""
    return a + b

class State(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]

def get_last_message(state: State):
    system_message = SystemMessage(content=f"You are a helpful assistant. Take input from {state["messages"][-1].content} and add 10. Call tool only once")
    return [system_message]

agent1 = create_react_agent(
    model = llm,
    tools = [add_numbers],
    prompt = get_last_message
)

agent2 = create_react_agent(
    model = llm,
    tools = [add_numbers],
    prompt = get_last_message
)

agent3 = create_react_agent(
    model = llm,
    tools = [add_numbers],
    prompt = get_last_message
)

graph_builder = StateGraph(State)

graph_builder.add_node("Scenario", agent1)
graph_builder.add_node("Execution", agent2)
graph_builder.add_node("Analysis", agent3)

graph_builder.add_edge(START, "Scenario")
graph_builder.add_edge("Scenario", "Execution")
graph_builder.add_edge("Execution", "Analysis")
graph_builder.add_edge("Analysis", END)

app = graph_builder.compile()

for msg in app.stream({"messages": [HumanMessage(content="Number 5")]}, stream_mode="updates"):
   for key in msg:
        print(f"--- Node: {key} ---")
        for m in msg[key]["messages"]:
            m.pretty_print()
        print("\n")
        print("-----------------------------------------------------------")
`
```

Response:


```
`--- Node: Scenario ---
================================e[1m Human Message e[0m=================================

Number 5
==================================e[1m Ai Message e[0m==================================
Tool Calls:
  add_numbers (call_HVrTSDGOQ7dLFpzTGBcCY9lY)
 Call ID: call_HVrTSDGOQ7dLFpzTGBcCY9lY
  Args:
    a: 5
    b: 10
=================================e[1m Tool Message e[0m=================================
Name: add_numbers

15


-----------------------------------------------------------
--- Node: Execution ---
================================e[1m Human Message e[0m=================================

Number 5
==================================e[1m Ai Message e[0m==================================
Tool Calls:
  add_numbers (call_HVrTSDGOQ7dLFpzTGBcCY9lY)
 Call ID: call_HVrTSDGOQ7dLFpzTGBcCY9lY
  Args:
    a: 5
    b: 10
=================================e[1m Tool Message e[0m=================================
Name: add_numbers

15
==================================e[1m Ai Message e[0m==================================
Tool Calls:
  add_numbers (call_nPCyDznXLkDsUfHqUzo3SnBn)
 Call ID: call_nPCyDznXLkDsUfHqUzo3SnBn
  Args:
    a: 15
    b: 10
=================================e[1m Tool Message e[0m=================================
Name: add_numbers

25


-----------------------------------------------------------
--- Node: Analysis ---
================================e[1m Human Message e[0m=================================

Number 5
==================================e[1m Ai Message e[0m==================================
Tool Calls:
  add_numbers (call_HVrTSDGOQ7dLFpzTGBcCY9lY)
 Call ID: call_HVrTSDGOQ7dLFpzTGBcCY9lY
  Args:
    a: 5
    b: 10
=================================e[1m Tool Message e[0m=================================
Name: add_numbers

15
==================================e[1m Ai Message e[0m==================================
Tool Calls:
  add_numbers (call_nPCyDznXLkDsUfHqUzo3SnBn)
 Call ID: call_nPCyDznXLkDsUfHqUzo3SnBn
  Args:
    a: 15
    b: 10
=================================e[1m Tool Message e[0m=================================
Name: add_numbers

25
==================================e[1m Ai Message e[0m==================================
Tool Calls:
  add_numbers (call_KtpTeuQCC0p1HLQO5jx7m5iv)
 Call ID: call_KtpTeuQCC0p1HLQO5jx7m5iv
  Args:
    a: 25
    b: 10
=================================e[1m Tool Message e[0m=================================
Name: add_numbers

35


-----------------------------------------------------------
`
```

---

## Post #7 by @riccardofresi
*Posted on 2025-10-03 07:34:04*

that is very interesting!!

i think this is a very elegant solution, basically you force to consider just the last message.

i think you got the point:


use agent as node but NOT a node that invoke an agent (the code is much more readable)
because of 1. you customize the prompt using the state and the last message in it to provide the right content to the agent

thank you so much!

I will come back with other question in the future

---

## Post #8 by @system
*Posted on 2025-10-03 19:34:27*

This topic was automatically closed 12 hours after the last reply. New replies are no longer allowed.

---
