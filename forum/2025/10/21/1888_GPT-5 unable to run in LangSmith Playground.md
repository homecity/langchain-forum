# GPT-5 unable to run in LangSmith Playground

**Topic ID:** 1888
**Created:** 2025-10-21 16:04:25
**URL:** https://forum.langchain.com/t/1888

---

## Post #1 by @evnpoon
*Posted on 2025-10-21 16:04:25*

I was trying to test GPT-5 in the Playground when it was unable to provide an output due to top_p being an unsupported parameter in the request.



Error message
**BadRequestError(‘Error code: 400 - {\‘error\’: {\‘message\’: “Unsupported parameter: \‘top_p\’ is not supported with this model.”, \‘type\’: \‘invalid_request_error\’, \‘param\’: \‘top_p\’, \‘code\’: \‘unsupported_parameter\’}}’)Traceback (most recent call last):     File “/usr/lib/python3.11/site-packages/langchain_core/runnables/base.py”, line 2383, in _atransform_stream_with_config     File “/usr/lib/python3.11/site-packages/langchain_core/runnables/base.py”, line 3446, in _atransform     File “/usr/lib/python3.11/site-packages/langchain_core/runnables/base.py”, line 5721, in atransform     File “/usr/lib/python3.11/site-packages/langchain_core/runnables/base.py”, line 1578, in atransform     File “/usr/lib/python3.11/site-packages/langchain_core/language_models/chat_models.py”, line 645, in astream     File “/usr/lib/python3.11/site-packages/langchain_openai/chat_models/base.py”, line 2822, in _astream     File “/usr/lib/python3.11/site-packages/langchain_openai/chat_models/base.py”, line 1370, in _astream     File “/usr/lib/python3.11/site-packages/openai/resources/chat/completions/completions.py”, line 2603, in create     File “/usr/lib/python3.11/site-packages/openai/_base_client.py”, line 1794, in post     File “/usr/lib/python3.11/site-packages/openai/_base_client.py”, line 1594, in request   openai.BadRequestError: Error code: 400 - {‘error’: {‘message’: “Unsupported parameter: ‘top_p’ is not supported with this model.”, ‘type’: ‘invalid_request_error’, ‘param’: ‘top_p’, ‘code’: ‘unsupported_parameter’}}**


I saw another forum post that experienced a similar error due to temperature being unsupported by GPT-5. Is there a way to disable all of the unsupported parameters of GPT-5 so that it can be used in LangSmith?

---

## Post #2 by @jacoblee93
*Posted on 2025-10-21 16:24:40*

Hey [/u/evnpoon](@evnpoon),

I’m guessing you’re opening a previously created LLM run with a different OpenAI model?

If you open the prompt settings gear here:

[/uploads/short-url/j9LiZHnll1zNunAOBvxCsmRnviE.png?dl=1](image636×380 12.3 KB)

Are you able to set an alternate config as a stopgap?

Jacob

---

## Post #3 by @evnpoon
*Posted on 2025-10-21 17:45:07*

Hi [/u/jacoblee93](@jacoblee93),

You’re right –  I was opening a previously created LLM run with a different OpenAI model.

I tried opening the prompt settings and changing the config to some pre-saved one rather than an unsaved one. This seemed to do the trick –  I was able to change the model of the pre-saved config to GPT-5 and run it to get an output with Top P still enabled.

Would you be able to provide some context as to why this is the solution? Why is it that the unsaved config cannot run GPT-5 while a pre-saved one that was changed to use this model could?

---

## Post #4 by @jacoblee9315
*Posted on 2025-10-21 18:05:28*

Hey @evpoon,

It’s because we also pass params from your previously run naively into the new model. Will flag and try to get some smoother fix planned - perhaps a warning saying some config will be dropped.

Jacob

---

## Post #5 by @evnpoon
*Posted on 2025-10-21 18:22:17*

Got it – thanks!

---
