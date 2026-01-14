# How to use MiddleWare after_model

**Topic ID:** 2301
**Created:** 2025-11-22 02:37:05
**URL:** https://forum.langchain.com/t/2301

**Tags:** python-help

---

## Post #1 by @soiam2014
*Posted on 2025-11-22 02:37:05*

i am using after_model for summary messagses, but dont use summary for next model calls, now I am confused.

I have a class CustomSummaryMiddleware(SummarizationMiddleware)

At first I return messages in after_model with summary like, return {

“messages”: messages,

“summary”: summary_message,

“should_summarize”: True

}

but chunk can only get messages without summary.

I think it may only get messages, so I put summary messages to “messages”, like return {

“messages”: [*preserved_messages, *summary_messages],

}

but it has problem, I found that the model only try once and then exit. why?

---

## Post #2 by @heisenberg-7
*Posted on 2025-11-22 10:12:57*

Hi  [/u/soiam2014](@soiam2014) Can you please some snippets of what you are implementing?

---
