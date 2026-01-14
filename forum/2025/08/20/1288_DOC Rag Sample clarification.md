# DOC Rag Sample clarification

**Topic ID:** 1288
**Created:** 2025-08-20 20:19:39
**URL:** https://forum.langchain.com/t/1288

**Tags:** intro-to-langgraph, product-feedback

---

## Post #1 by @epdurai
*Posted on 2025-08-20 20:19:39*

Hello. I was trying the sample provided here [https://python.langchain.com/docs/tutorials/qa_chat_history/](Build a Retrieval Augmented Generation (RAG) App: Part 2 |  LangChain)

There is one portion of this implementation which im unable to understand.


```
`# Step 1: Generate an AIMessage that may include a tool-call to be sent.
def query_or_respond(state: MessagesState):
    """Generate tool call for retrieval or respond."""
    llm_with_tools = llm.bind_tools([retrieve])
    response = llm_with_tools.invoke(state["messages"])
    # MessagesState appends messages to state instead of overwriting
    return {"messages": [response]}
`
```

Why do we need to use an LLM here? The graph is built with the necessary ToolsNode so passing llm with tools in this method seems redundant. The API design is hard to follow IMO or may be I am not following how to understand this.

Additionally, another issue is this method doesnt always look at the document and the decision of when it  makes a tool call(to search the documents) and when it doesnt, is totally left to the LLM. This makes for a very odd workflow. I faced the problem where LLM is not making the tool call randomly. In some cases, it does but in other cases it doesnt. When I added a system prompt here. It worked as expected. here is a version from my code,


```
`# Step 1: Generate an AIMessage that may include a tool-call to be sent.
def query_or_respond(state: MessagesState):
    """Generate tool call for retrieval or respond."""
    doc_search_llm_system_prompt = "Perform tool retrieval for all questions. Do not use your own knowledge or opinions." \
    "If there are no matches, its fine just dont return anything"
    llm_with_tools = llm.bind_tools([retrieve])
    response = llm_with_tools.invoke([SystemMessage(doc_search_llm_system_prompt)] + state["messages"])
    # MessagesState appends messages to state instead of overwriting
    return {"messages": [response]}
`
```

There is another LLM call which has its own system instructions. Shouldnt it hold this information as well or do we really need 2 instance of LLM invocations? I guess some concepts arent very clear to me so any help to understand better would be highly appreicated.

---
