# My tracking conflicts with the original application

**Topic ID:** 260
**Created:** 2025-07-04 20:57:08
**URL:** https://forum.langchain.com/t/260

**Tags:** python-help

---

## Post #1 by @jie.simith
*Posted on 2025-07-04 20:57:08*

I used the rag evaluation application built with langchain as the framework. I need to track the hierarchical relationship between this application and llm calls, but the internal llm interaction functions have already been written and I can’t change them. Using static Settings of environment variables to track projects will also record many unimportant interaction records, such as translations, etc. I need to have a tag for setting the name and dynamically select which llm interactions need to be recorded and which do not. When I use the @traceable decorator, an error occurs. It seems that there is no callback function.

Error message:

Traceback (most recent call last):

File “D:\project\src\ragasDemo\core\api\ai_api\ragas_evaluation.py”, line 187, in ragas_evaluation_from_dict

comprehensive_score = evaluate(

^^^^^^^^^

File “D:\project\src\ragasDemo.raenv\Lib\site-packages\ragas_analytics.py”, line 227, in wrapper

result = func(*args, **kwargs)

^^^^^^^^^^^^^^^^^^^^^

File “D:\project\src\ragasDemo.raenv\Lib\site-packages\ragas\evaluation.py”, line 323, in evaluate

result = EvaluationResult(

^^^^^^^^^^^^^^^^^

File “”, line 10, in **init**

File “D:\project\src\ragasDemo.raenv\Lib\site-packages\ragas\dataset_schema.py”, line 439, in **post_init**

self.traces = parse_run_traces(self.ragas_traces, run_id)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

File “D:\project\src\ragasDemo.raenv\Lib\site-packages\ragas\callbacks.py”, line 149, in parse_run_traces

root_trace = root_traces[0]

~~~~~~~~~~~^^^

IndexError: list index out of range

---

## Post #2 by @jacoblee93
*Posted on 2025-07-07 21:01:56*

Hey [/u/jie.simith](@jie.simith),

Could you share some of your code and what you do and don’t want to trace?

---
