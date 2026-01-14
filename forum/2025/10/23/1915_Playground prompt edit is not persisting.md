# Playground prompt edit is not persisting

**Topic ID:** 1915
**Created:** 2025-10-23 19:04:26
**URL:** https://forum.langchain.com/t/1915

---

## Post #1 by @Mardu
*Posted on 2025-10-23 19:04:26*

I have a multi-message prompt in the playground that I created from a thread in my tracing project. When I edit any of the messages in my prompt, it does not take effect when I run it with the “Start” button. As if the UI allows me to edit the messages in the prompt, but the original payload is being sent to the LLM. When I look at my traces for that my playground calls, I see that is exactly the case.

Additionally, when saving this prompt as a new prompt, then editing the messages, and saving it again, I get the following UI error:

“error”:“Nothing to commit: prompt has not changed since latest commit”} {“commit”:{“commit_hash”:“”,“manifest”:{“lc”:1,“type”:“constructor”,“id”:[“langsmith”,“playground”,“PromptPlayground”],“kwargs”:{“first”:{“lc”:1,“type”:“constructor”,“id”:[“langchain”,“prompts”,“chat”,“ChatPromptTemplate”],“kwargs”:{“messages”:[{“lc”:1,“type”:“constructor”,“id”:[“langchain”,“schema”,“messages”,“SystemMessage”],“kwargs”:{“content”:….}

Tried on Chrome and Safari. Reloaded cache. Diffirent network connections also.

---
