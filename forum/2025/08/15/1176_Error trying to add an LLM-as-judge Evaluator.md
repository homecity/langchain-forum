# Error trying to add an LLM-as-judge Evaluator

**Topic ID:** 1176
**Created:** 2025-08-15 15:31:23
**URL:** https://forum.langchain.com/t/1176

---

## Post #1 by @DanielJonesEB
*Posted on 2025-08-15 15:31:23*

When trying to create an LLM-as-judge evaluator on an experiment, I get the following error message pop up in the bottom-right of the window, after clicking the “Save” button:

”Failed to save evaluator: Manifest type langchain.schema.runnable.RunnableSequence is not supported”

Any ideas what might be wrong or how to fix it? I’m just trying to do a ‘hello world’ style experiment.

---

## Post #2 by @madams0013
*Posted on 2025-08-15 16:45:53*

Hi Daniel! Do you mind adding the steps you took to get this error to help us reproduce the issue?

---

## Post #3 by @sean-weber-cambri
*Posted on 2025-08-18 11:36:51*

I’m getting the same issue


Create a new evaluator by selecting any prebuilt evaluator like “Correctness”
Change the model configuration

Provider: Amazon Bedrock
Model: eu.anthropic.claude-sonnet-4-20250514-v1:0
API: InvokeModel
Region: eu-west-1


Try to save the evaluator

---

## Post #4 by @madams0013
*Posted on 2025-08-20 20:38:05*

We’ve identified a fix for this and it will be live soon. Thanks for reporting!

---

## Post #5 by @madams0013
*Posted on 2025-08-21 20:29:34*

The fix is live!

---
