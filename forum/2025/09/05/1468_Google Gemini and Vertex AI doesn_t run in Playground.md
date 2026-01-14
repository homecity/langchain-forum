# Google Gemini and Vertex AI doesn't run in Playground

**Topic ID:** 1468
**Created:** 2025-09-05 15:16:54
**URL:** https://forum.langchain.com/t/1468

**Tags:** cloud, intro-to-langsmith

---

## Post #1 by @jamesbarney
*Posted on 2025-09-05 15:16:54*

Trying to evaluate prompts in LangSmith Playground with Gemini or Vertex AI. Vertex AI is configured with private keys. Google Gemini is configured with an API key.  The “start” button results in these failures

**Gemini (secrets configuration only allows GOOGLE_API_KEY):

`Unauthenticated('API keys are not supported by this API. Expected OAuth2 access token or other authentication credentials that assert a principal. See`** [https://cloud.google.com/docs/authentication](Authentication methods at Google  |  Google Cloud) **`')Traceback (most recent call last): File "/usr/local/lib/python3.11/site-packages/langchain_core/runnables/base.py", line 2321, in _atransform_stream_with_config File "/usr/local/lib/python3.11/site-packages/langchain_core/runnables/base.py", line 3413, in _atransform File "/usr/local/lib/python3.11/site-packages/langchain_core/runnables/base.py", line 5663, in atransform File "/usr/local/lib/python3.11/site-packages/langchain_core/runnables/base.py", line 1488, in atransform File "/usr/local/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py", line 615, in astream File "/usr/local/lib/python3.11/site-packages/langchain_google_genai/chat_models.py", line 1595, in _astream File "/usr/local/lib/python3.11/site-packages/langchain_google_genai/chat_models.py", line 271, in _achat_with_retry File "/usr/local/lib/python3.11/site-packages/tenacity/asyncio/__init__.py", line 189, in async_wrapped File "/usr/local/lib/python3.11/site-packages/tenacity/asyncio/__init__.py", line 111, in __call__ File "/usr/local/lib/python3.11/site-packages/tenacity/asyncio/__init__.py", line 153, in iter File "/usr/local/lib/python3.11/site-packages/tenacity/_utils.py", line 99, in inner File "/usr/local/lib/python3.11/site-packages/tenacity/__init__.py", line 418, in exc_check File "/usr/local/lib/python3.11/site-packages/tenacity/__init__.py", line 185, in reraise File "/usr/local/lib/python3.11/concurrent/futures/_base.py", line 449, in result return self.__get_result() ^^^^^^^^^^^^^^^^^^^ File "/usr/local/lib/python3.11/concurrent/futures/_base.py", line 401, in __get_result raise self._exception File "/usr/local/lib/python3.11/site-packages/tenacity/asyncio/__init__.py", line 114, in __call__ File "/usr/local/lib/python3.11/site-packages/langchain_google_genai/chat_models.py", line 262, in _achat_with_retry File "/usr/local/lib/python3.11/site-packages/langchain_google_genai/chat_models.py", line 255, in _achat_with_retry File "/usr/local/lib/python3.11/site-packages/google/api_core/retry/retry_unary_async.py", line 231, in retry_wrapped_func File "/usr/local/lib/python3.11/site-packages/google/api_core/retry/retry_unary_async.py", line 163, in retry_target File "/usr/local/lib/python3.11/site-packages/google/api_core/retry/retry_base.py", line 214, in _retry_error_helper File "/usr/local/lib/python3.11/site-packages/google/api_core/retry/retry_unary_async.py", line 158, in retry_target File "/usr/local/lib/python3.11/site-packages/google/api_core/grpc_helpers_async.py", line 178, in error_remapped_callable File "/usr/local/lib/python3.11/site-packages/google/api_core/grpc_helpers_async.py", line 79, in wait_for_connection google.api_core.exceptions.Unauthenticated: 401 API keys are not supported by this API. Expected OAuth2 access token or other authentication credentials that assert a principal. See`** [https://cloud.google.com/docs/authentication](Authentication methods at Google  |  Google Cloud) **`[reason: "CREDENTIALS_MISSING" domain: "``googleapis.com``" metadata { key: "method" value: "google.ai.generativelanguage.v1beta.GenerativeService.StreamGenerateContent" } metadata { key: "service" value: "``generativelanguage.googleapis.com``" } ]`**

**VertexAI:**

**`InvalidArgument('Unable to submit request because at least one contents field is required. Learn more:`** [https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini](Generate content with the Gemini API in Vertex AI  |  Generative AI on Vertex AI  |  Google Cloud) **`') Hint: AioRpcError: [/uploads/short-url/arYLFIqHYLxSnwJPOiFxsswYV2z.png?dl=1](image1461×683 88.3 KB)

---

## Post #2 by @avfranco-br
*Posted on 2025-09-15 15:04:57*

Hi [/u/jamesbarney](@jamesbarney), have you found a solution yet? I’m facing similar issue but with Huggingface models.

Thanks,

Alexandre

---
