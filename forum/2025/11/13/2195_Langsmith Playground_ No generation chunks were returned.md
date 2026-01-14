# Langsmith Playground: No generation chunks were returned

**Topic ID:** 2195
**Created:** 2025-11-13 12:10:54
**URL:** https://forum.langchain.com/t/2195

---

## Post #1 by @betazeng
*Posted on 2025-11-13 12:10:54*

I am using langsmith playground to debug my prompt. I use OpenAI compatiable Endpoint, and set my  apikey in browser. When I start running, I got error as below:

**ValueError(‘No generation chunks were returned’)Traceback (most recent call last):

File “/usr/lib/python3.11/site-packages/langchain_core/runnables/base.py”, line 2383, in _atransform_stream_with_config

File “/usr/lib/python3.11/site-packages/langchain_core/runnables/base.py”, line 3443, in _atransform

File “/usr/lib/python3.11/site-packages/langchain_core/runnables/base.py”, line 5718, in atransform

File “/usr/lib/python3.11/site-packages/langchain_core/runnables/base.py”, line 1578, in atransform

File “/usr/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py”, line 709, in astream

ValueError: No generation chunks were returned**

PS:



My base_url belongs to the company’s intranet.



My api_key is definitely correct, because it works perfectly fine for me using the ChatOpenAI() SDK.



I deploy a local server used “langraph dev“, get a studio to use langsmith playground



this is my config:

[/uploads/short-url/e7Pa99Zs5KzWh8THRnr5h5TcAdt.png?dl=1](image1324×1440 81.3 KB)



What could be causing the request to fail?

---
