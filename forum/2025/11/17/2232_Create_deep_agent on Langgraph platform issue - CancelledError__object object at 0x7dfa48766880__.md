# Create_deep_agent on Langgraph platform issue - CancelledError(<object object at 0x7dfa48766880>)

**Topic ID:** 2232
**Created:** 2025-11-17 08:44:26
**URL:** https://forum.langchain.com/t/2232

---

## Post #1 by @ameen7626
*Posted on 2025-11-17 08:44:26*

I’m encountering an error `CancelledError `(not frequent) and could use some advice on my specific deployment.

**Here is my setup:**



**Agent:** LangGraph agent (`create_deep_agent`) is deployed on the **LangSmith development server (free tier)**.



**UI:**  [https://github.com/langchain-ai/deep-agents-ui](deep-agent-ui) deployed on an **AWS EC2** instance. langgraph agent is connected to this UI using deployment url and api key



**The Problem:**

When the agent runs (triggered by the UI), its parallel steps call Azure OpenAI and I correctly get a `httpx.HTTPStatusError: 429 Too Many Requests`.

However, almost immediately after, the entire run fails with an `asyncio.exceptions.CancelledError`. It seems the `openai` client’s “sleep-to-retry” logic is being cancelled before it can complete. Most of the run is successful but some runs throw this error

**My Questions:**



Given this stack (UI → LangSmith → Azure), where is the `CancelledError` most likely coming from? Is it the LangSmith dev server timing out, or my UI client?



Does the **LangSmith development server** (free tier) have its own execution timeouts or concurrency limits that would cause it to kill a task that’s “sleeping” on a retry?



What is the most robust way to solve this? did I miss any configuration on the UI when the agent APIs are called



Full Error Trace log


```
`CancelledError()Traceback (most recent call last):


  File "/usr/local/lib/python3.11/site-packages/openai/_base_client.py", line 1574, in request
    response.raise_for_status()


  File "/usr/local/lib/python3.11/site-packages/httpx/_models.py", line 829, in raise_for_status
    raise HTTPStatusError(message, request=request, response=self)


httpx.HTTPStatusError: Client error '429 Too Many Requests' for url 'https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview'
For more information check: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429



During handling of the above exception, another exception occurred:



Traceback (most recent call last):


  File "/usr/local/lib/python3.11/site-packages/langgraph/_internal/_runnable.py", line 705, in ainvoke
    input = await asyncio.create_task(
            ^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langgraph/_internal/_runnable.py", line 473, in ainvoke
    ret = await self.afunc(*args, **kwargs)
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain/agents/factory.py", line 1129, in amodel_node
    response = await awrap_model_call_handler(request, _execute_model_async)
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain/agents/factory.py", line 265, in final_normalized
    final_result = await result(request, handler)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain/agents/factory.py", line 249, in composed
    outer_result = await outer(request, inner_handler)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain/agents/middleware/todo.py", line 220, in awrap_model_call
    return await handler(request)
           ^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain/agents/factory.py", line 245, in inner_handler
    inner_result = await inner(req, handler)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain/agents/factory.py", line 249, in composed
    outer_result = await outer(request, inner_handler)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/deepagents/middleware/filesystem.py", line 793, in awrap_model_call
    return await handler(request)
           ^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain/agents/factory.py", line 245, in inner_handler
    inner_result = await inner(req, handler)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain/agents/factory.py", line 249, in composed
    outer_result = await outer(request, inner_handler)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/deepagents/middleware/subagents.py", line 482, in awrap_model_call
    return await handler(request)
           ^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain/agents/factory.py", line 245, in inner_handler
    inner_result = await inner(req, handler)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain_anthropic/middleware/prompt_caching.py", line 140, in awrap_model_call
    return await handler(request)
           ^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain/agents/factory.py", line 1099, in _execute_model_async
    output = await model_.ainvoke(messages)
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain_core/runnables/base.py", line 5547, in ainvoke
    return await self.bound.ainvoke(
           ^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py", line 405, in ainvoke
    llm_result = await self.agenerate_prompt(
                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py", line 1112, in agenerate_prompt
    return await self.agenerate(
           ^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py", line 1032, in agenerate
    results = await asyncio.gather(
              ^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py", line 1280, in _agenerate_with_cache
    async for chunk in self._astream(messages, stop=stop, **kwargs):


  File "/usr/local/lib/python3.11/site-packages/langchain_openai/chat_models/azure.py", line 823, in _astream
    async for chunk in super()._astream(*args, **kwargs):


  File "/usr/local/lib/python3.11/site-packages/langchain_openai/chat_models/base.py", line 1457, in _astream
    response = await self.async_client.create(**payload)
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/openai/resources/chat/completions/completions.py", line 2603, in create
    return await self._post(
           ^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/openai/_base_client.py", line 1794, in post
    return await self.request(cast_to, opts, stream=stream, stream_cls=stream_cls)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/site-packages/openai/_base_client.py", line 1580, in request
    await self._sleep_for_retry(


  File "/usr/local/lib/python3.11/asyncio/tasks.py", line 649, in sleep
    return await future
           ^^^^^^^^^^^^


asyncio.exceptions.CancelledError: 
`
```

---

## Post #2 by @ameen7626
*Posted on 2025-11-17 09:41:37*

This is an error server log for a run as you can see backgroun run is interrupted


```
`11/17/2025, 12:03:38 PM Thread a7104e1e-205e-4711-ab1c-b4dacd120b1c interrupted.
11/17/2025, 12:03:38 PM Background run interrupted
11/17/2025, 12:03:38 PM Received interrupt signal
11/17/2025, 12:03:38 PM Client disconnected after 251.418887 seconds. Consider adjusting the client or network timeouts if this is unexpected.
11/17/2025, 12:03:04 PM Retrying request to /chat/completions in 58.000000 seconds
11/17/2025, 12:03:04 PM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 429 Too Many Requests"
11/17/2025, 12:03:02 PM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 200 OK"
11/17/2025, 12:02:04 PM Retrying request to /chat/completions in 58.000000 seconds
11/17/2025, 12:02:04 PM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 429 Too Many Requests"
11/17/2025, 12:02:02 PM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 200 OK"
11/17/2025, 12:01:02 PM Retrying request to /chat/completions in 59.000000 seconds
11/17/2025, 12:01:02 PM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 429 Too Many Requests"
11/17/2025, 12:01:01 PM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 200 OK"
11/17/2025, 12:00:01 PM Retrying request to /chat/completions in 59.000000 seconds
11/17/2025, 12:00:01 PM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 429 Too Many Requests"
11/17/2025, 12:00:00 PM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 200 OK"
11/17/2025, 11:59:27 AM Retrying request to /chat/completions in 32.000000 seconds
11/17/2025, 11:59:27 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 429 Too Many Requests"
11/17/2025, 11:59:26 AM Listening for cancellation
11/17/2025, 11:59:26 AM Starting background run
11/17/2025, 11:59:26 AM Joined run stream
11/17/2025, 11:59:26 AM Created run
`
```

This is a successful server log for a run


```
`11/17/2025, 11:30:54 AM Background run succeeded
11/17/2025, 11:30:53 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 200 OK"
11/17/2025, 11:30:09 AM Retrying request to /chat/completions in 43.000000 seconds
11/17/2025, 11:30:09 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 429 Too Many Requests"
11/17/2025, 11:29:53 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 200 OK"
11/17/2025, 11:28:52 AM Retrying request to /chat/completions in 60.000000 seconds
11/17/2025, 11:28:52 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 429 Too Many Requests"
11/17/2025, 11:28:51 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 200 OK"
11/17/2025, 11:27:51 AM Retrying request to /chat/completions in 59.000000 seconds
11/17/2025, 11:27:51 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 429 Too Many Requests"
11/17/2025, 11:27:50 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 200 OK"
11/17/2025, 11:26:52 AM Retrying request to /chat/completions in 58.000000 seconds
11/17/2025, 11:26:52 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 429 Too Many Requests"
11/17/2025, 11:26:50 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 200 OK"
11/17/2025, 11:25:51 AM Retrying request to /chat/completions in 58.000000 seconds
11/17/2025, 11:25:51 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 429 Too Many Requests"
11/17/2025, 11:25:50 AM HTTP Request: POST https://hum-dev.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview "HTTP/1.1 200 OK"
11/17/2025, 11:25:48 AM Listening for cancellation
11/17/2025, 11:25:48 AM Starting background run
11/17/2025, 11:25:48 AM Joined run stream
11/17/2025, 11:25:48 AM Created run
`
```

---
