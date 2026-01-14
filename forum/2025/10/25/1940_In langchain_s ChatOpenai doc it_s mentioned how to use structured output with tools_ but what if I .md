# In langchain's ChatOpenai doc it's mentioned how to use structured output with tools, but what if I just wanna use strucutured output, how do I do it?

**Topic ID:** 1940
**Created:** 2025-10-25 17:54:03
**URL:** https://forum.langchain.com/t/1940

**Tags:** python-help

---

## Post #1 by @saumya66
*Posted on 2025-10-25 17:54:03*

Here’s the provided piece of code for this, but my usecase is i just want to use the structured output feature of openai, using a pydantic class, how to do it. Link : [https://python.langchain.com/docs/integrations/chat/openai/#structured-output-and-tool-calls](ChatOpenAI | 🦜️🔗 LangChain)


```
`from langchain_openai import ChatOpenAI
from pydantic import BaseModel


def get_weather(location: str) -> None:
    """Get weather at a location."""
    return "It's sunny."


class OutputSchema(BaseModel):
    """Schema for response."""

    answer: str
    justification: str


llm = ChatOpenAI(model="gpt-4.1")

structured_llm = llm.bind_tools(
    [get_weather],
    response_format=OutputSchema,
    strict=True,
)

# Response contains tool calls:
tool_call_response = structured_llm.invoke("What is the weather in SF?")

# structured_response.additional_kwargs["parsed"] contains parsed output
structured_response = structured_llm.invoke(
    "What weighs more, a pound of feathers or a pound of gold?"
)
`
```

---

## Post #2 by @pawel-twardziak
*Posted on 2025-10-25 18:05:47*

hi [/u/saumya66](@saumya66)

tried this?


```
`structured_llm = llm.with_structured_output()

structured_llm_with_tools = llm.bind_tools(
    [get_weather],
    response_format=OutputSchema,
    strict=True,
)
`
```

Docs [https://python.langchain.com/docs/how_to/structured_output/#the-with_structured_output-method](How to return structured data from a model | 🦜️🔗 LangChain)

---

## Post #3 by @saumya66
*Posted on 2025-10-25 19:51:06*

so basically i don’t want tool call, just need structured output. thus don’t wanna try this as i guesss the main purpose of this way of doing things is calling some tools.

---

## Post #4 by @pawel-twardziak
*Posted on 2025-10-25 19:55:45*

hi [/u/saumya66](@saumya66)

definitely not, structured output is not only for tools - it is for any LLM call output you want to be structured.


```
`structured_llm = llm.with_structured_output()
`
```

When you build AI agents, you need structured output frequently.

---
