# How can I pass conversation id when invoking OpenAi's Responses API with langchain?

**Topic ID:** 1935
**Created:** 2025-10-25 15:36:07
**URL:** https://forum.langchain.com/t/1935

**Tags:** python-help

---

## Post #1 by @saumya66
*Posted on 2025-10-25 15:36:07*

So if you see this using conversations api section here in this link of open ai docs. [https://platform.openai.com/docs/guides/conversation-state#using-the-conversations-api](https://platform.openai.com/docs/guides/conversation-state#using-the-conversations-api)

When we are calling the Responses api we can now pass a conversation id to maintain the context. I want to do the same using langchain while invoking as well is there a way to do so ?

Does langchain’s responses api support passing conversation id or not?

---

## Post #2 by @pawel-twardziak
*Posted on 2025-10-25 16:40:48*

Hi [/u/saumya66](@saumya66)

have you tried this? I assume you are asking for python and v1 

When using LangChain’s OpenAI Responses API integration, you can link turns via OpenAI’s conversation state features. In LangChain you do this by either:



Passing a previous response’s ID using previous_response_id, or



Passing an OpenAI conversation reference via the conversation field (mutually exclusive with previous_response_id).



How to do it in LangChain (Python)

Using previous_response_id (manual):


```
`
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4.1-mini", use_responses_api=True)

first = llm.invoke("Hi, I'm Bob.")

prev_id = first.response_metadata["id"] # OpenAI response id

second = llm.invoke("What is my name?", previous_response_id=prev_id)

print(second.text)

`
```

Using automatic chaining:


```
`
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4.1-mini", use_previous_response_id=True)

llm.invoke("Hi, I'm Bob.")

print(llm.invoke("What is my name?").text)

`
```

---

## Post #3 by @saumya66
*Posted on 2025-10-25 16:56:40*

thanks for reply [/u/pawel-twardziak](@pawel-twardziak) , i get the passing of previous_response_id but how to pass conversation id, did not find this in langchain docs.

---

## Post #4 by @pawel-twardziak
*Posted on 2025-10-25 17:48:48*

Hi [/u/saumya66](@saumya66)

then try this


```
`conversation = openai.conversations.create()
`
```


```
`llm = ChatOpenAI(
    model="gpt-4.1-mini",
    use_responses_api=True,
    model_kwargs={"conversation": conversation.id},
)
`
```

---

## Post #5 by @saumya66
*Posted on 2025-10-25 17:49:27*

sure thx

---

## Post #6 by @alamansari11
*Posted on 2025-12-02 07:10:16*

Hi Pawel,

automatic chain as in it will automatically pass the previous response id acrosss the graph or agents ?

suppose I have multi agents builts using create_agent from langchain I have developed supervisor pattern will it take the previous response id on its own ? I don’t need to pass it

---
