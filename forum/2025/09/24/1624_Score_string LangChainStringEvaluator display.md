# Score_string LangChainStringEvaluator display

**Topic ID:** 1624
**Created:** 2025-09-24 03:04:30
**URL:** https://forum.langchain.com/t/1624

---

## Post #1 by @Warlord786
*Posted on 2025-09-24 03:04:30*

When using a predefined LLM-as-a-judge LangChainStringEvaluator of the type score_string and viewing the run of the experiment in the LangSmith console, the score_string evaluator columns display the evaluator name with a “Score_string: ” prefix, then the entire content of the llm-as-a-judge prompt provided for scoring (which is quite long and ugly).

This is unlike the other evaluators which display friendly evaluator names (e.g. output_format_evaluator).

Is there a way to set these score_string LangChainStringEvaluator evaluators user friendly names like this?  Or some other workaround to this issue?

---
