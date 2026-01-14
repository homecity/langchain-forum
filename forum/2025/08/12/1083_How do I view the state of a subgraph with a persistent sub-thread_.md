# How do I view the state of a subgraph with a persistent sub-thread?

**Topic ID:** 1083
**Created:** 2025-08-12 05:20:29
**URL:** https://forum.langchain.com/t/1083

**Tags:** langsmith-studio

---

## Post #1 by @aerickson-clt
*Posted on 2025-08-12 05:20:29*

I am working on a system that creates sub-threads between parts of the parent graph and a sub-graph.  The sub-graph is responsible for the state of the sub-thread, for the purpose of modularity.  When I run this graph in LangGraph Studio the subgraph node does not expand when I click it.  The graph otherwise does what I expect it to.  It handles a multi-turn conversation (with a doorknob) in the parent graph and the sub-graph in LangGraph Studio.  My final state is shown below after 2 messages sent.

[/uploads/short-url/9TIXgtxAXuzeQN34N3CZ6AgwduM.png?dl=1](image812×477 35 KB)

Notably, if I use`subgraph = subgraph_builder.compile()`, then I *can* expand the subgraph but the output is wrong because the subgraph is not accumulating messages.

As an aside, if I invoke with subgraph = subgraph_builder.compile(checkpointer=False) I find that the node_1 does not appear as a subgraph at all in LangGraph Studio, but instead only as a regular node.  This might be intended behaviour, as the docs indicate I should use checkpointer=None instead of False, but it’s a bit weird that False doesn’t also work here.

Test code below.


```
`from langgraph.graph.state import StateGraph, START
from langgraph.graph import MessagesState


def subgraph_node_1(state: MessagesState):
    all_messages = ", ".join([m.content for m in state["messages"]])
    return {"messages": [{"role": "assistant",
                           "content":
                           "subgraph_node_1:"
                           + all_messages}]}

subgraph_builder = StateGraph(MessagesState)
subgraph_builder.add_node(subgraph_node_1)
subgraph_builder.add_edge(START, "subgraph_node_1")
subgraph = subgraph_builder.compile(checkpointer=True)

def node_1(state: MessagesState):
    response = subgraph.invoke({"messages": 
                                [{"role": "user", "content": 
                                  f"Msg for subgraph: {state['messages'][-1].content}"}]})
    return {"messages": "node_1 invoked subgraph, response: "
            + response["messages"][-1].content}


builder = StateGraph(MessagesState)
builder.add_node("node_1", node_1)
builder.add_edge(START, "node_1")
graph = builder.compile()
`
```

---

## Post #2 by @Isaac
*Posted on 2025-08-12 18:39:49*

Hi [/u/aerickson-clt](@aerickson-clt) -  I have a few questions:



By ‘sub thread’ do you mean a separate LangSmith thread? Or something else



When you use `checkpointer=None` and turn up the detail in the studio to the max level you still can’t expand it?

---

## Post #3 by @aerickson-clt
*Posted on 2025-08-13 14:56:23*

Thanks for your reply.  I’ll clarify thread:  I want my user to have a multi-turn interaction with the parent graph, which I would call the parent thread.  I think this matches LangGraph’s definitions of turn and thread, in that each turn is one run through the graph, and the thread effectively the preservations of state across those turns, associated by a thread id.

In each parent-turn, a user agent in the parent graph can have a multi-(sub)turn interaction with a specialized sub-agent, which is tracked in the sub-agent’s state, and these turns are runs throughs of the sub-agent.  This is what I call the sub-thread.  Furthermore, the sub-thread should persist across turns of the parent graph.

From a user’s perspective, they can have a multi-turn persistent conversation with the user agent, and the user agent can represent the user to a specialized sub-agent in its own multi-turn persistent conversation.

”When you use `checkpointer=None` and turn up the detail in the studio to the max level you still can’t expand it?” - I’ll try this again a bit later, but I don’t remember this making a difference.

Importantly, we need the sub-agent to be able to run independently of the parent graph (hence its own state schema).

I did find a workaround, however, and that is to copy the Subgraph’s state to the parent graph.  This is OK because the sub-graph can continue to be agnostic of the parent, while the parent’s state object has a copy of the sub-graph state.  I created an annotated example for my team and have included that below in case it is helpful to others.


```
`# This is an annotated example of some features of graph state and subgraphs in LangGraph.
# To use it, add the graphs to the langgraph.json file with 
# "commented_example_1_parent_graph": "./src/graphs/commented_examples/commented_example_1_graph.py:graph",
# "commented_example_1_subgraph": "./src/graphs/commented_examples/commented_example_1_graph.py:subgraph",

# StateGraph is the class that is used to create the graph.
from langgraph.graph.state import StateGraph, START
# MessagesState is just a convenience class with a messages key. i.e.,
# class MessagesState(TypedDict):
#     messages: Annotated[list[AnyMessage], add_messages]
from langgraph.graph import MessagesState 
# Annotated is normally used to annotate a type with a metadata, but LangGraphs
# abuses to declare reducer functions that are applied to partial state updates
# returned from nodes.
from typing import Annotated, operator
from langchain_core.messages import AnyMessage


class ParentGraphState(MessagesState):
    # We copy subgraph state to the parent graph state so that
    # we don't have to keep track of multiple state objects for
    # single thread.  The subgraph has its own state schema so that
    # the subgraph can be invoked independently of the parent graph.
    subgraph_state_copy: list[AnyMessage]
    # Other properties we can observe when running this example.
    extra_property: str
    another_list: Annotated[list[str], operator.add]

def subgraph_node_1(state: MessagesState):
    # In certain cases I have been unable to view the subgraph's state
    # so this cumulative message list is a way to expose it after the run is finished.
    all_messages = ", ".join([m.content for m in state["messages"]])
    return {"messages": [{"role": "assistant", "content": "subgraph_node_1:" + all_messages}]}

# The subgraph's state type is MessagesState.
subgraph_builder = StateGraph(MessagesState)
subgraph_builder.add_node(subgraph_node_1)
subgraph_builder.add_edge(START, "subgraph_node_1")
# Note that if you invoke with .compile(checkpointer=True), the subgraph
# becomes unexpandable in LangGraph Studio.  This is why we are tracking
# the thread's state in the parent graph and passing it into the subgraph
# as a fresh run (no thread).  See this forum thread
# https://forum.langchain.com/t/how-do-i-view-the-state-of-a-subgraph-with-a-persistent-sub-thread/1083
subgraph = subgraph_builder.compile()

# It's very important to pass the right State type to the parent graph's node.
# If you do not do this and you pass MessagesState instead,
# then LangGraph Studio will not remember any properties other than messages between runs.
def node_1(state: ParentGraphState):
    if "subgraph_state_copy" not in state:
        # Pylance thinks this code is unreachable, but it's not.
        state["subgraph_state_copy"] = []
    subgraph_input_state = state["subgraph_state_copy"] + [
        {"role": "user", "content": f"Msg for subgraph: {state['messages'][-1].content}"}
    ]
    response = subgraph.invoke({"messages": subgraph_input_state})

    return {
        # Since messages has a reducer, this actually appends to the messages list.
        # Furthermore, the "add_messages" reducer interprets a plain string
        # as a human message, this this will appear as a human message instead of
        # an assistant message.
        "messages": "node_1 invoked subgraph, response: "
            + response["messages"][-1].content,
            # Since subgraph_state_copy has no reducer, this will replace the list
            # with the output from the subgraph, which is its complete state,
            # rather than the subgraph's state update returned by subgraph_node_1.
            "subgraph_state_copy": response["messages"],
            # Since another_list has a reducer, this will add to the list
            "another_list": [state['messages'][-1].content],
            # Since extra_property has no reducer, this will replace the string
            "extra_property": state['messages'][-1].content}


builder = StateGraph(ParentGraphState)
builder.add_node("node_1", node_1)
builder.add_edge(START, "node_1")
graph = builder.compile()
`
```

---
