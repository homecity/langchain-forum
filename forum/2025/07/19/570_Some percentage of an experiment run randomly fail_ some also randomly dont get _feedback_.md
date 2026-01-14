# Some percentage of an experiment run randomly fail, some also randomly dont get "feedback"

**Topic ID:** 570
**Created:** 2025-07-19 17:50:50
**URL:** https://forum.langchain.com/t/570

---

## Post #1 by @alonp99
*Posted on 2025-07-19 17:50:50*

The error presented on langsmith UI, run output gets:

“TypeError(”‘MockValSer’ object cannot be converted to ‘SchemaSerializer’")Traceback (most recent call last):

File “/usr/local/lib/python3.11/site-packages/langchain_core/runnables/base.py”, line 909, in ainvoke

File “/usr/local/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py”, line 400, in ainvoke

File “/usr/local/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py”, line 974, in agenerate_prompt

File “/usr/local/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py”, line 932, in agenerate

File “/usr/local/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py”, line 1100, in _agenerate_with_cache

File “/usr/local/lib/python3.11/site-packages/langchain_openai/chat_models/base.py”, line 1355, in _agenerate

File “/usr/local/lib/python3.11/site-packages/langchain_openai/chat_models/base.py”, line 3618, in _construct_lc_result_from_responses_api

File “/usr/local/lib/python3.11/site-packages/pydantic/main.py”, line 426, in model_dump

TypeError: ‘MockValSer’ object cannot be converted to ‘SchemaSerializer’"

and on the feedback column regardless of what happend in the output i see random occurrences of : “No feedback”

---

## Post #2 by @alonp99
*Posted on 2025-07-21 04:34:09*

It happens only with o4-mini

---
