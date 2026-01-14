# LangSmith tracing - custom

**Topic ID:** 1316
**Created:** 2025-08-22 12:34:57
**URL:** https://forum.langchain.com/t/1316

---

## Post #1 by @daniel
*Posted on 2025-08-22 12:34:57*

Hi,

I have a "weird’ case, where I would like to track/ trace token count in langsmith UI but not collect details such as content of request, input and output.

Is that possible to do be done with langsmith?

---

## Post #2 by @rahul-langchain
*Posted on 2025-08-22 21:01:10*

Hi! LangSmith allows masking inputs and outputs. You can see documentation [https://docs.smith.langchain.com/observability/how_to_guides/mask_inputs_outputs](here).

---

## Post #3 by @daniel
*Posted on 2025-08-23 19:44:23*

rahul-langchain:

here



Thank you for the reply,

I run similar setup to the one in the example, but in that case both I/O is hidden which is desired behavior but also token count is hiden - which isnt desired.

How do I fix that?


```
`import openai
from langsmith import Client
from langsmith.wrappers import wrap_openai

openai_client = wrap_openai(openai.Client())
langsmith_client = Client(
  hide_inputs=lambda inputs: {}, hide_outputs=lambda outputs: {}
)

# The trace produced will have its metadata present, but the inputs will be hidden
openai_client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"},
  ],
  langsmith_extra={"client": langsmith_client},
)

# The trace produced will not have hidden inputs and outputs
openai_client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"},
  ],
)

`
```

---

## Post #4 by @rahul-langchain
*Posted on 2025-08-25 19:02:52*

You can track OpenAI’s usage counts by sending the `usage_medata` field in the `metadata`, see documentation [https://docs.smith.langchain.com/observability/how_to_guides/log_llm_trace#provide-token-and-cost-information](here)!

---
