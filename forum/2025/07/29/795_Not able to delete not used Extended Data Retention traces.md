# Not able to delete not used Extended Data Retention traces

**Topic ID:** 795
**Created:** 2025-07-29 09:54:49
**URL:** https://forum.langchain.com/t/795

**Tags:** cloud

---

## Post #1 by @hubdev
*Posted on 2025-07-29 09:54:49*

Hello everyone,

I’m currently using Langsmith to evaluate different prompts against a dataset. My workflow is straightforward: I run experiments with various prompts using the same evaluator, and my only goal is to get the final score for each experiment to compare their performance.

I’m facing an issue where every experiment I run automatically generates Extended Data Retention traces (I guess because I added a code evaluator). These detailed traces are not necessary for my use case, as I only need to read the final scores once. I have configured my traces to be short-lived by default, but it seems that the experiment process  automatically converts them to Extended Data Retention traces.

This is causing me to hit my usage limits for Extended Data Retention traces, which blocks me from launching new experiments.

I have already tried deleting the completed experiments and even a related project named “evaluators,” but the Extended Data Retention trace count does not decrease.

Could someone please advise on how I can resolve this? Specifically:


**Is there a way to run experiments with evaluators without generating Extended Data Retention traces?**
**If not, how can I properly delete these Extended Data Retention traces  so I can decrease the  count against my limit and continue working without waiting until the next period? **

---

## Post #2 by @tanushree-sharma
*Posted on 2025-07-31 18:36:13*

[/u/hubdev](@hubdev) We unfortunately don’t support this. You would need to increase your usage limits to run evals at higher volumes.


All traces with feedback on them automatically get converted into Extended Data Retention traces. This is required because the feedback scores for your evals are pulled from the traces (without extended retention, your feedback would expire after 14d).
Deleting traces doesn’t affect your usage limits or billing. Trace usage is recorded at the time of ingestion, so removing traces afterward won’t change what’s already been counted.

---
