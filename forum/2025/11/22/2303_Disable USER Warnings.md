# Disable USER Warnings

**Topic ID:** 2303
**Created:** 2025-11-22 13:55:28
**URL:** https://forum.langchain.com/t/2303

**Tags:** python-help

---

## Post #1 by @pascalovrai
*Posted on 2025-11-22 13:55:28*

I import prompts from langsmith and then use them via langchain. I use the LLM settings from langsmith and get this warning:

C:\Users\freeb\AppData\Local\Programs\Python\Python313\Lib\json\decoder.py:344: UserWarning: WARNING! extra_headers is not default parameter.

extra_headers was transferred to model_kwargs.

Please confirm that extra_headers is what you intended.

obj, end = self.raw_decode(s, idx=_w(s, 0).end())

C:\Users\freeb\AppData\Local\Programs\Python\Python313\Lib\json\decoder.py:344: UserWarning: WARNING! response_format is not default parameter.

response_format was transferred to model_kwargs.

Please confirm that response_format is what you intended.

obj, end = self.raw_decode(s, idx=_w(s, 0).end())

C:\Users\freeb\PycharmProjects\popeia.venv\Lib\site-packages\pydantic\v1\main.py:1048: UserWarning: LangSmith now uses UUID v7 for run and trace identifiers. This warning appears when passing custom IDs. Please use: from langsmith import uuid7

id = uuid7()

---

## Post #2 by @hefeng6500
*Posted on 2025-11-24 12:37:40*

update your langsmith version to latest

---

## Post #3 by @pascalovrai
*Posted on 2025-11-24 19:23:12*

Thanks, that did get rid of the error. Now I have a new one which still appears:

UserWarning: WARNING! top_p is not default parameter.

top_p was transferred to model_kwargs.

Please confirm that top_p is what you intended.

obj, end = self.raw_decode(s, idx=_w(s, 0).end())

Do you have a solution for that as well?

---

## Post #4 by @pawel-twardziak
*Posted on 2025-11-24 19:47:55*

How do you call the LLM with top_p?

---
