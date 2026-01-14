# Error Using Claude 3.7 Sonnet via Vertex AI on Playground UI

**Topic ID:** 235
**Created:** 2025-07-04 02:20:52
**URL:** https://forum.langchain.com/t/235

---

## Post #1 by @yu-2-saito
*Posted on 2025-07-04 02:20:52*

I have a question about the UI in Playgroud.

I’m trying to test Claude models in the Vertex AI Model on Google Cloud via the UI, but I’m encoutering errors.

Here’s the error I’m getting:

`AioRpcError: [/uploads/short-url/cvHk2ELudYrkryDrkgaUiL7OPw1.png?dl=1](スクリーンショット 2025-07-04 11.15.171780×1428 210 KB)

---

## Post #2 by @jacoblee93
*Posted on 2025-07-07 21:03:14*

Hi [/u/yu-2-saito](@yu-2-saito),

Will have a look at this this week. Thank you for reporting.

---

## Post #3 by @jacoblee93
*Posted on 2025-07-23 00:02:42*

Hi [/u/yu-2-saito](@yu-2-saito),

Apologies for the delay here. I’ve merged a fix improving our error messages here to better show what’s going on - this should go live today or tomorrow.

I was able to repro when my Vertex key didn’t have access to the Claude model, could you double check that?

Jacob

---

## Post #4 by @yu-2-saito
*Posted on 2025-07-25 07:34:09*

Hi [/u/jacoblee93](@jacoblee93)

Thanks for your reply.

Following up on your suggestion to re-select the model as shown, I encountered the following error.

The Vertex AI API Key is configured correctly, and models like `publishers/google/models/gemini-2.5-flash-lite` are responding normally. IAM and API enablement in Vertex AI are also confirmed, and requests in GCP Playground are successful.

Is there anything else we should check?


```
`InternalServerError('Internal error encountered.')Traceback (most recent call last):


  File "/usr/local/lib/python3.11/site-packages/google/api_core/grpc_helpers_async.py", line 77, in wait_for_connection


  File "/usr/local/lib/python3.11/site-packages/grpc/aio/_call.py", line 659, in wait_for_connection


  File "/usr/local/lib/python3.11/site-packages/grpc/aio/_call.py", line 272, in _raise_for_status


grpc.aio._call.AioRpcError: 



The above exception was the direct cause of the following exception:



Traceback (most recent call last):


  File "/usr/local/lib/python3.11/site-packages/langchain_core/runnables/base.py", line 2321, in _atransform_stream_with_config


  File "/usr/local/lib/python3.11/site-packages/langchain_core/runnables/base.py", line 3413, in _atransform


  File "/usr/local/lib/python3.11/site-packages/langchain_core/runnables/base.py", line 5663, in atransform


  File "/usr/local/lib/python3.11/site-packages/langchain_core/runnables/base.py", line 1488, in atransform


  File "/usr/local/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py", line 598, in astream


  File "/usr/local/lib/python3.11/site-packages/langchain_google_vertexai/chat_models.py", line 1924, in _astream


  File "/usr/local/lib/python3.11/site-packages/langchain_google_vertexai/chat_models.py", line 680, in _acompletion_with_retry


  File "/usr/local/lib/python3.11/site-packages/tenacity/_asyncio.py", line 88, in async_wrapped


  File "/usr/local/lib/python3.11/site-packages/tenacity/_asyncio.py", line 47, in __call__


  File "/usr/local/lib/python3.11/site-packages/tenacity/__init__.py", line 325, in iter


  File "/usr/local/lib/python3.11/site-packages/tenacity/__init__.py", line 158, in reraise


  File "/usr/local/lib/python3.11/concurrent/futures/_base.py", line 449, in result
    return self.__get_result()
           ^^^^^^^^^^^^^^^^^^^


  File "/usr/local/lib/python3.11/concurrent/futures/_base.py", line 401, in __get_result
    raise self._exception


  File "/usr/local/lib/python3.11/site-packages/tenacity/_asyncio.py", line 50, in __call__


  File "/usr/local/lib/python3.11/site-packages/langchain_google_vertexai/chat_models.py", line 673, in _completion_with_retry_inner


  File "/usr/local/lib/python3.11/site-packages/google/api_core/grpc_helpers_async.py", line 178, in error_remapped_callable


  File "/usr/local/lib/python3.11/site-packages/google/api_core/grpc_helpers_async.py", line 79, in wait_for_connection


google.api_core.exceptions.InternalServerError: 500 Internal error encountered.
`
```

[/uploads/short-url/xCG4I5qaREWMKyMAaVFy2aYp89l.jpeg?dl=1](スクリーンショット 2025-07-25 16.31.221920×933 108 KB)

Best regards.

---

## Post #5 by @jacoblee93
*Posted on 2025-07-26 01:17:37*

Hmm that is strange. I don’t think that error is coming from us, but it’s possible we’re passing additional parameters that Google doesn’t handle and they are throwing. Will flag.

---
